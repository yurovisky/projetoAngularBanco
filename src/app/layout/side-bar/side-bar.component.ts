import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../core/services/autenticacao/auth.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent {
  readonly authService = inject(AuthService);
  menuItems = [
    {
      label: 'MENU.DASHBOARD',
      icon: 'fa-solid fa-chart-line',
      route: '/dashboard',
    },
    {
      label: 'MENU.EXTRATO',
      icon: 'fa-solid fa-file-invoice-dollar',
      route: '/transacoes',
    },
    {
      label: 'MENU.EMPRESTIMOS',
      icon: 'fa-solid fa-landmark',
      route: '/emprestimo',
    },
    {
      label: 'MENU.INVESTIMENTOS',
      icon: 'fa-solid fa-money-bill-trend-up',
      route: '/investimentos',
    },
    {
      label: 'MENU.TRANSFERENCIAS',
      icon: 'fa-solid fa-arrow-right-arrow-left',
      route: '/transferencia',
    },
    {
      label: 'MENU.CARTOES',
      icon: 'fa-solid fa-credit-card',
      route: '/cartoes',
    },
    {
      label: 'MENU.PERFIL',
      icon: 'fa-solid fa-user',
      route: '/perfil',
    },
  ];

  logout() {
    this.authService.logout();
  }
}
