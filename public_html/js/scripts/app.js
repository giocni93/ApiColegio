var uri = "./api/";
var url = "./";
var gl_resultado = {};
var app;
    
    app = angular.module("colegio", ['ngRoute','satellizer']);

    app.config(['$routeProvider', '$locationProvider', '$authProvider','$httpProvider', function AppConfig($routeProvider, $locationProvider,$authProvider, $httpProvider){
        //$authProvider.loginUrl =  uri+'usuario/login';    
        $authProvider.loginUrl =  '/ApiColegio/public_html/api/usuario/login';      
        $authProvider.tokenName = "token";
        $authProvider.tokenPrefix = "sch";
        $authProvider.storageType = 'sessionStorage'; 
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

