<?php

$app->get('/profesores', "ProfesorControl:getAll");
$app->get('/profesor/{idProfesor}', "ProfesorControl:getById");
$app->post('/profesor',"ProfesorControl:store");
$app->put('/profesor/{id}',"ProfesorControl:update");