import { Component } from '@angular/core';
import { RouterService } from '../../core/services/router/router.service';
import { Pages } from '../../constants/pages.enum';

@Component({
  selector: 'app-cartoes',
  imports: [],
  templateUrl: './cartoes.component.html',
  styleUrl: './cartoes.component.css',
})
export class CartoesComponent {
  Pages = Pages;
  constructor(public routerService: RouterService) {}
}
