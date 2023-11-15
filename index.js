const express = require("express"); //Importando express
const app = express(); //Iniciando o express
const bodyParser = require("body-parser"); //Importando body-parser

app.set('view engine', 'ejs'); //Setando o ejs como view engine
app.use(express.static('public')); //Setando a pasta public como estatica

app.get("/", (req, res) => { //Rota principal
    res.render("index"); //Renderizando a pagina index
}); 
app.get("/perguntas", (req, res) => { //Rota perguntas
    res.render("perguntar"); //Renderizando a pagina perguntas
}); 

app.post("/salvar", (req, res) => { //Rota perguntar
    res.send("Formulario recebido!"); //Renderizando a pagina perguntas
});

app.listen(4000,()=>{console.log("Servidor rodando!");});