import db from "../config/db.js";

const Cofrinho = {

  atualizarOuInserir: (usuario, data, valor, callback) => {
    const sql = `
      INSERT INTO cofrinho (usuario, data, valor)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE valor = ?;
    `;
    db.query(sql, [usuario, data, valor, valor], callback);
  },

  obterSaldoMes: (usuario, data, callback) => {
    const sql = `SELECT valor FROM cofrinho 
                WHERE usuario = ? AND DATE_FORMAT(data, '%Y-%m') = ? LIMIT 1`;
    db.query(sql, [usuario, data], (err, results) => {
      if (err) return callback(err);
      // results[0] será o objeto { valor: ... } ou undefined
      callback(null, results[0] || { valor: 0 });
    });
  },

  obterHistoricoAnual: (usuario, callback) => {
    const sql = `
      SELECT DATE_FORMAT(data, '%Y-%m') AS mes, COALESCE(SUM(valor), 0) AS total
      FROM cofrinho
      WHERE usuario = ?
        AND data >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
      GROUP BY mes
      ORDER BY mes
    `;
    db.query(sql, [usuario], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  // Atualiza valor baseado no usuário e ano-mês
  atualizarPorMes: (usuario, data, valor, callback) => {
    const sql = `UPDATE cofrinho SET valor = ? 
                WHERE usuario = ? AND DATE_FORMAT(data, '%Y-%m') = ?`;
    db.query(sql, [valor, usuario, data], (err, results) => {
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
