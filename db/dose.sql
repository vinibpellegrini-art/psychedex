-- Psychedex — dosage data (gradient dose bar).
-- Adds per-substance dose tiers and seeds reference ranges for the catalogue.
-- Run once in the Supabase SQL Editor (idempotent — safe to re-run).
--
-- IMPORTANT: these are EDUCATIONAL reference ranges compiled from public
-- harm-reduction / pharmacology literature (e.g. PsychonautWiki, TripSit).
-- They are NOT medical advice, NOT a recommendation, and individual responses
-- vary enormously with tolerance, body weight, and route. Each value is the
-- lower bound of that tier, for the listed route of administration.

alter table substances
  add column if not exists dose_route     text,
  add column if not exists dose_unit      text,
  add column if not exists dose_threshold numeric,
  add column if not exists dose_light     numeric,
  add column if not exists dose_common    numeric,
  add column if not exists dose_strong    numeric,
  add column if not exists dose_heavy     numeric;

-- Recreate the read view to expose the new columns.
create or replace view substances_view
  with (security_invoker = on)
  as
select
  s.id,
  s.name,
  c.name  as category,
  ls.name as legal_status,
  s.duration,
  s.description,
  s.pubchem_cid,
  s.dose_route,
  s.dose_unit,
  s.dose_threshold,
  s.dose_light,
  s.dose_common,
  s.dose_strong,
  s.dose_heavy
from substances s
left join categories   c  on c.id  = s.category_id
left join legal_status ls on ls.id = s.legal_status_id
order by s.id;

-- ---------------------------------------------------------------------------
-- Reference doses  (route, unit, threshold / light / common / strong / heavy)
-- ---------------------------------------------------------------------------

-- Legal everyday
update substances set dose_route='oral',        dose_unit='mg', dose_threshold=20,   dose_light=40,  dose_common=80,   dose_strong=150,  dose_heavy=250  where name='Caffeine';
update substances set dose_route='oral',        dose_unit='mg', dose_threshold=0.5,  dose_light=1,   dose_common=2,    dose_strong=4,    dose_heavy=6    where name='Nicotine';
update substances set dose_route='oral',        dose_unit='g',  dose_threshold=10,   dose_light=20,  dose_common=40,   dose_strong=70,   dose_heavy=100  where name='Alcohol';
update substances set dose_route='oral',        dose_unit='mg', dose_threshold=5,    dose_light=15,  dose_common=25,   dose_strong=50,   dose_heavy=100  where name='CBD';
update substances set dose_route='oral',        dose_unit='mg', dose_threshold=0.3,  dose_light=0.5, dose_common=1,    dose_strong=3,    dose_heavy=5    where name='Melatonin';

-- Prescription medications (typical low -> high dose range)
update substances set dose_route='oral',        dose_unit='mg', dose_threshold=10,   dose_light=20,  dose_common=40,   dose_strong=60,   dose_heavy=80   where name='Fluoxetine';
update substances set dose_route='oral',        dose_unit='mg', dose_threshold=25,   dose_light=50,  dose_common=100,  dose_strong=150,  dose_heavy=200  where name='Sertraline';
update substances set dose_route='oral',        dose_unit='mg', dose_threshold=5,    dose_light=10,  dose_common=15,   dose_strong=20,   dose_heavy=30   where name='Escitalopram';
update substances set dose_route='oral',        dose_unit='mg', dose_threshold=75,   dose_light=150, dose_common=300,  dose_strong=400,  dose_heavy=450  where name='Bupropion';
update substances set dose_route='oral',        dose_unit='mg', dose_threshold=37.5, dose_light=75,  dose_common=150,  dose_strong=225,  dose_heavy=375  where name='Venlafaxine';
update substances set dose_route='oral',        dose_unit='mg', dose_threshold=20,   dose_light=30,  dose_common=60,   dose_strong=90,   dose_heavy=120  where name='Duloxetine';
update substances set dose_route='oral',        dose_unit='mg', dose_threshold=7.5,  dose_light=15,  dose_common=30,   dose_strong=45,   dose_heavy=60   where name='Mirtazapine';
update substances set dose_route='oral',        dose_unit='mg', dose_threshold=5,    dose_light=15,  dose_common=30,   dose_strong=50,   dose_heavy=70   where name='Methylphenidate';
update substances set dose_route='oral',        dose_unit='mg', dose_threshold=5,    dose_light=10,  dose_common=20,   dose_strong=40,   dose_heavy=60   where name='Amphetamine';
update substances set dose_route='oral',        dose_unit='mg', dose_threshold=5,    dose_light=10,  dose_common=15,   dose_strong=30,   dose_heavy=50   where name='Dexamphetamine';
update substances set dose_route='oral',        dose_unit='mg', dose_threshold=50,   dose_light=100, dose_common=200,  dose_strong=300,  dose_heavy=400  where name='Modafinil';
update substances set dose_route='oral',        dose_unit='mg', dose_threshold=50,   dose_light=75,  dose_common=150,  dose_strong=250,  dose_heavy=300  where name='Armodafinil';
update substances set dose_route='oral',        dose_unit='mg', dose_threshold=2.5,  dose_light=5,   dose_common=10,   dose_strong=20,   dose_heavy=30   where name='Diazepam';
update substances set dose_route='oral',        dose_unit='mg', dose_threshold=0.25, dose_light=0.5, dose_common=1,    dose_strong=2,    dose_heavy=3    where name='Alprazolam';
update substances set dose_route='oral',        dose_unit='mg', dose_threshold=0.25, dose_light=0.5, dose_common=1,    dose_strong=2,    dose_heavy=3    where name='Clonazepam';
update substances set dose_route='oral',        dose_unit='mg', dose_threshold=0.5,  dose_light=1,   dose_common=2,    dose_strong=3,    dose_heavy=4    where name='Lorazepam';
update substances set dose_route='oral',        dose_unit='mg', dose_threshold=5,    dose_light=10,  dose_common=20,   dose_strong=30,   dose_heavy=40   where name='Temazepam';
update substances set dose_route='oral',        dose_unit='mg', dose_threshold=2.5,  dose_light=5,   dose_common=10,   dose_strong=15,   dose_heavy=20   where name='Zolpidem';
update substances set dose_route='oral',        dose_unit='mg', dose_threshold=25,   dose_light=75,  dose_common=150,  dose_strong=300,  dose_heavy=450  where name='Pregabalin';
update substances set dose_route='oral',        dose_unit='mg', dose_threshold=100,  dose_light=300, dose_common=600,  dose_strong=1200, dose_heavy=1800 where name='Gabapentin';
update substances set dose_route='oral',        dose_unit='mg', dose_threshold=30,   dose_light=60,  dose_common=90,   dose_strong=150,  dose_heavy=200  where name='Codeine';
update substances set dose_route='oral',        dose_unit='mg', dose_threshold=10,   dose_light=20,  dose_common=40,   dose_strong=80,   dose_heavy=120  where name='Morphine';
update substances set dose_route='oral',        dose_unit='mg', dose_threshold=25,   dose_light=50,  dose_common=100,  dose_strong=200,  dose_heavy=300  where name='Tramadol';
update substances set dose_route='oral',        dose_unit='mg', dose_threshold=5,    dose_light=10,  dose_common=20,   dose_strong=40,   dose_heavy=60   where name='Oxycodone';
update substances set dose_route='oral',        dose_unit='mg', dose_threshold=5,    dose_light=10,  dose_common=20,   dose_strong=40,   dose_heavy=60   where name='Hydrocodone';
update substances set dose_route='sublingual',  dose_unit='mg', dose_threshold=0.2,  dose_light=0.5, dose_common=2,    dose_strong=8,    dose_heavy=16   where name='Buprenorphine';

-- Research chemicals
update substances set dose_route='oral',        dose_unit='mg', dose_threshold=2,    dose_light=5,   dose_common=15,   dose_strong=25,   dose_heavy=35   where name='2C-B';
update substances set dose_route='oral',        dose_unit='mg', dose_threshold=2,    dose_light=5,   dose_common=10,   dose_strong=20,   dose_heavy=30   where name='2C-E';
update substances set dose_route='oral',        dose_unit='mg', dose_threshold=5,    dose_light=10,  dose_common=20,   dose_strong=30,   dose_heavy=40   where name='4-HO-MET';
update substances set dose_route='oral',        dose_unit='mg', dose_threshold=5,    dose_light=10,  dose_common=20,   dose_strong=30,   dose_heavy=40   where name='4-AcO-DMT';
update substances set dose_route='oral',        dose_unit='µg', dose_threshold=25,   dose_light=50,  dose_common=100,  dose_strong=150,  dose_heavy=225  where name='AL-LAD';
update substances set dose_route='oral',        dose_unit='µg', dose_threshold=10,   dose_light=20,  dose_common=50,   dose_strong=100,  dose_heavy=150  where name='ETH-LAD';

-- Illegal / restricted
update substances set dose_route='oral (THC)',  dose_unit='mg', dose_threshold=2.5,  dose_light=5,   dose_common=10,   dose_strong=25,   dose_heavy=50   where name='Cannabis';
update substances set dose_route='oral',        dose_unit='mg', dose_threshold=2,    dose_light=5,   dose_common=12,   dose_strong=25,   dose_heavy=40   where name='Psilocybin';
update substances set dose_route='oral',        dose_unit='µg', dose_threshold=15,   dose_light=25,  dose_common=75,   dose_strong=150,  dose_heavy=300  where name='LSD';
update substances set dose_route='vaporized',   dose_unit='mg', dose_threshold=2,    dose_light=10,  dose_common=20,   dose_strong=40,   dose_heavy=60   where name='DMT';
update substances set dose_route='oral',        dose_unit='mg', dose_threshold=50,   dose_light=100, dose_common=200,  dose_strong=300,  dose_heavy=500  where name='Mescaline';
update substances set dose_route='oral',        dose_unit='mg', dose_threshold=20,   dose_light=40,  dose_common=75,   dose_strong=125,  dose_heavy=180  where name='MDMA';
update substances set dose_route='insufflated', dose_unit='mg', dose_threshold=10,   dose_light=20,  dose_common=40,   dose_strong=70,   dose_heavy=100  where name='Cocaine';
update substances set dose_route='smoked',      dose_unit='mg', dose_threshold=10,   dose_light=20,  dose_common=40,   dose_strong=70,   dose_heavy=100  where name='Crack Cocaine';
update substances set dose_route='oral',        dose_unit='mg', dose_threshold=5,    dose_light=10,  dose_common=20,   dose_strong=35,   dose_heavy=50   where name='Methamphetamine';
update substances set dose_route='insufflated', dose_unit='mg', dose_threshold=5,    dose_light=10,  dose_common=30,   dose_strong=60,   dose_heavy=100  where name='Heroin';
update substances set dose_route='oral',        dose_unit='mg', dose_threshold=1,    dose_light=3,   dose_common=5,    dose_strong=10,   dose_heavy=15   where name='PCP';
update substances set dose_route='oral',        dose_unit='mg', dose_threshold=100,  dose_light=200, dose_common=300,  dose_strong=450,  dose_heavy=600  where name='DXM';
-- (Salvia Divinorum left blank: dosing depends on extract strength / salvinorin A and isn't well captured by a simple mg scale.)

-- Newer additions
update substances set dose_route='insufflated', dose_unit='mg',       dose_threshold=10,  dose_light=30,  dose_common=50,  dose_strong=100,  dose_heavy=150  where name='Ketamine';
update substances set dose_route='inhaled',     dose_unit='balloons', dose_threshold=1,   dose_light=2,   dose_common=3,   dose_strong=5,    dose_heavy=8    where name='Nitrous Oxide';
update substances set dose_route='sublingual',  dose_unit='µg',       dose_threshold=25,  dose_light=50,  dose_common=100, dose_strong=200,  dose_heavy=400  where name='Fentanyl';
update substances set dose_route='oral',        dose_unit='mg',       dose_threshold=2.5, dose_light=5,   dose_common=10,  dose_strong=20,   dose_heavy=40   where name='Methadone';
update substances set dose_route='vaporized',   dose_unit='mg',       dose_threshold=1,   dose_light=3,   dose_common=5,   dose_strong=10,   dose_heavy=15   where name='5-MeO-DMT';
update substances set dose_route='oral',        dose_unit='mg',       dose_threshold=2,   dose_light=5,   dose_common=12,  dose_strong=20,   dose_heavy=30   where name='Psilocin';
update substances set dose_route='oral',        dose_unit='mg',       dose_threshold=20,  dose_light=40,  dose_common=80,  dose_strong=130,  dose_heavy=180  where name='MDA';
update substances set dose_route='oral',        dose_unit='mg',       dose_threshold=25,  dose_light=50,  dose_common=100, dose_strong=150,  dose_heavy=200  where name='Mephedrone';
update substances set dose_route='oral',        dose_unit='mg',       dose_threshold=25,  dose_light=50,  dose_common=150, dose_strong=300,  dose_heavy=600  where name='Quetiapine';
update substances set dose_route='oral',        dose_unit='mg',       dose_threshold=25,  dose_light=50,  dose_common=100, dose_strong=200,  dose_heavy=300  where name='Trazodone';
update substances set dose_route='oral',        dose_unit='mg',       dose_threshold=10,  dose_light=25,  dose_common=50,  dose_strong=100,  dose_heavy=150  where name='Amitriptyline';
update substances set dose_route='oral',        dose_unit='mg',       dose_threshold=25,  dose_light=50,  dose_common=100, dose_strong=200,  dose_heavy=300  where name='Diphenhydramine';
update substances set dose_route='oral',        dose_unit='mg',       dose_threshold=10,  dose_light=25,  dose_common=50,  dose_strong=100,  dose_heavy=150  where name='Ephedrine';
update substances set dose_route='oral',        dose_unit='g',        dose_threshold=1,   dose_light=2,   dose_common=4,   dose_strong=6,    dose_heavy=8    where name='Kratom';
update substances set dose_route='oral',        dose_unit='mg',       dose_threshold=0.25,dose_light=0.5, dose_common=1,   dose_strong=2,    dose_heavy=3    where name='Etizolam';
update substances set dose_route='oral',        dose_unit='mg',       dose_threshold=1,   dose_light=2,   dose_common=3,   dose_strong=5,    dose_heavy=7    where name='DOM';
update substances set dose_route='oral',        dose_unit='mg',       dose_threshold=5,   dose_light=10,  dose_common=15,  dose_strong=20,   dose_heavy=25   where name='2C-I';
update substances set dose_route='oral',        dose_unit='mg',       dose_threshold=100, dose_light=300, dose_common=600, dose_strong=1000, dose_heavy=1500 where name='Ibogaine';
update substances set dose_route='oral',        dose_unit='g',        dose_threshold=0.5, dose_light=1,   dose_common=2,   dose_strong=3,    dose_heavy=4    where name='GHB';
update substances set dose_route='oral',        dose_unit='mg',       dose_threshold=5,   dose_light=15,  dose_common=30,  dose_strong=50,   dose_heavy=70   where name='Methoxetamine';
