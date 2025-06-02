import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { SaidaService } from '../../services/saidas.service';
import { EntradaService } from '../../services/entradas.service';
import { InvestimentoService } from '../../services/investimentos.service';
import { CofrinhoService } from '../../services/cofrinho.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-index',
  standalone: true,
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  imports: [
    NavbarComponent,
    CommonModule
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

  constructor(
    private saidaService: SaidaService,
    private entradaService: EntradaService,
    private investimentoService: InvestimentoService,
    private cofrinhoService: CofrinhoService
  ) {};

  ngOnInit(): void {
    const id = localStorage.getItem('usuarioId');
    if (id && !isNaN(+id)) {
      this.usuarioId = +id;

      const hoje = new Date();
      this.mesAtual = hoje.toISOString().slice(0,7); // "YYYY-MM"

      this.carregarTotaisPorTipo();
      this.calcTotais();
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

    // Calcula os valores antes de partir para os console.logs e o cálculo do saldo
    forkJoin({
      saidas: this.saidaService.calcTotalMes(this.usuarioId.toString(), this.mesAtual),
      entradas: this.entradaService.calcTotalMes(this.usuarioId.toString(), this.mesAtual),
      investimentos: this.investimentoService.calcTotalMes(this.usuarioId.toString(), this.mesAtual),
      cofrinho: this.cofrinhoService.obterSaldoMes(this.usuarioId, this.mesAtual)
    }).subscribe({
      next: ({ saidas, entradas, investimentos, cofrinho }) => {
        this.totalSaidas = saidas[0]?.total ?? 0;
        console.log('Total de Saídas: ', this.totalSaidas);

        this.totalEntradas = entradas[0]?.total ?? 0;
        console.log('Total de Entradas: ', this.totalEntradas);

        this.totalInvestimentos = investimentos[0]?.total ?? 0;
        console.log('Total de Investimentos: ', this.totalInvestimentos);

        this.totalCofrinho = cofrinho[0]?.total ?? 0;
        console.log('Saldo Cofrinho:', this.totalCofrinho);

        this.saldoDisponivel = (this.totalEntradas * 0.7) - (this.totalSaidas + this.totalInvestimentos);
        console.log('Saldo disponível: ', this.saldoDisponivel);
      },
      error: (err) => {
        console.error('Erro ao calcular totais:', err);
      }
    });
  }
}
