'use strict';
/********************************/
/******** Def global var ********/
/********************************/

var d = document,  
    w = window;

/****** Shortcut for console.log ******/
var _log = function (s) {  
  w.console && console.log(s); 
}

/****** Shortcut for get element by id ******/
var _id = function (id) {  
  return d.getElementById(id);
};


/****** Shortcut for query selector all ******/
var _qs = function (qs, number) {  
  number = (typeof number !== 'undefined' ? number : 0);  
  return d.querySelectorAll(qs)[number];
};

/****** Shortcut for parse function ******/
var _parse = function (string) {  
  var s;  
  try {  
    s = JSON.parse(string);  
  } catch (e) {   
    s = string;   
    _log(`ERROR : ${e.message}`);   
  } finally { return s; };
}


/****** Ajax object ******/
function Ajax(json) {  
  var _this = this;
  
  this.successFunc = function () {};  
  this.errorFunc   = function () {};
  
  this.success = function (func) {  
    _this.successFunc = func;   
  }
  
  this.error = function (func) {  
    _this.errorFunc = func;   
  }
  
  this.successExec = function (exec, request) {  
    exec(request.responseText);  
  };
  
  this.errorExec = function (exec, request) {  
    exec(request.responseText);  
  };
  
  if (!json.type) {  
    json.type = "application/x-www-form-urlencoded";  
  }
  
  var request;  
  if (w.XMLHttpRequest) {  
    request = new XMLHttpRequest();  
  } else {  
    request = new ActiveXObject("Microsoft.XMLHTTP");  
  }  
  request.onreadystatechange = function () {  
    if (request.readyState == 4 && request.status == 200) {  
      _this.successExec(_this.successFunc, request);  
    }else if (request.readyState == 4) {  
      _this.errorExec(_this.errorFunc, request);  
    }  
  }
  
  request.open("POST", json.url, true);  
  !json.formdata && request.setRequestHeader("Content-type", json.type);
  
  var s = '';  
  if (typeof json.params == 'object' && json.params.constructor.name != 'FormData') {  
    for (var key in json.params) {  
      s.length && (s += '&');  
      if (json.params.hasOwnProperty(key)) {  
        s += `${key}=${json.params[key]}`;  
      }  
    }  
  } else {  
    s = json.params;  
  }  
  request.send(s);
}