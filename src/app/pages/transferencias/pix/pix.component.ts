import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContaService } from '../../../core/services/conta/conta.service';
import { TransacoesService } from '../../../core/services/transacoes/transacoes.service';
import { NovaTransacao } from '../../../Models/transacao.model';
import Swal from 'sweetalert2';
// aqui usei o formsModule melhor para formulários pequenos,
//ReactiveFormsModule melhor para formulários grandes e complexos, mas ambos funcionariam bem nesse caso específico

@Component({
  selector: 'app-pix',
  imports: [CommonModule, FormsModule],
  templateUrl: './pix.component.html',
  styleUrl: './pix.component.css',
})
export class PixComponent {
  chave: string = '';
  valor: number | null = null;
  descricao: string = '';
  tipoChave: string = '';

  constructor(
    private contaservice: ContaService,
    private transacoesService: TransacoesService,
  ) {}

  onChaveChange(): void {
    this.tipoChave = this.detectTipoChave(this.chave);
  }

  enviarPix(): void {
    const valorPix = this.valor;
    if (!this.chave || !valorPix || valorPix <= 0) {
      alert('Por favor, preencha a chave e o valor corretamente.');
      return;
    }

    Swal.fire({
      title: 'Confirmar envio?',
      html: `
      <p><strong>Chave:</strong> ${this.chave}</p>
      <p><strong>Tipo:</strong> ${this.tipoChave}</p>
      <p><strong>Valor:</strong> R$ ${valorPix.toFixed(2)}</p>
      <p><strong>Descrição:</strong> ${this.descricao}</p>
    `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#198754',
    }).then((result) => {
      if (result.isConfirmed) {
        this.confirmarEnvioPix(valorPix);
      }
    });
  }

  confirmarEnvioPix(valorPix: number): void {
    const novaTransacao: NovaTransacao = {
      data: new Date().toISOString(),
      tipo: 'saída',
      valor: valorPix,
      descricao: `Pix para ${this.chave} (${this.tipoChave}) - ${this.descricao}`,
      contaId: 1,
      categoria: 'pix',
    };

    this.transacoesService.addTransacao(novaTransacao).subscribe({
      next: () => {
        this.contaservice.alterarSaldo(-valorPix).subscribe({
          next: () => {
            alert('Pix enviado com sucesso!');
          },
          error: (err) => {
            alert('Erro ao atualizar saldo: ' + err.message);
          },
        });
        this.chave = '';
        this.valor = 0;
        this.descricao = '';
      },
      error: (err) => {
        alert('Erro ao enviar Pix: ' + err.message);
        console.error('Erro técnico:', err);
      },
    });
  }

  detectTipoChave(chave: string): 'CPF' | 'Telefone' | 'Email' | 'Outro' {
    const valor = chave.trim();
    if (valor.includes('@')) return 'Email';
    const apenasNumeros = valor.replace(/\D/g, '');
    if (apenasNumeros.length === 11) return 'CPF';
    if (apenasNumeros.length === 10 || apenasNumeros.length === 11)
      return 'Telefone';
    return 'Outro';
  }
}
