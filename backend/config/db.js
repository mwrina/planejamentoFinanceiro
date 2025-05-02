import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'planejamentofinanceiro'
});

db.connect(err => {
  if (err) {
    console.error('Erro na conexão com o banco:', err);
  } else {
    console.log('Conectado ao banco de dados.');
  }
});

export default db;
