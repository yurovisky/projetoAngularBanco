import { Component } from '@angular/core';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { TransactionsListComponent } from '../../pages/transactions-list/transactions-list.component';
import { EmprestimosComponent } from '../../pages/emprestimos/emprestimos.component';
import { InvestimentosComponent } from '../../pages/investimentos/investimentos.component';
import { CartoesComponent } from '../../pages/cartoes/cartoes.component';
import { MeusCartoesComponent } from '../../pages/cartoes/meus-cartoes/meus-cartoes.component';
import { Pages } from '../../constants/pages.enum';
import { CommonModule } from '@angular/common';
import { RouterService } from '../../core/services/router/router.service';
import { TransferenciasComponent } from '../../pages/transferencias/transferencias.component';
import { PixComponent } from '../../pages/transferencias/pix/pix.component';
import { OutrasTransferenciasComponent } from '../../pages/transferencias/outras-transferencias/outras-transferencias.component';
import { EmprestimosPessoaisComponent } from '../../pages/emprestimos/emprestimos-pessoais/emprestimos-pessoais.component';

@Component({
  selector: 'app-main-panel',
  standalone: true,
  imports: [
    CommonModule,
    DashboardComponent,
    TransactionsListComponent,
    EmprestimosComponent,
    InvestimentosComponent,
    CartoesComponent,
    MeusCartoesComponent,
    TransferenciasComponent,
    PixComponent,
    OutrasTransferenciasComponent,
    EmprestimosPessoaisComponent,
  ],
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.css'],
})
export class MainPanelComponent {
  constructor(private routerService: RouterService) {}

  get currentPage$() {
    return this.routerService.currentPage$;
  }

  Pages = Pages;
}
// destuir o componente quando ele não estiver mais carregado, para evitar que o estado do componente seja mantido mesmo quando ele não estiver mais visível. Isso é útil para liberar recursos e evitar comportamentos indesejados quando o usuário navega para outras páginas.

//usar subscribe quando estiver recebendo dados de uma api por ex pra tratar erros, e o async seria mais recomendado para lidar com dados que mudam com frequência, como o estado da página, pois ele gerencia automaticamente a assinatura e a desinscrição do Observable, evitando vazamentos de memória e garantindo que o componente seja atualizado corretamente quando os dados mudarem.

//pode ser usanto pipe async
