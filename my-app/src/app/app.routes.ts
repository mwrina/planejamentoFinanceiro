import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/index/index.component').then(m => m.IndexComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'inicio',
    loadComponent: () =>
      import('./components/index/index.component').then(m => m.IndexComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'entradas',
    loadComponent: () =>
      import('./components/entradas/entradas.component').then(m => m.EntradasComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'saidas',
    loadComponent: () =>
      import('./components/saidas/saidas.component').then(m => m.SaidasComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'investimentos',
    loadComponent: () =>
      import('./components/investimentos/investimentos.component').then(m => m.InvestimentosComponent),
    canActivate: [AuthGuard]
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
