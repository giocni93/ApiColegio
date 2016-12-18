app.controller('MateriasControlador',["$scope", "MateriasServicio", function ($scope,MateriasServicio) {

	$scope.arrayMateria = [];
	getMateria();


	function getMateria(){
		var promise = MateriasServicio.getAll();/*llamo el servicio del MateriasServicios.js y le pregunto por la funcion getAll() */
        promise.then(function(pl) {  /* estructura de como angular trae los servicios me los devuelve en el pl*/      
        	$scope.arrayMateria = pl.data;/*para comunicar la vista con el controlador enviar y recibir*/
        	
        }, function(err) {           
            colegio.toast('bottom','center',colorRojo,4000,"error",err);
        });
	}
	
}]);