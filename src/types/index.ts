export type Status = 'rascunho' | 'confirmado' | 'em_transito' | 'entregue' | 'cancelado'
export type StatusFrete = 'aguardando' | 'coletado' | 'em_transito' | 'entregue' | 'extraviado'
export type Modal = 'rodoviario' | 'aereo' | 'maritimo' | 'ferroviario'

export interface Empresa {
  id: string
  nome: string
  cnpj?: string
}

export interface Perfil {
  id: string
  empresa_id: string
  nome: string
  cargo?: string
  avatar_url?: string
}

export interface Fornecedor {
  id: string
  empresa_id: string
  nome: string
  cnpj?: string
  email?: string
  cidade?: string
  estado?: string
  avaliacao: number
  ativo: boolean
  created_at: string
}

export interface Produto {
  id: string
  sku: string
  nome: string
  categoria?: string
  unidade: string
  peso_kg?: number
}

export interface Estoque {
  id: string
  produto_id: string
  deposito: string
  quantidade: number
  quantidade_minima: number
  custo_unitario?: number
  produto?: Produto
}

export interface Pedido {
  id: string
  numero: string
  fornecedor_id?: string
  status: Status
  valor_total?: number
  data_pedido: string
  data_entrega_prevista?: string
  data_entrega_real?: string
  fornecedor?: Fornecedor
}

export interface Frete {
  id: string
  pedido_id?: string
  transportadora_id?: string
  status: StatusFrete
  codigo_rastreio?: string
  origem_cidade?: string
  origem_estado?: string
  destino_cidade?: string
  destino_estado?: string
  valor?: number
  data_entrega_prevista?: string
  data_entrega_real?: string
  transportadora?: { nome: string; modal: Modal }
}

export interface KpiCard {
  titulo: string
  valor: string | number
  variacao?: number
  icone: string
  cor: string
}
