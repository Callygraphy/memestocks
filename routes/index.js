
/*
 * GET home page.
 */

var restler = require('restler');
var littleprinter = require('littleprinter')

exports.index = function(request, response) {
	var d = new Date();

	var today = d.getDay();

	if (today == 3) {

		restler.get('http://version1.api.memegenerator.net/Generators_Select_ByPopular?pageIndex=0&pageSize=12&days=7').on('complete', function(reddit) {
			var advice = "Use <strong>" + reddit.result[1].displayName + "</strong> with caution."
			
			var memePic = reddit.result[0].imageUrl;
			
			var topOfThePops = ""
			for(var i=0; i<5; i++) {
				topOfThePops += "<li>" + reddit.result[i].displayName + "</li>";}
			
			var etag = littleprinter.createEtag(d.toString())
		 	response.set('Etag', etag);
		 	if(req.headers && req.headers['if-none-match'] === data.etag) {
     			return res.send(304);
    			}	 	
			
			response.render('index', { memePic: memePic, topOfThePops: topOfThePops, advice: advice });
		});
	} else { 
			var etag = littleprinter.createEtag(d.toString())
		 	response.set('Etag', etag);
		 	
		 	response.send(204);
		 }
};