var express = require('express');
var restler = require('restler');

var app = express.createServer(express.logger());

app.all('/', function(request, response) {
	restler.get('http://www.reddit.com/r/AdviceAnimals/.json').on('complete', function(reddit) {
		var titles = "<body style=\"width: 384px; padding: 0px; margin: 0px;\"><h1 style=\"font-size: 40px;\">MEME STOCKS<h1/><h2>When to use which MEME</h2>";
		for(var i=0; i<1; i++) {
			var imageURL = reddit.data.children[i].data.url; 
			if (imageURL.indexOf(".jpg")!= -1 || imageURL.indexOf(".jpeg")!= -1 ) {
				titles += "<img src=\"" + reddit.data.children[i].data.url + "\" />";
			} else if (imageURL.indexOf("qkme.me")!= -1 || imageURL.indexOf("quickmeme")!= -1) {
				var myRe = /\/([\d\w]{6})/; //finds 6 digit alphanumerical code preceded by a slash
				var newURL = myRe.exec(imageURL);
				if (newURL == null) {
				    titles += "<p> no" + imageURL + "match</p>";
				} else {
    				titles += "<img src=\"http://i.qkme.me/" + newURL[1] + ".jpg\" width=384px/>";
  				}

			} else {
				titles += "<p>Oops. something broke!</p>";}
		}
		for(var i=0; i<5; i++) {
			titles += "<p>" + reddit.data.children[i].data.title + "</p>";
		}
		titles += "</body>";
		response.send(titles);
	});
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});