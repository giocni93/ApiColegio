<?php
use Slim\Http\Request;
use Slim\Http\Response;

class ProfesorControl{

  function getAll(Request $request, Response $response) {
      $response = $response->withHeader('Content-type', 'application/json');
      $data = Profesor::all();
      $response->getBody()->write(json_encode($data));
      return $response;
  }

}