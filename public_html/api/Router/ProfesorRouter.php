<?php

$app->get('/profesores', "ProfesorControl:getAll");
$app->get('/profesor/{idProfesor}', "ProfesorControl:getById");