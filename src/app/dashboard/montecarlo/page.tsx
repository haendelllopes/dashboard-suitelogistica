'use client'

import { useState } from 'react'
import { ChartPlaceholder } from '@/components/dashboard/chart-placeholder'

export default function MonteCarloPage() {
  const [simConfig, setSimConfig] = useState({
    iteracoes: 10000,
    spRestantes: 100,
    velocidadeMin: 30,
    velocidadeMax: 60,
    sprintsMax: 8,
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Simulação Monte Carlo</h1>
        <p className="text-sm text-gray-500 mt-1">Previsão probabilística de entrega baseada em velocidade histórica</p>
      </div>

      {/* Configuração */}
      <div className="card">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Parâmetros da Simulação</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { key: 'iteracoes',      label: 'Iterações',          suffix: 'x',  min: 1000,  max: 100000 },
            { key: 'spRestantes',    label: 'SPs Restantes',      suffix: 'sp', min: 1,     max: 500 },
            { key: 'velocidadeMin',  label: 'Velocidade Mín.',    suffix: 'sp', min: 1,     max: 200 },
            { key: 'velocidadeMax',  label: 'Velocidade Máx.',    suffix: 'sp', min: 1,     max: 200 },
            { key: 'sprintsMax',     label: 'Sprints Máx.',       suffix: 'x',  min: 1,     max: 26 },
          ].map(field => (
            <div key={field.key}>
              <label className="text-xs font-medium text-gray-600 block mb-1">{field.label}</label>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min={field.min}
                  max={field.max}
                  value={simConfig[field.key as keyof typeof simConfig]}
                  onChange={e => setSimConfig(prev => ({ ...prev, [field.key]: Number(e.target.value) }))}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm
                             focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <span className="text-xs text-gray-400">{field.suffix}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button className="btn-primary">
            🎲 Rodar Simulação
          </button>
          <p className="text-xs text-gray-400">Conecte os dados históricos primeiro para resultados precisos</p>
        </div>
      </div>

      {/* Resultados */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { pct: '50%', label: 'Cenário Provável',    color: 'bg-blue-50 border-blue-200',   text: 'text-blue-700' },
          { pct: '75%', label: 'Cenário Conservador', color: 'bg-yellow-50 border-yellow-200', text: 'text-yellow-700' },
          { pct: '90%', label: 'Cenário Pessimista',  color: 'bg-red-50 border-red-200',     text: 'text-red-700' },
        ].map(s => (
          <div key={s.pct} className={`rounded-xl border p-5 ${s.color}`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`badge ${s.text} bg-white/60`}>{s.pct} de confiança</span>
            </div>
            <p className={`text-3xl font-bold ${s.text}`}>— sprints</p>
            <p className={`text-sm mt-1 ${s.text} opacity-80`}>{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartPlaceholder title="Distribuição de Probabilidade" description="Histograma de sprints necessários — 10k iterações" height={280} />
        <ChartPlaceholder title="Curva S de Confiança" description="Probabilidade acumulada de entrega por sprint" height={280} />
      </div>
    </div>
  )
}
