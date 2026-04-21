create table if not exists trends (
  id uuid primary key default gen_random_uuid(),
  keyword text unique not null,
  source text not null,
  difficulty int not null,
  score int not null,
  status text not null default 'new',
  created_at timestamptz default now()
);

create table if not exists articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text not null,
  content_md text not null,
  cover_image_url text not null,
  category text not null,
  keywords text[] not null,
  meta_description text not null,
  faq_json jsonb not null,
  published_at timestamptz not null default now()
);

create table if not exists subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz default now()
);
