<?php
use Slim\Http\Request;
use Slim\Http\Response;
use Firebase\JWT\JWT;

class UsuarioControl{
  
  function getMenuByPerfil(Request $request, Response $response) {
      $response = $response->withHeader('Content-type', 'application/json');
      $idPerfil = $request->getAttribute("idPerfil");

      $data = Permisos::select("modulo.id","modulo.nombre","modulo.abierto","modulo.icon","modulo.id as menu","modulo.id as activo")
                ->join("modulo","modulo.id","=","permisos.idModulo")
                ->where("permisos.idPerfil","=",$idPerfil)
                ->where("modulo.estado","=","ACTIVO")
                ->distinct()
                ->get();

      $dataMen = Menu::select("menu.*","menu.id as activo")
              ->join("permisos","permisos.idMenu","=","menu.id")
              ->where("menu.estado","=","ACTIVO")
              ->distinct()
              ->get();

      //ORGANIZAR LA INFORMACION DEL MENU
      for($i = 0; $i < count($data); $i++){
        $vec = array();
        for($j = 0; $j < count($dataMen); $j++){
          if($data[$i]->id == $dataMen[$j]->idModulo){
            $dataMen[$j]->activo = false;
            array_push($vec, $dataMen[$j]);
          }
        }
        $data[$i]->activo = false;
        $data[$i]->menu = $vec;
      }

      $response->getBody()->write(json_encode($data));
      return $response;
  }

  function login(Request $request, Response $response) {
      $response = $response->withHeader('Content-type', 'application/json');
      $dataBody = json_decode($request->getBody(),true);
      $respuesta = array();
      
      //validar si existen los campos
      if(!isset($dataBody['identificacion']) || !isset($dataBody['contrasena'])){
        $respuesta = array("msg" => "Datos incompletos.", "std" => 0);
        $response->getBody()->write(json_encode($respuesta));
        return $response;
      }
      
      //validar si los campos estan llenos
      if($dataBody['identificacion'] == "" || $dataBody['contrasena'] == ""){
        $respuesta = array("msg" => "Debe digitar un usuario y una contraseña.", "std" => 0);
        $response->getBody()->write(json_encode($respuesta));
        return $response;
      }

      $data = Usuario::select("id","idPerfil","identificacion")
                      ->where("identificacion","=",$dataBody['identificacion'])
                      ->where("contrasena","=",sha1($dataBody['contrasena']))
                      ->first();
      if($data == null){
        $respuesta = array("msg" => "Usuario no encontrado en el sistema.", "std" => 0);
      }else{
        $time = time();
        $key = 'secretapischooldogfab';
        $token = array(
            'iat' => $time,
            'exp' => $time + (60*60), 
            'user' => $data 
        );
        $jwt = JWT::encode($token, $key);
        $respuesta = array("msg" => "Bienvenido", "std" => 1,"token" => $jwt,"user" => $data);
      }
      $response->getBody()->write(json_encode($respuesta));
      return $response;
  }

}
