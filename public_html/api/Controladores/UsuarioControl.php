<?php
use Slim\Http\Request;
use Slim\Http\Response;
use Firebase\JWT\JWT;

class UsuarioControl{

  function getAll(Request $request, Response $response){
      $response = $response->withHeader('Content-type', 'application/json');
      $data = Usuario::select("id","idPerfil","identificacion","estado","fechaCreacion")->get();
      $response->getBody()->write(json_encode($data));
      return $response;
  }

  function post(Request $request, Response $response){
      $response = $response->withHeader('Content-type', 'application/json');
      $dataBody = json_decode($request->getBody(),true);
      $respuesta = array();
      $user = getUserByHeader($request->getHeaders());
      try{
        $usuario = new Usuario;
        $usuario->identificacion      = $dataBody['usuario'];
        $usuario->contrasena          = sha1($dataBody['contrasena']);
        $usuario->idPerfil            = $dataBody['perfil'];
        $usuario->email               = $dataBody['email'];
        $usuario->telefono            = $dataBody['telefono'];
        $usuario->estado              = "ACTIVO";
        $usuario->usuarioCreacion     = $user->identificacion;
        $usuario->usuarioModificacion = $user->identificacion;
        $usuario->save();
        //GUARDAR PERMISOS
        for($i = 0; $i < count($dataBody['permisos']); $i++){
          $permisos = new Permisos;
          $permisos->idUsuario    = $usuario->id;
          $permisos->idModulo     = $dataBody['permisos'][$i]['idModulo'];
          $permisos->idMenu       = $dataBody['permisos'][$i]['idMenu'];
          $permisos->save();
        }
        $respuesta = array("msg" => "Guardando correctamente", "std" => 1);
      }catch(Exception $ex){
        $respuesta = array("msg" => "El usuario ya existe, ".$ex->getMessage(), "std" => 0);
      }
      $response->getBody()->write(json_encode($respuesta));
      return $response;
  }
  
  function getMenuByUsuario(Request $request, Response $response) {
      $response = $response->withHeader('Content-type', 'application/json');
      $user = getUserByHeader($request->getHeaders());
      try{

        $data = Permisos::select("modulo.id","modulo.nombre","modulo.abierto","modulo.icon","modulo.id as menu")
                  ->join("modulo","modulo.id","=","permisos.idModulo")
                  ->where("permisos.idUsuario","=",$user->id)
                  ->where("modulo.estado","=","ACTIVO")
                  ->distinct()
                  ->get();

        $dataMen = Menu::select("menu.*")
                ->join("permisos","permisos.idMenu","=","menu.id")
                ->where("permisos.idUsuario","=",$user->id)
                ->where("menu.estado","=","ACTIVO")
                ->distinct()
                ->get();

        //ORGANIZAR LA INFORMACION DEL MENU
        for($i = 0; $i < count($data); $i++){
          $vec = array();
          for($j = 0; $j < count($dataMen); $j++){
            if($data[$i]->id == $dataMen[$j]->idModulo){
              array_push($vec, $dataMen[$j]);
            }
          }
          $data[$i]->menu = $vec;
        }


      }catch(Exception $ex){
        $response->getBody()->write(json_encode(array("error" => $ex)));
        return $response;
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
