var express = require('express');
var router = express.Router();

// mysql part
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'test',
    database: 'main'
})

/* handle read request */
router.get('/:id', function(req, res, next) {
    var db_id = req.params.id;
    var sql = 'select name, tel from phonebook where id = ' + db_id;
    connection.query(sql, function(err, rows, fields) {
        if (err) {
            var response_str = 'FAIL';
            var response_rows = [];
            console.log(err);
            console.log(sql);
        } else {
            var response_str = 'OK';
            var response_rows = rows;
        }
        res.json({
            "response":[
                {
                    "status":response_str,
                    "data":response_rows
                }
            ]
        });
    });
});

/* handle create request */
router.post('/', function(req, res, next) {
    var sql = 'insert into phonebook (name, tel) values ("' + req.body.name + '", "' + req.body.tel + '")';
    connection.query(sql, function(err, rows, fields) {
        if (err) {
            var response_str = 'FAIL';
            console.log(err);
            console.log(sql);
        } else {
            var response_str = 'OK';
        }
        res.json({
            "response":[
                {
                    "status":response_str
                }
            ]
        });
    });
});

/* handle update request */
router.put('/:id', function(req, res, next) {
    var db_id = req.params.id;
    var sql = 'update phonebook set name = "' + req.body.name + '", tel = "' + req.body.tel + '" where id = ' + req.params.id;
    connection.query(sql, function(err, rows, fields) {
        if (err) {
            var response_str = 'FAIL';
            console.log(err);
            console.log(sql);
        } else {
            var response_str = 'OK';
        }
        res.json({
            "response":[
                {
                    "status":response_str
                }
            ]
        });
    });
});

/* handle delete request */
router.delete('/:id', function(req, res, next) {
    var db_id = req.params.id;
    var sql = 'delete from phonebook where id = ' + req.params.id;
    connection.query(sql, function(err, rows, fields) {
        if (err) {
            var response_str = 'FAIL';
            console.log(err);
            console.log(sql);
        } else {
            var response_str = 'OK';
        }
        res.json({
            "response":[
                {
                    "status":response_str
                }
            ]
        });
    });
});

module.exports = router;
