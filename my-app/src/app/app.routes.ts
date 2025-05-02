import { Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { EntradasComponent } from './components/entradas/entradas.component';
import { SaidasComponent } from './components/saidas/saidas.component';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { EsqueciMinhaSenhaComponent } from './components/esqueci-minha-senha/esqueci-minha-senha.component';
import { InvestimentosComponent } from './components/investimentos/investimentos.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/index/index.component').then(m => m.IndexComponent)
  },
  {
    path: 'inicio',
    loadComponent: () =>
      import('./components/index/index.component').then(m => m.IndexComponent)
  },
  {
    path: 'entradas',
    loadComponent: () =>
      import('./components/entradas/entradas.component').then(m => m.EntradasComponent)
  },
  {
    path: 'saidas',
    loadComponent: () =>
      import('./components/saidas/saidas.component').then(m => m.SaidasComponent)
  },
  {
    path: 'investimentos',
    loadComponent: () =>
      import('./components/investimentos/investimentos.component').then(m => m.InvestimentosComponent)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'cadastro',
    loadComponent: () =>
      import('./components/cadastro/cadastro.component').then(m => m.CadastroComponent)
  },
  {
    path: 'esqueci-minha-senha',
    loadComponent: () =>
      import('./components/esqueci-minha-senha/esqueci-minha-senha.component').then(m => m.EsqueciMinhaSenhaComponent)
  }
];
