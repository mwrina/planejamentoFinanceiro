import { Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { EntradasComponent } from './components/entradas/entradas.component';
import { SaidasComponent } from './components/saidas/saidas.component';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { EsqueciMinhaSenhaComponent } from './components/esqueci-minha-senha/esqueci-minha-senha.component';
import { InvestimentosComponent } from './components/investimentos/investimentos.component';

export const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'inicio', component: IndexComponent },
  { path: 'entradas', component: EntradasComponent },
  { path: 'saidas', component: SaidasComponent },
  {path: 'investimentos', component: InvestimentosComponent },
  { path: 'login', component: LoginComponent},
  { path: 'cadastro', component: CadastroComponent },
  { path: 'esqueci-minha-senha', component: EsqueciMinhaSenhaComponent }
];
