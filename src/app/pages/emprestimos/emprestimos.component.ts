import { Component } from '@angular/core';
import { RouterService } from '../../core/services/router/router.service';
import { Pages } from '../../constants/pages.enum';
import { EmprestimosService } from '../../core/services/emprestimos/emprestimos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-emprestimos',
  imports: [CommonModule],
  templateUrl: './emprestimos.component.html',
  styleUrl: './emprestimos.component.css',
})
export class EmprestimosComponent {
  Pages = Pages;
  constructor(
    public routerService: RouterService,
    private emprestimoService: EmprestimosService,
  ) {}

  emprestimos: any[] = [];

  ngOnInit() {
    this.carregarEmprestimos();
  }

  carregarEmprestimos() {
    this.emprestimoService.getEmprestimos().subscribe({
      next: (data) => {
        this.emprestimos = data;
      },
      error: (err) => {
        console.error('Erro ao buscar empréstimos', err);
      },
    });
  }
}
