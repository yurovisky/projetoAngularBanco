import { Component } from '@angular/core';
import { HeaderComponent } from './layout/header/header.component';
import { MainPanelComponent } from './layout/main-panel/main-panel.component';
import { SideBarComponent } from './layout/side-bar/side-bar.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    MainPanelComponent,
    SideBarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.translate.setFallbackLang('pt-br');
    this.translate.use('pt-br');
  }
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  obs = new Observable((observer) => {
    observer.next(1);
  });

  ngOnInit(): void {}
}
