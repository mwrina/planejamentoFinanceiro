import db from '../config/db.js';

const Entrada = {
  criar: (usuario, entrada, tipo, data, valor, callback) => {
    const sql = 'INSERT INTO entradas (usuario, entrada, tipo, data, valor) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [usuario, entrada, tipo, data, valor], callback);
  },

  listarEntradas : (usuario, callback) => {
    const sql = 'SELECT * FROM entradas WHERE usuario = ?';
    db.query(sql, [usuario], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  buscarPorId: (id, callback) => {
    const sql = 'SELECT * FROM entradas WHERE id = ?';
    db.query(sql, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  },

  calcTotal: (usuario, callback) => {
    const sql = `
    SELECT COALESCE(SUM(valor), 0) AS total
      FROM entradas
      WHERE usuario = ?
      AND DATE_FORMAT(data, '%Y-%m') = ?`;
    db.query(sql, [usuario], (err, results) => {
      if(err) return callback(err);
      callback(null, results);
    })
  },

  calcTotalMes: (usuario, data, callback) => {
    const sql = `
      SELECT SUM(valor) as total
      FROM entradas
      WHERE usuario = ?
        AND DATE_FORMAT(data, '%Y-%m') = ?`;
    db.query(sql, [usuario, data], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  
  atualizar : (id, entrada, tipo, data, valor, callback) => {
    const sql = 'UPDATE entradas SET entrada = ?, tipo = ?, data = ?, valor = ? WHERE id = ?';
    db.query(sql, [entrada, tipo, data, valor, id], callback);
  },

  deletar : (id, callback) => {
    const sql = 'DELETE FROM entradas WHERE id = ?';
    db.query(sql, [id], callback);
  },
};

export default Entrada;
