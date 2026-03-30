import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Account {
  name: string;
  email?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AccountStateService {
  private accountSubject = new BehaviorSubject<Account | null>(null);

  account$ = this.accountSubject.asObservable();

  setAccount(account: Account) {
    this.accountSubject.next(account);
  }

  clear() {
    this.accountSubject.next(null);
  }

  getAccount() {
    return this.accountSubject.value;
  }
}
