import { Component, signal, computed, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, catchError, of, tap } from 'rxjs';
import { Pages } from '../../constants/pages.enum';
import { ContaService } from '../../core/services/conta/conta.service';
import { TransacoesService } from '../../core/services/transacoes/transacoes.service';
import { RouterService } from '../../core/services/router/router.service';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  saldo!: Signal<number>;
  movimentacoes!: Signal<any[]>;
  entradas!: Signal<number>;
  saidas!: Signal<number>;
  Pages = Pages;
  mensagemErro = signal<string>('');

  constructor(
    private contaService: ContaService,
    private transacoesService: TransacoesService,
    public routerService: RouterService,
  ) {
    this.saldo = toSignal(
      this.contaService.getDadosDaConta().pipe(
        tap({
          error: (err: any) => this.mensagemErro.set(err.message),
        }),
        map((conta) => conta.saldo),
        catchError(() => of(0)),
      ),
      { initialValue: 0 },
    );

    this.movimentacoes = toSignal(
      this.transacoesService.getTransacoes().pipe(
        tap({
          error: (err: any) => this.mensagemErro.set(err.message),
        }),
        catchError(() => of([])),
      ),
      { initialValue: [] },
    );

    this.entradas = computed(() =>
      this.movimentacoes()
        .filter((t: any) => t.tipo === 'entrada')
        .reduce((acc: number, t: any) => acc + t.valor, 0),
    );

    this.saidas = computed(() =>
      this.movimentacoes()
        .filter((t: any) => t.tipo === 'saída')
        .reduce((acc: number, t: any) => acc + t.valor, 0),
    );
  }
}
