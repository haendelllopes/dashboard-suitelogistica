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

type CardState = 'loading' | 'empty' | 'error' | 'success'

export function TaxaEstimativaCard() {
  const [data, setData] = useState<MetricData | null>(null)
  const [state, setState] = useState<CardState>('loading')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [syncing, setSyncing] = useState(false)

  async function fetchMetric() {
    setState('loading')
    setErrorMsg(null)
    try {
      const res = await fetch('/api/metrics/taxa-estimativa')
      if (res.status === 404) {
        setState('empty')
        return
      }
      const json: MetricData = await res.json()
      if (!res.ok || !json.success) {
        setErrorMsg(json.error ?? 'Erro ao carregar métrica.')
        setState('error')
      } else {
        setData(json)
        setState('success')
      }
    } catch {
      setErrorMsg('Não foi possível conectar à API.')
      setState('error')
    }
  }

  async function handleSync() {
    setSyncing(true)
    try {
      const res = await fetch('/api/metrics/taxa-estimativa', { method: 'POST' })
      const json = await res.json()
      if (json.success) {
        setData(json)
        setState('success')
      } else {
        setErrorMsg(json.error ?? 'Erro no sync.')
        setState('error')
      }
    } catch {
      setErrorMsg('Falha ao executar sync.')
      setState('error')
    } finally {
      setSyncing(false)
    }
  }

  useEffect(() => { fetchMetric() }, [])

  // ── Loading ──────────────────────────────────────────────
  if (state === 'loading') {
    return (
      <div className="card flex flex-col items-center justify-center gap-3 min-h-[180px]">
        <div className="w-7 h-7 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-gray-400">Carregando métrica...</p>
      </div>
    )
  }

  // ── Sem dados — nunca sincronizado ───────────────────────
  if (state === 'empty') {
    return (
      <div className="card border-dashed border-2 border-gray-300 flex flex-col items-center justify-center gap-3 min-h-[180px] text-center">
        <span className="text-3xl">📊</span>
        <div>
          <p className="text-sm font-semibold text-gray-700">Taxa de Estimativa Acurada</p>
          <p className="text-xs text-gray-400 mt-1">Nenhum dado ainda</p>
        </div>
        <button
          onClick={handleSync}
          disabled={syncing}
          className="btn-primary text-xs py-1.5 px-3 disabled:opacity-60"
        >
          {syncing ? (
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Sincronizando...
            </span>
          ) : '⚡ Sincronizar agora'}
        </button>
      </div>
    )
  }

  // ── Error ────────────────────────────────────────────────
  if (state === 'error' || !data) {
    return (
      <div className="card border-2 border-red-200 bg-red-50 flex flex-col gap-3 min-h-[180px] justify-center">
        <div className="flex items-center gap-2 text-red-700">
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
          <p className="text-sm font-semibold">Taxa de Estimativa Acurada</p>
        </div>
        <p className="text-xs text-red-600">{errorMsg}</p>
        <button onClick={fetchMetric} className="text-xs text-red-700 underline self-start">
          Tentar novamente
        </button>
      </div>
    )
  }

  // ── Success ──────────────────────────────────────────────
  const { value, target, status, issues_processed, timestamp } = data
  const isOk = status === 'ok'
  const progressPct = Math.min(value, 100)
  const targetPct = Math.min(target, 100)
  const diff = (value - target).toFixed(1)
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
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Planejamento</p>
          <h3 className="text-sm font-bold text-gray-900 mt-0.5">Taxa de Estimativa Acurada</h3>
        </div>
        <span className={`badge flex items-center gap-1 ${
          isOk ? 'badge-green' : 'bg-orange-100 text-orange-800'
        }`}>
          {isOk ? '✅ OK' : '⚠️ Warning'}
        </span>
      </div>

      {/* Valor */}
      <div className="flex items-end gap-1.5">
        <span className={`text-5xl font-bold tabular-nums ${
          isOk ? 'text-blue-600' : 'text-orange-500'
        }`}>
          {value.toFixed(1)}
        </span>
        <span className="text-xl text-gray-400 mb-1">%</span>
        <span className={`ml-auto text-xs font-medium ${
          isOk ? 'text-green-600' : 'text-orange-500'
        }`}>
          {Number(diff) >= 0 ? `+${diff}pp` : `${diff}pp`} da meta
        </span>
      </div>

      {/* Barra de progresso */}
      <div className="space-y-1.5">
        <div className="relative w-full h-3 bg-gray-100 rounded-full">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              isOk ? 'bg-blue-500' : 'bg-orange-400'
            }`}
            style={{ width: `${progressPct}%` }}
          />
          {/* Marcador de meta */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-green-600 z-10"
            style={{ left: `${targetPct}%` }}
          />
        </div>
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
        <button onClick={fetchMetric} className="text-xs text-gray-400 hover:text-gray-600">
          Atualizado em {formattedDate} ↻
        </button>
      </div>
    </div>
  )
}
