import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InvestimentoService } from '../../services/investimentos.service';

@Component({
  selector: 'app-popup-criar-investimento',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './popup-criar-investimento.component.html',
  styleUrl: './popup-criar-investimento.component.css'
})

export class PopupCriarInvestimentoComponent implements OnChanges {
  // Recebe uma investimento do componente pai, se for para editar
  @Input() investimentoParaEditar: any = null;

  // Emite um evento para o componente pai fechar o popup
  @Output() close = new EventEmitter<void>();

  // Emite um evento para recarregar a lista de investimentos no componente pai
  @Output() investimentoCriado = new EventEmitter<void>();

  // Injeção de dependência: FormBuilder e InvestimentoService
  private fb = inject(FormBuilder);
  private investimentoService = inject(InvestimentoService);

  form: FormGroup = this.fb.group({
    investimento: ['', Validators.required],
    tipo: ['', Validators.required],
    data: ['', Validators.required],
    valor: [0, [Validators.required, Validators.min(0.01)]],
    risco: ['Alto', Validators.required],
  });

  // Detecta quando o valor de investimentoParaEditar muda (útil ao abrir o popup para edição)
  ngOnChanges(changes: SimpleChanges) {
    if (changes['investimentoParaEditar'] && this.investimentoParaEditar) {
      // Preenche o formulário com os dados do investimento existente
      this.form.patchValue({
        investimento: this.investimentoParaEditar.investimento,
        tipo: this.investimentoParaEditar.tipo,
        data: this.investimentoParaEditar.data.substring(0, 10), // Formata corretamente no input date
        valor: this.investimentoParaEditar.valor,
        risco: this.investimentoParaEditar.risco
      });
    }
  }

  closePopup() {
    this.close.emit();
  }

  salvarInvestimento() {
    if (this.form.invalid) return;

    const investimento = {
      investimento: this.form.value.investimento,
      tipo: this.form.value.tipo,
      data: this.form.value.data,
      valor: this.form.value.valor,
      risco: this.form.value.risco
    };

    if (this.investimentoParaEditar) {
      // Se houver investimentoParaEditar, atualiza o investimento existente
      this.investimentoService.atualizarInvestimento(this.investimentoParaEditar.id, investimento).subscribe({
        next: () => {
          this.investimentoCriado.emit();
          this.closePopup();
        },
        error: () => alert('Erro ao atualizar investimento.')
      });
    } else {
      // Cria novo investimento
      const usuario = Number(localStorage.getItem('usuarioId'));
      this.investimentoService.criarInvestimento({ ...investimento, usuario }).subscribe({
        next: () => {
          this.investimentoCriado.emit();
          this.closePopup();
        },
        error: () => alert('Erro ao salvar investimento.')
      });
    }
  }
}
