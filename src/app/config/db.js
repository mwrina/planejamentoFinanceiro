import mysql from 'mysql2';

const conecta = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Test'
});

export default { conecta };
