app.controller('MenuControlador', function ($scope) {

	$scope.active = "";
	$scope.banMenu = [true,false,false,false];
	$scope.activar = function(val){
		for(var i = 0; i < $scope.banMenu.length; i++){
			$scope.banMenu[i] = false;
			if(i == val){
				$scope.banMenu[i] = true;
			}
		}
		/*
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
			case 4: $scope.active2 = "active";
					$scope.title = "Estudiantes";
					$scope.active1 = "";
					$scope.active = "";
				break;
		}*/
	}
	
});