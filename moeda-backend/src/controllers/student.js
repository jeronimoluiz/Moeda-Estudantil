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

// ISSO TEM QUE ALTERAR!!!!!!!!!!
exports.add = (req, res) => {
  console.log('post');
  const nome = req.body.nome.substring(0,150);
  const cpf = req.body.cpf.substring(0,11);
  execSQLQuery(`INSERT INTO ALUNO(Nome, CPF) VALUES('${nome}','${cpf}')`, res);
}

// ISSO TEM QUE ALTERAR!!!!!!!!!!
exports.update = (req, res) => {
  const id = parseInt(req.params.id);
  const nome = req.body.nome.substring(0,150);
  const cpf = req.body.cpf.substring(0,11);
  execSQLQuery(`UPDATE ALUNOS SET Nome='${nome}', CPF='${cpf}' WHERE ID=${id}`, res);
}

