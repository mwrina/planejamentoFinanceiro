import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { PopupCriarSaidaComponent } from '../popup-criar-saida/popup-criar-saida.component';


@Component({
  selector: 'app-saidas',
  standalone: true,
  imports: [
    CommonModule,
    PopupCriarSaidaComponent,
    NavbarComponent
  ],
  templateUrl: './saidas.component.html',
  styleUrl: './saidas.component.css'
})
export class SaidasComponent {
  isPopupVisible = false;

  showPopup() {
	this.isPopupVisible = true;
  }

  hidePopup() {
	this.isPopupVisible = false;
  }
}
