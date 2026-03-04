import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pages } from '../../constants/pages.enum';
import { ContaService } from '../../core/services/conta/conta.service';
import { TransacoesService } from '../../core/services/transacoes/transacoes.service';
import { RouterService } from '../../core/services/router/router.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  saldo: number = 0;
  movimentacoes: any[] = [];
  entradas: number = 0;
  saidas: number = 0;
  Pages = Pages;
  mensagemErro: string = '';

  constructor(
    private contaService: ContaService,
    private transacoesService: TransacoesService,
    public routerService: RouterService,
  ) {}

  ngOnInit() {
    this.transacoesService.getTransacoes().subscribe({
      next: (dados) => {
        this.movimentacoes = dados;
        this.calcularEntradasESaidas(dados);
      },
      error: (err) => {
        this.mensagemErro = err.message;
      },
    });

    this.contaService.getDadosDaConta().subscribe({
      next: (conta) => {
        this.saldo = conta.saldo;
      },
      error: (err) => {
        this.mensagemErro = err.message;
      },
    });
  }

  calcularEntradasESaidas(transacoes: any[]) {
    this.entradas = transacoes
      .filter((t) => t.tipo === 'entrada')
      .reduce((acc, t) => acc + t.valor, 0);

    this.saidas = transacoes
      .filter((t) => t.tipo === 'saída')
      .reduce((acc, t) => acc + t.valor, 0);
  }
}
