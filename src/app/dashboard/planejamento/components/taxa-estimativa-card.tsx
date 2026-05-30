'use client'

import { useEffect, useState } from 'react'

interface MetricData {
  success: boolean
  metric_name: string
  value: number
  target: number
  status: 'ok' | 'warning'
  issues_processed: number | null
  timestamp: string
  error?: string
}

export function TaxaEstimativaCard() {
  const [data, setData] = useState<MetricData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchMetric() {
      try {
        const res = await fetch('/api/metrics/taxa-estimativa')
        const json = await res.json()

        if (!res.ok || !json.success) {
          setError(json.error ?? 'Erro ao carregar métrica.')
        } else {
          setData(json)
        }
      } catch {
        setError('Não foi possível conectar à API.')
      } finally {
        setLoading(false)
      }
    }

    fetchMetric()
  }, [])

  // ── Loading ──────────────────────────────────────────────
  if (loading) {
    return (
      <div className="card flex flex-col gap-4 min-h-[180px] items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-400">Carregando métrica...</p>
      </div>
    )
  }

  // ── Error ────────────────────────────────────────────────
  if (error || !data) {
    return (
      <div className="card border-red-200 bg-red-50 min-h-[180px] flex flex-col gap-3 justify-center">
        <div className="flex items-center gap-2 text-red-700">
          <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
          <p className="text-sm font-medium">Taxa de Estimativa Acurada</p>
        </div>
        <p className="text-xs text-red-600">{error ?? 'Dados indisponíveis.'}</p>
        <button
          onClick={() => { setLoading(true); setError(null); window.location.reload() }}
          className="text-xs text-red-700 underline self-start"
        >
          Tentar novamente
        </button>
      </div>
    )
  }

  // ── Valores calculados ───────────────────────────────────
  const { value, target, status, issues_processed, timestamp } = data
  const isOk = status === 'ok'
  const progressPct = Math.min(value, 100)
  const targetPct = Math.min(target, 100)
  const formattedDate = new Date(timestamp).toLocaleDateString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  })

  return (
    <div className={`card border-2 flex flex-col gap-4 ${
      isOk ? 'border-green-200' : 'border-orange-200'
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Planejamento
          </p>
          <h3 className="text-sm font-bold text-gray-900 mt-0.5">
            Taxa de Estimativa Acurada
          </h3>
        </div>

        {/* Status badge */}
        <span className={`badge flex items-center gap-1 ${
          isOk ? 'badge-green' : 'bg-orange-100 text-orange-800'
        }`}>
          {isOk ? '✅' : '⚠️'}
          {isOk ? 'OK' : 'Warning'}
        </span>
      </div>

      {/* Valor principal */}
      <div className="flex items-end gap-2">
        <span className={`text-5xl font-bold tabular-nums ${
          isOk ? 'text-blue-600' : 'text-orange-500'
        }`}>
          {value.toFixed(1)}
        </span>
        <span className="text-xl text-gray-400 mb-1">%</span>
        <span className={`ml-auto text-sm font-medium ${
          isOk ? 'text-green-600' : 'text-orange-500'
        }`}>
          {isOk ? `+${(value - target).toFixed(1)}pp acima` : `${(value - target).toFixed(1)}pp abaixo`} da meta
        </span>
      </div>

      {/* Barra de progresso com marcador de meta */}
      <div className="space-y-1.5">
        <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-visible">
          {/* Progresso */}
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              isOk ? 'bg-blue-500' : 'bg-orange-400'
            }`}
            style={{ width: `${progressPct}%` }}
          />

          {/* Linha da meta */}
          <div
            className="absolute top-0 h-full flex flex-col items-center"
            style={{ left: `${targetPct}%` }}
          >
            <div className="w-0.5 h-full bg-green-600 z-10" />
          </div>
        </div>

        {/* Labels eixo */}
        <div className="relative flex justify-between text-xs text-gray-400">
          <span>0%</span>
          <span
            className="absolute text-green-700 font-semibold"
            style={{ left: `${targetPct}%`, transform: 'translateX(-50%)' }}
          >
            Meta {target}%
          </span>
          <span>100%</span>
        </div>
      </div>

      {/* Rodapé */}
      <div className="flex items-center justify-between pt-1 border-t border-gray-100">
        <p className="text-xs text-gray-400">
          {issues_processed != null
            ? `${issues_processed} issue${issues_processed !== 1 ? 's' : ''} processada${issues_processed !== 1 ? 's' : ''}`
            : 'Release 26.06'}
        </p>
        <p className="text-xs text-gray-400">Atualizado em {formattedDate}</p>
      </div>
    </div>
  )
}
