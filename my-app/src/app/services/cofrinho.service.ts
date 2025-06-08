import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CofrinhoService {
  private apiUrl = 'http://localhost:3000/api/cofrinho';

  constructor(private http: HttpClient) { }

  criarCofrinho(dados: any) {
    return this.http.post(`${this.apiUrl}`, dados);
  }

  obterSaldoMes(usuarioId: string, mes: string) {
    return this.http.get<any[]>(`${this.apiUrl}/${usuarioId}/${mes}`);
  }

  obterHistoricoAnual(usuarioId: string) {
    return this.http.get<any[]>(`${this.apiUrl}/historico/${usuarioId}`);
  }

  atualizarCofrinho(id: number, dados: any) {
    return this.http.put(`${this.apiUrl}/${id}`, dados);
  }

  excluirCofrinho(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
