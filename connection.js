const mysql = require('mysql2/promise');

const connection = mysql.createPool(
{
    host: 'containers-us-west-117.railway.app',
    port: 7228,
    user: 'root',
    password: 'q91reoR2Rlkq9MrbV382',
    database: 'railway'
});

module.exports = connection;

/*conn.connect(
    function (err) { 
    if (err) { 
        console.log("!!! Cannot connect !!! Error:");
        throw err;
    }
    else
    {
       console.log("Connection established.");
           queryDatabase();
    }
});*/

// https://learn.microsoft.com/pt-br/azure/mysql/single-server/connect-nodejs