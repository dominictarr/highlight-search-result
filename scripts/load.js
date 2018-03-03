var path = require('path')
var fs = require('fs')
var t=fs.readFileSync(path.join(__dirname, 'data.txt'), 'utf8').split('\n')

var lookup = {}
for(var i = 0; i < t.length; i+=2)
  if(t[i])
    lookup[t[i]] =  t[i+1]

var n = 0
require('ssb-client')(function (err, sbot) {
  var out = {}
  for(var k in lookup)(function (terms, id) {
    n++
    sbot.get(id, function (err, msg) {
      out[terms] = msg
      if(--n) return
      console.log(JSON.stringify(out, null, 2))
      sbot.close()
    })
  })(k, lookup[k])

})

