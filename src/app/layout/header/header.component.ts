import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  DestroyRef,
  inject,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../core/services/autenticacao/auth.service';
import { AccountStateService } from '../../core/services/account-state.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly accountState = inject(AccountStateService);
  readonly authService = inject(AuthService);

  accountName = 'Cliente';
  isLight = false;
  private isBrowser: boolean;

  constructor(
    private readonly translate: TranslateService,
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.accountState.account$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((account) => {
        this.accountName = account?.name ?? 'Cliente';
      });

    if (this.isBrowser) {
      try {
        const stored = localStorage.getItem('theme');
        this.isLight = stored === 'light';
      } catch (e) {
        this.isLight = false;
      }
      this.applyTheme();
    }
  }

  mudarIdioma(idioma: string) {
    this.translate.use(idioma);
  }

  toggleTheme() {
    this.isLight = !this.isLight;
    if (this.isBrowser) {
      try {
        localStorage.setItem('theme', this.isLight ? 'light' : 'dark');
      } catch (e) {}
      this.applyTheme();
    }
  }

  logout() {
    this.authService.logout();
  }

  private applyTheme() {
    if (this.isBrowser) {
      const root = document.documentElement;
      if (this.isLight) root.classList.add('light');
      else root.classList.remove('light');
    }
  }
}
