import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { PopupCriarEntradaComponent } from '../popup-criar-entrada/popup-criar-entrada.component';
import { EntradaService } from '../../services/entradas.service';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

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

  exportarExcel(): void {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Entradas');

    // Cabeçalhos
    worksheet.columns = [
      { header: 'Entrada', key: 'entrada', width: 25 },
      { header: 'Tipo de Entrada', key: 'tipo', width: 25 },
      { header: 'Data', key: 'data', width: 15 },
      { header: 'Valor (R$)', key: 'valor', width: 15 }
    ];

    // Adiciona os dados
    this.entradas.forEach(inv => {
      worksheet.addRow({
        entrada: inv.entrada,
        tipo: inv.tipo,
        data: new Date(inv.data).toLocaleDateString('pt-BR', { month: '2-digit', year: 'numeric' }),
        valor: inv.valor.toFixed(2).replace('.', ',')
      });
    });

    // Gera o buffer e baixa o arquivo
    workbook.xlsx.writeBuffer().then(buffer => {
      const blob = new Blob([buffer], { type: 'application/octet-stream' });
      saveAs(blob, 'minhas-entradas.xlsx');
    });
  }
}
