<?php

$app->get('/permisos', "PermisosControl:getPermisos");
$app->get('/perfiles', "PermisosControl:getPerfiles");