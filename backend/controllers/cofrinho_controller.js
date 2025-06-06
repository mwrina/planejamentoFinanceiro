import Cofrinho from '../models/cofrinho_model.js'

export const criarCofrinho = (req, res) => {
  const dados = req.body;
  Cofrinho.criar(dados, (err, result) => {
    if (err) return res.status(500).json({ mensagem: 'Erro ao criar cofrinho' });
    res.status(201).json(result);
  });
};

export const obterSaldoMes = (req, res) => {
  const { usuario, data } = req.params;
  Cofrinho.obterSaldoMes(usuario, data, (err, result) => {
    if (err) return res.status(500).json({ mensagem: 'Erro ao obter saldo do cofrinho' });
    res.status(200).json(result);
  });
};

export const atualizarCofrinho = (req, res) => {
  const id = req.params.id;
  const dados = req.body;
  Cofrinho.atualizar(id, dados, (err, result) => {
    if (err) return res.status(500).json({ mensagem: 'Erro ao atualizar cofrinho' });
    res.status(200).json(result);
  });
};

export const excluirCofrinho = (req, res) => {
  const id = req.params.id;
  Cofrinho.excluir(id, (err, result) => {
    if (err) return res.status(500).json({ mensagem: 'Erro ao excluir cofrinho' });
    res.status(200).json(result);
  });
};
