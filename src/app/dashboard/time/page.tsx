import { ChartPlaceholder } from '@/components/dashboard/chart-placeholder'

export default function TimePage() {
  const membros = [
    'Backend', 'Frontend', 'Mobile', 'QA', 'DevOps', 'FullStack'
  ]

  const metricas = [
    { label: 'Headcount Ativo',       icon: '👥', meta: '—',      desc: 'Devs no time atualmente' },
    { label: 'Turnover 6m',           icon: '👋', meta: '< 10%',  desc: 'Rotatividade semestral' },
    { label: 'Distribuição Saudável', icon: '⚖️', meta: '> 80%',  desc: 'Score de distribuição de work' },
    { label: 'Esgotamento Risk',      icon: '🔥', meta: '< 20%',  desc: 'Devs com sobrecarga detectada' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Saúde do Time</h1>
        <p className="text-sm text-gray-500 mt-1">Distribuição de trabalho, turnover e bem-estar da equipe</p>
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
        <ChartPlaceholder title="Distribuição de Work por Perfil" description="Backend, Frontend, Mobile, QA, DevOps" height={260} />
        <ChartPlaceholder title="Histórico de Turnover" description="Saídas e entradas por trimestre" height={260} />
        <ChartPlaceholder title="Carga de Trabalho por Dev" description="SPs por dev — últimas 4 sprints" height={260} />
        <ChartPlaceholder title="Score de Saúde do Time" description="Composto de 6 fatores" height={260} />
      </div>

      <div className="card">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Composição do Time</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {membros.map(perfil => (
            <div key={perfil} className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-2xl font-bold text-gray-900">—</p>
              <p className="text-xs text-gray-500 mt-1">{perfil}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
