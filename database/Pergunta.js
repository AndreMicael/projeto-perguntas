const Sequelize = require('sequelize');
const connection = require('./database');

const Pergunta = connection.define('pergunta',
{
    titulo: {
        type: Sequelize.STRING,
        allowNull: false //Impede que o titulo seja nulo
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false //Impede que a descricao seja nula
    }

});

Pergunta.sync({force: false})

.then(() => {}); //Sincronizando o model com o banco de dados

module.exports = Pergunta; //Exportando o model pergunta