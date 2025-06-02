import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class SaidaService {
  private api = 'http://localhost:3000/api/saidas';

  constructor(private http: HttpClient) {}

  criarSaida(dados: any) {
    return this.http.post(this.api, dados);
  }

  listarSaidas(usuarioId: string) {
    return this.http.get<any[]>(`http://localhost:3000/api/saidas/${usuarioId}`);
  }

  listarTotaisPorTipo(usuarioId: string) {
    return this.http.get<any[]>(`http://localhost:3000/api/saidas/totaisPorTipo/${usuarioId}`);
  }

  calcTotal(usuarioId: string) {
    return this.http.get<any[]>(`http://localhost:3000/api/saidas/total/${usuarioId}`);
  }

  calcTotalMes(usuarioId: string, mes: string) {
    return this.http.get<any[]>(`http://localhost:3000/api/saidas/total/${usuarioId}/${mes}`);
  }

  atualizarSaida(id: number, dados: any) {
    return this.http.put(`${this.api}/${id}`, dados);
  }

  deletarSaida(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
