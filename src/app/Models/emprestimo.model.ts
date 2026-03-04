export interface Emprestimo {
  id: number;
  valor: number;
  saldoDevedor: number;
  parcelas: number;
  taxaJuros: number;
  data: string;
  status: 'ativo' | 'pago' | 'atrasado';
  contaId: number;
  tipo: string;
  tipoId: number;
}
