const { json } = require('body-parser');
const sqlQry = require('../utils/mysql')

//FUNÇÃO PARA FAZER O VÍNCULO ENTRE LOJA E UNIVERSIDADE
exports.FazerOVinculoLojaUniversidade = (req, res) => {
    const cnpjLoja = req.body.cnpjLoja;
    const cnpjUniversidade = req.body.cnpjUniversidade;
    sqlQry.execSQLQuery(`INSERT INTO lojauniversidade (cnpjLojaParceira, cnpjuniversidade) 
                            VALUES  ('${cnpjLoja}','${cnpjUniversidade}')`,dataset=>{
        if(dataset === undefined){
        res.send({success: false, message: 'Loja ou Universidade não encontrados', error: 404});
        } else
        res.status(200).send(dataset);
    });
}