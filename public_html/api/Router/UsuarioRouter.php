<?php

$app->post('/usuario/login', "UsuarioControl:login");
$app->post('/usuario', "UsuarioControl:post");
$app->get('/usuario/menu', "UsuarioControl:getMenuByUsuario");
$app->get('/usuario', "UsuarioControl:getAll");
$app->put('/usuario/{id}/estado', "UsuarioControl:putEstadoUsuario");
$app->put('/usuario/{id}', "UsuarioControl:putUsuario");