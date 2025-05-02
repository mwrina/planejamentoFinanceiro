import db from '../config/db.js';

const Usuario = {
  criar: (nome, email, senha, callback) => {
    const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
    db.query(sql, [nome, email, senha], callback);
  },

  buscarPorEmail: (email, callback) => {
    const sql = 'SELECT id FROM usuarios WHERE email = ? LIMIT 1';
    id = db.query(sql, [email], (err, results) => {
      if (err || results.length === 0) {
        return callback(err || null, null);
      }
      callback(null, results[0]);
    });
  }

};

export default Usuario;
