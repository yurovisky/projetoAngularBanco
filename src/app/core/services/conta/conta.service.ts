import { Injectable } from '@angular/core';
import { BehaviorSubject, tap, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Conta } from '../../../Models/conta.model';
@Injectable({
  providedIn: 'root',
})
export class ContaService {
  private apiUrlSaldo = 'http://localhost:3000/contas/1';

  // iniciar saldo com 0 até carregar da API
  private saldoSubject = new BehaviorSubject<number>(0);
  saldo$ = this.saldoSubject.asObservable();

  constructor(private http: HttpClient) {}

  getDadosDaConta() {
    return this.http.get<Conta>(this.apiUrlSaldo).pipe(
      tap((conta) => {
        this.saldoSubject.next(conta.saldo);
      }),
      catchError((error) => {
        console.error('Erro ao buscar conta:', error);
        return throwError(() => new Error('Erro ao carregar dados da conta'));
      }),
    );
  }

  // Atualiza saldo localmente e no backend
  alterarSaldo(valor: number) {
    const novoSaldo = this.saldoSubject.value + valor;

    return this.http
      .patch<Conta>(this.apiUrlSaldo, {
        saldo: novoSaldo,
      })
      .pipe(
        tap(() => {
          this.saldoSubject.next(novoSaldo);
        }),
        catchError((error) => {
          console.error('Erro ao atualizar saldo:', error);
          return throwError(() => new Error('Erro ao atualizar saldo'));
        }),
      );
  }

  buscarTransacoes(dataInicial: string, dataFinal: string) {
    return this.http
      .get<
        any[]
      >(`http://localhost:3000/transacoes?data_gte=${dataInicial}&data_lte=${dataFinal}`)
      .pipe(
        catchError((error) => {
          console.error('Erro ao buscar transações:', error);
          return throwError(() => new Error('Erro ao carregar transações'));
        }),
      );
  }
}
