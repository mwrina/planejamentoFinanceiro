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

  obterSaldoMes(usuarioId: number, mes: string) {
    return this.http.get<any[]>(`http://localhost:3000/api/cofrinho/${usuarioId}/${mes}`);
  }

  atualizarCofrinho(id: number, dados: any) {
    return this.http.put(`${this.apiUrl}/${id}`, dados);
  }

  excluirCofrinho(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
