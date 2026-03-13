create table if not exists public.landings (
  id bigint generated always as identity primary key,
  slug text not null unique,
  name text not null,
  status text not null default 'draft',
  created_at timestamptz not null default now()
);

create table if not exists public.leads (
  id bigint generated always as identity primary key,
  landing_slug text not null,
  name text,
  email text not null,
  phone text,
  message text,
  company text,
  job_title text,
  cta_variant text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  referrer text,
  user_agent text,
  ip_hash text,
  created_at timestamptz not null default now()
);

create index if not exists leads_landing_slug_idx on public.leads (landing_slug);
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_email_idx on public.leads (email);

