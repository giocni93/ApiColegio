<?php
	use Illuminate\Database\Eloquent\Model;

	class Permisos extends Model{
	    protected $table = "permisos";
		protected $primaryKey = "id";
	    public $timestamps = false;
	}