
memeAdvice = {};


memeAdvice.getRandom = function(min, max) {
  return Math.random() * (max - min) + min;
}

memeAdvice.genAdvice = function(y);{
	var advice = ["x may have peaked, use with caution.", "Bullish investors should favour x", "x is a consistent performer. Good for nervous beginners", "Watch out for x, promising to be the break through next week", "Demand for x has reached saturation, time to look to other memes.", "x is coming back into fashion."]
	var sentence = advice[getRandom(0, advice.length);];
	var re = /x/
	var newSentence = sentence.replace(re, y)
	return y
}

module.exports = memeAdvice;