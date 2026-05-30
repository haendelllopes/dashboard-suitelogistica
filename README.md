# WMS Dashboard — Suite Logística TOTVS

Dashboard de métricas de engenharia para o time de Suite Logística.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Supabase** (Postgres + Auth)
- **NextAuth.js** (Google OAuth + Email Magic Link)
- **Tailwind CSS**
- **Recharts** (gráficos)
- **Vercel** (deploy + Cron Jobs)

## Dashboards

| Aba | Descrição |
|-----|-----------|
| Overview | KPIs consolidados e alertas |
| Planejamento | Estimativas, reestimativas, latência |
| Suporte | Tickets ruído, bugs escapados, MTTR |
| Fluxo Dev | Colisões PR, review latency, cycle time |
| Time | Distribuição de work, turnover, saúde |
| Devs | 6 dimensões por desenvolvedor |
| Monte Carlo | Simulação probabilística de entrega |
| Multi-release | 26.09, 26.12, análise ROI de contratação |

## Início Rápido

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas credenciais

# 3. Rodar em desenvolvimento
npm run dev
```

Acesse: http://localhost:3000

## Autenticação

- Login com conta Google `@totvs.com.br`
- Ou Magic Link por email `@totvs.com.br`
- Bloqueio automático de domínios não autorizados

## Cron Job

Executa toda segunda a sexta às 06:00 AM (UTC-3):

```
POST /api/sync/trigger
Authorization: Bearer {CRON_SECRET}
```

Configurado em `vercel.json`.
