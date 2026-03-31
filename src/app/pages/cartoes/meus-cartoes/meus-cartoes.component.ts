import { Component, OnInit } from '@angular/core';
import { CartoesService } from '../../../core/services/cartoes/cartoes.service';
import { Cartoes } from '../../../Models/cartao.model';
import { CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterService } from '../../../core/services/router/router.service';
import { Pages } from '../../../constants/pages.enum';
import Swal from 'sweetalert2';

import {
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NovoCartao } from '../../../Models/novoCartao.model';

@Component({
  selector: 'app-meus-cartoes',
  imports: [CurrencyPipe, CommonModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './meus-cartoes.component.html',
  styleUrl: './meus-cartoes.component.css',
})
export class MeusCartoesComponent implements OnInit {
  private snackBar: MatSnackBar = new MatSnackBar();
  cartoes: Cartoes[] = [];
  Pages = Pages;

  cartaoEmEdicao: any | null = null;
  novoLimiteControl = new FormControl<number | null>(null, {
    validators: [Validators.required, Validators.min(100)],
  });

  constructor(
    public cartoesService: CartoesService,
    public routerService: RouterService,
  ) {}

  ngOnInit() {
    this.cartoesService.getCartoes().subscribe({
      next: (cartoes) => {
        this.cartoes = cartoes;
        console.log(this.cartoes);
      },
      error: (error) => {
        console.error('Erro ao carregar cartões:', error);
      },
    });
  }

  editarLimite(cartao: any) {
    this.cartaoEmEdicao = cartao;
  }

  fecharEdicao() {
    this.cartaoEmEdicao = null;
  }

  confirmarEdicaoLimite(cartao: Cartoes) {
    this.validarNovoLimite(cartao);

    if (this.novoLimiteControl.invalid) {
      this.snackBar.open(
        'Valor inválido! O valor máximo permitido é R$ ' + cartao.limiteTotal,
        'Fechar',
        {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        },
      );
      return;
    }

    const novoLimite = this.novoLimiteControl.value;
    if (novoLimite === null) {
      console.error('Novo limite não pode ser nulo');
      return;
    }

    this.cartoesService.editarLimite(cartao, novoLimite).subscribe({
      next: (response) => {
        this.snackBar.open('Limite atualizado com sucesso!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
        this.fecharEdicao();
        this.ngOnInit();
      },
      error: (error) => {
        console.error('Erro ao atualizar limite:', error);
      },
    });
  }

  validarNovoLimite(cartao: any) {
    this.cartaoEmEdicao = cartao;
    console.log(cartao.limiteTotal);

    this.novoLimiteControl.setValidators([
      Validators.required,
      Validators.min(100),
      Validators.max(cartao.limiteTotal),
    ]);
    this.novoLimiteControl.updateValueAndValidity();
  }

  mostrarFormNovoCartao = false;

  novoCartaoForm = new FormGroup({
    tipo: new FormControl<'credito' | 'debito'>('credito', {
      nonNullable: true,
    }),
    bandeira: new FormControl<'Visa' | 'Mastercard' | 'Elo' | 'Amex'>('Visa', {
      nonNullable: true,
    }),
    dependenteId: new FormControl<number | null>(null),
  });

  abrirFormNovoCartao() {
    this.mostrarFormNovoCartao = true;
  }

  fecharFormNovoCartao() {
    this.mostrarFormNovoCartao = false;
    this.novoCartaoForm.reset({
      tipo: 'credito',
      bandeira: 'Visa',
      dependenteId: null,
    });
  }
  criarCartao() {
    const formValue = this.novoCartaoForm.getRawValue();

    const novoCartao: NovoCartao = {
      numero: '1234123456785678',
      validade: '12/28',
      nome: 'Yuri Dellaretti',
      cvv: '123',
      tipo: formValue.tipo,
      bandeira: formValue.bandeira,
      dependenteId: formValue.dependenteId!,
      limiteTotal: 5000,
      limiteAtual: 5000,
      saldo: 0,
    };
    this.cartoesService.criarCartao(novoCartao).subscribe({
      next: (response) => {
        this.snackBar.open('Cartão criado com sucesso!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
        this.fecharFormNovoCartao();
        this.ngOnInit();
      },
      error: (error) => {
        console.error('Erro ao criar cartão:', error);
      },
    });
  }

  excluirCartao(cartao: Cartoes) {
    Swal.fire({
      title: 'Confirmar exclusão do cartão?',
      html: `
          <p><strong>Cartão:</strong> ${cartao.numero}</p>
          <p><strong>Tipo:</strong> ${cartao.tipo}</p>
          <p><strong>Bandeira:</strong> ${cartao.bandeira}</p>
        `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#198754',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartoesService.excluirCartao(cartao.id).subscribe({
          next: (response) => {
            this.snackBar.open('Cartão excluído com sucesso!', 'Fechar', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            });
            this.fecharFormNovoCartao();
            this.ngOnInit();
          },
          error: (error) => {
            this.snackBar.open('Erro ao excluir cartão!', 'Fechar', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            });
          },
        });
      }
    });
  }
}
