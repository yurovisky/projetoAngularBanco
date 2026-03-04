import { Component } from '@angular/core';
import { Pages } from '../../constants/pages.enum';
import { RouterService } from '../../core/services/router/router.service';

@Component({
  selector: 'app-transferencias',
  imports: [],
  templateUrl: './transferencias.component.html',
  styleUrl: './transferencias.component.css',
})
export class TransferenciasComponent {
  Pages = Pages;
  constructor(public routerService: RouterService) {}
}
