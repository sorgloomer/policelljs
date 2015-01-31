var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var url = require('url');
var path = require('path');
var newl = '\r\n', br = '<br>';

var app = express(), api = express();

app.use('/api', api);
app.use(express.static(__dirname + '/public'));

api.get('/get', function(req, res) {
	db.all("select rowid as id, info from test", function(err, rows) {
		res.send('Hello world!' + br + rows.map(function(row) {
			return row.id + ': ' + row.info;
		}).join(br));
	});
});

api.get('/add', function(req, res) {
	var q = url.parse(req.url, true).query;
	db.serialize(function() {
		stmt.run(q.info);
		res.send('added');
	});
});


function later(fn) {
	setTimeout(fn, 500);
}

function cleanup() {
	server.close();
	db.serialize(function() {
		stmt.finalize();
	});
	db.close();
	console.log('Cleanup finished');
}

api.get('/stop', function(req, res) {
	res.send('stopping...');
	later(cleanup);
});


var db = new sqlite3.Database(process.argv[3] || ':memory:');
db.serialize(function() {
  db.run("create table test (id integer primary key autoincrement, info text)");
  db.run("insert into test (info) values ('First!')");
});
var stmt = db.prepare("insert into test (info) values (?)");

var server = app.listen(process.argv[2] || 8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);
});

