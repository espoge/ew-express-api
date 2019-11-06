var express = require('express');
var router = express.Router();
var db = require('../db/db');
var bodyParser = require('body-parser');
router.use(bodyParser.json()); 


router.get('/', function(req, res, next) {
    var sql = "SELECT * FROM users";
    db.query(sql, function(err, rows, fields) {
      if (err) {
        res.status(500).send({ error: 'Something failed!' })
      }
      res.json(rows)
    })
  });

  router.post('/create', function(req, res, next) {
    let {nome, cognome,email,numtel,ruolo,motivo,descrizione,badge, signin}  = req.body
    let sql = `INSERT INTO users (nome,cognome,email,numtel,ruolo,motivo,descrizione,badge, signin,entrata,uscita) VALUES 
    ("${nome}", "${cognome}", "${email}", "${numtel}","${ruolo}", "${motivo}", "${descrizione}", "${badge}","${signin}",NOW(), NULL)`;
    db.query(sql, function(err, result) {
      if(err) {
        res.status(500).send({ error: 'Something failed!' })
        return
      }
      res.send({'status': 'success',id:result.insertId})
    })
  });
 
  router.put('/exit/:id', function(req, res, next) {
    let {id} =  req.params 
    let {signout} = req.body
    let sql = `UPDATE users SET uscita=NOW(),signout="${signout}" WHERE id=${id}`;
    db.query(sql, function(err, result) {
      if(err) {
        console.log(err)
        res.status(500).send({ error: 'Something failed!' })
        return
      }
      res.json({'status': 'success' })
    })
  });


  router.delete('/delete/:id', function(req, res, next) {
    let {id} =  req.params
    var sql = `DELETE FROM users WHERE id=${id}`;
    db.query(sql, function(err, result) {
      if(err) {
        res.status(500).send({ error: 'Something failed!' })
      }
      res.json({'status': 'success'})
    })
  })

  router.post('/search', function(req, res, next) {
    let {entrata} = req.body
    //console.log('qui req bodyyyyy',req)
    var sql = `SELECT * FROM users where entrata >="${entrata} 00:00:00" AND entrata < "${entrata} 23:59:59"`;
    //console.log(sql)
    db.query(sql, function(err, rows, fields) {
      if (err) {
        res.status(500).send({ error: 'Something failed!' })
      }
      res.json(rows)
    })
  });
  module.exports = router;
