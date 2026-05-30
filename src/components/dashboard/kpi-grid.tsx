interface KpiItem {
  label: string
  value: string
  delta?: string
  positive?: boolean
  icon: string
}

const kpis: KpiItem[] = [
  { label: 'Velocidade Média',      value: '—',   delta: 'sp/sprint', icon: '⚡' },
  { label: 'Taxa de Reestimativa',  value: '—',   delta: 'meta < 20%', icon: '🔄', positive: false },
  { label: 'Bugs Escapados',        value: '—',   delta: 'últimas 4 sprints', icon: '🐛', positive: false },
  { label: 'Review Latency',        value: '—',   delta: 'horas (mediana)', icon: '⏱️' },
  { label: 'Cobertura de Testes',   value: '—',   delta: 'meta ≥ 80%', icon: '✅', positive: true },
  { label: 'Colisões de PR',        value: '—',   delta: 'por sprint', icon: '💥', positive: false },
  { label: 'Tickets de Suporte',    value: '—',   delta: 'abertos hoje', icon: '🎧' },
  { label: 'Turnover (6m)',         value: '—',   delta: 'devs/semestre', icon: '👋', positive: false },
]

export function KpiGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {kpis.map((kpi) => (
        <div key={kpi.label} className="card-hover">
          <div className="flex items-start justify-between mb-3">
            <span className="text-2xl">{kpi.icon}</span>
            <span className="badge badge-gray text-xs">sincronizando</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
          <p className="text-xs font-medium text-gray-700 mt-1">{kpi.label}</p>
          <p className="text-xs text-gray-400 mt-0.5">{kpi.delta}</p>
        </div>
      ))}
    </div>
  )
}
