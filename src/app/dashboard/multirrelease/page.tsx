import { ChartPlaceholder } from '@/components/dashboard/chart-placeholder'

const releases = [
  {
    nome: 'Release 26.09',
    data: 'Set 2026',
    status: 'planejamento',
    features: 0,
    spTotal: 0,
    spConcluido: 0,
    risco: 'baixo',
  },
  {
    nome: 'Release 26.12',
    data: 'Dez 2026',
    status: 'backlog',
    features: 0,
    spTotal: 0,
    spConcluido: 0,
    risco: 'médio',
  },
]

const statusColors: Record<string, string> = {
  planejamento: 'badge-blue',
  backlog:      'badge-gray',
  em_curso:     'badge-yellow',
  entregue:     'badge-green',
}

const riscoColors: Record<string, string> = {
  baixo:  'badge-green',
  médio:  'badge-yellow',
  alto:   'badge-red',
}

export default function MultireleasePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Visão Multi-release</h1>
        <p className="text-sm text-gray-500 mt-1">Planejamento de releases, ROI de contratação e cenários de capacidade</p>
      </div>

      {/* Cards de Release */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {releases.map(r => (
          <div key={r.nome} className="card-hover">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-gray-900">{r.nome}</h2>
                <p className="text-sm text-gray-500">Previsão: {r.data}</p>
              </div>
              <div className="flex gap-2">
                <span className={`badge ${statusColors[r.status]}`}>{r.status}</span>
                <span className={`badge ${riscoColors[r.risco]}`}>risco {r.risco}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xl font-bold text-gray-900">{r.features || '—'}</p>
                <p className="text-xs text-gray-500">Features</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xl font-bold text-gray-900">{r.spTotal || '—'}</p>
                <p className="text-xs text-gray-500">SPs Total</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xl font-bold text-gray-900">—%</p>
                <p className="text-xs text-gray-500">Concluído</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-primary-600 h-2 rounded-full" style={{ width: '0%' }} />
            </div>
            <p className="text-xs text-gray-400 mt-1">0 de 0 SPs entregues</p>
          </div>
        ))}
      </div>

      {/* ROI de Contratação */}
      <div className="card">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Análise de ROI — Contratação</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { cenario: 'Sem contratação',    devs: 0,  sprintsExtra: 0,  custo: 'R$ —' },
            { cenario: '+ 1 Dev Sênior',     devs: 1,  sprintsExtra: 0,  custo: 'R$ —' },
            { cenario: '+ 2 Devs Mid-level', devs: 2,  sprintsExtra: 0,  custo: 'R$ —' },
          ].map(c => (
            <div key={c.cenario} className="p-4 border border-gray-200 rounded-xl">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">{c.cenario}</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Devs adicionais:</span>
                  <span className="font-medium text-gray-900">+{c.devs}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sprints ganhos:</span>
                  <span className="font-medium text-gray-900">—</span>
                </div>
                <div className="flex justify-between">
                  <span>Custo estimado:</span>
                  <span className="font-medium text-gray-900">{c.custo}</span>
                </div>
                <div className="flex justify-between border-t pt-2 mt-2">
                  <span>ROI estimado:</span>
                  <span className="font-bold text-primary-600">—</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartPlaceholder title="Capacidade vs. Backlog" description="SPs disponíveis vs. SPs planejados por release" height={260} />
        <ChartPlaceholder title="Burndown Multi-release" description="Progresso projetado de ambos os releases" height={260} />
      </div>
    </div>
  )
}
