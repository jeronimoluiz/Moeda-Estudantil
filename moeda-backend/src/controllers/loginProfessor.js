const { json } = require('body-parser');
const sqlQry = require('../utils/mysql')
exports.loginProfessor = (req, res) => {
  // console.log(req.body)
  // console.log('post');
  //ALTERAR PARA CPF A MATRICULA
  const cpf = req.body.cpf.substring(0,11);
  const senha = req.body.senha.substring(0,63);
  //PROCURA NO BANCO O PROFESSOR COM A MATRICULA X E SENHA Y, CASO NÃO ENCONTRAR ELE VAI MANDAR A MENSAGEM DE ERRO ABAIXO
  sqlQry.execSQLQuery(`SELECT * FROM professor WHERE cpfprofessor = '${cpf}' AND SENHA='${senha}';`,dataset=>{
    if(dataset === undefined){
    res.send({success: false, message: 'Senha ou cpf incorretos', error: 404});
    } else
      res.status(200).send(dataset);
  });
}