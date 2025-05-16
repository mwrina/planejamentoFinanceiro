import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SaidaService } from '../../services/saidas.service';
@Component({
  selector: 'app-popup-criar-saida',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './popup-criar-saida.component.html',
  styleUrl: './popup-criar-saida.component.css'
})
export class PopupCriarSaidaComponent implements OnChanges {
 // Recebe uma saída do componente pai, se for para editar
   @Input() saidaParaEditar: any = null;

   // Emite um evento para o componente pai fechar o popup
   @Output() close = new EventEmitter<void>();

   // Emite um evento para recarregar a lista de saídas no componente pai
   @Output() saidaCriada = new EventEmitter<void>();

   // Injeção de dependência: FormBuilder e saidaService
   private fb = inject(FormBuilder);
   private saidaService = inject(SaidaService);

   form: FormGroup = this.fb.group({
     saida: ['', Validators.required],
     tipo: ['Outros', Validators.required],
     data: ['', Validators.required],
     valor: [0, [Validators.required, Validators.min(0.01)]]
   });

   // Detecta quando o valor de saidaParaEditar muda (útil ao abrir o popup para edição)
   ngOnChanges(changes: SimpleChanges) {
     if (changes['saidaParaEditar'] && this.saidaParaEditar) {
       // Preenche o formulário com os dados da saída existente
       this.form.patchValue({
         saida: this.saidaParaEditar.saida,
         tipo: this.saidaParaEditar.tipo,
         data: this.saidaParaEditar.data.substring(0, 10), // Formata corretamente no input date
         valor: this.saidaParaEditar.valor
       });
     }
   }

   closePopup() {
     this.close.emit();
   }

   salvarSaida() {
     if (this.form.invalid) return;

     const saida = {
       saida: this.form.value.saida,
       tipo: this.form.value.tipo,
       data: this.form.value.data,
       valor: this.form.value.valor
     };

     if (this.saidaParaEditar) {
       // Se houver saidaParaEditar, atualiza a saída existente
       this.saidaService.atualizarSaida(this.saidaParaEditar.id, saida).subscribe({
         next: () => {
           this.saidaCriada.emit();
           this.closePopup();
         },
         error: () => alert('Erro ao atualizar saída.')
       });
     } else {
       // Cria nova saída
       const usuario = Number(localStorage.getItem('usuarioId'));
       this.saidaService.criarSaida({ ...saida, usuario }).subscribe({
         next: () => {
           this.saidaCriada.emit();
           this.closePopup();
         },
         error: () => alert('Erro ao salvar saída.')
       });
     }
   }
}
