import { Component } from '@angular/core';
import { RouterService } from '../../core/services/router/router.service';
import { Pages } from '../../constants/pages.enum';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cartoes',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './cartoes.component.html',
  styleUrl: './cartoes.component.css',
})
export class CartoesComponent {
  Pages = Pages;
  constructor(public routerService: RouterService) {}
}
