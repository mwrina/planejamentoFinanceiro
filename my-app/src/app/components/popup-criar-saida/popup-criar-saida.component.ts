import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-popup-criar-saida',
  standalone: true,
  imports: [],
  templateUrl: './popup-criar-saida.component.html',
  styleUrl: './popup-criar-saida.component.css'
})
export class PopupCriarSaidaComponent {
 @Output() close = new EventEmitter<void>();

  closePopup() {
    this.close.emit();
  }
}
