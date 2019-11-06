var express = require('express');
var router = express.Router();
var db = require('../db/db');
var bodyParser = require('body-parser');
router.use(bodyParser.json()); 

router.get('/', function(req, res, next) {
    var sql = "SELECT * FROM badges";
    db.query(sql, function(err, rows, fields) {
      if (err) {
        res.status(500).send({ error: 'Something failed!' })
      }
      res.json(rows)
    })
  });

  router.post('/create', function(req, res, next) {
    let {idBadge, idUser}  = req.body
    var sql = `INSERT INTO badges (idBadge,idUser) VALUES ("${idBadge}", "${idUser}")`;
    db.query(sql, function(err, result) {
      if(err) {
        res.status(500).send({ error: 'Something failed!' })
      }
      res.json({'status': 'success'})
    })
  });
 
  router.delete('/delete/:idBadge', function(req, res, next) {
    let {idBadge} =  req.params
    console.log(idBadge)
    var sql = `DELETE FROM badges WHERE idBadge=${idBadge}`;
    db.query(sql, function(err, result) {
      if(err) {
        res.status(500).send({ error: 'Something failed!' })
      }
      res.json({'status': 'success'})
    })
  })


  module.exports = router;
