//const database = require('../configs/database')
const { json } = require('body-parser');
const mysql = require('mysql');
const { query } = require('../configs/database');
const connection = mysql.createConnection({
  host: process.env.LOCALHOST,
  port: process.env.PORTDB,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

exports.execSQLQuery = (sqlQry, callback) => {
    
  //connection.connect();
  // console.log(sqlQry);
  connection.query(sqlQry, function(error, results, fields){
    let dataset='';  
    if(error) {
        console.log(error);
      } else {
        console.log(results[0]);
        dataset = results[0];
        // console.log('Conseguiu conectar ao banco! ' + JSON.stringify(results))
        console.log('Conectou com sucesso ao BD');
        return callback(dataset);
        }
  });
  //connection.end();
};