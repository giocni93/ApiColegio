app.controller('MenuControlador', function ($scope) {

	$scope.active = "";
	$scope.activar = function(val){
		switch(val){
			case 1: $scope.active = "active";
					$scope.title = "Materias";
					$scope.active1 = "";
					$scope.active2 = "";
				break;
			case 2: $scope.active1 = "active";
					$scope.title = "Profesores";
					$scope.active = "";
					$scope.active2 = "";
				break;
			case 3: $scope.active2 = "active";
					$scope.title = "Estudiantes";
					$scope.active1 = "";
					$scope.active = "";
				break;
				
		}
	}
	
});