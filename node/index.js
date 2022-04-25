const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql')

const sqlCreate = `CREATE TABLE IF NOT EXISTS people(id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255), PRIMARY KEY(id))`
const sqlInsertN1 = `INSERT INTO people(name) VALUES('Anderson')`
const sqlInsertN2 = `INSERT INTO people(name) VALUES('Vasconcelos')`
const sqlSelect = `SELECT * FROM people`
const sqlDrop = `DROP TABLE people`

app.get('/', (req,res) => {

    const connection = mysql.createConnection(config)
    connection.query(sqlCreate)
    connection.query(sqlInsertN1)
    connection.query(sqlInsertN2)
    
    let dados = '<h1>Full Cycle Rocks!</h1>'
    
    connection.query(sqlSelect, function(err, result) {
        if (err) throw err;
        Object.keys(result).forEach(function(key) {
            var row = result[key]
            dados += '<li>' + row.name + '</li>'
        });
        res.send(dados)        
    });
        
    connection.query(sqlDrop)
    connection.end()
    
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})

