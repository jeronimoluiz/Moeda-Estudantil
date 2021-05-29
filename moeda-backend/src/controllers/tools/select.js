const { json } = require('body-parser');
const sqlQry = require('../../utils/mysql')


// FUNÇÃO PARA  O PROFESSOR BUSCAR O ALUNO PELO CPF
exports.filterAlunoCPF = (req, res) => {
  const cpfAluno = req.body.cpf.substring(0, 100);
  //SELECIONA NO BANCO O NOME DO ALUNO, CASO NÃO ENCONTRAR, MANDA A MENSAGEM NOME NÃO ENCONTRADO
  sqlQry.execSQLQuery(`SELECT * FROM aluno WHERE cpfaluno = '${cpfAluno}';`, dataset => {
    if (dataset === undefined) {
      res.send({ success: false, message: 'Nome não encontrado', error: 404 });
    } else
      res.status(200).send(dataset);
  });
}

// FUNÇÃO PARA  O PROFESSOR BUSCAR O ALUNO PELA MATRÍCULA
exports.filterAlunoMatricula = (req, res) => {
  const matricula = req.body.matricula.substring(0, 100);
  //SELECIONA NO BANCO O NOME DO ALUNO, CASO NÃO ENCONTRAR, MANDA A MENSAGEM NOME NÃO ENCONTRADO
  sqlQry.execSQLQuery(`SELECT * FROM aluno WHERE matriculaaluno = '${matricula}';`, dataset => {
    if (dataset === undefined) {
      res.send({ success: false, message: 'Nome não encontrado', error: 404 });
    } else
      res.status(200).send(dataset);
  });
}


//FUNÇÃO PARA O ALUNO VER AS SUAS MOEDAS
exports.filterMoedaAluno = (req, res) => {
  const cpfAluno = req.body.cpf.substring(0, 100);
  sqlQry.execSQLQuery(`SELECT moedas FROM aluno WHERE cpfaluno='${cpfAluno}';`, dataset => {
    if (dataset === undefined) {
      res.send({ success: false, message: 'Ocorreu um erro no sistema', error: 404 });
    } else
      res.status(200).send(dataset);
  });
}

//FUNÇÃO PARA O PROFESSOR VER AS SUAS MOEDAS
exports.filterMoedaProfessor = (req, res) => {
  const cpfProfessor = req.body.cpf.substring(0, 100);
  sqlQry.execSQLQuery(`SELECT moedas FROM professor WHERE cpfprofessor='${cpfProfessor}';`, dataset => {
    if (dataset === undefined) {
      res.send({ success: false, message: 'Ocorreu um erro no sistema', error: 404 });
    } else
      res.status(200).send(dataset);
  });
}

//FUNÇÃO PARA O PROFESSOR VER TODOS OS ALUNOS DE UMA UNIVERSIDADE
exports.filterBuscaAlunos = (req, res) => {
  const universidade = req.body.cnpj.substring(0, 14);
  sqlQry.execSQLQueryArrays(`SELECT nome FROM aluno WHERE cnpjuniversidade='${universidade}';`, dataset => {
    if (dataset === undefined) {
      res.send({ success: false, message: 'Ocorreu um erro no sistema', error: 404 });
    } else {
      res.status(200).send(dataset);
    }
  });
}

//FUNÇÃO PARA O ALUNO PROCURAR OUTRO ALUNO PELO NOME
exports.filterBuscaNomeAluno = (req, res) => {
  const nomeAluno = req.body.nome.substring(0, 100);
  const universidade = req.body.cnpj.substring(0, 14);
  sqlQry.execSQLQueryArrays(`SELECT nome FROM aluno WHERE nome LIKE '${nomeAluno}%' AND cnpjuniversidade='${universidade}';`, dataset => {
    if (dataset === undefined) {
      res.send({ success: false, message: 'Ocorreu um erro no sistema', error: 404 });
    } else {
      res.status(200).send(dataset);
    }
  });
}

//FUNÇÃO PARA O ALUNO PROCURAR OUTRO ALUNO PELO NOME CONCATENANDO AS INFORMAÇÕES DO BANCO
exports.filterBuscaNomeAlunoMatricula = (req, res) => {
  const nomeAluno = req.body.nome.substring(0, 100);
  const universidade = req.body.cnpj.substring(0, 14);
  sqlQry.execSQLQueryArrays(`SELECT CONCAT(NOME, ' - ', MATRICULAALUNO) AS dado FROM aluno WHERE nome LIKE '%${nomeAluno}%' OR matriculaAluno LIKE '%${nomeAluno}%' AND cnpjuniversidade='${universidade}';`, dataset => {
    console.log(dataset);
    if (dataset === undefined) {
      res.send({ success: false, message: 'Ocorreu um erro no sistema', error: 404 });
    } else {
      res.status(200).send(dataset);
    }
  });
}

//FUNÇÃO RETORNAR TODAS AS UNIVERSIDADES NO BANCO
exports.filterBuscaNomeUniversidade = (req, res) => {
  sqlQry.execSQLQueryArrays(`SELECT CONCAT(RazaoSocial, ' - ', CNPJ) AS dado From universidade;`, dataset => {
    console.log(dataset);
    if (dataset === undefined) {
      res.send({ success: false, message: 'Ocorreu um erro no sistema', error: 404 });
    } else {
      res.status(200).send(dataset);
    }
  });
}

//FUNÇÃO PARA RETORNAR OS PRODUTOS COM PREÇO INFERIOR A QUANTIDADE DE MOEDAS DO ALUNO
exports.filterBuscaProdutos = (req, res) => {
  const IDALUNO = req.body.ID;
  sqlQry.execSQLQueryArrays(`SELECT  
  produtosloja.NomeDoProduto,
  produtosloja.Preco,
  produtosloja.Imagem,
  lojaparceira.NomeDaLoja
  FROM produtosloja 
  LEFT JOIN lojaparceira ON produtosloja.idLoja = lojaparceira.idLojaParceira 
  LEFT JOIN aluno ON produtosloja.preco < aluno.moedas
  where aluno.IDALUNO =${IDALUNO}
  ORDER BY produtosloja.Preco;`, (dataset) => {
    if (dataset === undefined) {
      res.send({ success: false, message: 'Ocorreu algum erro', error: 404 });
    } else
      res.status(200).send(dataset);
  });
}



