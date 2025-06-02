import Investimento from "../models/investimentos_model.js";

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
  const mes = req.params.mes;
  Investimento.calcTotalMes(usuario, mes, (err, results) => {
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
  const { investimento, tipo, data, valor, risco } = req.body;

  Investimento.atualizar(id, investimento, tipo, data, valor, risco, (err, result) => {
    if (err) return res.status(500).json({ mensagem: 'Erro ao atualizar investimento.' });
    res.status(200).json({ mensagem: 'Investimento atualizado com sucesso!' });
  });
};

export const deletarInvestimento = (req, res) => {
  const { id } = req.params;

  Investimento.deletar(id, (err) => {
    if (err) return res.status(500).json({ mensagem: 'Erro ao deletar investimento.' });
    res.status(200).json({ mensagem: 'Investimento deletado com sucesso!' });
  });
};
