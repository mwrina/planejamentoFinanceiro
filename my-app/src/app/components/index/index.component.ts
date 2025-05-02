import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-index',
  standalone: true,
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  imports: [
    NavbarComponent
  ]
})

export class IndexComponent {
  acompanhamentos = [
    { valor: 'R$ 200,00', area: 'Lazer' },
    { valor: 'R$ 350,00', area: 'Alimentação' },
    { valor: 'R$ 120,00', area: 'Transporte' },
    { valor: 'R$ 90,00', area: 'Outros' }
  ];
}
