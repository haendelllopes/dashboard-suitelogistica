import { ChartPlaceholder } from '@/components/dashboard/chart-placeholder'

export default function FluxoPage() {
  const metricas = [
    { label: 'Colisões de PR',       icon: '💥', meta: '< 3/sprint', desc: 'PRs conflitantes simultâneos' },
    { label: 'Review Latency',       icon: '⏱️', meta: '< 24h',  desc: 'Mediana do tempo para 1º review' },
    { label: 'PR Size (linhas)',      icon: '📏', meta: '< 400',  desc: 'Tamanho mediano de PR' },
    { label: 'Cycle Time',           icon: '🔁', meta: '< 3d',   desc: 'Commit → merge para produção' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Fluxo de Desenvolvimento</h1>
        <p className="text-sm text-gray-500 mt-1">Pull requests, review latency e colisões de código</p>
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
        <ChartPlaceholder title="Review Latency por Dev" description="Tempo médio para receber primeiro review" height={260} />
        <ChartPlaceholder title="PR Size Distribution" description="Histograma de tamanho de PRs (linhas)" height={260} />
        <ChartPlaceholder title="Colisões por Semana" description="Frequência de conflitos de merge" height={260} />
        <ChartPlaceholder title="Cycle Time Breakdown" description="Tempo em cada fase do desenvolvimento" height={260} />
      </div>

      <div className="card">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">PRs Aguardando Review</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-200">
                <th className="pb-3 font-medium">PR</th>
                <th className="pb-3 font-medium">Título</th>
                <th className="pb-3 font-medium">Autor</th>
                <th className="pb-3 font-medium text-right">Linhas</th>
                <th className="pb-3 font-medium text-right">Aguardando</th>
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
