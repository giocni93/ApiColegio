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

    function getById(Request $request, Response $response) {
      $response = $response->withHeader('Content-type', 'application/json');
      $id = $request->getAttribute("idProfesor");
      $data = Profesor::select("*")->where("id","=",$id)->first();
      $response->getBody()->write(json_encode($data));
      return $response;
    }
    
    function store(Request $request, Response $response){
        $response = $response->withHeader('Content-type', 'application/json');
        $data = json_decode($request->getBody(),true);
        try {
            $maestro = Profesor::select("*")
                    ->where('cedula','=',$data['cedula'])
                    ->first();
            if($maestro == ""){
                $profesor = new Profesor;
                $profesor->nombre_apellido = strtoupper($data['nombre_apellido']);
                $profesor->cedula = $data['cedula'];
                $profesor->celular = $data['celular'];
                $profesor->correo = $data['correo'];
                $profesor->save();

                $usuario = new Usuario;
                $usuario->idPerfil = 2;
                $usuario->identificacion = $data['cedula'];
                $usuario->contrasena = sha1($data['contrasena']);
                $usuario->save();

                $respuesta = json_encode(array('msg' => "Guardado correctamente", "std" => 1));
                $response = $response->withStatus(200);
            }else{
                $respuesta = json_encode(array('msg' => "Ya Existe Esta Cedula", "std" => 2,"datos"=>$maestro));
                $response = $response->withStatus(200);
            }

        } catch (Exception $err) {
            $respuesta = json_encode(array('msg' => "error", "std" => 0,"err" => $err->getMessage()));
            $response = $response->withStatus(404);
        }
        $response->getBody()->write($respuesta);
        return $response;
    }
        
    function update(Request $request, Response $response){
        $response = $response->withHeader('Content-type', 'application/json');
        $data = json_decode($request->getBody(),true);
        try {
            $id = $request->getAttribute("id");
            $profesor = Profesor::find($id);
            $profesor->nombre_apellido = strtoupper($data['nombre_apellido']);
            $profesor->cedula = $data['cedula'];
            $profesor->celular = $data['celular'];
            $profesor->correo = $data['correo'];
            $profesor->save();
            $respuesta = json_encode(array('msg' => "Actualizado correctamente", "std" => 1));
            $response = $response->withStatus(200);
        } catch (Exception $err) {
            $respuesta = json_encode(array('msg' => "error", "std" => 0,"err" => $err->getMessage()));
            $response = $response->withStatus(404);
        }
        $response->getBody()->write($respuesta);
        return $response;
    }

}