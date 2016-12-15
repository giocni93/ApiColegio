<?php
  	require 'vendor/autoload.php';
  	$app = new \Slim\App;


  	$app->add(new \Slim\Middleware\JwtAuthentication([
	    "secret" => "secretapischooldogfab",
	    "rules" => [
	        new \Slim\Middleware\JwtAuthentication\RequestPathRule([
	            "path" => "/",
	            "passthrough" => ["/usuario/login","/public"]
	        ])
	    ],
	    "error" => function ($request, $response, $arguments) {
	        $data["status"] = "error";
	        $data["message"] = $arguments["message"];
	        return $response
	            ->withHeader("Content-Type", "application/json")
	            ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
	    }
	]));

  	require 'Router/Router.php';
  	$app->run();
