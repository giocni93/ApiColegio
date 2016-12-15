var uri = "./api/";
var gl_resultado = {};
var app;
(function(){
    app = angular.module("menu", ['ngRoute','satellizer']);

    app.config(['$routeProvider', '$locationProvider', '$authProvider','$httpProvider' , function AppConfig($routeProvider, $locationProvider, $authProvider, $httpProvider){
        //$authProvider.loginUrl =  uri+'usuario/login';    
        $authProvider.loginUrl =  '/PROYECTOS/ProyectoSlim/ApiColegio/public_html/api/usuario/login';       
        $authProvider.tokenName = "token";
        $authProvider.tokenPrefix = "sch";
        $authProvider.storageType = 'sessionStorage'; 

        $routeProvider
            .when('/materia', {
                templateUrl: 'vistas/materias.html'
            })
            .when('/profesores', {
                templateUrl: 'vistas/profesor.html'
            })
            console.log("as")
            
    }]);

    app.factory('authInterceptor', function ($rootScope, $q, $window) {
        return {
          request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.sch_token) {
              config.headers.Authorization = 'Bearer ' + $window.sessionStorage.sch_token;
            }
            return config;
          },
          response: function (response) {                            
            if (response.status === 401  || response.status === 403) {
                 location.href = "../index.html";
            }
            return response || $q.when(response);
          },
          
            responseError: function(rejection) {
                var errorl = rejection.data.error;
                if(!errorl){
                    errorl =rejection.data;
                }
                sessionStorage.setItem("schError", btoa(errorl));

                if(rejection.status == 401){               
                    setTimeout( function () {$rootScope.globalMsj("error", "Error de Sesión", "Su sesión ha caducado por inactividad " +
                        " Por seguridad debe iniciar nuevamente sesión.", 0);},10);            
                    setTimeout(function (){ location.href = "../index.html"; }, 4000);

                }
                return $q.reject(rejection);
            }
          
        };
    });

    app.directive('uploaderModel',['$parse',function($parse){
        return{
            restrict: 'A',
            link: function(scope,iElement,iAttrs){
                iElement.on('change',function(e)
                {
                    $parse(iAttrs.uploaderModel).assign(scope,iElement[0].files[0]);
                });
            }
        };

    }]);

})();
