import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransacoesService } from '../../core/services/transacoes/transacoes.service';
import { Transacao } from '../../Models/transacao.model';
import { FormsModule } from '@angular/forms';
import { ContaService } from '../../core/services/conta/conta.service';

@Component({
  selector: 'app-transactions-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.css'],
})
export class TransactionsListComponent implements OnInit {
  transacoes: Transacao[] = [];
  dataInicial: any;
  dataFinal: any;

  constructor(
    private transacoesService: TransacoesService,
    private contaservice: ContaService,
  ) {}

  ngOnInit(): void {
    this.transacoesService.getTransacoes().subscribe({
      next: (data) => {
        this.transacoes = data.map((t) => ({ ...t, valor: Math.abs(t.valor) }));
      },
      error: (err) => {
        console.error('Erro ao carregar transações:', err);
      },
    });
  }

  filtrar() {
    this.contaservice
      //em um backend real, faríamos a vconversao do campo data de datetime pra date para que retorne corretamente quando se usa o filtro
      .buscarTransacoes(this.dataInicial, this.dataFinal)
      .subscribe({
        next: (data) => {
          this.transacoes = data.map((t) => ({
            ...t,
            valor: Math.abs(t.valor),
          }));
        },
        error: (err) => {
          console.error('Erro ao carregar transações:', err);
        },
      });
  }
}
