# Guia de Setup — WMS Dashboard

## Pré-requisitos

- Node.js 18+
- Conta no Supabase
- Projeto no Google Cloud Console (OAuth)
- Conta na Vercel

---

## 1. Supabase — Banco de Dados

1. Acesse https://supabase.com → seu projeto
2. Vá em **SQL Editor**
3. Cole e execute o script `supabase/schema.sql`
4. Vá em **Authentication → Providers**:
   - Habilite **Google** e cole Client ID + Secret
   - Habilite **Email** (Magic Link)
5. Em **Settings → API**, copie:
   - `URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role key` → `SUPABASE_SERVICE_ROLE_KEY`

---

## 2. Google OAuth

1. Acesse https://console.cloud.google.com
2. Crie credenciais OAuth 2.0 (Web Application)
3. Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://SEU_DOMINIO.vercel.app/api/auth/callback/google`
4. Copie Client ID e Client Secret para `.env.local`

---

## 3. Variáveis de Ambiente

```bash
cp .env.example .env.local
```

Preencha todos os valores em `.env.local`.

Para gerar `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```

---

## 4. Rodar Localmente

```bash
npm install
npm run dev
```

Acesse http://localhost:3000 e faça login com sua conta `@totvs.com.br`.

---

## 5. Deploy na Vercel

```bash
# Via CLI
npx vercel --prod

# Adicione todas as env vars no painel:
# vercel.com → projeto → Settings → Environment Variables
```

O Cron Job em `vercel.json` será ativado automaticamente no deploy.

---

## 6. Banco de Dados — Schema

Execute `supabase/schema.sql` no SQL Editor do Supabase.

Tabelas criadas:
- `users` — perfis dos usuários
- `metrics` — métricas de sprint
- `issues` — issues Jira
- `tickets` — tickets de suporte
- `pull_requests` — PRs do repositório
- `dev_metrics` — métricas por dev
- `sprint_estimates` — histórico de estimativas
- `simulations` — resultados Monte Carlo
- `alerts` — alertas automáticos
- `sync_logs` — logs do cron job

---

## Próximos Passos

- [ ] Conectar API do Jira (sprint data, issues)
- [ ] Conectar Azure DevOps (PRs, repos)
- [ ] Conectar Zendesk/Freshdesk (tickets)
- [ ] Implementar gráficos com dados reais (Recharts)
- [ ] Configurar alertas automáticos por email
