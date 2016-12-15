app.service("ProfesorServicio", function ($http) {

	this.getAll = function(){
		var req = $http.get(uri+'profesores');
        return req;
	}	

})