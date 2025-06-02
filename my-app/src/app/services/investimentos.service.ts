import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class InvestimentoService {
  private api = 'http://localhost:3000/api/investimentos';

  constructor(private http: HttpClient) {}

  criarInvestimento(dados: any) {
    return this.http.post(this.api, dados);
  }

  listarInvestimentos(usuarioId: string) {
    return this.http.get<any[]>(`http://localhost:3000/api/investimentos/${usuarioId}`);
  }

  calcTotal(usuarioId: string) {
    return this.http.get<any[]>(`http://localhost:3000/api/investimentos/total/${usuarioId}`);
  }

  calcTotalMes(usuarioId: string, mes: string) {
    return this.http.get<any[]>(`http://localhost:3000/api/investimentos/total/${usuarioId}/${mes}`);
  }

  atualizarInvestimento(id: number, dados: any) {
    return this.http.put(`${this.api}/${id}`, dados);
  }

  deletarInvestimento(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
