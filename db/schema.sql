-- Psychedex database schema (PostgreSQL / Supabase)
-- Run this in the Supabase SQL Editor, then run seed.sql.

-- ---------------------------------------------------------------------------
-- Lookup tables
-- ---------------------------------------------------------------------------

-- Legal grouping. Mirrors the section comments in the old substances.ts file
-- (Legal Everyday, Prescription, Research Chemical, Illegal/Restricted).
create table if not exists legal_status (
  id   smallint primary key,
  name text not null unique
);

-- Pharmacological category (Stimulant, Psychedelic, Opioid, SSRI, ...).
create table if not exists categories (
  id   smallserial primary key,
  name text not null unique
);

-- ---------------------------------------------------------------------------
-- Main table
-- ---------------------------------------------------------------------------

create table if not exists substances (
  id              serial primary key,
  name            text not null,
  category_id     int       references categories(id),
  legal_status_id smallint  references legal_status(id),
  duration        text,            -- free text range, e.g. '4-8 hours', '24+ hours'
  description     text,
  pubchem_cid     int,             -- used to build the PubChem structure image URL; null -> notfound.png
  created_at      timestamptz not null default now()
);

create index if not exists substances_category_id_idx on substances (category_id);
create index if not exists substances_name_idx         on substances (name);

-- ---------------------------------------------------------------------------
-- Flattened read view
-- ---------------------------------------------------------------------------
-- The frontend reads from this so it gets `category` / `legal_status` as plain
-- strings, matching the component props (no client-side joins needed).
-- security_invoker = on makes the view respect the base tables' RLS policies.
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
  s.pubchem_cid
from substances s
left join categories   c  on c.id  = s.category_id
left join legal_status ls on ls.id = s.legal_status_id
order by s.id;

-- ---------------------------------------------------------------------------
-- Row-Level Security: this is public, read-only reference data.
-- Enable RLS and allow anonymous SELECT only. No insert/update/delete policy
-- means the public anon key can read but never modify the data.
-- ---------------------------------------------------------------------------
alter table substances    enable row level security;
alter table categories    enable row level security;
alter table legal_status  enable row level security;

create policy "public read substances"   on substances   for select using (true);
create policy "public read categories"    on categories    for select using (true);
create policy "public read legal_status"  on legal_status  for select using (true);
