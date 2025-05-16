import Saida from '../models/saidas_model.js';

export const criarSaida = (req, res) => {
  const { usuario, saida, tipo, data, valor } = req.body;

  if (!usuario || !saida || !tipo || !data || !valor) {
    return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
  }

  Saida.criar(usuario, saida, tipo, data, valor, (err, result) => {
    if (err) {
      console.error('Erro ao criar saida:', err);
      return res.status(500).json({ mensagem: 'Erro ao criar saida.' });
    }

    return res.status(201).json({ 
      mensagem: 'saida criada com sucesso!',
      id: result.insertId
     });
  });
};

export const listarSaidas = (req, res) => {
  const usuario = req.params.usuario;
  Saida.listarSaidas(usuario, (err, results) => {
    if (err) return res.status(500).json({ mensagem: 'Erro ao listar saidas.' });
    res.status(200).json(results);
  });
};

export const atualizarSaida = (req, res) => {
  const { id } = req.params;
  const { saida, tipo, data, valor } = req.body;

  Saida.atualizar(id, saida, tipo, data, valor, (err, result) => {
    if (err) return res.status(500).json({ mensagem: 'Erro ao atualizar saida.' });
    res.status(200).json({ mensagem: 'saida atualizada com sucesso!' });
  });
};

export const deletarSaida = (req, res) => {
  const { id } = req.params;

  Saida.deletar(id, (err) => {
    if (err) return res.status(500).json({ mensagem: 'Erro ao deletar saida.' });
    res.status(200).json({ mensagem: 'saida deletada com sucesso!' });
  });
};
