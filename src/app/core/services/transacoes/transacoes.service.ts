import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { NovaTransacao, Transacao } from '../../../Models/transacao.model';

@Injectable({
  providedIn: 'root',
})
export class TransacoesService {
  private apiUrl = 'http://localhost:3000/transacoes';

  constructor(private http: HttpClient) {}

  getTransacoes() {
    return this.http.get<Transacao[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Erro ao buscar transações:', error);

        return throwError(
          () => new Error('Não foi possível carregar as transações.'),
        );
      }),
    );
  }

  addTransacao(transacao: NovaTransacao) {
    return this.http.post<Transacao>(this.apiUrl, transacao);
  }
}
