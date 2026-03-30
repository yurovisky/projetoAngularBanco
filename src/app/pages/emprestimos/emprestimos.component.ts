import { Component, Signal } from '@angular/core';
import { RouterService } from '../../core/services/router/router.service';
import { Pages } from '../../constants/pages.enum';
import { EmprestimosService } from '../../core/services/emprestimos/emprestimos.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-emprestimos',
  imports: [CommonModule, RouterModule],
  templateUrl: './emprestimos.component.html',
  styleUrl: './emprestimos.component.css',
})
export class EmprestimosComponent {
  Pages = Pages;
  emprestimos!: Signal<any[]>;

  constructor(
    public routerService: RouterService,
    private emprestimoService: EmprestimosService,
  ) {
    this.emprestimos = toSignal(
      this.emprestimoService.getEmprestimos().pipe(catchError(() => of([]))),
      { initialValue: [] },
    );
  }
}
