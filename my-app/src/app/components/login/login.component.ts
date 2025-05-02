import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  senha = '';
  mensagem = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    console.log('Login clicado!');
    //Envia requisição com os parâmetros email e senha
    this.http.post<any>('http://localhost:3000/login', {
      email: this.email,
      senha: this.senha
    }).subscribe({
      next: (res) => {
        this.mensagem = res.mensagem;
        console.log('Usuário logado:', res.usuario);

        // Redirecionar para /inicio
        this.router.navigate(['/inicio']);
      },
      error: (err) => {
        this.mensagem = err.error?.mensagem || 'Erro ao fazer login.';
      }
    });
  }
}
