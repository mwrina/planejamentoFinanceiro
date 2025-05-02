import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { PopupCriarInvestimentoComponent } from '../popup-criar-investimento/popup-criar-investimento.component';

@Component({
  selector: 'app-investimentos',
  standalone: true,
  imports: [
    CommonModule,
    PopupCriarInvestimentoComponent,
    NavbarComponent
  ],
  templateUrl: './investimentos.component.html',
  styleUrl: './investimentos.component.css'
})
export class InvestimentosComponent {
  isPopupVisible = false;

  showPopup() {
	this.isPopupVisible = true;
  }

  hidePopup() {
	this.isPopupVisible = false;
  }
}
