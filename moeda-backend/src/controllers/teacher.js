const { json } = require('body-parser');
const sqlQry = require('../utils/mysql');

// CADASTRA O PROFESSOR SE AINDA NÃO EXISTIR
exports.registroProfessor = (req, res, dataset) => {
  //console.log('post');
  //const nome = req.body.nome.substring(0,150);//
  const cpfProfessor = req.body.cpfProfessor.substring(0, 11);
  //const matricula = parseInt(req.body.matriculaaluno);
  const cnpjUniversidade = req.body.cnpjUniversidade.substring(0, 14);
  const senha = req.body.senha.substring(0, 64);
  //SELECIONA NO BANCO O CPF DO PROFESSOR,VERIFICA SE JA EXISTE UMA SENHA CADASTRADA, CASO EXISTA, MANDA A MENSAGEM PROFESSOR JA CADASTRADO, CASO NÃO, CADASTRA O PROFESSOR.
  sqlQry.execSQLQuery(`SELECT * FROM PROFESSOR WHERE CPFPROFESSOR = '${cpfProfessor}' AND CNPJUNIVERSIDADE = '${cnpjUniversidade}';`, dataset => {
    if (dataset === undefined) {
      res.status(200).send('Professor não existe');
    } else {
      sqlQry.execSQLQuery(`SELECT * FROM PROFESSOR WHERE CPFPROFESSOR = '${cpfProfessor}' AND SENHA!='';`, dataset => {
        if (dataset !== undefined) {
          res.status(200).send('Professor já cadastrado');
        } else {
          //sqlQry.execSQLQuery(`INSERT INTO aluno(matriculaaluno, nome, cnpjuniversidade, senha) VALUES('${matricula}', '${nome}', '${cnpjuniversidade}', '${senha}');`,dataset=>{
          sqlQry.execSQLQuery(`UPDATE PROFESSOR SET SENHA = '${senha}' WHERE CPFPROFESSOR = '${cpfProfessor}' AND CNPJUNIVERSIDADE = '${cnpjUniversidade}' 
            AND MOEDAS = 0 ;`, dataset => {
            res.status(200).send('Professor cadastrado com sucesso');
          });
        }
      });
    }
  });
}