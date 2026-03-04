import { Injectable } from '@angular/core';
import { Pages } from '../../../constants/pages.enum';
import { BehaviorSubject } from 'rxjs';
// injectble é um decorador que torna a classe injetável em outros componentes ou serviços, permitindo que seja compartilhada e reutilizada em toda a aplicação. O providedIn: 'root' indica
@Injectable({
  //providedIn: 'root' torna o serviço disponível em toda a aplicação, garantindo que haja apenas uma instância do serviço em todo o aplicativo, o que é útil para compartilhar dados e funcionalidades entre diferentes componentes.
  providedIn: 'root',
})
export class RouterService {
  //behavirouSubject é uma classe do RxJS que permite criar um fluxo de dados que pode ser observado por outros componentes ou serviços. Ele é usado para armazenar e emitir o estado atual da página, permitindo que outros componentes se inscrevam para receber atualizações quando a página for alterada. Ex, fiz transferencia, a aba de saldo ja vai atualzar o valor sem precisar de uma nova requisição ao servidor.
  currentPageSubject = new BehaviorSubject<Pages>(Pages.DASHBOARD);

  currentPage$ = this.currentPageSubject.asObservable();

  setToPage(page: Pages): void {
    console.log(page);
    this.currentPageSubject.next(page);
  }
  getCurrentPage(): Pages {
    return this.currentPageSubject.getValue();
  }
}
