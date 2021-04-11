const { json } = require('body-parser');
const sqlQry = require('../utils/mysql')
exports.filterAluno = (req, res) => {
  // console.log(req.body)
  // console.log('post');
  const cpfAluno = req.body.cpf.substring(0,100);
  //SELECIONA NO BANCO O NOME DO ALUNO, CASO NÃO ENCONTRAR, MANDA A MENSAGEM NOME NÃO ENCONTRADO
  sqlQry.execSQLQuery(`SELECT * FROM aluno WHERE cpfaluno = '${cpfAluno}';`,dataset=>{
    if(dataset === undefined){
    res.send({success: false, message: 'Nome não encontrado', error: 404});
    } else
      res.status(200).send(dataset);
  });
}

//FUNÇÃO NO SQL PARA ADICIONAR MOEDAS
// UPDATE `moeda-estudantil`.aluno SET moedas=(moedas+'10') WHERE idaluno=('19');

//FUNÇÃO PARA O ALUNO VER AS SUAS MOEDAS
exports.filterMoedaAluno = (req, res) =>{
  const cpfAluno = req.body.cpf.substring(0,100);
  // const idAluno = parseInt(req.body.idaluno);
  sqlQry.execSQLQuery(`SELECT moedas FROM aluno WHERE cpfaluno='${cpfAluno}';`,dataset=>{
    if (dataset === undefined){
      res.send({success: false, message: 'Ocorreu um erro no sistema', error: 404});
    } else
    res.status(200).send(dataset);
  });
}

//FUNÇÃO PARA O PROFESSOR VER AS SUAS MOEDAS
exports.filterMoedaProfessor = (req, res) =>{
  const cpfProfessor = req.body.cpf.substring(0,100);
  // const idAluno = parseInt(req.body.idaluno);
  sqlQry.execSQLQuery(`SELECT moedas FROM professor WHERE cpfprofessor='${cpfProfessor}';`,dataset=>{
    if (dataset === undefined){
      res.send({success: false, message: 'Ocorreu um erro no sistema', error: 404});
    } else
    res.status(200).send(dataset);
  });
}

//FUNÇÃO PARA O PROFESSOR VER TODOS OS ALUNOS DE UMA UNIVERSIDADE
//SELECT NOME FROM `moeda-estudantil`.aluno WHERE cnpjuniversidade=('1234567890123');
//POR ALGUM MOTIVO RETORNA APENA UM VALOR;
exports.filterBuscaAlunos = (req, res) =>{
  const universidade = req.body.cnpj.substring(0,14);
  sqlQry.execSQLQuery(`SELECT nome FROM aluno WHERE cnpjuniversidade='${universidade}';`,dataset=>{
    console.log(dataset);
    if (dataset === undefined){
      res.send({success: false, message: 'Ocorreu um erro no sistema', error: 404});
    } else{
    res.status(200).send(dataset);
    }
  });

}