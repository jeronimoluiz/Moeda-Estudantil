const { json } = require('body-parser');
const sqlQry = require('../utils/mysql')
exports.CadastroProdutoNovo = (req, res) => {
  // console.log(req.body)
  const nome = req.body.nome.substring(0,100);
  const valor = parseInt(req.body.preco.substring(0,30));
  const loja = parseInt(req.body.idloja.substring(0,30));
  const imagem = req.body.image.substring(0,100);
  const descricao = req.body.descricao.substring(0,100)

  if (descricao == undefined)
    descricao = null;

  if (imagem == undefined)
    imagem = null;

  sqlQry.execSQLQuery(`INSERT INTO produtosloja (NomeDoProduto, Preco, IdLoja, Imagem, Descricao) 
                      values ('${nome}','${valor}','${loja}', 'LOAD_FILE(${imagem})','${descricao}');`,dataset=>{
    if(dataset === undefined){
      res.send({success: false, message: 'Ocorreu algum erro', error: 404});
    } else
      res.status(200).send(dataset);
  });
}

