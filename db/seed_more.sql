-- Psychedex — additional substances (ids 51-70).
-- Run this once in the Supabase SQL Editor after the original schema.sql/seed.sql.
-- Idempotent: safe to re-run (rows are upserted by id).

-- Two new categories used below.
insert into categories (name) values
  ('Antipsychotic'),
  ('Antihistamine')
on conflict (name) do nothing;

insert into substances (id, name, category_id, legal_status_id, duration, description, pubchem_cid) values
  (51, 'Ketamine',        (select id from categories where name='Dissociative'),   2, '1-2 hours',      'A dissociative anesthetic, also used for treatment-resistant depression.',  3821),
  (52, 'Nitrous Oxide',   (select id from categories where name='Dissociative'),   1, '1-5 minutes',    'A short-acting dissociative gas, known as laughing gas.',                   948),
  (53, 'Fentanyl',        (select id from categories where name='Opioid'),         2, '1-2 hours',      'A potent synthetic opioid analgesic.',                                     3345),
  (54, 'Methadone',       (select id from categories where name='Opioid'),         2, '8-24 hours',     'A long-acting opioid used to treat dependence and pain.',                   4095),
  (55, '5-MeO-DMT',       (select id from categories where name='Psychedelic'),    3, '15-45 minutes',  'A potent, short-acting tryptamine psychedelic.',                           1832),
  (56, 'Psilocin',        (select id from categories where name='Psychedelic'),    4, '4-6 hours',      'The active metabolite responsible for psilocybin''s effects.',              4980),
  (57, 'MDA',             (select id from categories where name='Empathogen'),     4, '6-8 hours',      'A psychedelic empathogen related to MDMA.',                                 1614),
  (58, 'Mephedrone',      (select id from categories where name='Stimulant'),      4, '2-4 hours',      'A synthetic cathinone stimulant and empathogen.',                          45266826),
  (59, 'Quetiapine',      (select id from categories where name='Antipsychotic'),  2, '6-8 hours',      'An atypical antipsychotic also prescribed for sleep.',                      5002),
  (60, 'Trazodone',       (select id from categories where name='Antidepressant'), 2, '6-10 hours',     'An antidepressant commonly used off-label for insomnia.',                   5533),
  (61, 'Amitriptyline',   (select id from categories where name='Antidepressant'), 2, '12-24 hours',    'A tricyclic antidepressant also used for pain and migraine.',               2160),
  (62, 'Diphenhydramine', (select id from categories where name='Antihistamine'),  1, '4-6 hours',      'A sedating antihistamine with deliriant effects at high doses.',            3100),
  (63, 'Ephedrine',       (select id from categories where name='Stimulant'),      1, '3-6 hours',      'A stimulant and decongestant derived from ephedra.',                        9294),
  (64, 'Kratom',          (select id from categories where name='Opioid'),         1, '2-5 hours',      'A plant whose alkaloid mitragynine acts on opioid receptors.',              3034396),
  (65, 'Etizolam',        (select id from categories where name='Benzodiazepine'), 3, '6-8 hours',      'A designer thienodiazepine with benzodiazepine-like effects.',              3307),
  (66, 'DOM',             (select id from categories where name='Psychedelic'),    3, '14-20 hours',    'A long-acting psychedelic amphetamine, also called STP.',                   85875),
  (67, '2C-I',            (select id from categories where name='Psychedelic'),    3, '6-10 hours',     'A psychedelic phenethylamine of the 2C family.',                           10267191),
  (68, 'Ibogaine',        (select id from categories where name='Psychedelic'),    4, '24-36 hours',    'A long-acting oneirogenic psychedelic studied for addiction.',              197060),
  (69, 'GHB',             (select id from categories where name='Depressant'),     4, '1.5-3 hours',    'A central nervous system depressant, also prescribed as Xyrem.',            10413),
  (70, 'Methoxetamine',   (select id from categories where name='Dissociative'),   3, '2-4 hours',      'A dissociative of the arylcyclohexylamine class, known as MXE.',            52911279)
on conflict (id) do update set
  name            = excluded.name,
  category_id     = excluded.category_id,
  legal_status_id = excluded.legal_status_id,
  duration        = excluded.duration,
  description     = excluded.description,
  pubchem_cid     = excluded.pubchem_cid;

-- Keep the serial sequence ahead of the explicit ids just inserted.
select setval('substances_id_seq', (select max(id) from substances));
