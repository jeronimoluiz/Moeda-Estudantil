const { json } = require('body-parser');
const sqlQry = require('../utils/mysql');

exports.remove = (req, res) => {
  execSQLQuery('DELETE FROM ALUNO WHERE ID=' + parseInt(req.params.id), res);
};

// router.get('/clientes/:id?', (req, res) =>{
//     console.log('get');
//     let filter = '';
//     if(req.params.id) 
//         filter = ' WHERE ID=' + parseInt(req.params.id);
//     execSQLQuery('SELECT * FROM aluno' + filter, res);
// })

// CADASTRA O ALUNO SE AINDA NÃO EXISTIR
exports.registroAluno = (req, res, dataset) => {
  //console.log('post');
  //const nome = req.body.nome.substring(0,150);//
  const cpfAluno = req.body.cpfAluno.substring(0, 11);
  //const matricula = parseInt(req.body.matriculaaluno);
  const cnpjUniversidade = req.body.cnpjUniversidade.substring(0, 14);
  const senha = req.body.senha.substring(0, 64);
  //SELECIONA NO BANCO O CPF DO ALUNO,VERIFICA SE JA EXISTE UMA SENHA CADASTRADA, CASO EXISTA, MANDA A MENSAGEM ALUNO JA CADASTRADO, CASO NÃO, CADASTRA O ALUNO.
  sqlQry.execSQLQuery(`SELECT * FROM ALUNO WHERE CPFALUNO = '${cpfAluno}' AND CNPJUNIVERSIDADE = '${cnpjUniversidade}';`, dataset => {
    if (dataset === undefined) {
      res.status(200).send('Aluno não existe');
    } else {
      sqlQry.execSQLQuery(`SELECT * FROM ALUNO WHERE CPFALUNO = '${cpfAluno}' AND SENHA!='';`, dataset => {
        if (dataset !== undefined) {
          res.status(200).send('Aluno já cadastrado');
        } else {
          //sqlQry.execSQLQuery(`INSERT INTO aluno(matriculaaluno, nome, cnpjuniversidade, senha) VALUES('${matricula}', '${nome}', '${cnpjuniversidade}', '${senha}');`,dataset=>{
          sqlQry.execSQLQuery(`UPDATE ALUNO SET SENHA = '${senha}' WHERE CPFALUNO = '${cpfAluno}' AND CNPJUNIVERSIDADE = '${cnpjUniversidade}';`, dataset => {
            res.status(200).send('Aluno cadastrado com sucesso');
          });
        }
      });
    }

  });
}


// ISSO TEM QUE ALTERAR!!!!!!!!!!
exports.update = (req, res) => {
  const id = parseInt(req.params.id);
  const nome = req.body.nome.substring(0, 150);
  const cpf = req.body.cpf.substring(0, 11);
  sqlQry.execSQLQuery(`UPDATE PROFESSORS SET Nome='${nome}', CPF='${cpf}' WHERE ID='${id}'`, res);
}
