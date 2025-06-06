import Saida from '../models/saidas_model.js';
import { recalcularCofrinho } from '../config/utils/recalc_cofrinho.js';

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

      recalcularCofrinho(usuario, data);

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

export const listarTotaisPorTipo = (req, res) => {
  const usuario = req.params.usuario;

  Saida.listarTotaisPorTipo(usuario, (err, results) => {
    if (err) return res.status(500).json({ mensagem: 'Erro ao listar totais de saídas por tipo.' });
    res.status(200).json(results);
  });
};

export const calcTotal = (req, res) => {
  const usuario = req.params.usuario;
  Saida.calcTotal(usuario, (err, results) => {
    if (err) return res.status(500).json({ mensagem: 'Erro ao calcular total de saídas' });
    res.status(200).json(results);
  })
}

export const calcTotalMes = (req, res) => {
  const usuario = req.params.usuario;
  const data = req.params.data;
  Saida.calcTotalMes(usuario, data, (err, results) => {
    if (err) return res.status(500).json({ mensagem: 'Erro ao calcular total' });
    res.status(200).json(results);
  });
};

export const atualizarSaida = (req, res) => {
  const { id } = req.params;
  const { saida, tipo, data, valor } = req.body;

  Saida.buscarPorId(id, (err, saidaExistente) => {
    if (err || !saidaExistente) {
      return res.status(404).json({ mensagem: 'Saida não encontrada.' });
    }

    Saida.atualizar(id, saida, tipo, data, valor, (err, result) => {
      if (err) return res.status(500).json({ mensagem: 'Erro ao atualizar saida.' });

      recalcularCofrinho(saidaExistente.usuario, data);

      res.status(200).json({ mensagem: 'Saida atualizada com sucesso!' });
    });
  });
};

export const deletarSaida = (req, res) => {
  const { id } = req.params;

  Saida.buscarPorId(id, (err, saida) => {
    if (err || !saida) {
      return res.status(404).json({ mensagem: 'Saida não encontrada.' });
    }

    Saida.deletar(id, (err) => {
      if (err) return res.status(500).json({ mensagem: 'Erro ao deletar saida.' });

      recalcularCofrinho(saida.usuario, saida.data);

      res.status(200).json({ mensagem: 'Saida deletada com sucesso!' });
    });
  });
};
