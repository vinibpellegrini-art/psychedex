-- Psychedex seed data (PostgreSQL / Supabase)
-- Run AFTER schema.sql. Generated from the original src/data/substances.ts.
-- Safe to re-run: existing rows are upserted by id.

-- ---------------------------------------------------------------------------
-- Lookup data
-- ---------------------------------------------------------------------------
insert into legal_status (id, name) values
  (1, 'Legal Everyday'),
  (2, 'Prescription'),
  (3, 'Research Chemical'),
  (4, 'Illegal/Restricted')
on conflict (id) do update set name = excluded.name;

insert into categories (name) values
  ('Stimulant'),
  ('Depressant'),
  ('Cannabinoid'),
  ('Sleep Aid'),
  ('SSRI'),
  ('NDRI'),
  ('SNRI'),
  ('Antidepressant'),
  ('Wakefulness Promoter'),
  ('Benzodiazepine'),
  ('Sedative'),
  ('Gabapentinoid'),
  ('Opioid'),
  ('Psychedelic'),
  ('Empathogen'),
  ('Dissociative'),
  ('Antipsychotic'),
  ('Antihistamine')
on conflict (name) do nothing;

-- ---------------------------------------------------------------------------
-- Substances
-- category_id / legal_status_id are resolved by name so this does not depend
-- on lookup-table insert order.
-- ---------------------------------------------------------------------------
insert into substances (id, name, category_id, legal_status_id, duration, description, pubchem_cid) values
  (1,  'Caffeine',         (select id from categories where name='Stimulant'),            1, '3-6 hours',      'The world''s most widely used psychoactive stimulant.',                       2519),
  (2,  'Nicotine',         (select id from categories where name='Stimulant'),            1, '1-2 hours',      'A stimulant found in tobacco products.',                                      89594),
  (3,  'Alcohol',          (select id from categories where name='Depressant'),           1, '2-8 hours',      'A widely consumed central nervous system depressant.',                        702),
  (4,  'CBD',              (select id from categories where name='Cannabinoid'),          1, '4-8 hours',      'A non-intoxicating cannabinoid.',                                             644019),
  (5,  'Melatonin',        (select id from categories where name='Sleep Aid'),            1, '4-8 hours',      'A hormone used to regulate sleep cycles.',                                    896),
  (6,  'Fluoxetine',       (select id from categories where name='SSRI'),                 2, '24+ hours',      'An antidepressant marketed as Prozac.',                                       3386),
  (7,  'Sertraline',       (select id from categories where name='SSRI'),                 2, '24+ hours',      'An antidepressant marketed as Zoloft.',                                       68617),
  (8,  'Escitalopram',     (select id from categories where name='SSRI'),                 2, '24+ hours',      'An antidepressant marketed as Lexapro.',                                      6918132),
  (9,  'Bupropion',        (select id from categories where name='NDRI'),                 2, '12-24 hours',    'An antidepressant with stimulant-like properties.',                           2499),
  (10, 'Venlafaxine',      (select id from categories where name='SNRI'),                 2, '12-24 hours',    'An antidepressant used for anxiety and depression.',                          992),
  (11, 'Duloxetine',       (select id from categories where name='SNRI'),                 2, '12-24 hours',    'An antidepressant also used for chronic pain.',                               60835),
  (12, 'Mirtazapine',      (select id from categories where name='Antidepressant'),       2, '24 hours',       'An antidepressant often associated with sedation.',                           3696),
  (13, 'Methylphenidate',  (select id from categories where name='Stimulant'),            2, '3-8 hours',      'Commonly prescribed for ADHD.',                                               4034),
  (14, 'Amphetamine',      (select id from categories where name='Stimulant'),            2, '4-8 hours',      'Used medically for ADHD and narcolepsy.',                                     3007),
  (15, 'Dexamphetamine',   (select id from categories where name='Stimulant'),            2, '4-8 hours',      'A prescription stimulant used for ADHD.',                                     5826),
  (16, 'Modafinil',        (select id from categories where name='Wakefulness Promoter'), 2, '10-15 hours',    'Promotes wakefulness and alertness.',                                         8582),
  (17, 'Armodafinil',      (select id from categories where name='Wakefulness Promoter'), 2, '12-15 hours',    'A longer-lasting version of modafinil.',                                      4505),
  (18, 'Diazepam',         (select id from categories where name='Benzodiazepine'),       2, '6-12 hours',     'Used for anxiety, seizures, and muscle spasms.',                              3018),
  (19, 'Alprazolam',       (select id from categories where name='Benzodiazepine'),       2, '4-6 hours',      'Commonly prescribed for anxiety disorders.',                                  2118),
  (20, 'Clonazepam',       (select id from categories where name='Benzodiazepine'),       2, '8-12 hours',     'Used for anxiety and epilepsy.',                                              2800),
  (21, 'Lorazepam',        (select id from categories where name='Benzodiazepine'),       2, '6-8 hours',      'A benzodiazepine used for anxiety.',                                          3958),
  (22, 'Temazepam',        (select id from categories where name='Benzodiazepine'),       2, '6-8 hours',      'Often prescribed for insomnia.',                                              5393),
  (23, 'Zolpidem',         (select id from categories where name='Sedative'),             2, '6-8 hours',      'A prescription sleep medication.',                                            5731),
  (24, 'Pregabalin',       (select id from categories where name='Gabapentinoid'),        2, '6-8 hours',      'Used for neuropathic pain and anxiety.',                                      5489),
  (25, 'Gabapentin',       (select id from categories where name='Gabapentinoid'),        2, '6-8 hours',      'Used for nerve pain and seizures.',                                           3446),
  (26, 'Codeine',          (select id from categories where name='Opioid'),               2, '4-6 hours',      'A mild opioid used for pain relief.',                                         5284371),
  (27, 'Morphine',         (select id from categories where name='Opioid'),               2, '4-6 hours',      'A powerful opioid analgesic.',                                                5288826),
  (28, 'Tramadol',         (select id from categories where name='Opioid'),               2, '6-8 hours',      'A synthetic opioid pain medication.',                                         3127),
  (29, 'Oxycodone',        (select id from categories where name='Opioid'),               2, '4-6 hours',      'A prescription opioid analgesic.',                                            5284603),
  (30, 'Hydrocodone',      (select id from categories where name='Opioid'),               2, '4-6 hours',      'An opioid used for moderate to severe pain.',                                 5284596),
  (31, 'Buprenorphine',    (select id from categories where name='Opioid'),               2, '12-24 hours',    'Used for opioid dependence treatment.',                                       131003),
  (32, '2C-B',             (select id from categories where name='Psychedelic'),          3, '4-8 hours',      'A psychedelic phenethylamine.',                                               29102),
  (33, '2C-E',             (select id from categories where name='Psychedelic'),          3, '8-12 hours',     'A potent psychedelic phenethylamine.',                                        5337786),
  (34, '4-HO-MET',         (select id from categories where name='Psychedelic'),          3, '4-6 hours',      'A synthetic tryptamine psychedelic.',                                         10091558),
  (35, '4-AcO-DMT',        (select id from categories where name='Psychedelic'),          3, '4-8 hours',      'A psychedelic prodrug related to psilocin.',                                  2786977),
  (36, 'AL-LAD',           (select id from categories where name='Psychedelic'),          3, '6-10 hours',     'A lysergamide psychedelic.',                                                  6332976),
  (37, 'ETH-LAD',          (select id from categories where name='Psychedelic'),          3, '8-12 hours',     'A potent lysergamide psychedelic.',                                           5359398),
  (38, 'Cannabis',         (select id from categories where name='Cannabinoid'),          4, '2-6 hours',      'Contains THC and other cannabinoids.',                                        16078),
  (39, 'Psilocybin',       (select id from categories where name='Psychedelic'),          4, '4-6 hours',      'The psychoactive compound in magic mushrooms.',                               10624),
  (40, 'LSD',              (select id from categories where name='Psychedelic'),          4, '8-12 hours',     'A classic serotonergic psychedelic.',                                         5761),
  (41, 'DMT',              (select id from categories where name='Psychedelic'),          4, '5-20 minutes',   'A powerful short-acting psychedelic.',                                        6089),
  (42, 'Mescaline',        (select id from categories where name='Psychedelic'),          4, '10-14 hours',    'Found naturally in peyote and San Pedro cacti.',                              4066),
  (43, 'MDMA',             (select id from categories where name='Empathogen'),           4, '4-6 hours',      'Known for empathy and sociability enhancement.',                              43815),
  (44, 'Cocaine',          (select id from categories where name='Stimulant'),            4, '30-90 minutes',  'A powerful stimulant derived from coca leaves.',                              446220),
  (45, 'Crack Cocaine',    (select id from categories where name='Stimulant'),            4, '5-15 minutes',   'A smokable form of cocaine.',                                                 446220),
  (46, 'Methamphetamine',  (select id from categories where name='Stimulant'),            4, '8-24 hours',     'A highly potent stimulant.',                                                  10752),
  (47, 'Heroin',           (select id from categories where name='Opioid'),               4, '3-5 hours',      'A semi-synthetic opioid derived from morphine.',                              5462328),
  (48, 'PCP',              (select id from categories where name='Dissociative'),         4, '4-8 hours',      'A dissociative anesthetic.',                                                  5284616),
  (49, 'DXM',              (select id from categories where name='Dissociative'),         4, '4-8 hours',      'A cough suppressant with dissociative effects at high doses.',                5284553),
  (50, 'Salvia Divinorum', (select id from categories where name='Psychedelic'),          4, '5-15 minutes',  'A powerful short-acting hallucinogenic plant.',                                123140),
  (51, 'Ketamine',         (select id from categories where name='Dissociative'),         2, '1-2 hours',      'A dissociative anesthetic, also used for treatment-resistant depression.',     3821),
  (52, 'Nitrous Oxide',    (select id from categories where name='Dissociative'),         1, '1-5 minutes',    'A short-acting dissociative gas, known as laughing gas.',                      948),
  (53, 'Fentanyl',         (select id from categories where name='Opioid'),               2, '1-2 hours',      'A potent synthetic opioid analgesic.',                                        3345),
  (54, 'Methadone',        (select id from categories where name='Opioid'),               2, '8-24 hours',     'A long-acting opioid used to treat dependence and pain.',                      4095),
  (55, '5-MeO-DMT',        (select id from categories where name='Psychedelic'),          3, '15-45 minutes',  'A potent, short-acting tryptamine psychedelic.',                              1832),
  (56, 'Psilocin',         (select id from categories where name='Psychedelic'),          4, '4-6 hours',      'The active metabolite responsible for psilocybin''s effects.',                 4980),
  (57, 'MDA',              (select id from categories where name='Empathogen'),           4, '6-8 hours',      'A psychedelic empathogen related to MDMA.',                                    1614),
  (58, 'Mephedrone',       (select id from categories where name='Stimulant'),            4, '2-4 hours',      'A synthetic cathinone stimulant and empathogen.',                             45266826),
  (59, 'Quetiapine',       (select id from categories where name='Antipsychotic'),        2, '6-8 hours',      'An atypical antipsychotic also prescribed for sleep.',                         5002),
  (60, 'Trazodone',        (select id from categories where name='Antidepressant'),       2, '6-10 hours',     'An antidepressant commonly used off-label for insomnia.',                      5533),
  (61, 'Amitriptyline',    (select id from categories where name='Antidepressant'),       2, '12-24 hours',    'A tricyclic antidepressant also used for pain and migraine.',                  2160),
  (62, 'Diphenhydramine',  (select id from categories where name='Antihistamine'),        1, '4-6 hours',      'A sedating antihistamine with deliriant effects at high doses.',               3100),
  (63, 'Ephedrine',        (select id from categories where name='Stimulant'),            1, '3-6 hours',      'A stimulant and decongestant derived from ephedra.',                           9294),
  (64, 'Kratom',           (select id from categories where name='Opioid'),               1, '2-5 hours',      'A plant whose alkaloid mitragynine acts on opioid receptors.',                 3034396),
  (65, 'Etizolam',         (select id from categories where name='Benzodiazepine'),       3, '6-8 hours',      'A designer thienodiazepine with benzodiazepine-like effects.',                 3307),
  (66, 'DOM',              (select id from categories where name='Psychedelic'),          3, '14-20 hours',    'A long-acting psychedelic amphetamine, also called STP.',                      85875),
  (67, '2C-I',             (select id from categories where name='Psychedelic'),          3, '6-10 hours',     'A psychedelic phenethylamine of the 2C family.',                              10267191),
  (68, 'Ibogaine',         (select id from categories where name='Psychedelic'),          4, '24-36 hours',    'A long-acting oneirogenic psychedelic studied for addiction.',                 197060),
  (69, 'GHB',              (select id from categories where name='Depressant'),           4, '1.5-3 hours',    'A central nervous system depressant, also prescribed as Xyrem.',               10413),
  (70, 'Methoxetamine',    (select id from categories where name='Dissociative'),         3, '2-4 hours',      'A dissociative of the arylcyclohexylamine class, known as MXE.',              52911279)
on conflict (id) do update set
  name            = excluded.name,
  category_id     = excluded.category_id,
  legal_status_id = excluded.legal_status_id,
  duration        = excluded.duration,
  description     = excluded.description,
  pubchem_cid     = excluded.pubchem_cid;

-- Keep the serial sequence ahead of the explicit ids we just inserted, so
-- future inserts without an id don't collide.
select setval('substances_id_seq', (select max(id) from substances));
