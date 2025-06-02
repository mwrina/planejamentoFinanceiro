import db from '../config/db.js';

const Investimento = {
  criar: (usuario, investimento, tipo, data, valor, risco, callback) => {
    const sql = 'INSERT INTO investimentos (usuario, investimento, tipo, data, valor, risco) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [usuario, investimento, tipo, data, valor, risco], callback);
  },

  listarInvestimentos : (usuario, callback) => {
    const sql = 'SELECT * FROM investimentos WHERE usuario = ?';
    db.query(sql, [usuario], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  calcTotal: (usuario, callback) => {
    const sql = 'SELECT SUM(valor) as total FROM investimentos WHERE usuario = ?';
    db.query(sql, [usuario], (err, results) => {
      if(err) return callback(err);
      callback(null, results);
    })
  },

  calcTotalMes: (usuario, mes, callback) => {
    const sql = `SELECT SUM(valor) as total FROM investimentos WHERE usuario = ? AND DATE_FORMAT(data, '%Y-%m') = ?`;
    db.query(sql, [usuario, mes], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },
  
  atualizar : (id, investimento, tipo, data, valor, risco, callback) => {
    const sql = 'UPDATE investimentos SET investimento = ?, tipo = ?, data = ?, valor = ?, risco = ? WHERE id = ?';
    db.query(sql, [investimento, tipo, data, valor, risco, id], callback);
  },

  deletar : (id, callback) => {
    const sql = 'DELETE FROM investimentos WHERE id = ?';
    db.query(sql, [id], callback);
  },
};

export default Investimento;
