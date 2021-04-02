const database = require('../configs/database')

exports.execSQLQuery = (sqlQry, res) => {
    
  database.connection.connect();
  // console.log(sqlQry);
  database.connection.query(sqlQry, function(error, results, fields){
      if(error) {
        res.json(error);
        console.log(error);
      } else {
        res.json(results[0]);
      //   console.log('executou certo! ' + JSON.stringify(results[0]));
      }
  });
  database.connection.end();
};