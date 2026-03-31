import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  constructor(private http: HttpClient) {}

  getPerfil() {
    return this.http
      .get<{
        nome: string;
        email: string;
        telefone: string;
        cpf: string;
        dataNascimento: string;
        endereco: {
          rua: string;
          numero: string;
          bairro: string;
          cidade: string;
          estado: string;
          cep: string;
        };
      }>('http://localhost:3000/DadosUsuario')
      .pipe(
        catchError((error) => {
          console.error('Erro ao buscar perfil:', error);
          return throwError(() => new Error('Erro ao carregar perfil'));
        }),
      );
  }
}
