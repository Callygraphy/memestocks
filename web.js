var express = require('express')
  , path = require('path')
  , routes = require('./routes')
  , http = require('http');


var restler = require('restler');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set("view options", { layout: false })
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.logger('dev'));
app.use(app.router);

app.get('/edition/', routes.index);

app.get('/sample/', function(req, res) {
	res.render('sample.ejs');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
