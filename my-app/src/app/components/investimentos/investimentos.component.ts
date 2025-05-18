import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { PopupCriarInvestimentoComponent } from '../popup-criar-investimento/popup-criar-investimento.component';
import { InvestimentoService } from '../../services/investimentos.service';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-investimentos',
  standalone: true,
  imports: [
    CommonModule,
    PopupCriarInvestimentoComponent,
    NavbarComponent
  ],
  templateUrl: './investimentos.component.html',
  styleUrl: './investimentos.component.css'
})
export class InvestimentosComponent {
  isPopupVisible = false;
    investimentoParaEditar: any = null;
    investimentos: any[] = [];
    usuarioId: string = '';

    constructor(private investimentoService: InvestimentoService) {}

    ngOnInit(): void {
      this.usuarioId = localStorage.getItem('usuarioId') || '';
      if (this.usuarioId) {
        this.carregarInvestimentos();
      }
    }

    // Mostra popup de criação de investimento
    showPopup() {
      this.investimentoParaEditar = null; // Garante que está criando, não editando
      this.isPopupVisible = true;
    }

    // Mostra popup para editar investimento
    editarInvestimento(investimento: any) {
      this.investimentoParaEditar = investimento; // Passa os dados da investimento para o popup
      this.isPopupVisible = true;
    }

    hidePopup() {
      this.isPopupVisible = false;
      this.investimentoParaEditar = null; // Reseta variáveis
    }

    // Método para carregar investimentos do usuário
    carregarInvestimentos() {
      this.investimentoService.listarInvestimentos(this.usuarioId).subscribe({
        next: (dados: any[]) => this.investimentos = dados,
        error: () => alert('Erro ao carregar investimentos.')
      });
    }

    // Método que é chamado após a criação de um novo investimento
    onInvestimentoCriado() {
      this.carregarInvestimentos(); // Atualiza a lista após novo investimento
    }

    // Método para excluir um investimento
    excluirInvestimento(id: number) {
      const confirmacao = confirm('Tem certeza que deseja excluir este investimento?');
      if (!confirmacao) return;

      this.investimentoService.deletarInvestimento(id).subscribe({
        next: () => {
          this.carregarInvestimentos(); // Atualiza a lista após excluir
        },
        error: () => {
          alert('Erro ao excluir investimento.');
        }
      });
    }

    exportarExcel(): void {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Investimentos');

      // Cabeçalhos
      worksheet.columns = [
        { header: 'Investimento', key: 'investimento', width: 25 },
        { header: 'Tipo de Investimento', key: 'tipo', width: 25 },
        { header: 'Data', key: 'data', width: 15 },
        { header: 'Valor (R$)', key: 'valor', width: 15 },
        { header: 'Risco', key: 'risco', width: 10 },
      ];

      // Adiciona os dados
      this.investimentos.forEach(inv => {
        worksheet.addRow({
          investimento: inv.investimento,
          tipo: inv.tipo,
          data: new Date(inv.data).toLocaleDateString('pt-BR', { month: '2-digit', year: 'numeric' }),
          valor: inv.valor.toFixed(2).replace('.', ','),
          risco: inv.risco,
        });
      });

      // Gera o buffer e baixa o arquivo
      workbook.xlsx.writeBuffer().then(buffer => {
        const blob = new Blob([buffer], { type: 'application/octet-stream' });
        saveAs(blob, 'meus-investimentos.xlsx');
      });
    }

}
