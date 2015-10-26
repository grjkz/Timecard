var express = require('express');
var app = express();
var ejs = require('ejs');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(bodyParser());
app.set('view_engine','ejs');
app.use(express.static(__dirname));

var db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	database: 'timecard'
});

db.connect(function(err) {
	if (err) console.log(err);
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

//TIMECARDS API//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/api/timecards',function(req,res) {
	// show all timecards
	db.query("SELECT fname, lname, timein, timeout FROM employees AS e, timecards AS t WHERE e.employee_id = t.employee_id ORDER BY t.timein;", 
		function(err, results, fields) {
		res.json(results)
	})
})

// punch in
app.post('/api/timecards', function(req,res) {
	// search for employee in DB by their eID/ssn
	db.query("SELECT employee_id FROM employees WHERE eID = ? LIMIT 1", req.body.eid, function(error,result,fields) {
		if (error) console.log(error);
		else {
			// check to see if anything was returned in the array
			if (result.length) {
				db.query("INSERT INTO timecards (employee_id) VALUES (?)", result[0].employee_id, function(err, result2) {
					if (err) console.log(err);
					else {
						console.log(result2);
						res.json(result2)
					}
				})
			} else {
				res.json({exists: false})
			}
		}
	})
})

// punch out
app.put('api/timecards', function(req,res) {
	// search for employee in DB by their eID/ssn
	db.query("SELECT employee_id FROM employees WHERE eID = ? LIMIT 1", req.body.eid, function(err,result,fields) {
		if (err) console.log(err);
		// check to see if anything was returned in the array
		if (result.length) {
			db.query("UPDATE timecards SET timeout = NOW() WHERE employee_id = ? AND DATE(timein) = DATE(NOW()) LIMIT 1", result[0].employee_id, function(err, result2) {
				if (err) console.log(err);
				console.log("UpdateResult: "+JSON.stringify(result2));
			})
		}
	})
})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//EMPLOYEES API//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/api/employees/:id/timecards',function(req,res) {
	// get all timecards for specific employee
	db.query("SELECT fname,lname,timein,timeout,card_id FROM employees AS e JOIN timecards AS t ON e.employee_id = t.employee_id WHERE e.employee_id = ?", req.params.id, function(err,results,fields) {
		res.json(results)
	})
})

app.get('/api/employees/:id',function(req,res) {
	console.log("GET Request ID: "+req.params)
	db.query("SELECT * FROM employees WHERE employee_id = ? LIMIT 1", req.params.id, function(err,result,fields) {
		// query always comes back as an array so use "result[0]"
		res.json(result[0])
	})
})

app.put('/api/employees/:id',function(req,res) {
	console.log("PUT Request ID: "+req.params.id)
	db.query("SELECT * FROM employees WHERE employee_id=? LIMIT 1", req.params.id, function(err,result,fields) {
		var employee = result[0]
		console.log(employee)
		console.log("req.body: "+req.body)
	})
})

app.delete('/api/employees/:id', function(req,res) {
	console.log("DELETE Requst ID: "+req.params.id)
	db.query("DELETE FROM timecards where employee_id = ?", req.params.id, function(error, results) {
		if (error) { console.log(error) }
		else {
			db.query("DELETE FROM employees WHERE employee_id = ? LIMIT 1", req.params.id, function(err,fields) {
				console.log(fields)
					if (err) console.log(err);
					else {
						res.json({deleted: fields.affectedRows})
					}
			})
		} 
	})
})

app.get('/api/employees', function(req,res) {
	db.query("SELECT * FROM employees", function(err,results,fields) {
		console.log("Query Request")
		res.json(results)
	})
})

app.post('/api/employees', function(req,res) {
	// console.log(req.body)
	db.query("INSERT INTO employees SET ?", {fname:req.body.firstName, lname:req.body.lastName, eID:req.body.eid}, function(err,fields) {
		if (err) console.log(err);
		else {
		// console.log(fields)
			db.query("SELECT * FROM employees WHERE employee_id="+fields.insertId, function(err,result) {
				console.log(result)
				res.json(result[0])
			})
		}
	})
})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/api/test/:id',function(req,res) {
	db.query("SELECT * FROM EMPLOYEES WHERE employee_id=?",req.params.id,function(err,result,fields) {
		// console.log(req.params)
		res.json(result[0])
	})
})

app.get('/api/test',function(req,res) {
	db.query("SELECT * FROM EMPLOYEES",function(err,results,fields) {
		// console.log(results)
		res.json(results)
	})
})

app.get('*', function(req,res) {
	res.status(404).send("NOT FOUND!")
})

app.listen(3000,function(){
	console.log("listening on 3k");
});