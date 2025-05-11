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

    const dadosLogin = {
      email: this.email,
      senha: this.senha
    };

      this.http.post<any>('http://localhost:3000/api/usuarios/login', dadosLogin).subscribe({
      next: (res) => {
        console.log('Resposta da API:', res); // Verifique a resposta

        if (res && res.usuario && res.usuario.id) {
          this.mensagem = res.mensagem;

          // Salve o token (se existir) e o ID do usuário
          localStorage.setItem('token', res.token); // Salva o token
          localStorage.setItem('usuarioId', res.usuario.id); // Salva o ID do usuário

          // Debugging: Verifique se os dados foram salvos corretamente
          console.log('Token salvo:', localStorage.getItem('token'));
          console.log('ID do usuário salvo:', localStorage.getItem('usuarioId'));

          this.router.navigate(['/inicio']); // Redireciona após login
        } else {
          console.error('Erro: Resposta da API não contém os dados esperados');
          this.mensagem = 'Dados do login inválidos ou resposta da API mal formatada.';
        }
      },
      error: (err) => {
        console.error('Erro na requisição:', err);
        this.mensagem = err.error?.mensagem || 'Erro ao fazer login.';
      }
    });

  }
}
