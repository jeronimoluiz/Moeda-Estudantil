exports.loginStudent = (req, res) => {
  // console.log(req.body)
  // console.log('post');
  const matricula = parseInt(req.body.matricula);
  const senha = req.body.senha.substring(0,63);
  execSQLQuery(`SELECT * FROM ALUNO WHERE MATRICULAALUNO = '${matricula}' AND SENHA='${senha}';`, res);
};