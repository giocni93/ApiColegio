app.controller('MenuControlador',["$scope","$auth","$sce","UsuarioServicio", function ($scope,$auth, $sce, UsuarioServicio) {

	$scope.menu = [];
	var elementAnterior = null;
	var elementAnteriorSub = null;
	var element_a_anterior = null;

	getMenu();

	function getMenu(){
		var user = $auth.getPayload().user;
		var promise = UsuarioServicio.getMenu(user.idPerfil);
        promise.then(function(pl) {        
        	$scope.menu = pl.data;
        }, function(err) {           
            colegio.toast('bottom','center',colorRojo,4000,"error",err);
        });
	}


	$scope.renderHtml = function (htmlCode) {
        return $sce.trustAsHtml(htmlCode);
    };

	

	$scope.activar = function(item){
		var element = document.getElementById("lipadre_"+item.id);
		if(elementAnterior != null){
			elementAnterior.className = "";
			$('.collapse').collapse('hide');
		}

		if(element.className != "active")
			element.className = "active";
		else
			element.className = "";
		elementAnterior = element;
	}

	$scope.activarSub = function(item){
		var element = document.getElementById("lihijo_"+item.id);
		var element_a = document.getElementById("ahijo_"+item.id);
		if(elementAnteriorSub != null){
			elementAnteriorSub.className = "";
			if(element_a_anterior != null){
				element_a_anterior.style["background-color"] = "transparent";
				element_a_anterior.style["box-shadow"] = "none";
			}
		}

		if(element.className != "active"){
			element.className = "active";
			element_a.style["background-color"] = "#9C27B0";
			element_a.style["box-shadow"] = "0 12px 20px -10px rgba(156, 39, 176, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(156, 39, 176, 0.2)";
		}
		else{
			element.className = "";
			element_a.style["background-color"] = "transparent";
			element_a.style["box-shadow"] = "none";
		}

		elementAnteriorSub = element;
		element_a_anterior = element_a;
	}
	
}]);