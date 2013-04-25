
/*
 * GET home page.
 */

var restler = require('restler');
var littleprinter = require('littleprinter');
//var memeAdvice = require('memeAdvice.js')

exports.index = function(request, response) {
	var d = new Date();
	var day = d.getDate();
	var month = d.getMonth();
	var year = d.getFullYear();
	var date = day + "/" + month + "/" + year

	var today = d.getDay();

	if (today == 4) {

		restler.get('http://version1.api.memegenerator.net/Generators_Select_ByPopular?pageIndex=0&pageSize=12&days=7').on('complete', function(reddit) {
			//var randomNum = memeAdvice.getRandom(0, 4);
			//console.log(randomNum);
			var randomMeme = "<em>" + reddit.result[2].displayName + "</em>";
			var advice = "Use "+ randomMeme + " with caution.";

			var memePic = reddit.result[0].imageUrl;
			
			var topOfThePops = ""
			for(var i=0; i<5; i++) {
				topOfThePops += "<li><span class=\"text\">" + reddit.result[i].displayName + "</span></li>";}

			var etagSource = d + "edition"
			var etag = littleprinter.createEtag(etagSource)
			response.set('Etag', etag);
		 	if(request.headers && request.headers['if-none-match'] === etag) {
     			return response.send(304);
    			}	 	
			
			response.render('index', { memePic: memePic, topOfThePops: topOfThePops, advice: advice, date: date });
		});
	} else { 
			var etagSource = d + "none"
			var etag = littleprinter.createEtag(etagSource)
		 	response.set('Etag', etag);
		 	if(request.headers && request.headers['if-none-match'] === etag) {
     			return response.send(304);
    			}	 	
		 	response.send(204);
		 }
};