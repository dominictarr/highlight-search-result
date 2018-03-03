

var test = require('tape')

var data = require('./data.json')

var highlight = require('..')

for(var terms in data) {
  var text = data[terms].content.text
  console.log('------------')
  console.log("SEARCH:", JSON.stringify(terms))
  console.log(highlight(text, terms, 250))
}

