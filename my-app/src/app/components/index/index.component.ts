import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { SaidaService } from '../../services/saidas.service';
import { EntradaService } from '../../services/entradas.service';
import { InvestimentoService } from '../../services/investimentos.service';
import { CofrinhoService } from '../../services/cofrinho.service';
import { forkJoin } from 'rxjs';
import { ChartConfiguration } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-index',
  standalone: true,
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  imports: [
    NavbarComponent,
    CommonModule,
    NgChartsModule
  ]
})
export class IndexComponent {

  entradas: any[] = [];
  saidas: any[] = [];
  investimentos: any[] = [];

  totalEntradas: number = 0;
  totalSaidas: number = 0;
  totalInvestimentos: number = 0;
  totalCofrinho: number = 0;
  mesAtual: string = '';
  saldoDisponivel: number = 0;

  acompanhamentos: any[] = [];
  usuarioId!: number;

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Cofrinho',
        backgroundColor: '#42A5F5',
        borderColor: '#1E88E5',
        borderWidth: 1,
      }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true
  };

  constructor(
    private saidaService: SaidaService,
    private entradaService: EntradaService,
    private investimentoService: InvestimentoService,
    private cofrinhoService: CofrinhoService,
    private cdr: ChangeDetectorRef  // <-- injetado para detectar mudanças
  ) {}

  ngOnInit(): void {
    const id = localStorage.getItem('usuarioId');
    if (id && !isNaN(+id)) {
      this.usuarioId = +id;

      const hoje = new Date();
      this.mesAtual = hoje.toISOString().slice(0,7); // "YYYY-MM"

      this.carregarTotaisPorTipo();
      this.calcTotais();

      this.cofrinhoService.obterHistoricoAnual(this.usuarioId.toString()).subscribe({
        next: (data: any[]) => {
          console.log('Dados do histórico anual recebidos:', data);

          if (!data || data.length === 0) {
            console.warn('Nenhum dado recebido para o gráfico!');
            return;
          }

          const labels = data.map(item => item.mes);
          const values = data.map(item => item.total ?? 0);

          this.barChartData = {
            labels: labels,
            datasets: [
              {
                label: 'Cofrinho',
                data: values,
                backgroundColor: '#42A5F5',
                borderColor: '#1E88E5',
                borderWidth: 1,
              }
            ]
          };

          this.cdr.detectChanges();  // força atualizar o gráfico também
        },
        error: (err) => {
          console.error('Erro ao obter histórico anual do cofrinho:', err);
        }
      });

    } else {
      alert('Usuário não identificado!');
    }
  }

  carregarTotaisPorTipo() {
    this.saidaService.listarTotaisPorTipo(this.usuarioId.toString()).subscribe({
      next: (dados: any[]) => {
        console.log('Totais por tipo:', dados);
        this.acompanhamentos = dados.map(item => ({
          valor: `R$ ${Number(item.total).toFixed(2).replace('.', ',')}`,
          area: item.tipo
        }));
      },
      error: (err) => {
        console.error('Erro ao carregar totais por tipo:', err);
        alert('Erro ao carregar totais por tipo.');
      }
    });
  }

  calcTotais() {
    forkJoin({
      saidas: this.saidaService.calcTotalMes(this.usuarioId.toString(), this.mesAtual),
      entradas: this.entradaService.calcTotalMes(this.usuarioId.toString(), this.mesAtual),
      investimentos: this.investimentoService.calcTotalMes(this.usuarioId.toString(), this.mesAtual),
      cofrinho: this.cofrinhoService.obterSaldoMes(this.usuarioId.toString(), this.mesAtual)
    }).subscribe({
      next: ({ saidas, entradas, investimentos, cofrinho }) => {
        this.totalSaidas = saidas[0]?.total ?? 0;
        this.totalEntradas = entradas[0]?.total ?? 0;
        this.totalInvestimentos = investimentos[0]?.total ?? 0;
        this.totalCofrinho = cofrinho[0]?.total ?? 0;

        this.saldoDisponivel = (this.totalEntradas * 0.7) - (this.totalSaidas + this.totalInvestimentos);

        console.log('total cofrinho atualizado:', this.totalCofrinho);

        this.cdr.detectChanges();  // força atualizar a view para refletir o valor
      },
      error: (err) => {
        console.error('Erro ao calcular totais:', err);
      }
    });
  }
}
