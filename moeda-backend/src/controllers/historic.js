const { json } = require('body-parser');
const sqlQry = require('../utils/mysql');
require('date-utils');

exports.searchHistoricByDateStudent = (req, res) => {
  const numberOfDays = req.body.numberOfDays;
  const cpfStudent = req.body.cpf;
  let idStudent = 0;

  // buscando o id do aluno
  sqlQry.execSQLQuery(`SELECT IDALUNO FROM aluno WHERE CPFALUNO ='${cpfStudent}';`, (dataset) => {
    idStudent = dataset.IDALUNO;

    if (dataset === undefined) {
      res.status(200).send('Aluno não encontrado');
    } else {
      let today = new Date();
      let last = new Date(today.getTime() - (numberOfDays * 24 * 60 * 60 * 1000));
      let day = last.getDate();
      let month = last.getMonth() + 1;
      let year = last.getFullYear();
      let hours = last.getHours();
      let minutes = last.getMinutes();

      let startDate = new Date(year, month - 1, day, hours - 3, minutes).toISOString().replace(/T/, ' ').replace(/\..+/, '');

      sqlQry.execSQLQuery(`SELECT IDALUNO FROM aluno WHERE CPFALUNO ='${cpfStudent}';`, (dataset) => {

        // SELECT remetente, destinatario, quantmoedas, data
        // FROM(
        //   SELECT IDALUNOREMETENTE as remetente, IDALUNODESTINATARIO as destinatario, QUANTMOEDAS as quantmoedas, DATA as data FROM transfaluno 
        //   UNION ALL 
        //   SELECT IDPROFESSORR as remetente, IDALUNOD as destinatario, QUANTMOEDAS as quantmoedas, DATA as data FROM transfprofessor
        // ) historico
        // where(remetente = 2 or destinatario = 2) and data between '2021-01-01 00:00' and '2021-05-08 23:00';

        res.status(200).send('OKAY');
      });
    }
  });
}

exports.searchHistoricByDateTeacher = (req, res) => {
  const cpfAluno1 = req.body.cpfAluno1;
  const cpfAluno2 = req.body.cpfAluno2;
}