app.service("ProfesorServicio",["$http", function ($http) {

	this.getAll = function(){
		var req = $http.get(uri+'profesores');
        return req;
	}	

	this.getById = function(idProfesor){
		var req = $http.get(uri+'profesor/'+idProfesor);
        return req;
	}

	this.postprofesor = function(object){
		var req = $http.post(uri+'profesor',object);
        return req;
	}

}]);