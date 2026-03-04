import { Cartoes } from './cartao.model';

export type NovoCartao = Omit<Cartoes, 'id'>;
