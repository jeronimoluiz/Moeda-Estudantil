const { json } = require('body-parser');
const sqlQry = require('../utils/mysql')
exports.CadastroProdutoNovo = (req, res) => {
  // console.log(req.body)
  const nome = req.body.nome.substring(0,100);
  const valor = parseInt(req.body.preco.substring(0,30));
  const loja = parseInt(req.body.idloja.substring(0,300));
  sqlQry.execSQLQuery(`INSERT INTO produtosloja (NomeDoProduto, Preco, IdLoja) values ('${nome}','${valor}','${loja}');`,dataset=>{
    if(dataset === undefined){
      res.send({success: false, message: 'Ocorreu algum erro', error: 404});
    } else
      res.status(200).send(dataset);
  });
}

