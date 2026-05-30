import { requireAuth } from '@/lib/permissions'
import { KpiGrid } from '@/components/dashboard/kpi-grid'
import { ChartPlaceholder } from '@/components/dashboard/chart-placeholder'

export default async function OverviewPage() {
  await requireAuth()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Overview Geral</h1>
        <p className="text-sm text-gray-500 mt-1">Indicadores consolidados de engenharia — Sprint atual</p>
      </div>

      <KpiGrid />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartPlaceholder
          title="Velocidade por Sprint"
          description="Story points entregues vs. estimados"
          height={280}
        />
        <ChartPlaceholder
          title="Taxa de Bugs Escapados"
          description="Bugs encontrados em produção vs. QA"
          height={280}
        />
        <ChartPlaceholder
          title="Lead Time de Features"
          description="Tempo médio commit → produção (dias)"
          height={280}
        />
        <ChartPlaceholder
          title="Saúde do Time"
          description="Score composto de 6 dimensões"
          height={280}
        />
      </div>

      <div className="card">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Alertas Ativos</h2>
        <div className="space-y-2">
          {[
            { msg: 'Taxa de reestimativa acima de 30% na Sprint 42', level: 'red' },
            { msg: '3 PRs com review latency > 48h', level: 'yellow' },
            { msg: 'Burn rate de bugs em tendência de alta', level: 'yellow' },
          ].map((a, i) => (
            <div key={i} className={`flex items-start gap-2 p-3 rounded-lg ${
              a.level === 'red' ? 'bg-red-50' : 'bg-yellow-50'
            }`}>
              <span className="text-base mt-0.5">{a.level === 'red' ? '🔴' : '🟡'}</span>
              <p className="text-sm text-gray-700">{a.msg}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
