<?php

$app->post('/usuario/login', "UsuarioControl:login");
$app->get('/usuario/perfil/{idPerfil}/menu', "UsuarioControl:getMenuByPerfil");