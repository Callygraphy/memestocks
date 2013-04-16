var express = require('express')
  , path = require('path');


var restler = require('restler');

var app = express.createServer(express.logger());

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set("view options", { layout: false })
app.use(express.static(path.join(__dirname, 'public')));


app.get('/edition/', function(request, response) {
	restler.get('http://version1.api.memegenerator.net/Generators_Select_ByPopular?pageIndex=0&pageSize=12&days=7').on('complete', function(reddit) {
		var advice = "Use <em>" + reddit.result[1].displayName + "</em> with caution."
		var memePic = reddit.result[0].imageUrl;
		var topOfThePops = "";
		for(var i=0; i<5; i++) {
			topOfThePops += "<li>" + reddit.result[i].displayName + "</li>";
		}
		response.render('index', { memePic: memePic, topOfThePops: topOfThePops, advice: advice });

	});
});

app.get('/sample/', function(request, response) {
	restler.get('http://version1.api.memegenerator.net/Generators_Select_ByPopular?pageIndex=0&pageSize=12&days=7').on('complete', function(reddit) {
		var advice = "Use <em>" + reddit.result[1].displayName + "</em> with caution."
		var memePic = reddit.result[0].imageUrl;
		var topOfThePops = "";
		for(var i=0; i<5; i++) {
			topOfThePops += "<li>" + reddit.result[i].displayName + "</li>";
		}
		response.render('index', { memePic: memePic, topOfThePops: topOfThePops, advice: advice });

	});
});



var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});