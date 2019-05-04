const mysql = require('mysql');

const express = require('express');
var router = express.Router();
var app = express();

const bodyparser = require('body-parser');

// parse application/x-www-form-urlencoded

app.use(bodyparser.urlencoded({ extended: false }));




var mysqlConnection = mysql.createConnection({

    host: 'localhost',

    user: 'root',

    password: '',

    database: 'pim',

    multipleStatements: true

});


mysqlConnection.connect((err) => {

    if (!err)

        console.log('DB connection succeded.');

    else

        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});

app.listen(3000, () => console.log('Express server is runnig at port no : 3000'));


app.get('/login/:code', (req, res) => {

    mysqlConnection.query('SELECT * FROM patient Where code = ? ',[req.params.code], (err, rows, fields) => {
app.use(express.json());
        if (err)
          {
            res.send({'success' : false , 'message' : 'could not connect to db'});
          }
        else if(rows.length > 0 ){

            res.send({'success' : true , 'user' : rows[0].code });
          }
          else {
            res.send({'success' : false , 'message' : 'User not found'})
          }
    })

});

//ordonnances

          app.get('/ordonnances/:code', (req, res) => {
            connection.query(
            'select  GROUP_CONCAT(nommedicament ) AS medicamments  ,GROUP_CONCAT(utilisation) , dateordonnance , fnmedecin , lnmedecin  from medicament , ordonnance , patient , medecin where ordonnance.idmedecin = medecin.idmedecin AND code= ? AND medicament.idordonnance = ordonnance.idordonnance GROUP BY ordonnance.idmedecin , ordonnance.dateordonnance DESC',[req.params.code], (err, rows, fields) => {

              if (!!err) console.log('error');
            else
            console.log(rows);
            res.send(rows); })});






app.get('/getMedsByUser/:idpatient', (req, res) => {

    mysqlConnection.query('SELECT ordonnance.idordonnance , medicament.nommedicament , medicament.utilisation , medicament.dure FROM medicament INNER JOIN ordonnance ON medicament.idordonnance = ordonnance.idordonnance WHERE ordonnance.idpatient=? ',[req.params.idpatient], (err, rows, fields) => {

        if (!err)

            res.send(rows);

        else

            console.log(err);

    })

});

//Search exams by date
app.get('/nommedicaments/:idpatient ', (req, res) => {

    mysqlConnection.query('SELECT examenmedical.idexamenmedicale, examenmedical.maladie, examenmedical.description, examenmedical.dateconsulation,  medecin.idmedecin, medecin.lnmedecin, medecin.fnmedecin ,medecin.idmedecin from examenmedical INNER JOIN medecin ON examenmedical.idmedecin=medecin.idmedecin WHERE idpatient=? AND like % ? % ', [req.params.idpatient,req.params.dateconsulation],(err, rows, fields) => {

        if (!err)

            res.send(rows);

        else

            console.log(err);

    })

});

//Search exams by date
app.get('/searchExam/:idpatient/:dateconsulation ', (req, res) => {

    mysqlConnection.query('SELECT examenmedical.idexamenmedicale, examenmedical.maladie, examenmedical.description, examenmedical.dateconsulation,  medecin.idmedecin, medecin.lnmedecin, medecin.fnmedecin ,medecin.idmedecin from examenmedical INNER JOIN medecin ON examenmedical.idmedecin=medecin.idmedecin WHERE idpatient=? AND like % ? % ', [req.params.idpatient,req.params.dateconsulation],(err, rows, fields) => {

        if (!err)

            res.send(rows);

        else

            console.log(err);

    })

});

//Get Meds from Ordonnance of the medical exam
app.get('/getMedByExam/:idexamenmedical', (req, res) => {

    mysqlConnection.query('SELECT ordonnance.idordonnance , medicament.nommedicament , medicament.utilisation , medicament.dure FROM medicament INNER JOIN ordonnance ON medicament.idordonnance = ordonnance.idordonnance WHERE ordonnance.idexamenmedical=?', [req.params.idexamenmedical],(err, rows, fields) => {

        if (!err)

            res.send(rows);

        else

            console.log(err);

    })

});
//Get all Examen medicale history

app.get('/parcoursoin/:idpatient', (req, res) => {

    mysqlConnection.query('SELECT examenmedical.idexamenmedicale, examenmedical.maladie, examenmedical.description, examenmedical.dateconsulation,  medecin.idmedecin, medecin.lnmedecin, medecin.fnmedecin ,medecin.idmedecin from examenmedical INNER JOIN medecin ON examenmedical.idmedecin=medecin.idmedecin WHERE idpatient=?', [req.params.idpatient],(err, rows, fields) => {

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
app.get('/getUserId/:code', (req, res) => {

    mysqlConnection.query('SELECT id from patient WHERE code = ? ',[req.params.code], (err, rows, fields) => {

        if (!err)

            res.send(rows);

        else

            console.log(err);

    })

});
// Get Ordonnance by patien id
app.get('/GetOrdonnance/:iduser', (req, res) => {

    mysqlConnection.query('SELECT * FROM Ordonnance WHERE idpatient = ? ',[req.params.iduser], (err, rows, fields) => {

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

// Get specilaite des medecins by id

app.get('/specilaite', (req, res) => {

    mysqlConnection.query('SELECT DISTINCT  specialitemedecin FROM medecin ', (err, rows, fields) => {

        if (!err)

            res.send(rows);

        else

            console.log(err);

    })

});
//Get medecin by specilaite medecin
app.get('/medecinSpecialite/:specialitemedecin', (req, res) => {

    mysqlConnection.query('SELECT idmedecin,fnmedecin,lnmedecin from medecin WHERE specialitemedecin= ? ',[req.params.specialitemedecin], (err, rows, fields) => {

        if (!err)

            res.send(rows);

        else

            console.log(err);

    })

});
//Get user's valide and non expired rendezvous + doc fname/ lastName
app.get('/rendezvousValider/:iduser', (req, res) => {

    mysqlConnection.query('SELECT rendezvous.date , medecin.idmedecin , medecin.lnmedecin , medecin.fnmedecin from rendezvous INNER JOIN medecin ON rendezvous.idmedecin=medecin.idmedecin WHERE idpatient=? && etat=1  && date> CURRENT_TIMESTAMP()',[req.params.iduser], (err, rows, fields) => {

        if (!err)

            res.send(rows);

        else

            console.log(err);

    })

});
app.get('/rendezvousPinned/:iduser', (req, res) => {

    mysqlConnection.query('SELECT rendezvous.date , medecin.idmedecin , medecin.lnmedecin , medecin.fnmedecin from rendezvous INNER JOIN medecin ON rendezvous.idmedecin=medecin.idmedecin WHERE idpatient=? && etat=0  && date> CURRENT_TIMESTAMP()',[req.params.iduser], (err, rows, fields) => {

        if (!err)

            res.send(rows);

        else

            console.log(err);

    })

});

//Get user's expired rendezvous + doc name +last name
app.get('/rendezvousExpired/:iduser', (req, res) => {

    mysqlConnection.query('SELECT rendezvous.date,medecin.lnmedecin , medecin.fnmedecin from rendezvous INNER JOIN medecin ON rendezvous.idmedecin=medecin.idmedecin WHERE idpatient=? && etat=1  && date< CURRENT_TIMESTAMP()',[req.params.iduser], (err, rows, fields) => {

        if (!err)

            res.send(rows);

        else

            console.log(err);

    })

});
app.post('/rendezvousinsert/',(req,res)=> {
    var post= {
      idmedecin : req.body.idmedecin ,
      idpatient : req.body.idpatient ,
      date :  req.body.date ,
      etat : req.body.etat
    };
    mysqlConnection.query('INSERT INTO rendezvous SET ?' , post, function(error) {
        if (error) {
            console.log(error.message);
        } else {
            console.log('success');
        }
    });
});
