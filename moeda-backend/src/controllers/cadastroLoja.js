const { json } = require('body-parser');
const sqlQry = require('../utils/mysql')
exports.CadastroLojaParceira = (req, res) => {
  // console.log(req.body)
  const nome = req.body.nome.substring(0,100);
  const cnpj = req.body.cnpj.substring(0,14);
  const senha = req.body.senha.substring(0,64);
  sqlQry.execSQLQuery(`SELECT nomedaloja FROM lojaparceira WHERE cnpj = '${cnpj}';`, dataset => {
  if (dataset !== undefined) {
    res.status(200).send('CNPJ já cadastrado');
  } else {
    sqlQry.execSQLQuery(`INSERT INTO lojaparceira (nomedaloja, cnpj, senha) SELECT * FROM
    (SELECT '${nome}', '${cnpj}', '${senha}') AS tmp
    WHERE NOT EXISTS (SELECT nomedaloja FROM lojaparceira WHERE cnpj = '${cnpj}') LIMIT 1;`, dataset => {
      if (dataset == undefined) {
        res.status(200).send('Loja cadastrada com sucesso');
      } else {
        res.status(200).send('Houve algum erro, tenta novamente mais tarde');
        
      }
    });
  }
});
}

