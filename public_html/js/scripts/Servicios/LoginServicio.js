app.service("LoginServicio", ["$http", "$auth", function ($http,$auth) {

	this.login = function(usuario){
		var req = $auth.login(usuario);
        return req;
	}	

}]);