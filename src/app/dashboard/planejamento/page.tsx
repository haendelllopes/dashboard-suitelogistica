import { ChartPlaceholder } from '@/components/dashboard/chart-placeholder'
import { TaxaEstimativaCard } from './components/taxa-estimativa-card'

export default function PlanejamentoPage() {
  const outras = [
    { label: 'Taxa de Reestimativa',      icon: '🔄', meta: '< 20%', desc: 'Items reestimados ÷ total de items' },
    { label: 'Latência de Planejamento',  icon: '⏳', meta: '< 4h',  desc: 'Tempo entre refinamento e sprint start' },
    { label: 'Spillover Rate',            icon: '💧', meta: '< 10%', desc: 'SPs carregados entre sprints' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Planejamento & Estimativas</h1>
        <p className="text-sm text-gray-500 mt-1">
          Acurácia do planejamento de sprint e qualidade das estimativas
        </p>
      </div>

      {/* KPIs — taxa real + placeholders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card com dados reais */}
        <div className="sm:col-span-2 lg:col-span-1">
          <TaxaEstimativaCard />
        </div>

        {/* Outros KPIs — aguardando sync */}
        {outras.map(m => (
          <div key={m.label} className="card-hover flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl">{m.icon}</span>
              <span className="badge badge-blue">{m.meta}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">—</p>
            <p className="text-xs font-medium text-gray-700">{m.label}</p>
            <p className="text-xs text-gray-400">{m.desc}</p>
          </div>
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartPlaceholder
          title="Acurácia de Estimativa por Sprint"
          description="SPs estimados vs. entregues — histórico 6 meses"
          height={260}
        />
        <ChartPlaceholder
          title="Distribuição de Reestimativas"
          description="Frequência e magnitude das mudanças de estimativa"
          height={260}
        />
        <ChartPlaceholder
          title="Latência de Planejamento"
          description="Dias entre refinamento e início de sprint"
          height={260}
        />
        <ChartPlaceholder
          title="Spillover por Sprint"
          description="Story points carregados para próximas sprints"
          height={260}
        />
      </div>

      {/* Tabela de histórico */}
      <div className="card">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Histórico de Sprints</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-200">
                <th className="pb-3 font-medium">Sprint</th>
                <th className="pb-3 font-medium text-right">Estimado (SP)</th>
                <th className="pb-3 font-medium text-right">Entregue (SP)</th>
                <th className="pb-3 font-medium text-right">Acurácia</th>
                <th className="pb-3 font-medium text-right">Reestimativas</th>
                <th className="pb-3 font-medium text-right">Spillover</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-gray-400">
                <td className="py-3 text-center" colSpan={6}>
                  Dados serão carregados após sincronização
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
