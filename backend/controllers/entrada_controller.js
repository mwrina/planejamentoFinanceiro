import Entrada from '../models/entradas_model.js';

export const criarEntrada = (req, res) => {
  const { usuario, entrada, tipo, data, valor } = req.body;

  if (!usuario || !entrada || !tipo || !data || !valor) {
    return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
  }

  Entrada.criar(usuario, entrada, tipo, data, valor, (err, result) => {
    if (err) {
      console.error('Erro ao criar entrada:', err);
      return res.status(500).json({ mensagem: 'Erro ao criar entrada.' });
    }

    return res.status(201).json({ 
      mensagem: 'Entrada criada com sucesso!',
      id: result.insertId
     });
  });
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
