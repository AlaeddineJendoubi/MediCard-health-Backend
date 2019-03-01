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





//Get all treatment history

app.get('/parcoursoin', (req, res) => {

    mysqlConnection.query('SELECT * FROM parcoursoin', (err, rows, fields) => {

        if (!err)

            res.send(rows);

        else

            console.log(err);

    })

});

//Get rendezvous by user id && medecin id
app.get('/rendezvous/:iduser&&:idmedecin', (req, res) => {

    mysqlConnection.query('SELECT * FROM rendezvous WHERE iduser = ? AND 	idmedecin = ?',[req.params.iduser,req.params.idmedecin], (err, rows, fields) => {

        if (!err)

            res.send(rows);

        else

            console.log(err);

    })

});
//Get all user's rendezvous by user id
app.get('/rendezvouss/:iduser', (req, res) => {

    mysqlConnection.query('SELECT * FROM rendezvous WHERE iduser = ? ',[req.params.iduser], (err, rows, fields) => {

        if (!err)

            res.send(rows);

        else

            console.log(err);

    })

});

// Get medecin by id

app.get('/medecin/:idmedecin', (req, res) => {

    mysqlConnection.query('SELECT * FROM medecin WHERE idmedecin = ? ',[req.params.idmedecin], (err, rows, fields) => {

        if (!err)

            res.send(rows);

        else

            console.log(err);

    })

});
//Get user's rendezvous + doc name using  inner join
app.get('/rendezvous/:iduser', (req, res) => {

    mysqlConnection.query('SELECT rendezvous.date , medecin.nom from rendezvous INNER JOIN medecin ON rendezvous.idmedecin=medecin.idmedecin WHERE iduser=? ',[req.params.iduser], (err, rows, fields) => {

        if (!err)

            res.send(rows);

        else

            console.log(err);

    })

});
