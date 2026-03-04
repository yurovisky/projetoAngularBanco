export interface Transacao {
  id: number;
  descricao: string;
  valor: number;
  //tipa como string mas limita a apenas 'entrada' ou 'saída' seria melhor
  tipo: 'entrada' | 'saída';
  data: string;
  contaId: number;
  categoria: string;
}

// Tipo para criar nova transação (POST) sem enviar o id
export type NovaTransacao = Omit<Transacao, 'id'>;
