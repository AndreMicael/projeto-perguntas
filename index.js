const express = require("express"); //Importando express
const app = express(); //Iniciando o express

app.set('view engine', 'ejs'); //Setando o ejs como view engine
app.use(express.static('public')); //Setando a pasta public como estatica

app.get("/", (req, res) => { //Rota principal
    res.render("principal/index"); //Renderizando a pagina index
}); 
app.get("/perguntas", (req, res) => { //Rota perguntas
    res.render("principal/perguntar"); //Renderizando a pagina perguntas
}); 

app.listen(4000,()=>{console.log("Servidor rodando!");});