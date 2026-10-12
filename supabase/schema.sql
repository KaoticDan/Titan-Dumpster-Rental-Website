create table public.titan_quote_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(btrim(name)) between 1 and 200),
  email text not null check (char_length(btrim(email)) between 3 and 320 and position('@' in email) > 1),
  phone text not null check (char_length(btrim(phone)) between 7 and 40),
  contact_method text not null check (contact_method in ('SMS','Call','Email')),
  dumpster_size text not null check (dumpster_size in ('8 Yards','14 Yards','20 Yards','24 Yards','30 Yards','40 Yards','Multiple Dumpsters')),
  project_details text not null check (char_length(btrim(project_details)) between 1 and 500),
  delivery_address text not null check (char_length(btrim(delivery_address)) between 1 and 500),
  consent boolean not null check (consent = true),
  source text not null default 'website' check (source = 'website')
);
alter table public.titan_quote_requests enable row level security;
revoke all on table public.titan_quote_requests from public, anon, authenticated;
grant insert (name,email,phone,contact_method,dumpster_size,project_details,delivery_address,consent,source) on public.titan_quote_requests to anon;
create policy "public can submit titan quotes" on public.titan_quote_requests for insert to anon with check (consent = true and source = 'website');
create index titan_quote_requests_created_at_idx on public.titan_quote_requests (created_at desc);
