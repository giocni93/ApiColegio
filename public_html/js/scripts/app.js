var uri = "./Api/";
var url = "./";
var gl_resultado = {};
var app;

    app = angular.module("colegio", ['ngRoute']);

    app.config(['$routeProvider', '$locationProvider', function AppConfig($routeProvider, $locationProvider){
            $routeProvider
                
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

