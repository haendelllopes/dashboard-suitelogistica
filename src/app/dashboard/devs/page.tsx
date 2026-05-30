'use client'

import { useState } from 'react'
import { ChartPlaceholder } from '@/components/dashboard/chart-placeholder'

const dimensoes = [
  { key: 'velocidade',   label: 'Velocidade',      icon: '⚡', desc: 'SPs entregues/sprint' },
  { key: 'qualidade',    label: 'Qualidade',        icon: '✅', desc: 'Taxa de bugs gerados' },
  { key: 'colaboracao',  label: 'Colaboração',      icon: '🤝', desc: 'PRs revisados' },
  { key: 'confiabilidade', label: 'Confiabilidade', icon: '🎯', desc: 'Commitments cumpridos' },
  { key: 'aprendizado',  label: 'Aprendizado',      icon: '📚', desc: 'Novas tecnologias/skills' },
  { key: 'impacto',      label: 'Impacto',          icon: '🚀', desc: 'Features críticas entregues' },
]

export default function DevsPage() {
  const [devSelecionado, setDevSelecionado] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Visão por Dev</h1>
        <p className="text-sm text-gray-500 mt-1">6 dimensões de performance individual — dados após sincronização</p>
      </div>

      {/* 6 Dimensões */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {dimensoes.map(d => (
          <div key={d.key} className="card text-center">
            <span className="text-2xl">{d.icon}</span>
            <p className="text-xs font-semibold text-gray-700 mt-2">{d.label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{d.desc}</p>
          </div>
        ))}
      </div>

      {/* Tabela de Devs */}
      <div className="card">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Ranking do Time</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-200">
                <th className="pb-3 font-medium">Dev</th>
                <th className="pb-3 font-medium text-right">⚡ Vel.</th>
                <th className="pb-3 font-medium text-right">✅ Qual.</th>
                <th className="pb-3 font-medium text-right">🤝 Colab.</th>
                <th className="pb-3 font-medium text-right">🎯 Conf.</th>
                <th className="pb-3 font-medium text-right">📚 Apr.</th>
                <th className="pb-3 font-medium text-right">🚀 Imp.</th>
                <th className="pb-3 font-medium text-right">Score</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-gray-400">
                <td className="py-3 text-center" colSpan={8}>Dados serão carregados após sincronização</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Radar chart placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartPlaceholder
          title="Radar de Dimensões"
          description="Selecione um dev na tabela para ver o radar"
          height={300}
        />
        <ChartPlaceholder
          title="Evolução ao longo do tempo"
          description="Score composto — últimas 6 sprints"
          height={300}
        />
      </div>
    </div>
  )
}
