<?php
use Slim\Http\Request;
use Slim\Http\Response;
use Firebase\JWT\JWT;

class UsuarioControl{

  function login(Request $request, Response $response) {
      $response = $response->withHeader('Content-type', 'application/json');
      $time = time();
      $key = 'secretapischooldogfab';

      $token = array(
          'iat' => $time,
          'exp' => $time + (60*60), 
          'user' => [ 
              'id' => 1,
              'name' => 'Giocni'
          ]
      );
      $jwt = JWT::encode($token, $key);
      $data = array(
        "user" => [ 
              'id' => 1,
              'name' => 'Giocni'
          ],
        "token" => $jwt
      );
      $response->getBody()->write(json_encode($data));
      return $response;
  }

}
