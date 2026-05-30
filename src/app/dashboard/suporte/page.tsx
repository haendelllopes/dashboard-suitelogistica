import { ChartPlaceholder } from '@/components/dashboard/chart-placeholder'

export default function SuportePage() {
  const metricas = [
    { label: 'Tickets Ruído',        icon: '🔊', meta: '< 15%',  desc: 'Tickets sem causa raiz identificada' },
    { label: 'Bugs Escapados',       icon: '🐛', meta: '< 5/sprint', desc: 'Bugs reportados em produção' },
    { label: 'MTTR',                 icon: '🔧', meta: '< 4h',   desc: 'Tempo médio de resolução' },
    { label: 'Taxa de Reabertura',   icon: '↩️', meta: '< 5%',   desc: 'Tickets reabertos após fechamento' },
  ]

  const categorias = [
    'Performance', 'Integração', 'UI/UX', 'Dados', 'Autenticação', 'Cálculo', 'Relatório'
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Suporte & Qualidade</h1>
        <p className="text-sm text-gray-500 mt-1">Tickets de suporte, bugs escapados e métricas de resolução</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricas.map(m => (
          <div key={m.label} className="card-hover">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{m.icon}</span>
              <span className="badge badge-blue">{m.meta}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">—</p>
            <p className="text-xs font-medium text-gray-700 mt-1">{m.label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{m.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartPlaceholder title="Tickets por Categoria" description="Distribuição por tipo de problema" height={260} />
        <ChartPlaceholder title="Bugs Escapados por Sprint" description="Tendência histórica — últimas 8 sprints" height={260} />
        <ChartPlaceholder title="MTTR ao longo do tempo" description="Evolução do tempo médio de resolução" height={260} />
        <ChartPlaceholder title="Tickets Ruído vs. Actionable" description="Qualidade dos tickets recebidos" height={260} />
      </div>

      <div className="card">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Tickets em Aberto</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {categorias.map(c => (
            <button key={c} className="badge badge-gray cursor-pointer hover:bg-gray-200">{c}</button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-200">
                <th className="pb-3 font-medium">ID</th>
                <th className="pb-3 font-medium">Título</th>
                <th className="pb-3 font-medium">Categoria</th>
                <th className="pb-3 font-medium">Severidade</th>
                <th className="pb-3 font-medium text-right">Aberto há</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-gray-400">
                <td className="py-3 text-center" colSpan={5}>Dados serão carregados após sincronização</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
