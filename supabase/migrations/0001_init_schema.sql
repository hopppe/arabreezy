-- Arabreezy initial schema.
-- Tables:
--   dialects              - static list of supported dialects
--   words                 - vocabulary, scoped by dialect + stable word id
--   lessons               - lessons, scoped by dialect
--   conversations         - branching dialogues, scoped by dialect
--   shadowing_phrases     - listen-and-repeat phrases, scoped by dialect
--   user_progress         - per-user state (1 row per user)
--
-- RLS:
--   Content tables are publicly readable (anon).
--   user_progress is readable/writable only by its owner.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Dialects
-- ---------------------------------------------------------------------------
create table if not exists public.dialects (
  id          text primary key,           -- 'saudi' | 'levantine' | 'fusha'
  name        text not null,
  rtl         boolean not null default true,
  created_at  timestamptz not null default now()
);

insert into public.dialects (id, name, rtl) values
  ('saudi',     'Saudi',       true),
  ('levantine', 'Levantine',   true),
  ('fusha',     'Fusha (MSA)', true)
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- Words
-- Composite primary key (dialect, word_id). word_id is stable across dialects.
-- ---------------------------------------------------------------------------
create table if not exists public.words (
  dialect          text not null references public.dialects(id) on delete cascade,
  word_id          text not null,
  script           text not null,
  transliteration  text not null,
  english          text not null,
  phase            smallint not null check (phase between 1 and 10),
  notes            text,
  audio            text,
  primary key (dialect, word_id)
);
create index if not exists words_phase_idx on public.words (dialect, phase);

-- ---------------------------------------------------------------------------
-- Lessons
-- ---------------------------------------------------------------------------
create table if not exists public.lessons (
  dialect          text not null references public.dialects(id) on delete cascade,
  lesson_id        text not null,
  phase            smallint not null check (phase between 1 and 10),
  title            text not null,
  intro            text,
  focal_word_ids   jsonb not null default '[]'::jsonb,
  dialogue         jsonb not null default '[]'::jsonb,
  check_questions  jsonb not null default '[]'::jsonb,
  primary key (dialect, lesson_id)
);
create index if not exists lessons_phase_idx on public.lessons (dialect, phase);

-- ---------------------------------------------------------------------------
-- Conversations
-- ---------------------------------------------------------------------------
create table if not exists public.conversations (
  dialect             text not null references public.dialects(id) on delete cascade,
  conversation_id     text not null,
  phase               smallint not null check (phase between 1 and 10),
  title               text not null,
  description         text,
  focal_word_ids      jsonb not null default '[]'::jsonb,
  steps               jsonb not null default '[]'::jsonb,
  completion_message  text,
  primary key (dialect, conversation_id)
);
create index if not exists conversations_phase_idx on public.conversations (dialect, phase);

-- ---------------------------------------------------------------------------
-- Shadowing phrases
-- ---------------------------------------------------------------------------
create table if not exists public.shadowing_phrases (
  dialect          text not null references public.dialects(id) on delete cascade,
  phrase_id        text not null,
  phase            smallint not null check (phase between 1 and 10),
  word_ref         text,
  script           text not null,
  transliteration  text not null,
  english          text not null,
  audio            text,
  primary key (dialect, phrase_id)
);
create index if not exists shadowing_phase_idx on public.shadowing_phrases (dialect, phase);

-- ---------------------------------------------------------------------------
-- User progress
-- One row per auth user. Mirrors the shape stored locally in AsyncStorage.
-- ---------------------------------------------------------------------------
create table if not exists public.user_progress (
  user_id            uuid primary key references auth.users(id) on delete cascade,
  dialect            text not null default 'saudi' references public.dialects(id),
  phase              smallint not null default 1 check (phase between 1 and 10),
  current_lesson_id  text,
  lessons_completed  jsonb not null default '[]'::jsonb,
  word_progress      jsonb not null default '{}'::jsonb,
  placement          jsonb not null default jsonb_build_object(
                       'completed', false,
                       'score', 0,
                       'placedAt', null,
                       'placedPhase', null
                     ),
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists user_progress_touch on public.user_progress;
create trigger user_progress_touch
before update on public.user_progress
for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.dialects           enable row level security;
alter table public.words              enable row level security;
alter table public.lessons            enable row level security;
alter table public.conversations      enable row level security;
alter table public.shadowing_phrases  enable row level security;
alter table public.user_progress      enable row level security;

-- Public read on content (anon + authenticated)
drop policy if exists "dialects readable"           on public.dialects;
drop policy if exists "words readable"              on public.words;
drop policy if exists "lessons readable"            on public.lessons;
drop policy if exists "conversations readable"      on public.conversations;
drop policy if exists "shadowing readable"          on public.shadowing_phrases;

create policy "dialects readable"          on public.dialects          for select using (true);
create policy "words readable"             on public.words             for select using (true);
create policy "lessons readable"           on public.lessons           for select using (true);
create policy "conversations readable"     on public.conversations     for select using (true);
create policy "shadowing readable"         on public.shadowing_phrases for select using (true);

-- user_progress: owner-only
drop policy if exists "progress owner select" on public.user_progress;
drop policy if exists "progress owner insert" on public.user_progress;
drop policy if exists "progress owner update" on public.user_progress;
drop policy if exists "progress owner delete" on public.user_progress;

create policy "progress owner select" on public.user_progress
  for select using (auth.uid() = user_id);
create policy "progress owner insert" on public.user_progress
  for insert with check (auth.uid() = user_id);
create policy "progress owner update" on public.user_progress
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "progress owner delete" on public.user_progress
  for delete using (auth.uid() = user_id);

-- On signup, create an empty user_progress row.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.user_progress (user_id)
  values (new.id)
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();
