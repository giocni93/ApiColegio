app.controller('UsuarioControlador', ["$scope", "$auth", "UsuarioServicio","PermisosServicio","PerfilServicio", function ($scope,$auth,UsuarioServicio,PermisosServicio,PerfilServicio) {

	$scope.permisos = [];
	$scope.permisosUpdate = [];
	$scope.perfiles = [];
	$scope.usuarios = [];
	$scope.contrasena = "";
	$scope.usuario = {};
	$scope.usuarioUpdate = {};

	init();

	$scope.cambiarEstadoUsuario = function(item){
		var obj = {
			estado : item.estado
		};
		console.log(item.estado);
		var promise = UsuarioServicio.putEstado(item.id,obj);
        promise.then(function(pl) {   
        	var color = colorRojo;
        	var icono = "error";
        	if(pl.data.std == 1){
        		color = colorVerde;
        		icono = "check";
        		//init();
        	}
        	colegio.toast('bottom','center',color,500,icono,pl.data.msg);
        }, function(err) {           
            alert(JSON.stringify(err));
        });
	};

	$scope.cerrarModal = function(){
		$("#modalUsuario").modal('hide');
	};

	$scope.actualizarUsuario = function(){
		$scope.cerrarModal(); 
		var user = $auth.getPayload().user;
		$scope.usuarioUpdate.permisos = [];
		for(i = 0; i < $scope.permisosUpdate.length; i++){
    		for(var j =0 ; j < $scope.permisosUpdate[i].menu.length; j++){
    			if($scope.permisosUpdate[i].menu[j].check){
    				var obj = {
    					idModulo : $scope.permisosUpdate[i].menu[j].idModulo,
    					idMenu : $scope.permisosUpdate[i].menu[j].id
    				};
    				$scope.usuarioUpdate.permisos.push(obj);
    			}
    		}
    	}
    	console.log($scope.usuarioUpdate);
    	var promise = UsuarioServicio.put($scope.usuarioUpdate.id,$scope.usuarioUpdate);
        promise.then(function(pl) {   
        	var color = colorRojo;
        	var icono = "error";
        	if(pl.data.std == 1){
        		color = colorVerde;
        		icono = "check";
        		init();
        	}
        	colegio.toast('bottom','center',color,500,icono,pl.data.msg);
        }, function(err) {           
            colegio.toast('bottom','center',colorRojo,500,"error",JSON.stringify(err));
        });
    	//console.log($scope.usuarioUpdate);
	};

	$scope.abrirModal = function(item){
		console.log(item);
		$scope.permisosUpdate = angular.copy($scope.permisos);
		$scope.usuarioUpdate = item;
		var permisos = item.permisos;
		for(i = 0; i < permisos.length; i++){
			for(ii = 0; ii < $scope.permisosUpdate.length; ii++){
				if($scope.permisosUpdate[ii].id == permisos[i].id){
					for(j = 0; j < permisos[i].menu.length; j++){
						for(jj = 0; jj < $scope.permisosUpdate[ii].menu.length; jj++){
							if(permisos[i].menu[j].id == $scope.permisosUpdate[ii].menu[jj].id){
								$scope.permisosUpdate[ii].menu[jj].check = true;
							}
						}
					}
				}
			}
		}
		$("#modalUsuario").modal({
            escapeClose: true,
            clickClose: false,	
            showClose: true
        });
	};

	function init(){
		getPermisos();
		getUsuarios();
		getPerfiles();
		$scope.contrasena = "";
		$scope.usuario = {
			usuario : "",
			contrasena : "",
			perfil : "",
			email : "",
			telefono : "",
			permisos : []
		};
	}

	function getPerfiles(){
		var promise = PerfilServicio.getAllPerfiles();
        promise.then(function(pl) {   
        	$scope.perfiles = pl.data;
        	$scope.usuario.perfil = $scope.perfiles[0].id.toString();
        }, function(err) {           
            alert(JSON.stringify(err));
        });
	};

	function getPermisos(){
		var promise = PermisosServicio.getAllPermisos();
        promise.then(function(pl) {   
        	$scope.permisos = pl.data;
        	for(var i =0 ; i < $scope.permisos.length; i++){
        		for(var j =0 ; j < $scope.permisos[i].menu.length; j++){
        			$scope.permisos[i].menu[j].check = false;
        		}
        	}
        }, function(err) {           
            alert(JSON.stringify(err));
        });
	};

	function getUsuarios(){
		var promise = UsuarioServicio.getAll();
        promise.then(function(pl) {
        	$scope.usuarios = pl.data;
        	for(var i =0 ; i < $scope.usuarios.length; i++){
        		$scope.usuarios[i].fechaCreacion = new Date($scope.usuarios[i].fechaCreacion);
        	}
        }, function(err) {           
            alert(JSON.stringify(err));
        });
	};

	$scope.registrarUsuario = function(){
		if(validarDatosUsuario()){
			if(!validarCheckPermisos()){
				colegio.toast('bottom','center',colorRojo,500,"error","Debe seleccionar al menos un permiso");
			}else{
				var user = $auth.getPayload().user;
				$scope.usuario.permisos = [];
				for(i = 0; i < $scope.permisos.length; i++){
		    		for(var j =0 ; j < $scope.permisos[i].menu.length; j++){
		    			if($scope.permisos[i].menu[j].check){
		    				var obj = {
		    					idModulo : $scope.permisos[i].menu[j].idModulo,
		    					idMenu : $scope.permisos[i].menu[j].id
		    				};
		    				$scope.usuario.permisos.push(obj);
		    			}
		    		}
		    	}
		    	var promise = UsuarioServicio.post($scope.usuario);
		        promise.then(function(pl) {   
		        	var color = colorRojo;
		        	var icono = "error";
		        	if(pl.data.std == 1){
		        		color = colorVerde;
		        		icono = "check";
		        		init();
		        	}
		        	colegio.toast('bottom','center',color,500,icono,pl.data.msg);
		        }, function(err) {           
		            colegio.toast('bottom','center',colorRojo,500,"error",JSON.stringify(err));
		        });
			}
		}
	};

	function validarDatosUsuario(){
		if($scope.usuario.usuario.trim() == ""){
			colegio.toast('bottom','center',colorRojo,500,"error","Debe digitar el usuario.");
			return false;
		}
		if($scope.usuario.contrasena.trim() == ""){
			colegio.toast('bottom','center',colorRojo,500,"error","Debe digitar una contraseña.");
			return false;
		}
		if($scope.contrasena.trim() == ""){
			colegio.toast('bottom','center',colorRojo,500,"error","Debe confirmar la contraseña.");
			return false;
		}
		if($scope.usuario.perfil.trim() == ""){
			colegio.toast('bottom','center',colorRojo,500,"error","Debe seleccionar un perfil.");
			return false;
		}
		if($scope.usuario.email == undefined || $scope.usuario.email.trim() == ""){
			colegio.toast('bottom','center',colorRojo,500,"error","Debe digitar un email válido.");
			return false;
		}
		if($scope.usuario.telefono.trim() == ""){
			colegio.toast('bottom','center',colorRojo,500,"error","Debe digitar un teléfono.");
			return false;
		}
		if($scope.usuario.contrasena.trim() != $scope.contrasena.trim()){
			colegio.toast('bottom','center',colorRojo,500,"error","Las contraseñas no coinciden.");
			return false;
		}
		return true;
	}

	function validarCheckPermisos(){
		ban = false;
		for(i = 0; i < $scope.permisos.length; i++){
    		for(var j =0 ; j < $scope.permisos[i].menu.length; j++){
    			if($scope.permisos[i].menu[j].check){
    				ban = true;
    			}
    		}
    	}
    	return ban;
	}
	
}]);