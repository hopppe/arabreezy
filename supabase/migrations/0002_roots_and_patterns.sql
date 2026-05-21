-- Roots + patterns (root-based curriculum).
--
-- Roots are dialect-scoped (same id across dialects, different derivations may apply).
-- Patterns are GLOBAL — they are a feature of Arabic morphology, not of any
-- dialect, so one row covers all dialects.
--
-- Also extends `words` with root/pattern/semantic-drift metadata so the app
-- can render root families, pattern lessons, and drift warnings.

-- ---------------------------------------------------------------------------
-- Patterns (أوزان) — morphological templates
-- ---------------------------------------------------------------------------
create table if not exists public.patterns (
  pattern_id      text primary key,             -- e.g. 'faaʿil', 'mafʿal', 'form_I'
  template        text not null,                -- e.g. 'فَاعِل'
  example         text,                         -- e.g. 'كاتِب (kaatib, writer)'
  gloss           text not null,                -- 'active participle / doer'
  introduced_at   smallint not null check (introduced_at between 1 and 10)
);

-- ---------------------------------------------------------------------------
-- Roots (جُذُور) — dialect-scoped families
-- ---------------------------------------------------------------------------
create table if not exists public.roots (
  dialect          text not null references public.dialects(id) on delete cascade,
  root_id          text not null,                -- e.g. 'r_ktb'
  letters          jsonb not null,               -- ['ك', 'ت', 'ب']
  transliteration  text not null,                -- 'k-t-b'
  core             text not null,                -- 'writing, books'
  introduced_at    smallint not null check (introduced_at between 1 and 10),
  derivations      jsonb not null default '[]'::jsonb, -- array of word ids
  primary key (dialect, root_id)
);
create index if not exists roots_phase_idx on public.roots (dialect, introduced_at);

-- ---------------------------------------------------------------------------
-- Extend words with root/pattern/drift metadata
-- ---------------------------------------------------------------------------
alter table public.words add column if not exists root_ref       text;
alter table public.words add column if not exists pattern        text;
alter table public.words add column if not exists semantic_drift text
  check (semantic_drift in ('none', 'some', 'large'));
alter table public.words add column if not exists drift_note     text;

create index if not exists words_root_ref_idx on public.words (dialect, root_ref);

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.patterns enable row level security;
alter table public.roots    enable row level security;

drop policy if exists "patterns readable" on public.patterns;
drop policy if exists "roots readable"    on public.roots;

create policy "patterns readable" on public.patterns for select using (true);
create policy "roots readable"    on public.roots    for select using (true);
