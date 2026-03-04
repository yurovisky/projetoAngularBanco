export interface Cartoes {
  id: number;
  numero: string;
  validade: string;
  cvv: string;
  tipo: 'credito' | 'debito';
  dependenteId: number;
  bandeira: 'Visa' | 'Mastercard' | 'Elo' | 'Amex';
  limiteTotal: number;
  limiteAtual: number;
  saldo: number;
}
