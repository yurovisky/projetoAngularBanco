import { Component } from '@angular/core';
import { Pages } from '../../constants/pages.enum';
import { RouterService } from '../../core/services/router/router.service';
import { RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-transferencias',
  imports: [RouterModule, RouterOutlet],
  templateUrl: './transferencias.component.html',
  styleUrl: './transferencias.component.css',
})
export class TransferenciasComponent {
  Pages = Pages;
  constructor(public routerService: RouterService) {}
}
