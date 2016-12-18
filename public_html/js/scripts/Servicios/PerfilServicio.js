app.service("PerfilServicio", function ($http) {

	this.getAllPerfiles = function(){
		var req = $http.get(uri+'perfiles');
        return req;
	}	

});