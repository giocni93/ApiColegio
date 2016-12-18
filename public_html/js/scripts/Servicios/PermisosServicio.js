app.service("PermisosServicio", function ($http) {

	this.getAllPermisos = function(){
		var req = $http.get(uri+'permisos');
        return req;
	}	

});