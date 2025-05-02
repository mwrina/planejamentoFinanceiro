import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { PopupCriarEntradaComponent } from '../popup-criar-entrada/popup-criar-entrada.component';

@Component({
  selector: 'app-entradas',
  standalone: true,
  imports: [
    CommonModule,
    PopupCriarEntradaComponent,
    NavbarComponent
  ],
  templateUrl: './entradas.component.html',
  styleUrl: './entradas.component.css'
})
export class EntradasComponent {
  isPopupVisible = false;

  showPopup() {
	this.isPopupVisible = true;
  }

  hidePopup() {
	this.isPopupVisible = false;
  }
}
