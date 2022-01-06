'use strict'

var ELLIPSIS = '…';

/*function isFunction(value) {
	return !!(value && value.constructor && value.call && value.apply); // highly performant from underscore
}


const isString = value => typeof value === 'string' || value instanceof String;*/


function substring(string, start, end, ep_, _ep, ellipsis) {
	//if (isString(string) && isFunction(string.trim)) {
	string = string.trim()
	//}
  start = Math.max(start, 0)
  end = Math.min(end, string.length)

  return (ep_ && start > 0 ? ellipsis : '') + string.substring(
    start == 0 ? start : string.indexOf(' ', start-1),
    end === string.length ? end : string.lastIndexOf(' ', end+1)
  ) + (_ep && end < string.length ? ellipsis : '')
}


function trim (text, first, last, length, ellipsis) {
  last = last || first
  var extra = ~~((length - (last - first))/2)

  // unused variable
  /*var ep_ = first > 0 ? ellipsis : ''
  var _ep = last < text.length ? ellipsis : ''*/

  if(last + extra > text.length) {
    return substring(text, text.length - length, text.length, true, false, ellipsis)
  }
  else if (first - extra < 0) {
    return substring(text, 0, length, false, true, ellipsis)
  }
  else if(extra > 0) {
    return substring(text, first-extra, last+extra, true, true, ellipsis)
  }
  else if(extra <= 0) {
    return (
      substring(text, first - length/4,first + length/4, true, undefined, ellipsis)+
      ellipsis+
      substring(text, last - length/4,last + length/4, false, true, ellipsis)
    )
  }
}


function highlight (text, words, length, map, ellipsis) {
	try {
	  map = map || function (word) {
	    return '*'+word.toUpperCase()+'*'
	  }
	  ellipsis = ellipsis || ELLIPSIS;

	  var words = words.replace(/\|/g, ' ').split(/[^\u0041-\u005a\u0061-\u007a\u00b5-\u00b5\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u01ba\u01bc-\u01bf\u01c4-\u01c4\u01c6-\u01c7\u01c9-\u01ca\u01cc-\u01f1\u01f3-\u0293\u0295-\u02af\u0370-\u0373\u0376-\u0377\u037b-\u037d\u037f-\u037f\u0386-\u0386\u0388-\u038a\u038c-\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u052f\u0531-\u0556\u0560-\u0588\u10a0-\u10c5\u10c7-\u10c7\u10cd-\u10cd\u10d0-\u10fa\u10fd-\u10ff\u13a0-\u13f5\u13f8-\u13fd\u1c80-\u1c88\u1c90-\u1cba\u1cbd-\u1cbf\u1d00-\u1d2b\u1d6b-\u1d77\u1d79-\u1d9a\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59-\u1f59\u1f5b-\u1f5b\u1f5d-\u1f5d\u1f5f-\u1f7d\u1f80-\u1f87\u1f90-\u1f97\u1fa0-\u1fa7\u1fb0-\u1fb4\u1fb6-\u1fbb\u1fbe-\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcb\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffb\u2102-\u2102\u2107-\u2107\u210a-\u2113\u2115-\u2115\u2119-\u211d\u2124-\u2124\u2126-\u2126\u2128-\u2128\u212a-\u212d\u212f-\u2134\u2139-\u2139\u213c-\u213f\u2145-\u2149\u214e-\u214e\u2183-\u2184\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2c7b\u2c7e-\u2ce4\u2ceb-\u2cee\u2cf2-\u2cf3\u2d00-\u2d25\u2d27-\u2d27\u2d2d-\u2d2d\ua640-\ua66d\ua680-\ua69b\ua722-\ua76f\ua771-\ua787\ua78b-\ua78e\ua790-\ua7b9\ua7fa-\ua7fa\uab30-\uab5a\uab60-\uab65\uab70-\uabbf\ufb00-\ufb06\ufb13-\ufb17\uff21-\uff3a\uff41-\uff5a\u10400-\u1044f\u104b0-\u104d3\u104d8-\u104fb\u10c80-\u10cb2\u10cc0-\u10cf2\u118a0-\u118df\u16e40-\u16e7f\u1d400-\u1d454\u1d456-\u1d49c\u1d49e-\u1d49f\u1d4a2-\u1d4a2\u1d4a5-\u1d4a6\u1d4a9-\u1d4ac\u1d4ae-\u1d4b9\u1d4bb-\u1d4bb\u1d4bd-\u1d4c3\u1d4c5-\u1d505\u1d507-\u1d50a\u1d50d-\u1d514\u1d516-\u1d51c\u1d51e-\u1d539\u1d53b-\u1d53e\u1d540-\u1d544\u1d546-\u1d546\u1d54a-\u1d550\u1d552-\u1d6a5\u1d6a8-\u1d6c0\u1d6c2-\u1d6da\u1d6dc-\u1d6fa\u1d6fc-\u1d714\u1d716-\u1d734\u1d736-\u1d74e\u1d750-\u1d76e\u1d770-\u1d788\u1d78a-\u1d7a8\u1d7aa-\u1d7c2\u1d7c4-\u1d7cb]+/gi).filter(Boolean).join(' ')
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

	  return trim(text, first, last, length, ellipsis).split(re).map(function (e, i) {
	    return i%2 ? map(e) : e
	  }).join('')
	} catch (e) {
		try {
			return text.slice(0, length);
		} catch (f) {
			return text;
		}
	}
}


module.exports = highlight
