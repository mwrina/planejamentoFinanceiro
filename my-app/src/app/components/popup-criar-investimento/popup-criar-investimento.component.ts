import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-popup-criar-investimento',
  standalone: true,
  imports: [],
  templateUrl: './popup-criar-investimento.component.html',
  styleUrl: './popup-criar-investimento.component.css'
})
export class PopupCriarInvestimentoComponent {
 @Output() close = new EventEmitter<void>();

  closePopup() {
    this.close.emit();
  }
}
