import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  updateForm: FormGroup;
  usuarioId: string = '';

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.updateForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      confSenha: ['', Validators.required],
    });
  }


  ngOnInit(): void {
    this.usuarioId = localStorage.getItem('usuarioId') || '';

    if (this.usuarioId) {
      this.usuarioService.buscarUsuario(this.usuarioId).subscribe({
        next: (usuario) => {
          this.updateForm.patchValue({
            nome: usuario.nome,
            email: usuario.email,
            // senha e confSenha permanecem em branco
          });
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao carregar dados do usuário.');
        }
      });
    }
  }

  onSubmit(): void {
    if (this.updateForm.invalid) {
      alert('Preencha todos os campos corretamente.');
      return;
    }

    const { nome, email, senha, confSenha } = this.updateForm.value;

    if (senha !== confSenha) {
      alert('As senhas não coincidem.');
      return;
    }

    this.usuarioService.atualizarUsuario(this.usuarioId, { nome, email, senha }).subscribe({
      next: () => {
        alert('Perfil atualizado com sucesso!');
        this.updateForm.reset();
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao atualizar perfil.');
      }
    });
  }

  excluirConta(): void {
    if (!confirm('Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita.')) {
      return;
    }

    this.usuarioService.deletarUsuario(this.usuarioId).subscribe({
      next: () => {
        alert('Conta excluída com sucesso!');
        localStorage.clear(); // limpa token/id do localStorage
        // redireciona para tela de login ou home
        window.location.href = '/login';
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao excluir conta.');
      }
    });
}
}
