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

	this.put = function(id,usuario){
		var req = $http.put(uri+'usuario/'+id,usuario);
        return req;
	}

	this.putEstado = function(id,obj){
		var req = $http.put(uri+'usuario/'+id+'/estado',obj);
        return req;
	}	

});