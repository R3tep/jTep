window.onload = function () {  
  _id('ajax'    ).addEventListener('submit', sendAjax);  
  _id('ajaxForm').addEventListener('submit', sendAjaxFormData);
};

function sendAjax (e) {  
  e.preventDefault();
  
  var call = new Ajax({  
  	url   : 'script.php',  
  	params: {  
  	  name: _qs('[name="name"]').value  
  	}  
  });
  
  call.success(function (data) {  
  	_log(data);  
  });
  
  call.error(function (data) {  
  	_log(data);  
  });
  
  return false;
}

function sendAjaxFormData (e) {  
  e.preventDefault();
  
  var form = new FormData(this);
  
  var call = new Ajax({  
  	url     : 'script.php',  
  	params  : form        ,  
  	formdata: true  
  });
  
  call.success(function (data) {  
  	_log(data);  
  });
  
  call.error(function (data) {  
  	_log(data);  
  });
  
  return false;
}