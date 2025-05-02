import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { IndexComponent } from './index/index.component';
import { PopupCriarEntradaComponent } from './popup-criar-entrada/popup-criar-entrada.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    NavbarComponent,
    IndexComponent,
    RouterModule,
    PopupCriarEntradaComponent
  ]
})
export class AppComponent { }
