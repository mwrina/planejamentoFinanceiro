import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { PopupCriarSaidaComponent } from '../popup-criar-saida/popup-criar-saida.component';
import { SaidaService } from '../../services/saidas.service';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-saidas',
  standalone: true,
  imports: [
    CommonModule,
    PopupCriarSaidaComponent,
    NavbarComponent
  ],
  templateUrl: './saidas.component.html',
  styleUrl: './saidas.component.css'
})
export class SaidasComponent {
  isPopupVisible = false;
  saidaParaEditar: any = null;
  saidas: any[] = [];
  usuarioId!: number;

  constructor(private saidaService: SaidaService) {}

  ngOnInit(): void {
    const id = localStorage.getItem('usuarioId');
    if (id && !isNaN(+id)) {
      this.usuarioId = +id; // converte para number
      this.carregarSaidas();
    } else {
    alert('Usuário não identificado!');
  }
  }

  // Mostra popup de criação de saída
  showPopup() {
    this.saidaParaEditar = null; // Garante que está criando, não editando
    this.isPopupVisible = true;
  }

  // Mostra popup para editar saída
  editarSaida(Saida: any) {
    this.saidaParaEditar = Saida; // Passa os dados da saída para o popup
    this.isPopupVisible = true;
  }

  hidePopup() {
    this.isPopupVisible = false;
    this.saidaParaEditar = null; // Reseta variáveis
  }

  // Método para carregar as saídas do usuário
  carregarSaidas() {
    this.saidaService.listarSaidas(this.usuarioId.toString()).subscribe({
      next: (dados: any[]) => this.saidas = dados,
      error: () => alert('Erro ao carregar saídas.')
    });
  }

  // Método que é chamado após a criação de uma nova saída
  onSaidaCriada() {
    this.carregarSaidas(); // Atualiza a lista após nova saída
  }

  // Método para excluir uma saída
  excluirSaida(id: number) {
    const confirmacao = confirm('Tem certeza que deseja excluir esta saída?');
    if (!confirmacao) return;

    this.saidaService.deletarSaida(id).subscribe({
      next: () => {
        this.carregarSaidas(); // Atualiza a lista após excluir
      },
      error: () => {
        alert('Erro ao excluir saída.');
      }
    });
  }

    exportarExcel(): void {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Saidas');

      // Cabeçalhos
      worksheet.columns = [
        { header: 'Saída', key: 'saida', width: 25 },
        { header: 'Tipo de Saída', key: 'tipo', width: 25 },
        { header: 'Data', key: 'data', width: 15 },
        { header: 'Valor (R$)', key: 'valor', width: 15 }
      ];

      // Adiciona os dados
      this.saidas.forEach(inv => {
        worksheet.addRow({
          saida: inv.saida,
          tipo: inv.tipo,
          data: new Date(inv.data).toLocaleDateString('pt-BR', { month: '2-digit', year: 'numeric' }),
          valor: inv.valor.toFixed(2).replace('.', ',')
        });
      });

      // Gera o buffer e baixa o arquivo
      workbook.xlsx.writeBuffer().then(buffer => {
        const blob = new Blob([buffer], { type: 'application/octet-stream' });
        saveAs(blob, 'minhas-saidas.xlsx');
      });
    }
}
