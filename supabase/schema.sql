-- ================================================
-- WMS Dashboard — Suite Logística TOTVS
-- Execute no SQL Editor do Supabase
-- ================================================

-- Extensões
create extension if not exists "uuid-ossp";

-- ================================================
-- TABELA: users
-- ================================================
create table if not exists users (
  id           text primary key,
  email        text unique not null,
  name         text,
  image        text,
  role         text not null default 'viewer'
                  check (role in ('admin', 'manager', 'viewer')),
  created_at   timestamptz not null default now(),
  last_login   timestamptz
);

-- ================================================
-- TABELA: metrics (velocidade, cobertura, etc.)
-- ================================================
create table if not exists metrics (
  id          uuid primary key default uuid_generate_v4(),
  sprint_id   text not null,
  type        text not null,   -- 'velocity' | 'coverage' | 'reestimate_rate' | ...
  value       numeric not null,
  date        date not null default current_date,
  created_at  timestamptz not null default now()
);
create index if not exists metrics_sprint_idx on metrics(sprint_id);
create index if not exists metrics_type_idx   on metrics(type);

-- ================================================
-- TABELA: sprint_estimates
-- ================================================
create table if not exists sprint_estimates (
  id                  uuid primary key default uuid_generate_v4(),
  sprint_id           text not null,
  sprint_name         text,
  sp_estimated        integer,
  sp_delivered        integer,
  reestimate_count    integer default 0,
  spillover_sp        integer default 0,
  start_date          date,
  end_date            date,
  created_at          timestamptz not null default now()
);

-- ================================================
-- TABELA: issues (Jira)
-- ================================================
create table if not exists issues (
  id            uuid primary key default uuid_generate_v4(),
  jira_key      text unique,
  title         text not null,
  type          text,   -- 'story' | 'bug' | 'task' | 'epic'
  status        text,
  sprint_id     text,
  assignee      text,
  story_points  integer,
  priority      text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz
);

-- ================================================
-- TABELA: tickets (Suporte)
-- ================================================
create table if not exists tickets (
  id             uuid primary key default uuid_generate_v4(),
  external_id    text unique,
  title          text not null,
  category       text,
  severity       text,   -- 'critical' | 'high' | 'medium' | 'low'
  status         text,
  is_noise       boolean default false,
  is_bug_escaped boolean default false,
  opened_at      timestamptz,
  closed_at      timestamptz,
  mttr_hours     numeric,
  reopened_count integer default 0,
  created_at     timestamptz not null default now()
);

-- ================================================
-- TABELA: pull_requests
-- ================================================
create table if not exists pull_requests (
  id                   uuid primary key default uuid_generate_v4(),
  repo                 text,
  pr_number            integer,
  title                text,
  author               text,
  status               text,   -- 'open' | 'merged' | 'closed'
  lines_changed        integer,
  review_latency_hours numeric,
  cycle_time_days      numeric,
  has_conflict         boolean default false,
  opened_at            timestamptz,
  merged_at            timestamptz,
  created_at           timestamptz not null default now()
);

-- ================================================
-- TABELA: dev_metrics (6 dimensões)
-- ================================================
create table if not exists dev_metrics (
  id              uuid primary key default uuid_generate_v4(),
  dev_email       text not null,
  dev_name        text,
  sprint_id       text,
  velocidade      numeric,    -- SPs entregues
  qualidade       numeric,    -- 0-10 (inverso de bugs gerados)
  colaboracao     numeric,    -- PRs revisados
  confiabilidade  numeric,    -- commitments cumpridos %
  aprendizado     numeric,    -- 0-10
  impacto         numeric,    -- 0-10
  score           numeric generated always as (
    (coalesce(velocidade,0) + coalesce(qualidade,0) + coalesce(colaboracao,0) +
     coalesce(confiabilidade,0) + coalesce(aprendizado,0) + coalesce(impacto,0)) / 6
  ) stored,
  created_at      timestamptz not null default now()
);

-- ================================================
-- TABELA: simulations (Monte Carlo)
-- ================================================
create table if not exists simulations (
  id                uuid primary key default uuid_generate_v4(),
  sp_remaining      integer not null,
  iterations        integer not null default 10000,
  p50_sprints       numeric,
  p75_sprints       numeric,
  p90_sprints       numeric,
  velocity_min      numeric,
  velocity_max      numeric,
  histogram         jsonb,   -- { sprints: number, count: number }[]
  created_at        timestamptz not null default now()
);

-- ================================================
-- TABELA: alerts
-- ================================================
create table if not exists alerts (
  id          uuid primary key default uuid_generate_v4(),
  type        text not null,   -- 'reestimate' | 'pr_latency' | 'bug_rate' | ...
  level       text not null default 'warning' check (level in ('info','warning','critical')),
  message     text not null,
  is_read     boolean default false,
  created_at  timestamptz not null default now()
);

-- ================================================
-- TABELA: sync_logs
-- ================================================
create table if not exists sync_logs (
  id          uuid primary key default uuid_generate_v4(),
  status      text not null check (status in ('success','error','partial')),
  message     text,
  started_at  timestamptz,
  finished_at timestamptz,
  created_at  timestamptz not null default now()
);

-- ================================================
-- ROW LEVEL SECURITY
-- ================================================
alter table users         enable row level security;
alter table metrics       enable row level security;
alter table sprint_estimates enable row level security;
alter table issues        enable row level security;
alter table tickets       enable row level security;
alter table pull_requests enable row level security;
alter table dev_metrics   enable row level security;
alter table simulations   enable row level security;
alter table alerts        enable row level security;
alter table sync_logs     enable row level security;

-- Usuários autenticados podem ler tudo
create policy "auth read all" on metrics
  for select to authenticated using (true);

create policy "auth read all" on sprint_estimates
  for select to authenticated using (true);

create policy "auth read all" on issues
  for select to authenticated using (true);

create policy "auth read all" on tickets
  for select to authenticated using (true);

create policy "auth read all" on pull_requests
  for select to authenticated using (true);

create policy "auth read all" on dev_metrics
  for select to authenticated using (true);

create policy "auth read all" on simulations
  for all to authenticated using (true);

create policy "auth read all" on alerts
  for all to authenticated using (true);

create policy "auth read own" on users
  for select to authenticated using (id = auth.uid()::text);

-- Service role gerencia tudo (cron job)
create policy "service manage all" on sync_logs
  for all using (true);

-- ================================================
-- DADOS INICIAIS DE EXEMPLO
-- ================================================
insert into alerts (type, level, message) values
  ('reestimate',  'warning',  'Taxa de reestimativa acima de 30% — Sprint atual'),
  ('pr_latency',  'warning',  '3 PRs aguardando review há mais de 48h'),
  ('bug_rate',    'critical', 'Tendência de alta em bugs escapados nas últimas 3 sprints')
on conflict do nothing;
