import Entrada from '../models/entradas_model.js';

export const criarEntrada = (req, res) => {
  const usuarioId = localStorage.getItem('usuarioId'); // Recupera o ID do usuário do localStorage

  if (usuarioId) {
    const novaEntrada = {
      entrada: this.novaEntrada,
      tipo: this.tipoEntrada,
      data: this.dataEntrada,
      valor: this.valorEntrada,
      usuarioId: usuarioId // Envia o ID do usuário
    };

    this.entradaService.criarEntrada(novaEntrada).subscribe({
      next: () => {
        alert('Entrada criada com sucesso');
        this.carregarEntradas(); // Atualiza a lista
      },
      error: (err) => {
        alert('Erro ao criar entrada');
      }
    });
  } else {
    alert('Erro: ID do usuário não encontrado.');
  }
};

export const listarEntradas = (req, res) => {
  const usuario = req.params.usuario;
  Entrada.listarEntradas(usuario, (err, results) => {
    if (err) return res.status(500).json({ mensagem: 'Erro ao listar entradas.' });
    res.status(200).json(results);
  });
};

export const atualizarEntrada = (req, res) => {
  const { id } = req.params;
  const { entrada, tipo, data, valor } = req.body;

  Entrada.atualizar(id, entrada, tipo, data, valor, (err, result) => {
    if (err) return res.status(500).json({ mensagem: 'Erro ao atualizar entrada.' });
    res.status(200).json({ mensagem: 'Entrada atualizada com sucesso!' });
  });
};

export const deletarEntrada = (req, res) => {
  const { id } = req.params;

  Entrada.deletar(id, (err) => {
    if (err) return res.status(500).json({ mensagem: 'Erro ao deletar entrada.' });
    res.status(200).json({ mensagem: 'Entrada deletada com sucesso!' });
  });
};
