import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pages } from '../../constants/pages.enum';
import { MenuItem } from '../../Models/menu_model';
import { RouterService } from '../../core/services/router/router.service';
import { Observable, Subscribable } from 'rxjs';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent {
  currentPage$: Observable<Pages>;

  constructor(private routerService: RouterService) {
    this.currentPage$ = this.routerService.currentPage$;
  }
  //criando os itens de menu usando a interface MenuItem
  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'fa-solid fa-chart-line',
      page: Pages.DASHBOARD,
    },
    {
      label: 'Extrato',
      icon: 'fa-solid fa-file-invoice-dollar',
      page: Pages.EXTRATO,
    },
    {
      label: 'Emprestimos',
      icon: 'fa-solid fa-landmark',
      page: Pages.EMPRESTIMOS,
    },
    {
      label: 'Investimentos',
      icon: 'fa-solid fa-money-bill-trend-up',
      page: Pages.INVESTIMENTOS,
    },
    {
      label: 'Transferências',
      icon: 'fa-solid fa-arrow-right-arrow-left',
      page: Pages.TRANSFERENCIAS,
    },
    {
      label: 'Cartões',
      icon: 'fa-solid fa-credit-card',
      page: Pages.CARTOES,
    },
  ];

  irPara(page: Pages): void {
    this.routerService.setToPage(page);
  }
}
