import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { PopupCriarEntradaComponent } from '../popup-criar-entrada/popup-criar-entrada.component';
import { EntradaService } from '../../services/entradas.service';

@Component({
  selector: 'app-entradas',
  standalone: true,
  imports: [
    CommonModule,
    PopupCriarEntradaComponent,
    NavbarComponent
  ],
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.css']
})
export class EntradasComponent implements OnInit {
  isPopupVisible = false;
  entradaParaEditar: any = null;
  entradas: any[] = [];
  usuarioId: string = '';

  constructor(private entradaService: EntradaService) {}

  ngOnInit(): void {
    this.usuarioId = localStorage.getItem('usuarioId') || '';
    if (this.usuarioId) {
      this.carregarEntradas();
    }
  }

  // Mostra popup de criação de entrada
  showPopup() {
    this.entradaParaEditar = null; // Garante que está criando, não editando
    this.isPopupVisible = true;
  }

  // Mostra popup para editar entrada
  editarEntrada(entrada: any) {
    this.entradaParaEditar = entrada; // Passa os dados da entrada para o popup
    this.isPopupVisible = true;
  }

  hidePopup() {
    this.isPopupVisible = false;
    this.entradaParaEditar = null; // Reseta variáveis
  }

  // Método para carregar as entradas do usuário
  carregarEntradas() {
    this.entradaService.listarEntradas(this.usuarioId).subscribe({
      next: (dados: any[]) => this.entradas = dados,
      error: () => alert('Erro ao carregar entradas.')
    });
  }

  // Método que é chamado após a criação de uma nova entrada
  onEntradaCriada() {
    this.carregarEntradas(); // Atualiza a lista após nova entrada
  }

  // Método para excluir uma entrada
  excluirEntrada(id: number) {
    const confirmacao = confirm('Tem certeza que deseja excluir esta entrada?');
    if (!confirmacao) return;

    this.entradaService.deletarEntrada(id).subscribe({
      next: () => {
        this.carregarEntradas(); // Atualiza a lista após excluir
      },
      error: () => {
        alert('Erro ao excluir entrada.');
      }
    });
  }
}
