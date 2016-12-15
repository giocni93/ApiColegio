<?php
use Slim\Http\Request;
use Slim\Http\Response;

class MateriaControl{

	/*
	*Content-Type: application/json
Authorization: bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0ODE4MzgxNDgsImV4cCI6MTQ4MTg0MTc0OCwidXNlciI6eyJpZCI6MSwibmFtZSI6Ikdpb2NuaSJ9fQ.g_RYeZ6y6uWMkEjuVn09kIyw2wv5VQQ90JtQFoyvUjo
	*/

  	function getAllMateria(Request $request, Response $response) {
      $response = $response->withHeader('Content-type', 'application/json');
      $data = Materia::all();
      //$data = "hola";
      $response->getBody()->write(json_encode($data));
      return $response;
  	}

}