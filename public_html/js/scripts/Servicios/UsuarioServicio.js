app.service("UsuarioServicio", function ($http) {

	this.getMenu = function(){
		var req = $http.get(uri+'usuario/menu');
        return req;
	}	

	this.getAll = function(){
		var req = $http.get(uri+'usuario');
        return req;
	}	

	this.post = function(usuario){
		var req = $http.post(uri+'usuario',usuario);
        return req;
	}	

});