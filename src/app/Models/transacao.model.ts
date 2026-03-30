export interface Transacao {
  id: number;
  descricao: string;
  valor: number;
  tipo: 'entrada' | 'saída';
  data: string;
  contaId: number;
  categoria: string;
}

export type NovaTransacao = Omit<Transacao, 'id'>;
