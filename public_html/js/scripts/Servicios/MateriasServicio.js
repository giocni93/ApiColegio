app.service("MateriasServicio", function ($http) {
	/*
	*funcion de capturar la api rest de slim php
	*/
	this.getAll = function(){
		var req = $http.get(uri+'materia');/* me trae los json  'uri+'ruta de Materia con  la api'*/
        return req;
	}

})