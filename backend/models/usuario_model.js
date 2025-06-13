import db from '../config/db.js';

const Usuario = {
  criar: (nome, email, senha, callback) => {
    const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
    db.query(sql, [nome, email, senha], callback);
  },

  buscarPorEmail: (email, callback) => {
    const sql = 'SELECT * FROM usuarios WHERE email = ?';
    db.query(sql, [email], (err, results) => {
      if (err) return callback(err);
      if (results.length === 0) return callback(null, null);
      callback(null, results[0]);
    });
  },

  buscarPorId: (id, callback) => {
    const sql = 'SELECT id, nome, email FROM usuarios WHERE id = ?';
    db.query(sql, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  },

  atualizar: (nome, email, senha, id, callback) => {
    const sql = 'UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?';
    db.query(sql, [nome, email, senha, id], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }
};

export default Usuario;
