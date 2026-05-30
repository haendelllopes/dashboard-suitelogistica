import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  // Valida token do Vercel Cron
  const authHeader = req.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createAdminClient()
  const startedAt = new Date().toISOString()

  try {
    // Aqui entrarão as funções de sincronização com Jira, Azure DevOps, etc.
    // Por enquanto, registra o log da execução
    const { error } = await supabase
      .from('sync_logs')
      .insert({
        status: 'success',
        message: 'Sync executado — sem integrações configuradas ainda',
        started_at: startedAt,
        finished_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error && !error.message.includes('does not exist')) {
      console.error('Erro ao salvar log:', error)
    }

    return NextResponse.json({
      ok: true,
      ran_at: startedAt,
      message: 'Cron job executado com sucesso',
    })
  } catch (err) {
    console.error('Erro no sync:', err)
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 })
  }
}
