import db from "../config/db.js";

const Cofrinho = {
  criar: (dados, callback) => {
    const sql = 'INSERT INTO cofrinho (usuario, data, valor) VALUES (?, ?, ?)';
    db.query(sql, [dados.usuario, dados.data, dados.valor], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  obterSaldoMes: (usuario, anoMes, callback) => {
    const sql = `SELECT SUM(valor) AS total FROM cofrinho 
                 WHERE usuario = ? AND DATE_FORMAT(data, '%Y-%m') = ?`;
    db.query(sql, [usuario, anoMes], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  atualizar: (id, dados, callback) => {
    const sql = 'UPDATE cofrinho SET valor = ? WHERE id = ?';
    db.query(sql, [dados.valor, id], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  // Atualiza valor baseado no usuário e ano-mês
  atualizarPorMes: (usuario, anoMes, valor, callback) => {
    const sql = `UPDATE cofrinho SET valor = ? 
                WHERE usuario = ? AND DATE_FORMAT(data, '%Y-%m') = ?`;
    db.query(sql, [valor, usuario, anoMes], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },


  excluir: (id, callback) => {
    const sql = 'DELETE FROM cofrinho WHERE id = ?';
    db.query(sql, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }
};

export default Cofrinho;
