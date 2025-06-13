import db from '../config/db.js';

const Saida = {
  criar: (usuario, saida, tipo, data, valor, callback) => {
    const sql = 'INSERT INTO saidas (usuario, saida, tipo, data, valor) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [usuario, saida, tipo, data, valor], callback);
  },

  listarSaidas : (usuario, callback) => {
    const sql = 'SELECT * FROM saidas WHERE usuario = ?';
    db.query(sql, [usuario], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  buscarPorId: (id, callback) => {
    const sql = 'SELECT * FROM saidas WHERE id = ?';
    db.query(sql, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  },

  listarTotaisPorTipo: (usuario, callback) => {
    const sql = 'SELECT tipo, SUM(valor) as total FROM saidas WHERE usuario = ? GROUP BY tipo';
    db.query(sql, [usuario], (err, results) => {
      if(err) return callback(err);
      callback(null, results);
    })
  },

  calcTotal: (usuario, callback) => {
    const sql = `
    SELECT COALESCE(SUM(valor), 0) AS total
      FROM saidas
      WHERE usuario = ?
      AND DATE_FORMAT(data, '%Y-%m') = ?`;
    db.query(sql, [usuario], (err, results) => {
      if(err) return callback(err);
      callback(null, results);
    })
  },

  calcTotalMes: (usuario, data, callback) => {
    const sql = `SELECT SUM(valor) as total FROM saidas WHERE usuario = ? AND DATE_FORMAT(data, '%Y-%m') = ?`;
    db.query(sql, [usuario, data], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  
  atualizar : (id, saida, tipo, data, valor, callback) => {
    const sql = 'UPDATE saidas SET saida = ?, tipo = ?, data = ?, valor = ? WHERE id = ?';
    db.query(sql, [saida, tipo, data, valor, id], callback);
  },

  deletar : (id, callback) => {
    const sql = 'DELETE FROM saidas WHERE id = ?';
    db.query(sql, [id], callback);
  },
};

export default Saida;
