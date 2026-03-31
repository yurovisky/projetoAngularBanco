import { Component } from '@angular/core';
import { RouterService } from '../../core/services/router/router.service';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartoesService } from '../../core/services/cartoes/cartoes.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { inject } from '@angular/core';

@Component({
  selector: 'app-cartoes',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './cartoes.component.html',
  styleUrl: './cartoes.component.css',
})
export class CartoesComponent {
  private cartoesService = inject(CartoesService);

  cartoes = toSignal(this.cartoesService.getCartoes(), {
    initialValue: [],
  });

  constructor(public routerService: RouterService) {}
}
