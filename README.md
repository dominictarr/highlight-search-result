# highlight-search-result

take a search result, highlight the occurances of key words,
and also truncate the document into a short context showing
the area around a match.

## behaviour

match and emphasize the key words. insert an elipsis where ever the
text is cut (but only if it _is_ cut).

```
SEARCH: "epidemic"
post.tableflip.io welcomes this new out of order *EPIDEMIC* broadcasting
------------
SEARCH: "light phone"
... weekend harvesting what I can.  I have a bunch of photos on my *PHONE*, thought I might share them here.

## Gourds!

Early this... last year when I realized that the back yard didn't get enough *LIGHT*.  I built a 16' x 4' box into the slope along the...
------------
SEARCH: "collective fairness"
... has connotations of "sameness" but balance has connotations of *FAIRNESS*. I think our generation's challenge, having been born... to see basic needs, food, shelter, etc, *automated* away in *COLLECTIVE* sharing, managed by decentralized tech and robotics....
------------
SEARCH: "search results"
... He talks about how designers seem to be employing a graph *SEARCH* algorithm to *SEARCH* a graph representing the design space: each node a design, each edge a 'design choice' which *RESULTS* in a different 'design'.

It's an exploration of these...
------------
SEARCH: "fulltext search"
... of the other party that it can call commands on.
Also, just like today's plugins, they can register new commands, from *FULLTEXT* *SEARCH* over blob replication to feed replication. If a plugin is written in the same language it could also be just used...
```

## example

``` js
var text = 'hello there, does this search thing work?'
var search = 'search work'
var length = 100
function map (word) {
  return '*'+word.toUpperCase()+'*'
}
var summary = highlight(text, search, length, map)
console.log(summary)
```


## License

MIT

