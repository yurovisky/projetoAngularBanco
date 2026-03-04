import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cartoes } from '../../../Models/cartao.model';
import { NovoCartao } from '../../../Models/novoCartao.model';

@Injectable({
  providedIn: 'root',
})
export class CartoesService {
  constructor(private http: HttpClient) {}

  getCartoes() {
    return this.http.get<Cartoes[]>('http://localhost:3000/cartoes').pipe(
      catchError((error) => {
        console.error('Erro ao buscar cartões:', error);
        return throwError(() => new Error('Erro ao carregar cartões'));
      }),
    );
  }

  criarCartao(novoCartao: NovoCartao) {
    return this.http
      .post<Cartoes>('http://localhost:3000/cartoes', novoCartao)
      .pipe(
        catchError((error) => {
          console.error('Erro ao criar cartão:', error);
          return throwError(() => new Error('Erro ao criar cartão'));
        }),
      );
  }

  editarLimite(cartaoId: Cartoes, limite: number) {
    return this.http
      .patch<Cartoes>(`http://localhost:3000/cartoes/${cartaoId.id}`, {
        limiteAtual: limite,
      })
      .pipe(
        catchError((error) => {
          console.error('Erro ao editar limite do cartão:', error);
          return throwError(() => new Error('Erro ao editar limite do cartão'));
        }),
      );
  }

  excluirCartao(cartaoId: number) {
    return this.http.delete(`http://localhost:3000/cartoes/${cartaoId}`).pipe(
      catchError((error) => {
        console.error('Erro ao excluir cartão:', error);
        return throwError(() => new Error('Erro ao excluir cartão'));
      }),
    );
  }
}
