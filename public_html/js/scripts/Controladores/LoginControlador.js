app.controller('LoginControlador', ["$scope","LoginServicio", "$auth", function ($scope,LoginServicio,$auth) {
	
	$scope.usuario = {
		identificacion: "",
		contrasena : ""
	}

	$scope.ingresar = function(){
		if(validarLogin()){
			var promise = LoginServicio.login($scope.usuario);
	        promise.then(function(pl) {                        
	            if(pl.data.std == 0){
	            	colegio.toast('bottom','center',colorRojo,500,"error",pl.data.msg);
	            }else{
	            	colegio.toast('bottom','center',colorVerde,500,"check circle",pl.data.msg);
	            	setTimeout(function(){
	            		location.href = url+"menu.html";
	            	},1500);
	            }
	            
	        }, function(err) {           
	            colegio.toast('bottom','center',colorRojo,4000,"error",err);
	        });
		}
	};

	function validarLogin(){
		if($scope.usuario.identificacion.trim() == ""){
			colegio.toast('bottom','center',colorRojo,500,"error","Debe digitar la identificación.");
			return false;
		}
		if($scope.usuario.contrasena.trim() == ""){
			colegio.toast('bottom','center',colorRojo,500,"error","Debe digitar una contraseña.");
			return false;
		}
		return true;
	}

}]);


 