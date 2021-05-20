const { json } = require('body-parser');
const sqlQry = require('../utils/mysql')
exports.CadastroLojaParceira = (req, res) => {
  // console.log(req.body)
  const nome = req.body.nome.substring(0,100);
  const cnpj = req.body.cnpj.substring(0,14);
  const senha = req.body.senha.substring(0,64);
  sqlQry.execSQLQuery(`INSERT INTO lojaparceira (nomedaloja, cnpj, senha) SELECT * FROM
  (SELECT '${nome}', '${cnpj}', '${senha}') AS tmp
  WHERE NOT EXISTS ( SELECT nomedaloja FROM lojaparceira WHERE cnpj = '${cnpj}') LIMIT 1;`,dataset=>{
    if(dataset === undefined){
      res.send({success: false, message: 'CNPJ já cadastrado', error: 404});
    } else
      res.status(200).send(dataset);
  });
}

