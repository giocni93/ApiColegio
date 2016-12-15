<?php
	use Illuminate\Database\Eloquent\Model;

	class Materia extends Model{
	    protected $table = "materia";
		protected $primaryKey = "id";
	    public $timestamps = false;
	}
