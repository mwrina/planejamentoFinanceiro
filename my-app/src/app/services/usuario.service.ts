import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/api/usuarios';

  constructor(private http: HttpClient) {}

  // Método para criar um usuário
  criarUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/criar`, usuario);
  }

  // Método para login do usuário
  login(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, usuario);
  }
}
