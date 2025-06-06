import Investimento from "../models/investimentos_model.js";
import { recalcularCofrinho } from "../config/utils/recalc_cofrinho.js";

export const criarInvestimento = (req, res) => {
  const { usuario, investimento, tipo, data, valor, risco } = req.body;

  if (!usuario || !investimento || !tipo || !data || !valor || !risco) {
    return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
  }

  Investimento.criar(usuario, investimento, tipo, data, valor, risco, (err, result) => {
    if (err) {
      console.error('Erro ao criar investimento:', err);
      return res.status(500).json({ mensagem: 'Erro ao criar investimento.' });
    }

    recalcularCofrinho(usuario, data);

    return res.status(201).json({ 
      mensagem: 'Investimento criado com sucesso!',
      id: result.insertId
     });
  });
};

export const calcTotal = (req, res) => {
  const usuario = req.params.usuario;
  Saida.calcTotal(usuario, (err, results) => {
    if (err) return res.status(500).json({ mensagem: 'Erro ao calcular total de investimentos' });
    res.status(200).json(results);
  })
}

export const calcTotalMes = (req, res) => {
  const usuario = req.params.usuario;
  const data = req.params.data;
  Investimento.calcTotalMes(usuario, data, (err, results) => {
    if (err) return res.status(500).json({ mensagem: 'Erro ao calcular total' });
    res.status(200).json(results);
  });
};

export const listarInvestimentos = (req, res) => {
  const usuario = req.params.usuario;
  Investimento.listarInvestimentos(usuario, (err, results) => {
    if (err) return res.status(500).json({ mensagem: 'Erro ao listar investimentos.' });
    res.status(200).json(results);
  });
};

export const atualizarInvestimento = (req, res) => {
  const { id } = req.params;
  const { investimento, tipo, data, valor } = req.body;

  Investimento.buscarPorId(id, (err, investimentoExistente) => {
    if (err || !investimentoExistente) {
      return res.status(404).json({ mensagem: 'Entrada não encontrada.' });
    }

    Investimento.atualizar(id, investimento, tipo, data, valor, (err, result) => {
      if (err) return res.status(500).json({ mensagem: 'Erro ao atualizar investimento.' });

      recalcularCofrinho(investimentoExistente.usuario, data);

      res.status(200).json({ mensagem: 'Investimento atualizado com sucesso!' });
    });
  });
};


export const deletarInvestimento = (req, res) => {
  const { id } = req.params;

  Investimento.buscarPorId(id, (err, investimento) => {
    if (err || !investimento) {
      return res.status(404).json({ mensagem: 'Investimento não encontrado.' });
    }

    Investimento.deletar(id, (err) => {
      if (err) return res.status(500).json({ mensagem: 'Erro ao deletar Investimento.' });

      recalcularCofrinho(investimento.usuario, investimento.data);

      res.status(200).json({ mensagem: 'Investimento deletado com sucesso!' });
    });
  });
};
