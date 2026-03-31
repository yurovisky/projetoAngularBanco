import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { PerfilService } from '../../core/services/perfil/perfil.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent {
  private perfilService = inject(PerfilService);

  perfil = toSignal(this.perfilService.getPerfil(), {
    initialValue: null,
  });
}
