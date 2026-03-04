import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NovoEmprestimo } from '../../../Models/novoEmprestimo.model';
import { ContaService } from '../../../core/services/conta/conta.service';
import { TransacoesService } from '../../../core/services/transacoes/transacoes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmprestimosService } from '../../../core/services/emprestimos/emprestimos.service';
import { NovaTransacao } from '../../../Models/transacao.model';

@Component({
  selector: 'app-emprestimos-pessoais',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './emprestimos-pessoais.component.html',
  styleUrl: './emprestimos-pessoais.component.css',
})
export class EmprestimosPessoaisComponent {
  constructor(
    private emrestimosService: EmprestimosService,
    private fb: FormBuilder,
    private contaService: ContaService,
    private transacoesService: TransacoesService,
  ) {}
  private snackBar: MatSnackBar = new MatSnackBar();
  resultadoSimulacao?: {
    valorTotal: string;
    valorParcela: string;
  };

  podeSolicitar = false;

  emprestimoForm!: FormGroup;

  ngOnInit() {
    this.emprestimoForm = this.fb.group({
      valorSolicitado: [
        null,
        [Validators.required, Validators.min(1), Validators.max(50000)],
      ],

      parcelas: [
        null,
        [Validators.required, Validators.min(1), Validators.max(48)],
      ],

      taxaJuros: [{ value: 2, disabled: true }, Validators.required],
    });
  }

  calcularEmprestimo() {
    if (this.emprestimoForm.invalid) {
      this.emprestimoForm.markAllAsTouched();
      console.log('invalido');

      return;
    }

    const formValue = this.emprestimoForm.getRawValue();
    const valorSolicitado = formValue.valorSolicitado!;
    const parcelas = formValue.parcelas!;
    const taxaJuros = formValue.taxaJuros!;

    const valorTotal =
      valorSolicitado * Math.pow(1 + taxaJuros / 100, parcelas);

    const valorParcela = valorTotal / parcelas;

    this.resultadoSimulacao = {
      valorTotal: valorTotal.toFixed(2),
      valorParcela: valorParcela.toFixed(2),
    };
    this.podeSolicitar = true;
  }

  solicitarEmprestimo() {
    const formValue = this.emprestimoForm.getRawValue();
    const novoEmprestimo: NovoEmprestimo = {
      valor: formValue.valorSolicitado!,
      parcelas: formValue.parcelas!,
      taxaJuros: 2,
      saldoDevedor: formValue.valorSolicitado!,
      data: new Date().toISOString(),
      status: 'ativo',
      contaId: 1,
      tipo: 'pessoal',
      tipoId: 1,
    };
    this.emrestimosService.solicitarEmprestimo(novoEmprestimo).subscribe({
      next: (response) => {
        this.snackBar.open('Empréstimo solicitado com sucesso!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
        this.cadastrarTransacao(novoEmprestimo.valor);
      },
      error: (error) => {
        this.snackBar.open('Erro ao solicitar empréstimo!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      },
    });
  }

  cadastrarTransacao(valor: number) {
    const novaTransacao: NovaTransacao = {
      data: new Date().toISOString(),
      tipo: 'entrada',
      valor: valor,
      descricao: `Empréstimo pessoal - R$ ${valor.toFixed(2)}`,
      contaId: 1,
      categoria: 'emprestimo',
    };

    this.transacoesService.addTransacao(novaTransacao).subscribe({
      next: () => {
        this.contaService.alterarSaldo(valor).subscribe({
          next: () => {
            alert('Empréstimo cadastrado com sucesso!');
          },
          error: (err) => {
            alert('Erro ao atualizar saldo: ' + err.message);
          },
        });
      },
      error: (err) => {
        alert('Erro ao enviar Pix: ' + err.message);
        console.error('Erro técnico:', err);
      },
    });
  }
}
