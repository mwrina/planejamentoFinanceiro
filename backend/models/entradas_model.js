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
      if (results.length === 0) return callback(null, null);
      callback(null, results[0]);
    });
  },
  
  atualizar: (id, entrada, tipo, data, valor, callback) => {
    const sql = 'UPDATE entradas SET entrada = ?, tipo = ?, data = ?, valor = ? WHERE id = ?';
    db.query(sql, [entrada, tipo, data, valor, id], callback);
  },

  deletar: (id, callback) => {
    const sql = 'DELETE FROM entradas WHERE id = ?';
    db.query(sql, [id], callback);
  }
};

export default Entrada;
