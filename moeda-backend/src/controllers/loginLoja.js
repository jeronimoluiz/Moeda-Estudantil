
const { json } = require('body-parser');
const sqlQry = require('../utils/mysql')
exports.loginLojaParceira = (req, res) => {
  // console.log(req.body)
  const cnpj = req.body.cnpj.substring(0,14);
  const senha = req.body.senha.substring(0,64);
  sqlQry.execSQLQuery(`SELECT * FROM lojaparceira WHERE Cnpj = '${cnpj}' AND Senha='${senha}';`,dataset=>{
    if(dataset === undefined){
      res.send({success: false, message: 'Cnpj ou senha incompletos', error: 404});
    } else
      res.status(200).send(dataset);
  });
}