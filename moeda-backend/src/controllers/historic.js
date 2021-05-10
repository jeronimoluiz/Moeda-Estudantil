const { json } = require('body-parser');
const sqlQry = require('../utils/mysql');
require('date-utils');

exports.searchHistoricByDateStudent = (req, res) => {
  const numberOfDays = 14;
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

      today = new Date();
      let actualDay = today.getDate();
      let actualMonth = today.getMonth() + 1;
      let actualYear = today.getFullYear();
      let actualHours = today.getHours();
      let actualMinutes = today.getMinutes();

      let endDate = new Date(actualYear, actualMonth - 1, actualDay, actualHours - 3, actualMinutes).toISOString().replace(/T/, ' ').replace(/\..+/, '');

      sqlQry.execSQLQueryArrays(`SELECT remetente, destinatario, quantmoedas, data
        FROM(
          SELECT IDALUNOREMETENTE as remetente, IDALUNODESTINATARIO as destinatario, QUANTMOEDAS as quantmoedas, DATA as data FROM transfaluno 
          UNION ALL 
          SELECT IDPROFESSORR as remetente, IDALUNOD as destinatario, QUANTMOEDAS as quantmoedas, DATA as data FROM transfprofessor
        ) historico where(remetente = '${idStudent}' or destinatario = '${idStudent}') and data between CONVERT_TZ('${startDate}','+00:00','-03:00') 
        and CONVERT_TZ('${endDate}','+00:00','-03:00');`, (dataset) => {

          if(dataset == undefined) {
            res.status(200).send('Ocorreu um erro na busca dos dados');
          } else {
            res.status(200).send(dataset);
          }
      });
    }
  });
}

exports.searchHistoricByDateTeacher = (req, res) => {
  const numberOfDays = 14;
  const cpfTeacher = req.body.cpf;
  let idTeacher = 0;

  // buscando o id do aluno
  sqlQry.execSQLQuery(`SELECT IDPROFESSOR FROM professor WHERE CPFPROFESSOR ='${cpfTeacher}';`, (dataset) => {
    idTeacher = dataset.IDPROFESSOR;

    if (dataset === undefined) {
      res.status(200).send('Professor não encontrado');
    } else {
      let today = new Date();
      let last = new Date(today.getTime() - (numberOfDays * 24 * 60 * 60 * 1000));
      let day = last.getDate();
      let month = last.getMonth() + 1;
      let year = last.getFullYear();
      let hours = last.getHours();
      let minutes = last.getMinutes();

      let startDate = new Date(year, month - 1, day, hours - 3, minutes).toISOString().replace(/T/, ' ').replace(/\..+/, '');

      today = new Date();
      let actualDay = today.getDate();
      let actualMonth = today.getMonth() + 1;
      let actualYear = today.getFullYear();
      let actualHours = today.getHours();
      let actualMinutes = today.getMinutes();

      let endDate = new Date(actualYear, actualMonth - 1, actualDay, actualHours - 3, actualMinutes).toISOString().replace(/T/, ' ').replace(/\..+/, '');

      sqlQry.execSQLQueryArrays(`Select p.IDPROFESSORR, p.IDALUNOD, p.quantmoedas, p.data FROM transfprofessor as p where (p.IDPROFESSORR = '${idTeacher}') 
        and p.data between CONVERT_TZ('${startDate}','+00:00','-03:00') and CONVERT_TZ('${endDate}','+00:00','-03:00');`, (dataset) => {

          if(dataset == undefined) {
            res.status(200).send('Ocorreu um erro na busca dos dados');
          } else {
            res.status(200).send(dataset);
          }
      });
    }
  });


}