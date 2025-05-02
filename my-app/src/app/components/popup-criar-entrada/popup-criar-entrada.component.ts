import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-popup-criar-entrada',
  standalone: true,
  imports: [],
  templateUrl: './popup-criar-entrada.component.html',
  styleUrls: ['./popup-criar-entrada.component.css']
})

export class PopupCriarEntradaComponent {
  @Output() close = new EventEmitter<void>();

  closePopup() {
    this.close.emit();
  }
}

