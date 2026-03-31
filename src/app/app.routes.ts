import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuard } from './core/services/guards/auth.guard';

export const routes: Routes = [
  //  rota pública
  { path: 'login', component: LoginComponent },

  // rotas protegidas
  {
    path: '',
    loadComponent: () =>
      import('./layout/main-panel/main-panel.component').then(
        (c) => c.MainPanelComponent,
      ),
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(
            (c) => c.DashboardComponent,
          ),
      },

      {
        path: 'transferencia',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/transferencias/transferencias.component').then(
                (c) => c.TransferenciasComponent,
              ),
          },
          {
            path: 'pix',
            loadComponent: () =>
              import('./pages/transferencias/pix/pix.component').then(
                (c) => c.PixComponent,
              ),
          },
          {
            path: 'outras-transferencias',
            loadComponent: () =>
              import('./pages/transferencias/outras-transferencias/outras-transferencias.component').then(
                (c) => c.OutrasTransferenciasComponent,
              ),
          },
        ],
      },

      {
        path: 'emprestimo',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/emprestimos/emprestimos.component').then(
                (c) => c.EmprestimosComponent,
              ),
          },
          {
            path: 'emprestimos-pessoais',
            loadComponent: () =>
              import('./pages/emprestimos/emprestimos-pessoais/emprestimos-pessoais.component').then(
                (c) => c.EmprestimosPessoaisComponent,
              ),
          },
        ],
      },

      {
        path: 'cartoes',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/cartoes/cartoes.component').then(
                (c) => c.CartoesComponent,
              ),
          },
          {
            path: 'meus-cartoes',
            loadComponent: () =>
              import('./pages/cartoes/meus-cartoes/meus-cartoes.component').then(
                (c) => c.MeusCartoesComponent,
              ),
          },
        ],
      },

      {
        path: 'transacoes',
        loadComponent: () =>
          import('./pages/transactions-list/transactions-list.component').then(
            (c) => c.TransactionsListComponent,
          ),
      },
      {
        path: 'perfil',
        loadComponent: () =>
          import('./pages/perfil/perfil.component').then(
            (c) => c.PerfilComponent,
          ),
      },

      // redirect interno
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  // fallback
  { path: '**', component: NotFoundComponent },
];
