var SweetSelector = (function() {

 var selectElement = function(str) {
  if (str.charAt(0) === '#') {
    return [document.getElementById(str.substring(1))]
  } else if (str.charAt(0) === '.') {
    return document.getElementsByClassName(str.substring(1))
  } else {
    return document.getElementsByTagName(str)
  }
}
  return { select: selectElement };
}) (); // SweetSelector.select('.klass')



var DOM  = (function() {

 var hideOrShow = function(elem, action) {
  var result = SweetSelector.select(elem);
  if (action == 'hide') {
    for(var i = 0; i < result.length; i++) {
      result[i].style.visibility = "hidden";
     }
  } else if (action == 'show') {
    for(var i = 0; i < result.length; i++) {
      result[i].style.visibility = "visible";
     }
  }
 }

 var addOrRemove = function(elem, str, action) {
   var result = SweetSelector.select(elem)
   if (action == 'remove') {
   for(var i = 0; i < result.length; i++) {
       result[i].classList.remove(str);
    }
  } else if (action == 'add') {
    for(var i = 0; i < result.length; i++) {
       result[i].classList.add(str);
    }
  }
 }

  return { hide: hideOrShow,
           show: hideOrShow,
           addClass: addOrRemove,
           removeClass: addOrRemove};
})();




var EventDispatcher = (function() {
  var event = new Event('banana')

  var onThing = function(elem, str, func) {
    var targets = SweetSelector.select(elem)
     for(var i = 0; i < targets.length; i++) {
      targets[i].addEventListener('banana', func);
    }
  }

  var triggerEvent = function(elem, str) {
    var targets = SweetSelector.select(elem)
     for(var i = 0; i < targets.length; i++) {
      targets[i].dispatchEvent(event);
    }

  }

  return { on: onThing, trigger: triggerEvent};
})();


AjaxWrapper = {}

AjaxWrapper.request = function (method, url, args) {

      // Creating a promise
      var promise = new Promise( function (resolve, reject) {

        // Instantiates the XMLHttpRequest
        var client = new XMLHttpRequest();
        var uri = url;

        if (args && (method === 'POST' || method === 'PUT')) {
          uri += '?';
          var argcount = 0;
          for (var key in args) {
            if (args.hasOwnProperty(key)) {
              if (argcount++) {
                uri += '&';
              }
              uri += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
            }
          }
        }
        client.open(method, uri);
        client.send();

        client.onload = function () {
          if (this.status == 200) {
            // Performs the function "resolve" when this.status is equal to 200
            resolve(this.response);
          } else {
            // Performs the function "reject" when this.status is different than 200
            reject(this.statusText);
          }
        };
        client.onerror = function () {
          reject(this.statusText);
        };
      });
      // Return the promise
      return promise;
}
