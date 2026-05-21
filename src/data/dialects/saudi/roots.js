// Arabic roots (جُذُور). Each root = 3 consonants carrying a core meaning;
// plugging a root into a pattern yields a word. See src/data/patterns.js.
//
// Shape:
//   {
//     id:              'r_ktb',
//     letters:         ['ك','ت','ب'],
//     transliteration: 'k-t-b',
//     core:            'writing, books',
//     introducedAt:    3,           // phase where the family concept is first revealed
//     freqRank:        101,         // approximate cross-source frequency rank (omit if low-confidence)
//     sources:         ['QC','B-P','Aralex'],  // which sources confirm productivity
//     saudi:           false,       // true if the root is more productive in Saudi/Gulf than MSA
//     derivations:     ['w_kataba', ...]  // word ids; derivations SPAN phases
//   }
//
// Sources:
//   QC     = Quranic Arabic Corpus (1,475 verbs, ranked by occurrence)
//   B-P    = Buckwalter-Parkinson Frequency Dictionary of Arabic (5,000 MSA lemmas)
//   Aralex = Aralex lexicon (Boudelaa-Marslen-Wilson, 2010) — 40M-word MSA corpus, family sizes
//   Leeds  = Leeds Arabic Internet Corpus word-form frequency
//   Saudi  = qualitative Gulf/Najdi productivity studies (MDPI 2025, Open Book 2021)
//
// Phase distribution: log-scaled on frequency. Research consensus recommends
// stopping explicit teaching around root ~160 (77% corpus coverage); beyond
// that, let vocab acquisition continue through normal lessons.

export default {
  // ============================================================
  // PHASE 1 — Beginner (top ~10 frequency + Saudi essentials)
  // ============================================================
  r_qwl:   { id: 'r_qwl',   letters: ['ق','و','ل'], transliteration: 'q-w-l',   core: 'saying, speech',                       introducedAt: 1, freqRank: 1,  sources: ['QC','B-P','Aralex'], derivations: ['w_qaala', 'w_yaquul', 'w_qawl', 'w_maqaal', 'w_maquul'] },
  r_kwn:   { id: 'r_kwn',   letters: ['ك','و','ن'], transliteration: 'k-w-n',   core: 'being, becoming',                      introducedAt: 1, freqRank: 2,  sources: ['QC','B-P','Aralex'], derivations: ['w_kaana', 'w_yakuun', 'w_makaan', 'w_kawn', 'w_makwun'] },
  r_slm:   { id: 'r_slm',   letters: ['س','ل','م'], transliteration: 's-l-m',   core: 'peace, safety, submission',            introducedAt: 1, freqRank: 57, sources: ['QC','B-P','Aralex'], derivations: ['w_salaam', 'w_salaama', 'w_goodbye', 'w_saliim', 'w_islaam', 'w_muslim', 'w_tasliim'] },
  r_hll:   { id: 'r_hll',   letters: ['ه','ل','ل'], transliteration: 'h-l-l',   core: 'welcoming (Saudi greeting)',           introducedAt: 1, sources: ['Saudi'], saudi: true, derivations: ['w_ahlan', 'w_hi_saudi', 'w_welcome', 'w_hilaal'] },
  r_shkr:  { id: 'r_shkr',  letters: ['ش','ك','ر'], transliteration: 'sh-k-r', core: 'thanking',                              introducedAt: 1, sources: ['QC','B-P'], derivations: ['w_thanks', 'w_shukr', 'w_shaakir', 'w_mashkuur'] },
  r_fdl:   { id: 'r_fdl',   letters: ['ف','ض','ل'], transliteration: 'f-d-l',   core: 'favor, excellence',                    introducedAt: 1, sources: ['B-P','Aralex'], derivations: ['w_please', 'w_fadl', 'w_afdal', 'w_fadiila', 'w_mufaddal'] },
  r_smw:   { id: 'r_smw',   letters: ['س','م','و'], transliteration: 's-m-w',   core: 'naming, elevation',                    introducedAt: 1, sources: ['B-P','Aralex'], derivations: ['w_name', 'w_mynameis', 'w_musamma', 'w_samaa'] },
  r_bghy:  { id: 'r_bghy',  letters: ['ب','غ','ي'], transliteration: 'b-gh-y', core: 'wanting (Saudi-dominant)',              introducedAt: 1, freqRank: 85, sources: ['QC','B-P','Saudi'], saudi: true, derivations: ['w_want', 'w_bughya'] },
  r_ryd:   { id: 'r_ryd',   letters: ['ر','و','د'], transliteration: 'r-w-d',   core: 'wanting (MSA-preferred)',              introducedAt: 1, freqRank: 19, sources: ['QC','B-P','Aralex'], derivations: ['w_ariid', 'w_iraada', 'w_muriid'] },
  r_zyn:   { id: 'r_zyn',   letters: ['ز','ي','ن'], transliteration: 'z-y-n',   core: 'good, beautiful (Saudi "zain")',       introducedAt: 1, sources: ['Saudi'], saudi: true, derivations: ['w_good', 'w_ziina'] },
  r_hwl:   { id: 'r_hwl',   letters: ['ح','و','ل'], transliteration: 'h-w-l',   core: 'state, condition, turning',            introducedAt: 1, freqRank: 89, sources: ['QC','B-P','Aralex'], derivations: ['w_haal', 'w_howru', 'w_ahwaal', 'w_tahwiil', 'w_mustaheel'] },

  // ============================================================
  // PHASE 2 — Elementary (top ~30 frequency + basic numbers/colors)
  // ============================================================
  r_ʾmn:   { id: 'r_ʾmn',   letters: ['ء','م','ن'], transliteration: 'ʾ-m-n',  core: 'belief, safety',                        introducedAt: 2, freqRank: 3,  sources: ['QC','B-P','Aralex'], derivations: ['w_amn', 'w_aamin', 'w_iimaan', 'w_muʾmin', 'w_taʾmiin'] },
  r_jʿl:   { id: 'r_jʿl',   letters: ['ج','ع','ل'], transliteration: 'j-ʿ-l',  core: 'making, creating',                      introducedAt: 2, freqRank: 5,  sources: ['QC','B-P','Aralex'], derivations: ['w_jaʿala', 'w_jaʿl', 'w_majʿuul'] },
  r_jyʾ:   { id: 'r_jyʾ',   letters: ['ج','ي','ء'], transliteration: 'j-y-ʾ',  core: 'coming',                                introducedAt: 2, freqRank: 7,  sources: ['QC','B-P','Aralex'], derivations: ['w_come', 'w_jaaʾa', 'w_majiiʾ'] },
  r_ʾty:   { id: 'r_ʾty',   letters: ['ء','ت','ي'], transliteration: 'ʾ-t-y',  core: 'giving, bringing, coming',              introducedAt: 2, freqRank: 9,  sources: ['QC','B-P','Aralex'], derivations: ['w_ata', 'w_ityaan', 'w_muʾti'] },
  r_ʾkhdh: { id: 'r_ʾkhdh', letters: ['ء','خ','ذ'], transliteration: 'ʾ-kh-dh',core: 'taking',                                introducedAt: 2, freqRank: 11, sources: ['QC','B-P','Aralex'], derivations: ['w_akhadha', 'w_akhdh', 'w_maʾkhuudh'] },
  r_whd:   { id: 'r_whd',   letters: ['و','ح','د'], transliteration: 'w-h-d',  core: 'one, unique',                           introducedAt: 2, sources: ['B-P','Aralex'], derivations: ['w_one', 'w_wihda', 'w_muwahhad'] },
  r_thn:   { id: 'r_thn',   letters: ['ث','ن','ي'], transliteration: 'th-n-y',core: 'two, folding, repeating',               introducedAt: 2, sources: ['B-P','Aralex'], derivations: ['w_two', 'w_thaani', 'w_day_mon', 'w_istithnaa'] },
  r_thlth: { id: 'r_thlth', letters: ['ث','ل','ث'], transliteration: 'th-l-th',core: 'three',                                introducedAt: 2, sources: ['B-P'], derivations: ['w_three', 'w_thulth', 'w_muthallath'] },
  r_rbʿ:   { id: 'r_rbʿ',   letters: ['ر','ب','ع'], transliteration: 'r-b-ʿ',  core: 'four, quarter',                         introducedAt: 2, sources: ['B-P'], derivations: ['w_four', 'w_rubʿ', 'w_murabbaʿ'] },
  r_khms:  { id: 'r_khms',  letters: ['خ','م','س'], transliteration: 'kh-m-s', core: 'five',                                  introducedAt: 2, sources: ['B-P'], derivations: ['w_five', 'w_khumus'] },
  r_ʿshr:  { id: 'r_ʿshr',  letters: ['ع','ش','ر'], transliteration: 'ʿ-sh-r', core: 'ten, company',                          introducedAt: 2, sources: ['B-P','Aralex'], derivations: ['w_ten', 'w_ʿushr', 'w_ʿashiir', 'w_muʿaashara'] },
  r_hmr:   { id: 'r_hmr',   letters: ['ح','م','ر'], transliteration: 'h-m-r',  core: 'red, redness',                          introducedAt: 2, sources: ['B-P'], derivations: ['w_red', 'w_hamraa', 'w_humra', 'w_tamr'] },
  r_zrq:   { id: 'r_zrq',   letters: ['ز','ر','ق'], transliteration: 'z-r-q',  core: 'blue',                                  introducedAt: 2, sources: ['B-P'], derivations: ['w_blue', 'w_zarqaa'] },
  r_byd:   { id: 'r_byd',   letters: ['ب','ي','ض'], transliteration: 'b-y-d',  core: 'white, egg',                            introducedAt: 2, sources: ['B-P','Aralex'], derivations: ['w_white', 'w_bayda', 'w_baydaa'] },
  r_swd:   { id: 'r_swd',   letters: ['س','و','د'], transliteration: 's-w-d',  core: 'black, lord',                           introducedAt: 2, sources: ['B-P','Aralex'], derivations: ['w_black', 'w_sayyid', 'w_sawda'] },
  r_khdr:  { id: 'r_khdr',  letters: ['خ','ض','ر'], transliteration: 'kh-d-r', core: 'green, vegetables',                     introducedAt: 2, sources: ['B-P'], derivations: ['w_green', 'w_khudar'] },
  r_sfr:   { id: 'r_sfr',   letters: ['ص','ف','ر'], transliteration: 's-f-r',  core: 'yellow',                                introducedAt: 2, sources: ['B-P'], derivations: ['w_yellow', 'w_safraa'] },
  r_ywm:   { id: 'r_ywm',   letters: ['ي','و','م'], transliteration: 'y-w-m',  core: 'day',                                   introducedAt: 2, sources: ['QC','B-P','Aralex'], derivations: ['w_today', 'w_yawm', 'w_ayyaam', 'w_yawmi'] },
  r_ʿnd:   { id: 'r_ʿnd',   letters: ['ع','ن','د'], transliteration: 'ʿ-n-d',  core: 'at, near, having',                      introducedAt: 2, sources: ['B-P','Aralex'], derivations: ['w_have', 'w_ʿind'] },

  // ============================================================
  // PHASE 3 — Pre-Intermediate (top ~60 + family/food + explicit root lesson)
  // ============================================================
  r_ʿlm:   { id: 'r_ʿlm',   letters: ['ع','ل','م'], transliteration: 'ʿ-l-m',  core: 'knowing, science',                      introducedAt: 3, freqRank: 4,  sources: ['QC','B-P','Aralex'], derivations: ['w_ʿalima', 'w_ʿilm', 'w_ʿaalim', 'w_muʿallim', 'w_taʿliim', 'w_maʿluum', 'w_ʿaalami'] },
  r_ktb:   { id: 'r_ktb',   letters: ['ك','ت','ب'], transliteration: 'k-t-b',  core: 'writing, books',                        introducedAt: 3, freqRank: 92, sources: ['QC','B-P','Aralex'], derivations: ['w_kitaab', 'w_maktab', 'w_maktaba', 'w_kaatib', 'w_kataba', 'w_maktuub', 'w_kutub'] },
  r_drs:   { id: 'r_drs',   letters: ['د','ر','س'], transliteration: 'd-r-s',  core: 'studying, lessons',                     introducedAt: 3, freqRank: 101,sources: ['QC','B-P'], derivations: ['w_darasa', 'w_dars', 'w_madrasa', 'w_mudarris', 'w_diraasa', 'w_daaris'] },
  r_ʾmm:   { id: 'r_ʾmm',   letters: ['ء','م','م'], transliteration: 'ʾ-m-m',  core: 'mother, foundation, nation',            introducedAt: 3, sources: ['B-P','Aralex'], derivations: ['w_mother', 'w_umma', 'w_imaam'] },
  r_ʾbw:   { id: 'r_ʾbw',   letters: ['ء','ب','و'], transliteration: 'ʾ-b-w',  core: 'father',                                introducedAt: 3, sources: ['B-P'], derivations: ['w_father', 'w_abuu'] },
  r_ʾkhw:  { id: 'r_ʾkhw',  letters: ['ء','خ','و'], transliteration: 'ʾ-kh-w', core: 'brother, sibling',                      introducedAt: 3, sources: ['B-P'], derivations: ['w_brother', 'w_sister', 'w_ikhwa', 'w_ukhuwwa'] },
  r_wld:   { id: 'r_wld',   letters: ['و','ل','د'], transliteration: 'w-l-d',  core: 'being born, child',                     introducedAt: 3, sources: ['QC','B-P','Aralex'], derivations: ['w_walad', 'w_bint', 'w_waalid', 'w_miilaad'] },
  r_sdq:   { id: 'r_sdq',   letters: ['ص','د','ق'], transliteration: 's-d-q',  core: 'truth, friendship',                     introducedAt: 3, sources: ['QC','B-P','Aralex'], derivations: ['w_friend', 'w_sidq', 'w_saadiq', 'w_saddaqa', 'w_tasdiiq'] },
  r_khbz:  { id: 'r_khbz',  letters: ['خ','ب','ز'], transliteration: 'kh-b-z', core: 'bread, baking',                         introducedAt: 3, sources: ['B-P'], derivations: ['w_bread', 'w_khabbaz', 'w_makhbaza'] },
  r_lhm:   { id: 'r_lhm',   letters: ['ل','ح','م'], transliteration: 'l-h-m',  core: 'flesh, meat',                           introducedAt: 3, sources: ['B-P'], derivations: ['w_meat', 'w_lahhaam', 'w_mulhim'] },
  r_shrb:  { id: 'r_shrb',  letters: ['ش','ر','ب'], transliteration: 'sh-r-b', core: 'drinking',                              introducedAt: 3, sources: ['B-P','Aralex'], derivations: ['w_shariba', 'w_sharaab', 'w_mashruub'] },
  r_ʾkl:   { id: 'r_ʾkl',   letters: ['ء','ك','ل'], transliteration: 'ʾ-k-l',  core: 'eating',                                introducedAt: 3, freqRank: 27, sources: ['QC','B-P','Aralex'], derivations: ['w_akala', 'w_akl', 'w_maʾkuul', 'w_aakil'] },
  r_qhw:   { id: 'r_qhw',   letters: ['ق','ه','و'], transliteration: 'q-h-w',  core: 'coffee',                                introducedAt: 3, sources: ['Saudi'], saudi: true, derivations: ['w_coffee', 'w_maqha'] },
  r_kbr:   { id: 'r_kbr',   letters: ['ك','ب','ر'], transliteration: 'k-b-r',  core: 'bigness, greatness',                    introducedAt: 3, sources: ['QC','B-P','Aralex'], derivations: ['w_kabiir', 'w_akbar', 'w_kibar', 'w_takbiir'] },
  r_sghr:  { id: 'r_sghr',  letters: ['ص','غ','ر'], transliteration: 's-gh-r', core: 'smallness',                             introducedAt: 3, sources: ['B-P','Aralex'], derivations: ['w_saghiir', 'w_asghar', 'w_sighar'] },
  r_jdd:   { id: 'r_jdd',   letters: ['ج','د','د'], transliteration: 'j-d-d',  core: 'new, seriousness',                      introducedAt: 3, sources: ['B-P','Aralex'], derivations: ['w_jadiid', 'w_jiddan', 'w_tajdiid', 'w_jadd'] },
  r_qdm_old:{id: 'r_qdm_old',letters:['ق','د','م'], transliteration: 'q-d-m',  core: 'old, preceding',                        introducedAt: 3, sources: ['B-P','Aralex'], derivations: ['w_qadiim', 'w_qadam'] },
  r_byt:   { id: 'r_byt',   letters: ['ب','ي','ت'], transliteration: 'b-y-t',  core: 'house, staying overnight',              introducedAt: 3, sources: ['B-P','Aralex'], derivations: ['w_house', 'w_bayt', 'w_buyuut', 'w_baata'] },
  r_ʾyn:   { id: 'r_ʾyn',   letters: ['ء','ي','ن'], transliteration: 'ʾ-y-n',  core: 'where',                                 introducedAt: 3, sources: ['B-P'], derivations: ['w_where', 'w_ayna'] },
  r_khlq:  { id: 'r_khlq',  letters: ['خ','ل','ق'], transliteration: 'kh-l-q', core: 'creating, disposition',                 introducedAt: 3, freqRank: 13, sources: ['QC','B-P','Aralex'], derivations: ['w_khalaqa', 'w_khalq', 'w_khaaliq', 'w_makhluuq'] },
  r_tbʿ:   { id: 'r_tbʿ',   letters: ['ت','ب','ع'], transliteration: 't-b-ʿ',  core: 'following',                             introducedAt: 3, freqRank: 20, sources: ['QC','B-P','Aralex'], derivations: ['w_tabiʿa', 'w_taabiʿ', 'w_taabaʿa', 'w_matbuuʿ'] },
  r_rʾy:   { id: 'r_rʾy',   letters: ['ر','ء','ي'], transliteration: 'r-ʾ-y',  core: 'seeing, opinion',                       introducedAt: 3, freqRank: 10, sources: ['QC','B-P','Aralex'], derivations: ['w_raʾa', 'w_ruʾya', 'w_raʾy'] },

  // ============================================================
  // PHASE 4 — Intermediate I (top ~80 + places/motion/directions)
  // ============================================================
  r_rjʿ:   { id: 'r_rjʿ',   letters: ['ر','ج','ع'], transliteration: 'r-j-ʿ',  core: 'returning, going back',                 introducedAt: 4, freqRank: 33, sources: ['QC','B-P','Aralex'], derivations: ['w_rajaʿa', 'w_rujuuʿ', 'w_raajiʿ', 'w_mustarjaʿ'] },
  r_khrj:  { id: 'r_khrj',  letters: ['خ','ر','ج'], transliteration: 'kh-r-j', core: 'going out, exit',                       introducedAt: 4, freqRank: 26, sources: ['QC','B-P','Aralex'], derivations: ['w_kharaja', 'w_khuruuj', 'w_khaarij', 'w_makhraj'] },
  r_dkhl:  { id: 'r_dkhl',  letters: ['د','خ','ل'], transliteration: 'd-kh-l', core: 'entering, income',                      introducedAt: 4, freqRank: 37, sources: ['QC','B-P','Aralex'], derivations: ['w_dakhala', 'w_dukhuul', 'w_daakhil', 'w_madkhal'] },
  r_swq:   { id: 'r_swq',   letters: ['س','و','ق'], transliteration: 's-w-q',  core: 'driving, market',                       introducedAt: 4, sources: ['B-P','Aralex'], derivations: ['w_market', 'w_aswaaq', 'w_saaʾiq', 'w_siyaaqa'] },
  r_sjd:   { id: 'r_sjd',   letters: ['س','ج','د'], transliteration: 's-j-d',  core: 'prostrating',                           introducedAt: 4, freqRank: 65, sources: ['QC','B-P','Aralex'], derivations: ['w_mosque', 'w_sajda', 'w_saajid'] },
  r_tʿm:   { id: 'r_tʿm',   letters: ['ط','ع','م'], transliteration: 't-ʿ-m',  core: 'taste, food',                           introducedAt: 4, sources: ['B-P','Aralex'], derivations: ['w_restaurant', 'w_taʿaam', 'w_matʿuum'] },
  r_shfy:  { id: 'r_shfy',  letters: ['ش','ف','ي'], transliteration: 'sh-f-y', core: 'healing, recovery',                     introducedAt: 4, sources: ['B-P'], derivations: ['w_hospital', 'w_shifaaʾ', 'w_shaafi'] },
  r_rwh:   { id: 'r_rwh',   letters: ['ر','و','ح'], transliteration: 'r-w-h',  core: 'going, spirit, rest',                   introducedAt: 4, sources: ['B-P','Aralex','Saudi'], saudi: true, derivations: ['w_go', 'w_ruuh', 'w_rawaah', 'w_muriih'] },
  r_dhhb:  { id: 'r_dhhb',  letters: ['ذ','ه','ب'], transliteration: 'dh-h-b', core: 'going (MSA), gold',                     introducedAt: 4, sources: ['QC','B-P','Aralex'], derivations: ['w_dhahaba', 'w_madhhab', 'w_dhahab'] },
  r_ymn:   { id: 'r_ymn',   letters: ['ي','م','ن'], transliteration: 'y-m-n',  core: 'right side, Yemen',                     introducedAt: 4, sources: ['B-P'], derivations: ['w_right', 'w_yamiin', 'w_aymaan'] },
  r_ysr:   { id: 'r_ysr',   letters: ['ي','س','ر'], transliteration: 'y-s-r',  core: 'left side, ease',                       introducedAt: 4, sources: ['B-P'], derivations: ['w_left', 'w_yasaar', 'w_muyassar'] },
  r_ams:   { id: 'r_ams',   letters: ['ء','م','س'], transliteration: 'ʾ-m-s',  core: 'yesterday',                             introducedAt: 4, sources: ['B-P'], derivations: ['w_yesterday'] },
  r_qbl:   { id: 'r_qbl',   letters: ['ق','ب','ل'], transliteration: 'q-b-l',  core: 'before, accepting, facing',             introducedAt: 4, sources: ['QC','B-P','Aralex'], derivations: ['w_qabl', 'w_qabila', 'w_mustaqbal', 'w_qubla', 'w_muqaabala'] },
  r_bʿd:   { id: 'r_bʿd',   letters: ['ب','ع','د'], transliteration: 'b-ʿ-d',  core: 'after, distance',                       introducedAt: 4, sources: ['B-P','Aralex'], derivations: ['w_baʿd', 'w_baʿiid', 'w_ibtiʿaad'] },
  r_kthr:  { id: 'r_kthr',  letters: ['ك','ث','ر'], transliteration: 'k-th-r', core: 'plenty, many',                          introducedAt: 4, sources: ['B-P','Aralex'], derivations: ['w_kathiir', 'w_akthar', 'w_kathra', 'w_takthiir'] },
  r_qll:   { id: 'r_qll',   letters: ['ق','ل','ل'], transliteration: 'q-l-l',  core: 'few, less',                             introducedAt: 4, sources: ['B-P'], derivations: ['w_qaliil', 'w_aqall', 'w_qilla'] },
  r_khyr:  { id: 'r_khyr',  letters: ['خ','ي','ر'], transliteration: 'kh-y-r', core: 'goodness, choosing',                    introducedAt: 4, sources: ['QC','B-P','Aralex'], derivations: ['w_khair', 'w_akhyar', 'w_ikhtiyaar', 'w_mukhtaar'] },
  r_sbh:   { id: 'r_sbh',   letters: ['ص','ب','ح'], transliteration: 's-b-h',  core: 'morning',                               introducedAt: 4, sources: ['B-P','Aralex'], derivations: ['w_sabah', 'w_subh', 'w_sabahkhair'] },
  r_msw:   { id: 'r_msw',   letters: ['م','س','و'], transliteration: 'm-s-w',  core: 'evening',                               introducedAt: 4, sources: ['B-P'], derivations: ['w_masaaʾ', 'w_masakhair'] },
  r_lyl:   { id: 'r_lyl',   letters: ['ل','ي','ل'], transliteration: 'l-y-l',  core: 'night',                                 introducedAt: 4, sources: ['QC','B-P','Aralex'], derivations: ['w_layl', 'w_layla', 'w_layaal'] },
  r_hbb:   { id: 'r_hbb',   letters: ['ح','ب','ب'], transliteration: 'h-b-b',  core: 'love, seed',                            introducedAt: 4, freqRank: 46, sources: ['QC','B-P','Aralex'], derivations: ['w_habba', 'w_hubb', 'w_habiib', 'w_mahbuub'] },
  r_ʾmr:   { id: 'r_ʾmr',   letters: ['ء','م','ر'], transliteration: 'ʾ-m-r',  core: 'commanding, order, matter',             introducedAt: 4, freqRank: 36, sources: ['QC','B-P','Aralex'], derivations: ['w_amara', 'w_amr', 'w_aamir', 'w_maʾmuur'] },
  r_sʾl:   { id: 'r_sʾl',   letters: ['س','ء','ل'], transliteration: 's-ʾ-l',  core: 'asking, questioning',                   introducedAt: 4, freqRank: 24, sources: ['QC','B-P','Aralex'], derivations: ['w_saʾala', 'w_suʾaal', 'w_saaʾil', 'w_masʾala'] },
  r_jwb:   { id: 'r_jwb',   letters: ['ج','و','ب'], transliteration: 'j-w-b',  core: 'answering, traversing',                 introducedAt: 4, sources: ['B-P','Aralex'], derivations: ['w_jawaab', 'w_ajaaba', 'w_ijaaba'] },

  // ============================================================
  // PHASE 5 — Intermediate II (top ~105 + shopping/money + Form intros)
  // ============================================================
  r_bʿ:    { id: 'r_bʿ',    letters: ['ب','ي','ع'], transliteration: 'b-y-ʿ',  core: 'selling, trade',                        introducedAt: 5, sources: ['B-P','Aralex'], derivations: ['w_sell', 'w_baaʿa', 'w_bayʿ', 'w_baaʿiʿ', 'w_mubayaʿa'] },
  r_shrw:  { id: 'r_shrw',  letters: ['ش','ر','ي'], transliteration: 'sh-r-y', core: 'buying',                                introducedAt: 5, sources: ['B-P'], derivations: ['w_buy', 'w_ishtara', 'w_mushtari', 'w_shiraaʾ'] },
  r_dfʿ:   { id: 'r_dfʿ',   letters: ['د','ف','ع'], transliteration: 'd-f-ʿ',  core: 'pushing, paying',                       introducedAt: 5, sources: ['B-P','Aralex'], derivations: ['w_pay', 'w_dafaʿa', 'w_dafʿ', 'w_madfuuʿ'] },
  r_ghlw:  { id: 'r_ghlw',  letters: ['غ','ل','و'], transliteration: 'gh-l-w', core: 'being expensive, excess',               introducedAt: 5, sources: ['B-P'], derivations: ['w_expensive', 'w_ghulw', 'w_ghalaaʾ'] },
  r_rkhs:  { id: 'r_rkhs',  letters: ['ر','خ','ص'], transliteration: 'r-kh-s', core: 'cheapness, permission',                 introducedAt: 5, sources: ['B-P'], derivations: ['w_cheap', 'w_rukhsa', 'w_rakhiis'] },
  r_hsb:   { id: 'r_hsb',   letters: ['ح','س','ب'], transliteration: 'h-s-b',  core: 'counting, reckoning',                   introducedAt: 5, freqRank: 72, sources: ['QC','B-P','Aralex'], derivations: ['w_hasaba', 'w_hisaab', 'w_muhaasib', 'w_mahsuub'] },
  r_ʿml:   { id: 'r_ʿml',   letters: ['ع','م','ل'], transliteration: 'ʿ-m-l',  core: 'working, doing',                        introducedAt: 5, freqRank: 8,  sources: ['QC','B-P','Aralex'], derivations: ['w_ʿamila', 'w_ʿamal', 'w_ʿaamil', 'w_maʿmal', 'w_muʿaamala'] },
  r_fʿl:   { id: 'r_fʿl',   letters: ['ف','ع','ل'], transliteration: 'f-ʿ-l',  core: 'doing, action (the paradigm)',          introducedAt: 5, freqRank: 28, sources: ['QC','B-P','Aralex'], derivations: ['w_faʿala', 'w_fiʿl', 'w_faaʿil', 'w_mafʿuul', 'w_infiʿaal'] },
  r_shgl:  { id: 'r_shgl',  letters: ['ش','غ','ل'], transliteration: 'sh-gh-l',core: 'being busy, work (Saudi-dominant)',     introducedAt: 5, sources: ['Saudi','B-P'], saudi: true, derivations: ['w_job', 'w_shaghala', 'w_mashghuul', 'w_shaghl'] },
  r_hsn:   { id: 'r_hsn',   letters: ['ح','س','ن'], transliteration: 'h-s-n',  core: 'goodness, beauty',                      introducedAt: 5, freqRank: 73, sources: ['QC','B-P','Aralex'], derivations: ['w_hasan', 'w_ahsan_adj', 'w_hassana', 'w_mahaasin', 'w_tahsiin'] },
  r_swʾ:   { id: 'r_swʾ',   letters: ['س','و','ء'], transliteration: 's-w-ʾ',  core: 'evil, bad',                             introducedAt: 5, sources: ['B-P','Aralex'], derivations: ['w_sayyiʾ', 'w_aswa', 'w_isaaʾa', 'w_musiʾ'] },
  r_srʿ:   { id: 'r_srʿ',   letters: ['س','ر','ع'], transliteration: 's-r-ʿ',  core: 'speed',                                 introducedAt: 5, sources: ['B-P'], derivations: ['w_sariiʿ', 'w_asraʿ', 'w_surʿa'] },
  r_qwy:   { id: 'r_qwy',   letters: ['ق','و','ي'], transliteration: 'q-w-y',  core: 'strength',                              introducedAt: 5, sources: ['B-P','Aralex'], derivations: ['w_qawi', 'w_quwwa', 'w_taqwiya'] },
  r_dʿf:   { id: 'r_dʿf',   letters: ['ض','ع','ف'], transliteration: 'd-ʿ-f',  core: 'weakness',                              introducedAt: 5, freqRank: 106,sources: ['QC','B-P','Aralex'], derivations: ['w_daʿiif', 'w_duʿf', 'w_mudaʿaf'] },
  r_tlb:   { id: 'r_tlb',   letters: ['ط','ل','ب'], transliteration: 't-l-b',  core: 'demanding, requesting',                 introducedAt: 5, freqRank: 91, sources: ['QC','B-P','Aralex'], derivations: ['w_talaba', 'w_talab', 'w_taalib', 'w_matluub'] },
  r_ʿtw:   { id: 'r_ʿtw',   letters: ['ع','ط','و'], transliteration: 'ʿ-t-w',  core: 'giving',                                introducedAt: 5, sources: ['B-P'], derivations: ['w_aʿta', 'w_ʿataaʾ', 'w_muʿti'] },
  r_dʿw:   { id: 'r_dʿw',   letters: ['د','ع','و'], transliteration: 'd-ʿ-w',  core: 'calling, inviting, prayer',             introducedAt: 5, freqRank: 16, sources: ['QC','B-P','Aralex'], derivations: ['w_daʿa', 'w_daʿwa', 'w_daaʿi', 'w_duʿaaʾ'] },
  r_rsl:   { id: 'r_rsl',   letters: ['ر','س','ل'], transliteration: 'r-s-l',  core: 'sending, messenger',                    introducedAt: 5, freqRank: 21, sources: ['QC','B-P','Aralex'], derivations: ['w_arsala', 'w_risaala', 'w_rasuul', 'w_mursal'] },
  r_ʿbd:   { id: 'r_ʿbd',   letters: ['ع','ب','د'], transliteration: 'ʿ-b-d',  core: 'worship, serving',                      introducedAt: 5, freqRank: 22, sources: ['QC','B-P','Aralex'], derivations: ['w_ʿabada', 'w_ʿabd', 'w_ʿibaada', 'w_maʿbuud'] },
  r_khdm:  { id: 'r_khdm',  letters: ['خ','د','م'], transliteration: 'kh-d-m', core: 'serving, use',                          introducedAt: 5, sources: ['B-P','Aralex'], derivations: ['w_khadama', 'w_khidma', 'w_khaadim', 'w_istakhdama', 'w_istikhdaam'] },

  // ============================================================
  // PHASE 6 — Upper-Intermediate (top ~130 + travel/time + broken plurals)
  // ============================================================
  r_sfr_travel:{id:'r_sfr_travel',letters:['س','ف','ر'],transliteration:'s-f-r',core:'traveling (homophone with "yellow" root — unrelated meaning)',introducedAt:6, sources:['B-P','Aralex'], derivations:['w_safar','w_saafara','w_musaafir','w_safiir','w_sifaara']},
  r_rkb:   { id: 'r_rkb',   letters: ['ر','ك','ب'], transliteration: 'r-k-b',  core: 'riding, mounting',                      introducedAt: 6, sources: ['B-P','Aralex'], derivations: ['w_rakiba', 'w_rukuub', 'w_raakib', 'w_markab', 'w_markaba'] },
  r_mtr:   { id: 'r_mtr',   letters: ['م','ط','ر'], transliteration: 'm-t-r',  core: 'rain, airport (by extension)',          introducedAt: 6, sources: ['B-P'], derivations: ['w_airport', 'w_matar', 'w_mumtir'] },
  r_trq:   { id: 'r_trq',   letters: ['ط','ر','ق'], transliteration: 't-r-q',  core: 'road, knocking',                        introducedAt: 6, sources: ['B-P','Aralex'], derivations: ['w_tariiq', 'w_taraqa', 'w_turuq'] },
  r_mdn:   { id: 'r_mdn',   letters: ['م','د','ن'], transliteration: 'm-d-n',  core: 'city, civilization',                    introducedAt: 6, sources: ['B-P','Aralex'], derivations: ['w_madiina', 'w_mudun', 'w_tamaddun', 'w_madani'] },
  r_qrʾ:   { id: 'r_qrʾ',   letters: ['ق','ر','ء'], transliteration: 'q-r-ʾ',  core: 'reading, reciting',                     introducedAt: 6, sources: ['QC','B-P','Aralex'], derivations: ['w_qaraʾa', 'w_qiraaʾa', 'w_qaariʾ', 'w_maqruuʾ'] },
  r_wqt:   { id: 'r_wqt',   letters: ['و','ق','ت'], transliteration: 'w-q-t',  core: 'time',                                  introducedAt: 6, sources: ['B-P','Aralex'], derivations: ['w_waqt', 'w_mawaquut', 'w_muwaqqat'] },
  r_shhr:  { id: 'r_shhr',  letters: ['ش','ه','ر'], transliteration: 'sh-h-r', core: 'month, famous',                         introducedAt: 6, sources: ['B-P','Aralex'], derivations: ['w_month', 'w_mashhuur', 'w_shuhra'] },
  r_snw:   { id: 'r_snw',   letters: ['س','ن','و'], transliteration: 's-n-w',  core: 'year',                                  introducedAt: 6, sources: ['B-P','Aralex'], derivations: ['w_year', 'w_sanawi', 'w_siniin'] },
  r_ʾsbʿ:  { id: 'r_ʾsbʿ',  letters: ['س','ب','ع'], transliteration: 's-b-ʿ',  core: 'seven, week',                           introducedAt: 6, sources: ['B-P'], derivations: ['w_week', 'w_sabʿa', 'w_saabiʿ'] },
  r_ndhr:  { id: 'r_ndhr',  letters: ['ن','ظ','ر'], transliteration: 'n-dh-r', core: 'looking, view',                         introducedAt: 6, freqRank: 29, sources: ['QC','B-P','Aralex'], derivations: ['w_nadhara', 'w_nadhar', 'w_manzar', 'w_naadhir'] },
  r_smʿ:   { id: 'r_smʿ',   letters: ['س','م','ع'], transliteration: 's-m-ʿ',  core: 'hearing, listening',                    introducedAt: 6, freqRank: 34, sources: ['QC','B-P','Aralex'], derivations: ['w_samiʿa', 'w_sam_ʿ', 'w_saamiʿ', 'w_masmuuʿ', 'w_istimaaʿ'] },
  r_nzl:   { id: 'r_nzl',   letters: ['ن','ز','ل'], transliteration: 'n-z-l',  core: 'descending, lodging',                   introducedAt: 6, freqRank: 14, sources: ['QC','B-P','Aralex'], derivations: ['w_nazala', 'w_nuzuul', 'w_manzil', 'w_tanziil'] },
  r_hml:   { id: 'r_hml',   letters: ['ح','م','ل'], transliteration: 'h-m-l',  core: 'carrying, pregnancy',                   introducedAt: 6, sources: ['B-P','Aralex'], derivations: ['w_hamala', 'w_himl', 'w_haamil'] },
  r_qdm:   { id: 'r_qdm',   letters: ['ق','د','م'], transliteration: 'q-d-m',  core: 'presenting, coming forward',            introducedAt: 6, sources: ['B-P','Aralex'], derivations: ['w_qaddama', 'w_taqdiim', 'w_muqaddim', 'w_taqaddum'] },
  r_bdʾ:   { id: 'r_bdʾ',   letters: ['ب','د','ء'], transliteration: 'b-d-ʾ',  core: 'beginning',                             introducedAt: 6, freqRank: 75, sources: ['QC','B-P','Aralex'], derivations: ['w_bidaaya', 'w_ibtidaaʾ', 'w_mubtadiʾ'] },
  r_nhy:   { id: 'r_nhy',   letters: ['ن','ه','ي'], transliteration: 'n-h-y',  core: 'ending, prohibiting',                   introducedAt: 6, sources: ['B-P','Aralex'], derivations: ['w_nihaaya', 'w_intihaaʾ', 'w_nahaa'] },
  r_wsl:   { id: 'r_wsl',   letters: ['و','ص','ل'], transliteration: 'w-s-l',  core: 'arriving, connecting',                  introducedAt: 6, sources: ['B-P','Aralex'], derivations: ['w_wasala', 'w_wusuul', 'w_muwaasala', 'w_ittisaal'] },
  r_ʾrd:   { id: 'r_ʾrd',   letters: ['ء','ر','ض'], transliteration: 'ʾ-r-d',  core: 'earth, land',                           introducedAt: 6, sources: ['QC','B-P','Aralex'], derivations: ['w_ard', 'w_araadi'] },
  r_smʾ:   { id: 'r_smʾ',   letters: ['س','م','و'], transliteration: 's-m-ʾ',  core: 'sky, height',                           introducedAt: 6, sources: ['QC','B-P','Aralex'], derivations: ['w_samaaʾ', 'w_sumuuww', 'w_saami'] },

  // ============================================================
  // PHASE 7 — Advanced I (top ~160 + feelings/work/body)
  // ============================================================
  r_fkr:   { id: 'r_fkr',   letters: ['ف','ك','ر'], transliteration: 'f-k-r',  core: 'thinking',                              introducedAt: 7, sources: ['B-P','Aralex'], derivations: ['w_fakkara', 'w_fikr', 'w_fikra', 'w_mufakkir', 'w_tafkiir'] },
  r_ʿrf:   { id: 'r_ʿrf',   letters: ['ع','ر','ف'], transliteration: 'ʿ-r-f',  core: 'knowing (acquaintance)',                introducedAt: 7, freqRank: 104,sources: ['QC','B-P','Aralex'], derivations: ['w_know', 'w_ʿarafa', 'w_maʿrifa', 'w_taʿarruf', 'w_maʿruuf'] },
  r_dhkr:  { id: 'r_dhkr',  letters: ['ذ','ك','ر'], transliteration: 'dh-k-r', core: 'remembering',                           introducedAt: 7, freqRank: 30, sources: ['QC','B-P','Aralex'], derivations: ['w_remember', 'w_dhakara', 'w_tadhakkara', 'w_dhikra', 'w_mudhakkira'] },
  r_nsy:   { id: 'r_nsy',   letters: ['ن','س','ي'], transliteration: 'n-s-y',  core: 'forgetting',                            introducedAt: 7, freqRank: 67, sources: ['QC','B-P','Aralex'], derivations: ['w_forget', 'w_nasiya', 'w_nisyaan'] },
  r_ʿql:   { id: 'r_ʿql',   letters: ['ع','ق','ل'], transliteration: 'ʿ-q-l',  core: 'intellect, mind',                       introducedAt: 7, freqRank: 66, sources: ['QC','B-P','Aralex'], derivations: ['w_ʿaql', 'w_ʿaaqil', 'w_maʿquul', 'w_ʿuquul'] },
  r_shʿr:  { id: 'r_shʿr',  letters: ['ش','ع','ر'], transliteration: 'sh-ʿ-r', core: 'feeling, poetry, hair',                 introducedAt: 7, sources: ['B-P','Aralex'], derivations: ['w_shaʿara', 'w_shuʿuur', 'w_shaaʿir', 'w_shiʿr'] },
  r_frh:   { id: 'r_frh',   letters: ['ف','ر','ح'], transliteration: 'f-r-h',  core: 'joy',                                   introducedAt: 7, sources: ['B-P','Aralex'], derivations: ['w_farih', 'w_farah', 'w_mufarrih'] },
  r_khwf:  { id: 'r_khwf',  letters: ['خ','و','ف'], transliteration: 'kh-w-f', core: 'fear',                                  introducedAt: 7, freqRank: 31, sources: ['QC','B-P','Aralex'], derivations: ['w_khaafa', 'w_khawf', 'w_khaaʾif', 'w_makhuuf'] },
  r_nfs:   { id: 'r_nfs',   letters: ['ن','ف','س'], transliteration: 'n-f-s',  core: 'soul, self, breath',                    introducedAt: 7, sources: ['QC','B-P','Aralex'], derivations: ['w_nafs', 'w_nafsi', 'w_munaafasa', 'w_same'] },
  r_qlb:   { id: 'r_qlb',   letters: ['ق','ل','ب'], transliteration: 'q-l-b',  core: 'heart, turning over',                   introducedAt: 7, sources: ['QC','B-P','Aralex'], derivations: ['w_qalb', 'w_inqilaab', 'w_taqallub'] },
  r_ʿyn:   { id: 'r_ʿyn',   letters: ['ع','ي','ن'], transliteration: 'ʿ-y-n',  core: 'eye, source, specific',                 introducedAt: 7, sources: ['B-P','Aralex'], derivations: ['w_ʿayn', 'w_ʿuyuun', 'w_muʿayyan', 'w_taʿyiin'] },
  r_ydd:   { id: 'r_ydd',   letters: ['ي','د','د'], transliteration: 'y-d-d',  core: 'hand',                                  introducedAt: 7, sources: ['QC','B-P','Aralex'], derivations: ['w_yad', 'w_ayaadi', 'w_yadawi'] },
  r_rjl:   { id: 'r_rjl',   letters: ['ر','ج','ل'], transliteration: 'r-j-l',  core: 'man, leg, walking',                     introducedAt: 7, sources: ['B-P','Aralex'], derivations: ['w_rajul', 'w_rijaal', 'w_rijl', 'w_tarajjul'] },
  r_nsʾ:   { id: 'r_nsʾ',   letters: ['ن','س','و'], transliteration: 'n-s-w',  core: 'woman',                                 introducedAt: 7, sources: ['B-P'], derivations: ['w_imraʾa', 'w_nisaaʾ', 'w_niswaan'] },
  r_ʿmr:   { id: 'r_ʿmr',   letters: ['ع','م','ر'], transliteration: 'ʿ-m-r',  core: 'life, age, building up',                introducedAt: 7, sources: ['B-P','Aralex'], derivations: ['w_ʿumr', 'w_ʿaamir', 'w_ʿimaara'] },
  r_hyy:   { id: 'r_hyy',   letters: ['ح','ي','ي'], transliteration: 'h-y-y',  core: 'life, living',                          introducedAt: 7, freqRank: 94, sources: ['QC','B-P','Aralex'], derivations: ['w_hayaa', 'w_hayy', 'w_ihyaaʾ', 'w_tahiyya'] },
  r_mwt:   { id: 'r_mwt',   letters: ['م','و','ت'], transliteration: 'm-w-t',  core: 'death',                                 introducedAt: 7, sources: ['QC','B-P','Aralex'], derivations: ['w_maata', 'w_mawt', 'w_mayyit'] },
  r_qwm:   { id: 'r_qwm',   letters: ['ق','و','م'], transliteration: 'q-w-m',  core: 'standing, people',                      introducedAt: 7, freqRank: 60, sources: ['QC','B-P','Aralex'], derivations: ['w_qaama', 'w_qiyaam', 'w_qawm', 'w_muqaawama', 'w_istiqaama'] },
  r_jls:   { id: 'r_jls',   letters: ['ج','ل','س'], transliteration: 'j-l-s',  core: 'sitting, gathering',                    introducedAt: 7, sources: ['B-P','Aralex'], derivations: ['w_jalasa', 'w_juluus', 'w_majlis', 'w_jaalis'] },
  r_nwm:   { id: 'r_nwm',   letters: ['ن','و','م'], transliteration: 'n-w-m',  core: 'sleeping',                              introducedAt: 7, sources: ['B-P','Aralex'], derivations: ['w_naama', 'w_nawm', 'w_naaʾim', 'w_manaam'] },
  r_kfr:   { id: 'r_kfr',   letters: ['ك','ف','ر'], transliteration: 'k-f-r',  core: 'covering, disbelief (drift example)',   introducedAt: 7, freqRank: 6,  sources: ['QC','B-P','Aralex'], derivations: ['w_kafara', 'w_kufr', 'w_kaafir', 'w_takfiir'] },

  // ============================================================
  // PHASE 8 — Advanced II (top ~180 + opinions/connectors/comparisons)
  // ============================================================
  r_dhnn:  { id: 'r_dhnn',  letters: ['ظ','ن','ن'], transliteration: 'dh-n-n', core: 'thinking, supposing',                   introducedAt: 8, sources: ['QC','B-P','Aralex'], derivations: ['w_think', 'w_dhanna', 'w_dhann'] },
  r_jmʿ:   { id: 'r_jmʿ',   letters: ['ج','م','ع'], transliteration: 'j-m-ʿ',  core: 'gathering, together',                   introducedAt: 8, sources: ['QC','B-P','Aralex'], derivations: ['w_meeting', 'w_society', 'w_jamaʿa', 'w_ijtamaʿa', 'w_jamʿ', 'w_jaamiʿa', 'w_mujtamaʿ', 'w_majmuuʿ'] },
  r_khlf:  { id: 'r_khlf',  letters: ['خ','ل','ف'], transliteration: 'kh-l-f', core: 'behind, difference, succession',        introducedAt: 8, sources: ['QC','B-P','Aralex'], derivations: ['w_different', 'w_ikhtalafa', 'w_ikhtilaaf', 'w_khilaaf', 'w_khalf'] },
  r_frq:   { id: 'r_frq',   letters: ['ف','ر','ق'], transliteration: 'f-r-q',  core: 'separating, distinguishing',            introducedAt: 8, freqRank: 48, sources: ['QC','B-P','Aralex'], derivations: ['w_faraqa', 'w_farq', 'w_firaaq', 'w_mafruuq'] },
  r_msk:   { id: 'r_msk',   letters: ['م','س','ك'], transliteration: 'm-s-k',  core: 'holding, seizing',                      introducedAt: 8, freqRank: 49, sources: ['QC','B-P','Aralex'], derivations: ['w_masaka', 'w_mask', 'w_maasik'] },
  r_qrb:   { id: 'r_qrb',   letters: ['ق','ر','ب'], transliteration: 'q-r-b',  core: 'approaching, being near',               introducedAt: 8, freqRank: 50, sources: ['QC','B-P','Aralex'], derivations: ['w_qarib', 'w_qurb', 'w_qariib', 'w_taqaarub'] },
  r_hmm:   { id: 'r_hmm',   letters: ['ه','م','م'], transliteration: 'h-m-m',  core: 'concern, importance',                   introducedAt: 8, sources: ['B-P','Aralex'], derivations: ['w_ahamm', 'w_muhimm', 'w_ihtimaam', 'w_hamm'] },
  r_sbb:   { id: 'r_sbb',   letters: ['س','ب','ب'], transliteration: 's-b-b',  core: 'cause, reason',                         introducedAt: 8, sources: ['B-P','Aralex'], derivations: ['w_sabab', 'w_bisabab', 'w_asbaab', 'w_musabbib'] },
  r_ntj:   { id: 'r_ntj',   letters: ['ن','ت','ج'], transliteration: 'n-t-j',  core: 'result, production',                    introducedAt: 8, sources: ['B-P','Aralex'], derivations: ['w_natiija', 'w_antaja', 'w_intaaj', 'w_muntij'] },
  r_shdd:  { id: 'r_shdd',  letters: ['ش','د','د'], transliteration: 'sh-d-d', core: 'intensity, tightness',                  introducedAt: 8, sources: ['QC','B-P','Aralex'], derivations: ['w_shadiid', 'w_ashadd', 'w_shidda'] },
  r_ntq:   { id: 'r_ntq',   letters: ['ن','ط','ق'], transliteration: 'n-t-q',  core: 'speaking, articulation',                introducedAt: 8, sources: ['B-P','Aralex'], derivations: ['w_nataqa', 'w_nutq', 'w_mantiq', 'w_mantiqi'] },
  r_bhth:  { id: 'r_bhth',  letters: ['ب','ح','ث'], transliteration: 'b-h-th', core: 'searching, research',                   introducedAt: 8, sources: ['B-P','Aralex'], derivations: ['w_bahatha', 'w_bahth', 'w_baahith'] },
  r_wjd:   { id: 'r_wjd',   letters: ['و','ج','د'], transliteration: 'w-j-d',  core: 'finding, existing',                     introducedAt: 8, freqRank: 25, sources: ['QC','B-P','Aralex'], derivations: ['w_wajada', 'w_wujuud', 'w_mawjuud', 'w_iijaad'] },
  r_ʿdd:   { id: 'r_ʿdd',   letters: ['ع','د','د'], transliteration: 'ʿ-d-d',  core: 'counting, enumeration',                 introducedAt: 8, sources: ['B-P','Aralex'], derivations: ['w_ʿadad', 'w_ʿadda', 'w_ʿidda'] },
  r_byn:   { id: 'r_byn',   letters: ['ب','ي','ن'], transliteration: 'b-y-n',  core: 'between, clarity',                      introducedAt: 8, sources: ['B-P','Aralex'], derivations: ['w_bayn', 'w_bayyin', 'w_mabni', 'w_tabyiin'] },
  r_fhm:   { id: 'r_fhm',   letters: ['ف','ه','م'], transliteration: 'f-h-m',  core: 'understanding',                         introducedAt: 8, sources: ['B-P','Aralex'], derivations: ['w_fahima', 'w_fahm', 'w_mafhuum', 'w_tafaahum'] },
  r_ghyr:  { id: 'r_ghyr',  letters: ['غ','ي','ر'], transliteration: 'gh-y-r', core: 'other, change',                         introducedAt: 8, sources: ['B-P','Aralex'], derivations: ['w_ghayr', 'w_taghyiir', 'w_mughaayir'] },
  r_ghfr:  { id: 'r_ghfr',  letters: ['غ','ف','ر'], transliteration: 'gh-f-r', core: 'forgiving (root-drift sibling to k-f-r)',introducedAt: 8, freqRank: 45, sources: ['QC','B-P','Aralex'], derivations: ['w_ghafara', 'w_ghufraan', 'w_maghfira', 'w_istighfaar'] },
  r_ʾmn_belief:{id:'r_ʾmn_belief',letters:['ء','م','ن'],transliteration:'ʾ-m-n',core:'(see r_ʾmn; advanced religious/civic derivations)',introducedAt:8, sources:['QC','B-P'], derivations:['w_muʾmin_advanced']},

  // ============================================================
  // PHASE 9 — Fluent (civic/abstract + remaining high-value roots)
  // ============================================================
  r_hkm:   { id: 'r_hkm',   letters: ['ح','ك','م'], transliteration: 'h-k-m',  core: 'ruling, judgment, wisdom',              introducedAt: 9, freqRank: 80, sources: ['QC','B-P','Aralex'], derivations: ['w_govt', 'w_hakama', 'w_hukm', 'w_haakim', 'w_mahkama', 'w_tahkiim', 'w_hikma'] },
  r_qny:   { id: 'r_qny',   letters: ['ق','ن','ن'], transliteration: 'q-n-n',  core: 'law, rule',                             introducedAt: 9, sources: ['B-P'], derivations: ['w_law', 'w_qaanuuni', 'w_qawaniin'] },
  r_hrr:   { id: 'r_hrr',   letters: ['ح','ر','ر'], transliteration: 'h-r-r',  core: 'freedom, heat',                         introducedAt: 9, sources: ['B-P','Aralex'], derivations: ['w_freedom', 'w_hurr', 'w_tahriir', 'w_tahrur'] },
  r_ʿdl:   { id: 'r_ʿdl',   letters: ['ع','د','ل'], transliteration: 'ʿ-d-l',  core: 'justice, fairness',                     introducedAt: 9, sources: ['B-P','Aralex'], derivations: ['w_justice', 'w_ʿaadil', 'w_ʿadl'] },
  r_qdy:   { id: 'r_qdy',   letters: ['ق','ض','ي'], transliteration: 'q-d-y',  core: 'judging, deciding',                     introducedAt: 9, sources: ['B-P','Aralex'], derivations: ['w_qadiya', 'w_qaadi', 'w_qadaaʾ'] },
  r_dwl:   { id: 'r_dwl',   letters: ['د','و','ل'], transliteration: 'd-w-l',  core: 'state, country',                        introducedAt: 9, sources: ['B-P','Aralex'], derivations: ['w_dawla', 'w_duwal', 'w_dawli', 'w_tadaawul'] },
  r_wtn:   { id: 'r_wtn',   letters: ['و','ط','ن'], transliteration: 'w-t-n',  core: 'homeland, settling',                    introducedAt: 9, sources: ['B-P'], derivations: ['w_watan', 'w_watani', 'w_muwaatin'] },
  r_sys:   { id: 'r_sys',   letters: ['س','ي','س'], transliteration: 's-y-s',  core: 'politics, leading',                     introducedAt: 9, sources: ['B-P','Aralex'], derivations: ['w_siyaasa', 'w_siyaasi', 'w_saaʾis'] },
  r_shʿb:  { id: 'r_shʿb',  letters: ['ش','ع','ب'], transliteration: 'sh-ʿ-b', core: 'people, branch',                        introducedAt: 9, sources: ['B-P','Aralex'], derivations: ['w_shaʿb', 'w_shuʿuub', 'w_shaʿbi'] },
  r_hrb:   { id: 'r_hrb',   letters: ['ح','ر','ب'], transliteration: 'h-r-b',  core: 'war, fighting',                         introducedAt: 9, sources: ['B-P','Aralex'], derivations: ['w_harb', 'w_muhaarib', 'w_muhaaraba'] },
  r_qtl:   { id: 'r_qtl',   letters: ['ق','ت','ل'], transliteration: 'q-t-l',  core: 'killing, fighting',                     introducedAt: 9, freqRank: 32, sources: ['QC','B-P','Aralex'], derivations: ['w_qatala', 'w_qatl', 'w_qaatil', 'w_maqtuul'] },
  r_dhlm:  { id: 'r_dhlm',  letters: ['ظ','ل','م'], transliteration: 'dh-l-m', core: 'oppressing, injustice',                 introducedAt: 9, freqRank: 23, sources: ['QC','B-P','Aralex'], derivations: ['w_dhalama', 'w_dhulm', 'w_dhaalim', 'w_madhluum'] },
  r_hqq:   { id: 'r_hqq',   letters: ['ح','ق','ق'], transliteration: 'h-q-q',  core: 'truth, right',                          introducedAt: 9, sources: ['QC','B-P','Aralex'], derivations: ['w_rights', 'w_haqq', 'w_tahaqquq', 'w_haqiiqa'] },
  r_wjb:   { id: 'r_wjb',   letters: ['و','ج','ب'], transliteration: 'w-j-b',  core: 'duty, obligation',                      introducedAt: 9, sources: ['B-P','Aralex'], derivations: ['w_wajib', 'w_wujuub', 'w_mawjib'] },
  r_mnʿ:   { id: 'r_mnʿ',   letters: ['م','ن','ع'], transliteration: 'm-n-ʿ',  core: 'preventing, forbidding',                introducedAt: 9, sources: ['B-P','Aralex'], derivations: ['w_manaʿa', 'w_manʿ', 'w_mamnuuʿ', 'w_imtinaaʿ'] },
  r_smh:   { id: 'r_smh',   letters: ['س','م','ح'], transliteration: 's-m-h',  core: 'permitting, tolerating',                introducedAt: 9, sources: ['B-P','Aralex'], derivations: ['w_samaha', 'w_samaah', 'w_tasaamuh', 'w_musaamaha'] },
  r_khbr:  { id: 'r_khbr',  letters: ['خ','ب','ر'], transliteration: 'kh-b-r', core: 'news, experience',                      introducedAt: 9, freqRank: 64, sources: ['QC','B-P','Aralex'], derivations: ['w_news', 'w_khabar', 'w_akhbaara', 'w_khibra', 'w_mukhbir'] },
  r_thqf:  { id: 'r_thqf',  letters: ['ث','ق','ف'], transliteration: 'th-q-f', core: 'culture, refinement',                   introducedAt: 9, sources: ['B-P'], derivations: ['w_culture', 'w_muthaqqaf', 'w_taathqiif'] },
  r_ʾrkh:  { id: 'r_ʾrkh',  letters: ['ء','ر','خ'], transliteration: 'ʾ-r-kh', core: 'history, dating',                       introducedAt: 9, sources: ['B-P'], derivations: ['w_history', 'w_arrakha', 'w_muʾarrikh'] },
  r_qsd:   { id: 'r_qsd',   letters: ['ق','ص','د'], transliteration: 'q-s-d',  core: 'intending, aiming, economy',            introducedAt: 9, sources: ['B-P','Aralex'], derivations: ['w_economy', 'w_qasada', 'w_qasd', 'w_iqtisaadi'] },
  r_hwr:   { id: 'r_hwr',   letters: ['ح','و','ر'], transliteration: 'h-w-r',  core: 'dialogue, conversing',                  introducedAt: 9, sources: ['B-P','Aralex'], derivations: ['w_hiwaar', 'w_muhaawara', 'w_tahawwur'] },
  r_nqsh:  { id: 'r_nqsh',  letters: ['ن','ق','ش'], transliteration: 'n-q-sh', core: 'debate, inscription',                   introducedAt: 9, sources: ['B-P'], derivations: ['w_debate', 'w_niqaash', 'w_naaqasha', 'w_munaaqasha'] },
  r_hdy:   { id: 'r_hdy',   letters: ['ه','د','ي'], transliteration: 'h-d-y',  core: 'guiding, gift',                         introducedAt: 9, freqRank: 18, sources: ['QC','B-P','Aralex'], derivations: ['w_hada', 'w_hudaa', 'w_haadi', 'w_hidaaya'] },

  // ============================================================
  // PHASE 10 — Native Speaker (idioms + register + Saudi slang)
  // ============================================================
  r_ʿbr:   { id: 'r_ʿbr',   letters: ['ع','ب','ر'], transliteration: 'ʿ-b-r',  core: 'crossing, expressing',                  introducedAt: 10, sources: ['B-P','Aralex'], derivations: ['w_ʿabbara', 'w_taʿbiir', 'w_ʿibaara', 'w_ʿibra'] },
  r_khls:  { id: 'r_khls',  letters: ['خ','ل','ص'], transliteration: 'kh-l-s', core: 'finishing, salvation ("khalas")',       introducedAt: 10, sources: ['B-P','Saudi'], saudi: true, derivations: ['w_khalas', 'w_takhliis', 'w_khalaas', 'w_mukhlis'] },
  r_tyb:   { id: 'r_tyb',   letters: ['ط','ي','ب'], transliteration: 't-y-b',  core: 'good, pleasant ("tayyib")',             introducedAt: 10, sources: ['B-P','Saudi'], saudi: true, derivations: ['w_tayyib', 'w_tayyibaat', 'w_taabi'] },
  r_kfy:   { id: 'r_kfy',   letters: ['ك','ف','ي'], transliteration: 'k-f-y',  core: 'sufficiency ("kafi")',                  introducedAt: 10, sources: ['B-P','Saudi'], saudi: true, derivations: ['w_kafi', 'w_kafa', 'w_iktifaaʾ'] },
  r_wly:   { id: 'r_wly',   letters: ['و','ل','ي'], transliteration: 'w-l-y',  core: 'closeness, patronage ("wallah")',       introducedAt: 10, freqRank: 35, sources: ['QC','B-P','Aralex','Saudi'], saudi: true, derivations: ['w_wallah', 'w_waliyy', 'w_wali'] },
  r_ʿny:   { id: 'r_ʿny',   letters: ['ع','ن','ي'], transliteration: 'ʿ-n-y',  core: 'meaning, intending ("yaʿni" filler)',   introducedAt: 10, sources: ['B-P','Saudi'], saudi: true, derivations: ['w_yaani', 'w_maʿna', 'w_ʿanaa'] },
  r_shyʾ:  { id: 'r_shyʾ',  letters: ['ش','ي','ء'], transliteration: 'sh-y-ʾ', core: 'willing ("inshallah", "mashallah")',    introducedAt: 10, freqRank: 12, sources: ['QC','B-P','Saudi'], saudi: true, derivations: ['w_inshallah', 'w_mashallah', 'w_mashiiʾa'] },
  r_mshy:  { id: 'r_mshy',  letters: ['م','ش','ي'], transliteration: 'm-sh-y', core: 'walking, going ("maashi")',             introducedAt: 10, freqRank: 74, sources: ['QC','B-P','Saudi'], saudi: true, derivations: ['w_maasha', 'w_mashy', 'w_soso'] },
  r_tmm:   { id: 'r_tmm',   letters: ['ت','م','م'], transliteration: 't-m-m',  core: 'completeness ("tamaam")',               introducedAt: 10, sources: ['B-P','Saudi'], saudi: true, derivations: ['w_fine', 'w_tamaam', 'w_itmaam'] },
  r_myz:   { id: 'r_myz',   letters: ['م','ي','ز'], transliteration: 'm-y-z',  core: 'distinguishing, excellence ("mumtaaz")',introducedAt: 10, sources: ['B-P','Saudi'], derivations: ['w_great', 'w_tamyiiz', 'w_mumayyiz'] },
  r_ʿbd_address:{id:'r_ʿbd_address',letters:['ع','ب','د'],transliteration:'ʿ-b-d',core:'"abduh" friendly Saudi address (from r_ʿbd)',introducedAt:10, sources:['Saudi'], saudi: true, derivations:['w_abdoun']},
};
