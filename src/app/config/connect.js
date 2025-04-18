import app from './db.js';

app.conecta.connect(function(err){
    if(err) throw err;
    console.log("Banco Conectado!");
});
