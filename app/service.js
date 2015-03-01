var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var url = require('url');
var path = require('path');
var newl = '\r\n', br = '<br>';

var app = express(), api = express();


var database_file = process.argv[3] || 'offers.sqlite3';
var backup_folder = 'backups';

app.use('/api', api);
app.use(express.static(__dirname + '/public'));

function jsonBody(req, res, next) {
  req.setEncoding('utf8');
  req.rawBody = '';
  req.body = null;
  req.on('data', function(chunk) {
    req.rawBody += chunk;
  });
  req.on('end', function() {
    try {
      if (req.rawBody) {
        req.body = JSON.parse(req.rawBody);
      }
      next();
    } catch (e) {
      next('Not JSON');
    }
  });
}

api.use(jsonBody);

api.get('/get', function(req, res) {
	db.all("select id, info, age from test_table", function(err, rows) {
		res.json(rows);
	});
});

var hasOwn = Object.prototype.hasOwnProperty;
function hasItem(o, x) {
  return hasOwn.call(o, x);
}
var EDITABLE_COLS = {
  "age": true,
  "info": true
};
function getItem(o, x, d) {
  return hasItem(o, x) ? o[x] : d;
}
function editable(c) {
  return getItem(EDITABLE_COLS, c, false);
}

api.post('/set', function(req, res) {
  var col = req.body && req.body.col;
  if (editable(col)) {
    var stmt = db.prepare("update test_table set " + req.body.col + " = ? where id = ?");
    db.serialize(function() {
      stmt.run(req.body.val, req.body.id);
      stmt.finalize();
      res.send('ok');
    });
  } else {
    res.send('error');
  }
});

api.post('/add', function(req, res) {
  var item = req.body;
  if (item) {
    db.serialize(function() {
      stmtInsert.run(item.info, item.age, function(e) {
        if (e) {
          res.send('error ' + e);
        } else {
          res.send('ok');
        }
      });
    });
  } else {
    res.send('error expected item');
  }
});

function fixnum(str, digits) {
  str = '' + str;
  while (str.length < digits) str = '0' + str;
  return str;
}

function backup_filename(datetime, type) {
  if (datetime === undefined) datetime = new Date();
  if (type === undefined) type = 'auto';


  var yyyy = fixnum(datetime.getFullYear(), 4);
  var MM = fixnum(datetime.getMonth() + 1, 2);
  var dd = fixnum(datetime.getDate(), 2);

  var hh = fixnum(datetime.getHours(), 2);
  var mm = fixnum(datetime.getMinutes(), 2);
  var ss = fixnum(datetime.getSeconds(), 2);
  return type + ' ' + yyyy + '-' + MM + '-' + dd + ' ' + hh + ':' + mm + ':' + ss + '.sqlite';
}

function doAutoBackup() {
  var filename = backup_filename();
  var filepath = path.join(backup_folder, filename);
  console.log(filepath);

}
api.post('/backup/manual', function(res, req) {
  try {
    doAutoBackup();
    res.send('good');
  } catch (e) {
    console.error(e);
    res.send('error');
  }
});

doAutoBackup();

function later(fn) {
	setTimeout(fn, 500);
}

function cleanup() {
	server.close();
	db.serialize(function() {
		stmtInsert.finalize();
	});
	db.close();
	console.log('Cleanup finished');
}

api.get('/stop', function(req, res) {
	res.send('stopping...');
	later(cleanup);
});


var db = new sqlite3.Database(database_file);
db.serialize(function() {
  db.run("create table if not exists test_table (id integer primary key autoincrement, info text, age integer)");
  db.get("select count(*) as count from test_table", function(e, row) {
    if (!e) {      
      if (row.count <= 0) {
        db.run("insert into test_table (info, age) values ('First!', 10)");
      }
    }
  });
});
var stmtInsert = db.prepare("insert into test_table (info, age) values (?, ?)");

var server = app.listen(process.argv[2] || 8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);
});

