const { json } = require('body-parser');
const sqlQry = require('../utils/mysql')
exports.loginAluno = (req, res) => {
  // console.log(req.body)
  // console.log('post');
  //ALTERAR PARA CPF A MATRICULA
  const cpf = req.body.cpf.substring(0,11);
  const senha = req.body.senha.substring(0,63);
  //PROCURA NO BANCO O ALUNO COM MATRICULA X E SENHA Y, CASO NÃO ENCONTRAR OS DOIS CASOS ELE IRÁ MANDAR A MENSAGEM SENHA OU MATRICULA INCORRETOS
  sqlQry.execSQLQuery(`SELECT * FROM ALUNO WHERE cpfaluno = '${cpf}' AND SENHA='${senha}';`,dataset=>{
    if(dataset === undefined){
    res.send({success: false, message: 'Senha ou cpf incorretos', error: 404});
    } else
      res.status(200).send(dataset);
  });
}