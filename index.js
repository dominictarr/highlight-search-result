'use strict'

function substring(string, start, end, ep_, _ep) {
  string = string.trim()
  start = Math.max(start, 0)
  end = Math.min(end, string.length)

  return (ep_ && start > 0 ? '...' : '') + string.substring(
    start == 0 ? start : string.indexOf(' ', start-1),
    end === string.length ? end : string.lastIndexOf(' ', end+1)
  ) + (_ep && end < string.length ? '...' : '')
}

function trim (text, first, last, length) {
  last = last || first
  var extra = ~~((length - (last - first))/2)

  // unused variable
  /*var ep_ = first > 0 ? '...' : ''
  var _ep = last < text.length ? '...' : ''*/


  if(last + extra > text.length) {
    return substring(text, text.length - length, text.length, true, false)
  }
  else if (first - extra < 0) {
    return substring(text, 0, length, false, true)
  }
  else if(extra > 0) {
    return substring(text, first-extra, last+extra, true, true)
  }
  else if(extra <= 0) {
    return (
      substring(text, first - length/4,first + length/4, true)+
      '...'+
      substring(text, last - length/4,last + length/4, false, true)
    )
  }
}

function highlight (text, words, length, map) {
  map = map || function (word) {
    return '*'+word.toUpperCase()+'*'
  }

  // Add Chinese, Japanese, Korean (CJK) Unicode without punctuation
  var words = words.split(/[^\w\u2E80-\u2FFF\u3040-\u9FFF]+/gi).filter(Boolean).join(' ')

  // if `words` is empty or punctuation only
  if (!words) {
      return text.slice(0, length)
  }

  var re = new RegExp('('+words.split(' ').join('|')+')', 'gi')
  var matches = {}
  var min = -1, max = -1, m
  while(m = re.exec(text)) {
    (matches[m[0]] = matches[m[0]] || []).push(m.index)
    min = min || m.index
    max = m.index+m[0].length
  }
  function diff(a,b) {
    return a < b ? b - a : a - b
  }

  function size (a) {
    return a[a.length-1] - a[0]
  }

  // unused variable
  /*var best = {}*/
  var keys = Object.keys(matches)

  // if `words` matched nothing in `text`
  if (!keys.length) {
      return text.slice(0, length)
  }

  var matched = matches[keys[0]].map(function (index) {
    return [index].concat(keys.slice(1).map(function (key) {
      return matches[key].reduce(function (a, b) {
        return diff(a, index) < diff(b, index) ? a : b
      })
    })).sort(function (a, b) { return a - b })
  }).sort(function (a, b) {
    return size(b) - size(a)
  })

  var first = matched[0].shift(), last = matched[0].pop()
  // unused variable
  /*var dist = last-first*/

  return trim(text, first, last, length).split(re).map(function (e, i) {
    return i%2 ? map(e) : e
  }).join('')
}

module.exports = highlight



