import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/api/usuarios';

  constructor(private http: HttpClient) {}

  buscarUsuario(usuario: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${usuario}`);
  }

  criarUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/criar`, usuario);
  }

  atualizarUsuario(usuarioId: string, dados: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/editar/${usuarioId}`, dados);
  }

  login(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, usuario);
  }

  deletarUsuario(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
