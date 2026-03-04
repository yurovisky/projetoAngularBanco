import { Emprestimo } from './emprestimo.model';

export type NovoEmprestimo = Omit<Emprestimo, 'id'>;
