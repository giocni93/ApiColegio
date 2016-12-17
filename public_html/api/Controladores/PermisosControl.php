<?php
use Slim\Http\Request;
use Slim\Http\Response;

class PermisosControl{

  	function getPermisos(Request $request, Response $response) {
      $response = $response->withHeader('Content-type', 'application/json');
      $dataModulos = Modulo::all();
      $dataMenu = Menu::all();
      for($i = 0; $i < count($dataModulos); $i++){
        $vec = array();
        for($j = 0; $j < count($dataMenu); $j++){
          if($dataMenu[$j]->idModulo == $dataModulos[$i]->id){
            array_push($vec, $dataMenu[$j]);
          }
        }
        $dataModulos[$i]['menu'] = $vec;
      }
      $response->getBody()->write(json_encode($dataModulos));
      return $response;
  	}

}