var uri = "./Api/";
var gl_resultado = {};
var app;

    app = angular.module("menu", ['ngRoute']);

    app.config(['$routeProvider', '$locationProvider', function AppConfig($routeProvider, $locationProvider){
            $routeProvider
                .when('/materias', {
                    templateUrl: 'vistas/materias.html'
                })
    }]);

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

