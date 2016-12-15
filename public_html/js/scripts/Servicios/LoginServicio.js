app.service("LoginServicio", ["$http", "$auth", function ($http,$auth) {

	this.login = function(usuario){
		var req = $auth.login(usuario);
        return req;
	}

	this.getbuscarcliente = function (cedula) {
        var req = $http.get(uri+'/api/buscar/cliente/'+cedula);
        return req;
    };	

}]);