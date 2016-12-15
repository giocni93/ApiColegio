app.controller('ProfesorControlador', ["$scope", "$auth", "ProfesorServicio", function ($scope,$auth,ProfesorServicio) {

	getInfoUsuarioSesion();

	function getInfoUsuarioSesion(){
		console.log($auth.getPayload().user);
	}

	$scope.getAllProfesores = function(){
		var promise = ProfesorServicio.getAll();
        promise.then(function(pl) {                        
            alert(JSON.stringify(pl.data));
        }, function(err) {           
            alert(JSON.stringify(err));
        });
	};
	
}]);