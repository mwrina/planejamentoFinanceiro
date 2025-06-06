import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class EntradaService {
  private api = 'http://localhost:3000/api/entradas';

  constructor(private http: HttpClient) {}

  criarEntrada(dados: any) {
    return this.http.post(this.api, dados);
  }

  listarEntradas(usuarioId: string) {
    return this.http.get<any[]>(`http://localhost:3000/api/entradas/${usuarioId}`);
  }

  calcTotal(usuarioId: string) {
    return this.http.get<any[]>(`http://localhost:3000/api/entradas/total/${usuarioId}`);
  }

  calcTotalMes(usuarioId: string, mes: string) {
    return this.http.get<any[]>(`http://localhost:3000/api/entradas/total/${usuarioId}/${mes}`);
  }


  atualizarEntrada(id: number, dados: any) {
    return this.http.put(`${this.api}/${id}`, dados);
  }

  deletarEntrada(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
