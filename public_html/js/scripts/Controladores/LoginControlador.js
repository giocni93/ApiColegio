app.controller('LoginControlador', ["$scope","LoginServicio", "$auth", function ($scope,LoginServicio,$auth) {
	//$auth.getPayload().user;

	$scope.ingresar = function(){
		alert("kka");
		var usuario = {
			identificacion : "",
			pass : ""
		};
		var promise = LoginServicio.login(usuario);
        promise.then(function(pl) {                        
            //alert(JSON.stringify(pl.data));
            location.href = url+"menu.html#!";
        }, function(err) {           
            alert(JSON.stringify(err));
        });
	};

}]);


 