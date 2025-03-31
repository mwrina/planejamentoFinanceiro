import { Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { EntradasComponent } from './components/entradas/entradas.component';
import { PopupCriarEntradaComponent } from './components/popup-criar-entrada/popup-criar-entrada.component'

export const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'inicio', component: IndexComponent },
  { path: 'entradas', component: EntradasComponent },
  { path: 'popup-criar-entrada', component: PopupCriarEntradaComponent }
];
