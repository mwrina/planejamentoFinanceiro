import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EntradaService } from '../../services/entradas.service';

@Component({
  selector: 'app-popup-criar-entrada',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './popup-criar-entrada.component.html',
  styleUrls: ['./popup-criar-entrada.component.css']
})

export class PopupCriarEntradaComponent implements OnChanges {
  // Recebe uma entrada do componente pai, se for para editar
  @Input() entradaParaEditar: any = null;

  // Emite um evento para o componente pai fechar o popup
  @Output() close = new EventEmitter<void>();

  // Emite um evento para recarregar a lista de entradas no componente pai
  @Output() entradaCriada = new EventEmitter<void>();

  // Injeção de dependência: FormBuilder e EntradaService
  private fb = inject(FormBuilder);
  private entradaService = inject(EntradaService);

  form: FormGroup = this.fb.group({
    entrada: ['', Validators.required],
    tipo: ['Recorrente', Validators.required],
    data: ['', Validators.required],
    valor: [0, [Validators.required, Validators.min(0.01)]]
  });

  // Detecta quando o valor de entradaParaEditar muda (útil ao abrir o popup para edição)
  ngOnChanges(changes: SimpleChanges) {
    if (changes['entradaParaEditar'] && this.entradaParaEditar) {
      // Preenche o formulário com os dados da entrada existente
      this.form.patchValue({
        entrada: this.entradaParaEditar.entrada,
        tipo: this.entradaParaEditar.tipo,
        data: this.entradaParaEditar.data.substring(0, 10), // Formata corretamente no input date
        valor: this.entradaParaEditar.valor
      });
    }
  }

  closePopup() {
    this.close.emit();
  }

  salvarEntrada() {
    if (this.form.invalid) return;

    const entrada = {
      entrada: this.form.value.entrada,
      tipo: this.form.value.tipo,
      data: this.form.value.data,
      valor: this.form.value.valor
    };

    if (this.entradaParaEditar) {
      // Se houver entradaParaEditar, atualiza a entrada existente
      this.entradaService.atualizarEntrada(this.entradaParaEditar.id, entrada).subscribe({
        next: () => {
          this.entradaCriada.emit();
          this.closePopup();
        },
        error: () => alert('Erro ao atualizar entrada.')
      });
    } else {
      // Cria nova entrada
      const usuario = Number(localStorage.getItem('usuarioId'));
      this.entradaService.criarEntrada({ ...entrada, usuario }).subscribe({
        next: () => {
          this.entradaCriada.emit();
          this.closePopup();
        },
        error: () => alert('Erro ao salvar entrada.')
      });
    }
  }
}


// export class PopupCriarEntradaComponent {
//   @Output() close = new EventEmitter<void>();
//   @Output() entradaCriada = new EventEmitter<void>(); // <-- Emite evento para o componente pai

//   private fb = inject(FormBuilder);
//   private EntradaService = inject(EntradaService);

//   form: FormGroup = this.fb.group({
//     entrada: ['', Validators.required],
//     tipo: ['Recorrente', Validators.required],
//     data: ['', Validators.required],
//     valor: [0, [Validators.required, Validators.min(0.01)]]
//   });

//   closePopup() {
//     this.close.emit();
//   }

//   salvarEntrada() {
//     if (this.form.invalid) return;

//     const usuario = Number(localStorage.getItem('usuarioId'));

//     const novaEntrada = {
//       usuario,
//       entrada: this.form.value.entrada,
//       tipo: this.form.value.tipo,
//       data: this.form.value.data,
//       valor: this.form.value.valor
//     };

//     this.EntradaService.criarEntrada(novaEntrada).subscribe({
//       next: () => {
//         this.entradaCriada.emit(); // Notifica o componente pai
//         this.closePopup(); // Fecha o popup
//       },
//       error: () => alert('Erro ao salvar entrada.')
//     });
//   }
// }

