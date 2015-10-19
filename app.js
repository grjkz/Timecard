var express = require('express');
var app = express();
var ejs = require('ejs');
var mysql = require('mysql');

app.set('view_engine','ejs')
app.use(express.static(__dirname))

var db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	database: 'timecard'
});

db.connect(function(err) {
	if (err) throw err;
	else console.log("DB connected");
});

app.get('/',function(req,res) {
	// db.query('select *, group_concat(timein) AS timein from employees as e join timecards as t on e.employee_id = t.employee_id group by eID;', function(err, rows, fields) {
		// console.log(err);
		// console.log(JSON.stringify(rows));
		// rows.forEach(function(row) {
		// 	console.log(row)
		// })
		// console.log(JSON.stringify(fields)); //returns metadata
		res.render('index.ejs')
	// });
});

app.get('/timecards',function(req,res) {
	// show all timecards
	db.query("SELECT fname, lname, timein, timeout FROM employees AS e, timecards AS t WHERE e.employee_id = t.employee_id ORDER BY t.timein;", 
		function(err, rows, fields) {
		res.send(rows)
	})
})

app.get('/timecards/punchin', function(req,res) {
	// search for employee in DB by their eID/ssn
	db.query("SELECT employee_id FROM employees WHERE eID = ? LIMIT 1", "12345678", function(err,result,fields) {
		if (err) throw err;
		// check to see if anything was returned in the array
		if (result.length) {
			db.query("INSERT INTO timecards (employee_id) VALUES (?)", result[0].employee_id, function(err, result2) {
				if (err) throw err;
				console.log("InsertResult: "+JSON.stringify(result2));
			})
		}
	})
})

app.get('/timecards/punchout', function(req,res) {
	// search for employee in DB by their eID/ssn
	db.query("SELECT employee_id FROM employees WHERE eID = ? LIMIT 1", "999999999", function(err,result,fields) {
		if (err) throw err;
		// check to see if anything was returned in the array
		if (result.length) {
			db.query("UPDATE timecards SET timeout = NOW() WHERE employee_id = ? AND DATE(timein) = DATE(NOW()) LIMIT 1", result[0].employee_id, function(err, result2) {
				if (err) throw err;
				console.log("UpdateResult: "+JSON.stringify(result2));
			})
		}
	})
})

app.get('/employees/add', function(req,res) {
	db.query("INSERT INTO employees SET ?", {fname:req.body.firstName, lname:req.body.lastName, eID:req.body.SSN}, function(err result) {
		console.log(JSON.stringify(result))
	})
})

app.get('/employees/delete', function(req,res) {
	db.query("SELECT employee_id FROM employees WHERE eID = ? LIMIT 1", req.body.SSN, function(err,result,fields) {
		
	}
})

app.get('*', function(req,res) {
	res.status(404).send("NOT FOUND!")
})

app.listen(3000,function(){
	console.log("listening on 3k");
});