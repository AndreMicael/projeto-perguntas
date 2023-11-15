const express = require("express"); //Importando express
const app = express(); //Iniciando o express
const bodyParser = require("body-parser"); //Importando o body-parser


app.set('view engine', 'ejs'); //Setando o ejs como view engine
app.use(express.static('public')); //Setando a pasta public como estatica
app.use(express.text()); //Configurando o express para receber textos

//Configurando o body-parser
// Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", (req, res) => { //Rota principal
    res.render("index"); //Renderizando a pagina index
}); 
app.get("/perguntas", (req, res) => { //Rota perguntas
    res.render("perguntar"); //Renderizando a pagina perguntas
}); 

app.post("/salvar", (req, res) => { //Rota salvar
    var titulo = req.body.titulo; //Pegando o titulo do formulario
    var descricao = req.body.descricao; //Pegando a descricao do formulario
    res.send('titulo: ' + titulo + ' descricao: ' + descricao); //Enviando uma resposta para o usuario

}); //Enviando uma resposta para o usuario



app.listen(4000,()=>{console.log("Servidor rodando!");});