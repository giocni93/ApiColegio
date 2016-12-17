app.controller('UsuarioControlador', ["$scope", "$auth", "UsuarioServicio", function ($scope,$auth,UsuarioServicio) {

	$scope.permisos = [];

	getPermisos();


	function getPermisos(){
		var promise = UsuarioServicio.getAllPermisos();
        promise.then(function(pl) {                        
            $scope.permisos = pl.data;
        }, function(err) {           
            alert(JSON.stringify(err));
        });
	};

	
}]);