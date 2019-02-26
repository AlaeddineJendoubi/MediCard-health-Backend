const mysql = require('mysql');

const express = require('express');

var app = express();

const bodyparser = require('body-parser');



app.use(bodyparser.json());



var mysqlConnection = mysql.createConnection({

    host: 'localhost',

    user: 'root',

    password: '',

    database: 'medicard',

    multipleStatements: true

});



mysqlConnection.connect((err) => {

    if (!err)

        console.log('DB connection succeded.');

    else

        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));

});





app.listen(3000, () => console.log('Express server is runnig at port no : 3000'));





//Get all employees

app.get('/user', (req, res) => {

    mysqlConnection.query('SELECT * FROM user', (err, rows, fields) => {

        if (!err)

            res.send(rows);

        else

            console.log(err);

    })

});
