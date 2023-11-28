const express = require("express"); //Importando express
const app = express(); //Iniciando o express
const bodyParser = require("body-parser"); //Importando o body-parser
const connection = require("./database/database"); //Importando a conexao com o banco de dados
const perguntaModel = require("./database/pergunta"); //Importando o model pergunta
const respostaModel = require("./database/resposta"); //Importando o model resposta

const port = process.env.PORT || 4000; //Porta do servidor
//Database
//Autenticando a conexao com o banco de dados
connection.authenticate()
        .then(() => { 
            console.log("Conexao feita com o banco de dados!"); //Caso a conexao seja feita com sucesso
        })
        .catch((msgErro) => {
           console.log(msgErro); //Caso a conexao nao seja feita com sucesso ;
        });
           

app.set('view engine', 'ejs'); //Setando o ejs como view engine
app.use(express.static(__dirname + '/public'));
app.use(express.text()); //Configurando o express para receber textos

//Configurando o body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", (req, res) => { //Rota principal
    perguntaModel.findAll({raw: true, order:[
        ['id', 'DESC'] //Ordenando as perguntas por id
    ] }).then(perguntas => { 
     
        res.render("index", {  
            perguntas: perguntas //Renderizando a pagina principal           
        });

    });   
    
   
}); 
app.get("/perguntar", (req, res) => { //Rota perguntas
    res.render("perguntar"); //Renderizando a pagina perguntas
}); 

app.post("/salvar", (req, res) => { //Rota salvar
    var titulo = req.body.titulo; //Pegando o titulo do formulario
    var descricao = req.body.descricao; //Pegando a descricao do formulario
   perguntaModel.create({  
        titulo: titulo,
        descricao: descricao //Criando uma pergunta no banco de dados
    }).then(() => {
        res.redirect("/"); //Redirecionando para a pagina principal
    });

}); //Enviando uma resposta para o usuario

app.get("/suapergunta/:id", (req, res) => { //Rota pergunta 
    var id = req.params.id; //Pegando o id da pergunta
    perguntaModel.findOne({ //Procurando a pergunta no banco de dados
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){ //Caso a pergunta exista

            respostaModel.findAll({ //Procurando as respostas no banco de dados
                where: {perguntaId: pergunta.id},
                order: [
                    ['id', 'DESC'] //Ordenando as respostas por id
                ]
            }).then(respostas => {
                




            res.render("suapergunta",{
                pergunta: pergunta, //Renderizando a pagina pergunta
                respostas: respostas //Renderizando as respostas
            } );
            });

        }else{ //Caso a pergunta nao exista
            res.redirect("/"); //Redirecionando para a pagina principal
        }
    });
});

app.post("/responder",(req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    respostaModel.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/suapergunta/"+perguntaId);
    });
});



app.listen(4000,()=>{console.log("Servidor rodando!");});