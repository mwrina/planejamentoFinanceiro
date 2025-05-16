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
