import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EntradaService } from '../../services/entradas.service';

@Component({
  selector: 'app-popup-criar-entrada',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './popup-criar-entrada.component.html',
  styleUrls: ['./popup-criar-entrada.component.css']
})

export class PopupCriarEntradaComponent {
 @Output() close = new EventEmitter<void>();
  @Output() entradaCriada = new EventEmitter<void>(); // <-- Emite evento para o componente pai

  private fb = inject(FormBuilder);
  private EntradaService = inject(EntradaService);

  form: FormGroup = this.fb.group({
    entrada: ['', Validators.required],
    tipo: ['Recorrente', Validators.required],
    data: ['', Validators.required],
    valor: [0, [Validators.required, Validators.min(0.01)]]
  });

  closePopup() {
    this.close.emit();
  }

  salvarEntrada() {
    if (this.form.invalid) return;

    const usuario = 1; // <- Pegue do token, localStorage ou serviço de autenticação

    const novaEntrada = {
      usuario,
      entrada: this.form.value.entrada,
      tipo: this.form.value.tipo,
      data: this.form.value.data,
      valor: this.form.value.valor
    };

    this.EntradaService.criarEntrada(novaEntrada).subscribe({
      next: () => {
        this.entradaCriada.emit(); // Notifica o componente pai
        this.closePopup(); // Fecha o popup
      },
      error: () => alert('Erro ao salvar entrada.')
    });
  }
}

