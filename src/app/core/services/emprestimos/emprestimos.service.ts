import { Injectable } from '@angular/core';
import { NovoEmprestimo } from '../../../Models/novoEmprestimo.model';
import { Emprestimo } from '../../../Models/emprestimo.model';
import { catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmprestimosService {
  constructor(private http: HttpClient) {}

  // emprestimo.service.ts
  getEmprestimos() {
    return this.http.get<any[]>('http://localhost:3000/emprestimos');
  }

  solicitarEmprestimo(novoEmprestimo: NovoEmprestimo) {
    return this.http
      .post<Emprestimo>('http://localhost:3000/emprestimos', novoEmprestimo)
      .pipe(
        catchError((error) => {
          console.error('Erro ao criar empréstimo:', error);
          return throwError(() => new Error('Erro ao criar empréstimo'));
        }),
      );
  }
}
