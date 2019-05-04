var express = require('express');


var router = express.Router();
var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost' ,
  user: 'root' ,
  password : '' ,
  database: 'pim'
})
router.post('/', function(req, res, next) {
var code = req.body.code ;
connection.query (
  "SELECT * FROM patient Where code = ? " ,
  [code] , function (err , row , field) {
    if(err){
      console.log(err);
      res.send({'success' : false , 'message' : 'could not connect to db'});}
   else if(row.length > 0 ){
      res.send({'success' : true , 'user' : row[0].code });}
    else {res.send({'success' : false , 'message' : 'User not found'})}});});

    //Profil 
router.get('/profil/:code', (req, res) => {
  connection.query('SELECT * FROM patient WHERE code = ? ',[req.params.code], (err, rows, fields) => {
      if (!err) console.log('error');
      else
          console.log(rows);
          res.send(rows); })});
        //logout

          router.post('/logout', function(req, res) {
            logout.logoutUser(req, res, function(err, data) {
              if (err) {
                res.json({ 'error': data.error, 'message': data.message });
              } else {
                res.json({ 'success': data.success, 'message': data.message });
              }
            });
          });

//ordonnances
//INNER JOIN patient ON examenmedical.idpatient = patient.idpatient
//8520
//'/ordonnances/:code'
//,[req.params.code]
//http://192.168.43.33:3000/users/ordonnances
// SELECT examenmedical.dateconsulation , medecin.fnmedecin , medecin.lnmedecin , examenmedical.idmedecin , GROUP_CONCAT(examenmedical.medicament) AS medicaments FROM patient INNER JOIN examenmedical ON examenmedical.idpatient = patient.idpatient INNER JOIN medecin ON medecin.idmedecin =examenmedical.idmedecin WHERE code = ? GROUP BY examenmedical.idmedecin , examenmedical.dateconsulation DESC
router.get('/ordonnances/:code', (req, res) => { 
  connection.query(
  'select  GROUP_CONCAT(nommedicament ) AS medicamments  ,GROUP_CONCAT(utilisation) , dateordonnance , fnmedecin , lnmedecin  from medicament , ordonnance , patient , medecin where ordonnance.idmedecin = medecin.idmedecin AND code= ? AND medicament.idordonnance = ordonnance.idordonnance GROUP BY ordonnance.idmedecin , ordonnance.dateordonnance DESC',[req.params.code], (err, rows, fields) => {
  //INNER JOIN  ordonnance o ON m.idordonnance = o.idordonnance 
  //select nommedicament AS medicaments from medicament INNER JOIN  ordonnance  ON  medicament.idordonnance = ordonnance.idordonnance where ordonnance.idpatient =1 
    if (!!err) console.log('error');
  else
  console.log(rows);
  res.send(rows); })});
module.exports = router;
