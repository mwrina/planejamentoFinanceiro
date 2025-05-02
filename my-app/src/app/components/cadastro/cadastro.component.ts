import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';  // Caminho correto

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  cadastroForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private usuarioService: UsuarioService) {
    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      confSenha: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.cadastroForm.invalid) {
      alert('Preencha todos os campos corretamente.');
      return;
    }

    const { nome, email, senha, confSenha } = this.cadastroForm.value;

    if (senha !== confSenha) {
      alert('As senhas não coincidem.');
      return;
    }

    console.log(this.cadastroForm.value);

    this.usuarioService.criarUsuario({ nome, email, senha }).subscribe({
      next: () => {
        alert('Usuário criado com sucesso!');
        this.cadastroForm.reset();
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao criar usuário.');
      }
    });
  }
}
