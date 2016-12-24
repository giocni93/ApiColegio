app.controller('ProfesorControlador', ["$scope", "$auth", "ProfesorServicio", function ($scope,$auth,ProfesorServicio) {

	getInfoUsuarioSesion();


	function getInfoUsuarioSesion(){
		console.log($auth.getPayload().user);
	}

	/*$scope.getAllProfesores = function(){
		var promise = ProfesorServicio.getAll();
        promise.then(function(pl) {                        
            //alert(JSON.stringify(pl.data));
        }, function(err) {           
            alert(JSON.stringify(err));
        });
	};

	$scope.getProfesorById = function(){
		var promise = ProfesorServicio.getById(1);
        promise.then(function(pl) {                        
            //alert(JSON.stringify(pl.data));
        }, function(err) {           
            alert(JSON.stringify(err));
        });
	};*/

	function limpiar(){
		$scope.Profesor.nombre_apellido = "";
		$scope.Profesor.cedula = "";
		$scope.Profesor.celular = "";
		$scope.Profesor.correo = "";
		$scope.Usuario.contrasena = "";
	}

	$scope.guardar = function(){
		var object = {
			nombre_apellido: 	$scope.Profesor.nombre_apellido,
			cedula: 			$scope.Profesor.cedula,
			celular: 			$scope.Profesor.celular,
			correo: 			$scope.Profesor.correo,
			contrasena: 		$scope.Usuario.contrasena
		}
		var promisePost = ProfesorServicio.postprofesor(object);
		promisePost.then(function (d) {

                if(d.data.std == 1){
                	alert(d.data.msg);
                	limpiar()
                }else{
					alert(d.data.msg+" Profesor: "+d.data.datos.nombre_apellido);
                }

            }, function (err) {

                if(err.status == 401){
                    alert(err.data.message);
                    console.log(err.data.exception);

                }else{

                    alert("Error Al procesar Solicitud");

                }

                console.log("Some Error Occured "+ JSON.stringify(err));
        });
	}

	$scope.getProfesorById ();
	
}]);