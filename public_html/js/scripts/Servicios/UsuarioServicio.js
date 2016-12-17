app.service("UsuarioServicio", function ($http) {

	this.getMenu = function(idPerfil){
		var req = $http.get(uri+'usuario/perfil/'+idPerfil+'/menu');
        return req;
	}	

	this.getAllPermisos = function(){
		var req = $http.get(uri+'permisos');
        return req;
	}	

});