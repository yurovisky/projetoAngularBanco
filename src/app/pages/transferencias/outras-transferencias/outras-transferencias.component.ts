import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TransacoesService } from '../../../core/services/transacoes/transacoes.service';
import { NovaTransacao } from '../../../Models/transacao.model';
import { ContaService } from '../../../core/services/conta/conta.service';

@Component({
  selector: 'app-outras-transferencias',
  imports: [ReactiveFormsModule],
  templateUrl: './outras-transferencias.component.html',
  styleUrl: './outras-transferencias.component.css',
})
export class OutrasTransferenciasComponent {
  constructor(
    private contaservice: ContaService,
    private transacoesService: TransacoesService,
  ) {}

  form!: FormGroup;
  hoje = new Date().toISOString().substring(0, 10); // Formato YYYY-MM-DD

  ngOnInit(): void {
    this.form = new FormGroup({
      descricao: new FormControl(),
      valor: new FormControl(),
      tipo: new FormControl(),
      data: new FormControl(this.hoje),
      contaId: new FormControl(),
      categoria: new FormControl(),
    });
  }

  onSubmit(): void {
    this.transacoesService
      .addTransacao(this.form.value as NovaTransacao)
      .subscribe({
        next: (transacaoCriada) => {
          this.contaservice.alterarSaldo(-this.form.value.valor).subscribe({
            next: () => {
              alert('Transferência registrada com sucesso!');
            },
            error: (err) => {
              alert('Erro ao atualizar saldo: ' + err.message);
            },
          });
        },
        error: (err) => {
          alert('Erro ao registrar transferência: ' + err.message);
        },
      });
    console.log(this.form.value);
  }
}
