const { json } = require('body-parser');
const sqlQry = require('../utils/mysql');

exports.studentToStudent = (req, res) => {
  const cpfAluno1 = req.body.cpfAluno1;
  const cpfAluno2 = req.body.cpfAluno2;
  const valor = parseInt(req.body.valor);
  let moedasBancoAluno1 = 0;
  let moedasBancoAluno2 = 0;
  let idAluno1 = 0;
  let idAluno2 = 0;
  let sucessoTransicao1 = false;
  let sucessoTransicao2 = false;

  // pegando a quantidade de moedas do aluno1 e o id para as proximas querys
  sqlQry.execSQLQuery(`SELECT MOEDAS, IDALUNO FROM aluno WHERE CPFALUNO ='${cpfAluno1}';`, (dataset) => {

    moedasBancoAluno1 = dataset.MOEDAS;
    idAluno1 = dataset.IDALUNO;

    // se o aluno1 tiver moedas suficientes para realizar a transação, faz a pesquisa das moedas do aluno2 e id
    if (moedasBancoAluno1 >= valor) {
      sqlQry.execSQLQuery(`SELECT MOEDAS, IDALUNO FROM aluno WHERE CPFALUNO ='${cpfAluno2}';`, (dataset2) => {
        if(dataset2 === undefined) {
          res.status(404).send('CPF não encontrado');
        } else { 
          moedasBancoAluno2 = dataset2.MOEDAS;
          idAluno2 = dataset2.IDALUNO;
          
          // somando o valor da quantidade de moedas do aluno2 
          sqlQry.execSQLQuery(`UPDATE ALUNO SET MOEDAS = '${moedasBancoAluno2 + valor}' WHERE IDALUNO = '${idAluno2}';`, () => {
            sucessoTransicao1 = true;

            // subtraindo o valor da quantidade de moedas do aluno1
            sqlQry.execSQLQuery(`UPDATE ALUNO SET MOEDAS = '${moedasBancoAluno1 - valor}' WHERE IDALUNO = '${idAluno1}';`, () => {
              sucessoTransicao2 = true;

              // Se as duas operações derem certo, retorna mensagem de sucesso
              if(sucessoTransicao1==true && sucessoTransicao2==true) {
                res.status(200).send('Transação realizada com sucesso');
              } else {
                res.status(401).send('Transação não realizada');
              }
            });
          });
        }
      });
    } else {
      res.status(401).send('Você não tem moedas suficientes');
    }
  });
}

exports.teacherToStudent = (req, res) => {
  const cpfProfessor = req.body.cpfProfessor;
  const cpfAluno = req.body.cpfAluno;
  const valor = parseInt(req.body.valor);
  let moedasBancoProfessor = 0;
  let moedasBancoAluno = 0;
  let idProfessor = 0;
  let idAluno = 0;
  let sucessoTransicao1 = false;
  let sucessoTransicao2 = false;

  // pegando a quantidade de moedas do professor e o id para as proximas querys
  sqlQry.execSQLQuery(`SELECT MOEDAS, IDPROFESSOR FROM professor WHERE CPFPROFESSOR ='${cpfProfessor}';`, (dataset) => {

    moedasBancoProfessor = dataset.MOEDAS;
    idProfessor = dataset.IDPROFESSOR;

    // se o professor tiver moedas suficientes para realizar a transação, faz a pesquisa das moedas do aluno e id
    if (moedasBancoProfessor >= valor) {
      sqlQry.execSQLQuery(`SELECT MOEDAS, IDALUNO FROM aluno WHERE CPFALUNO ='${cpfAluno}';`, (dataset2) => {
        if(dataset2 === undefined) {
          res.status(404).send('CPF não encontrado');
        } else { 
          moedasBancoAluno = dataset2.MOEDAS;
          idAluno = dataset2.IDALUNO;
          
          // somando o valor da quantidade de moedas do aluno
          sqlQry.execSQLQuery(`UPDATE ALUNO SET MOEDAS = '${moedasBancoAluno + valor}' WHERE IDALUNO = '${idAluno}';`, () => {
            sucessoTransicao1 = true;

            // subtraindo o valor da quantidade de moedas do professor
            sqlQry.execSQLQuery(`UPDATE PROFESSOR SET MOEDAS = '${moedasBancoProfessor - valor}' WHERE IDPROFESSOR = '${idProfessor}';`, () => {
              sucessoTransicao2 = true;

              // Se as duas operações derem certo, retorna mensagem de sucesso
              if(sucessoTransicao1==true && sucessoTransicao2==true) {
                res.status(200).send('Transação realizada com sucesso');
              } else {
                res.status(401).send('Transação não realizada');
              }
            });
          });
        }
      });
    } else {
      res.status(401).send('Você não tem moedas suficientes');
    }
  });
}