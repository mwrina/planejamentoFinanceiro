import Entrada from '../models/entradas_model.js';
import { recalcularCofrinho } from '../config/utils/recalc_cofrinho.js';

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

    recalcularCofrinho(usuario, data);

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

export const calcTotal = (req, res) => {
  const usuario = req.params.usuario;
  Entrada.calcTotal(usuario, (err, results) => {
    if (err) return res.status(500).json({ mensagem: 'Erro ao calcular total de entradas' });
    res.status(200).json(results);
  })
}

export const calcTotalMes = (req, res) => {
  const usuario = req.params.usuario;
  const data = req.params.data;
  Entrada.calcTotalMes(usuario, data, (err, results) => {
    if (err) return res.status(500).json({ mensagem: 'Erro ao calcular total' });
    res.status(200).json(results);
  });
};

export const atualizarEntrada = (req, res) => {
  const { id } = req.params;
  const { entrada, tipo, data, valor } = req.body;

  Entrada.buscarPorId(id, (err, entradaExistente) => {
    if (err || !entradaExistente) {
      return res.status(404).json({ mensagem: 'Entrada não encontrada.' });
    }

    Entrada.atualizar(id, entrada, tipo, data, valor, (err, result) => {
      if (err) return res.status(500).json({ mensagem: 'Erro ao atualizar entrada.' });

      recalcularCofrinho(entradaExistente.usuario, data);

      res.status(200).json({ mensagem: 'Entrada atualizada com sucesso!' });
    });
  });
};

export const deletarEntrada = (req, res) => {
  const { id } = req.params;

  Entrada.buscarPorId(id, (err, entrada) => {
    if (err || !entrada) {
      return res.status(404).json({ mensagem: 'Entrada não encontrada.' });
    }

    Entrada.deletar(id, (err) => {
      if (err) return res.status(500).json({ mensagem: 'Erro ao deletar entrada.' });

      recalcularCofrinho(entrada.usuario, entrada.data);

      res.status(200).json({ mensagem: 'Entrada deletada com sucesso!' });
    });
  });
};

