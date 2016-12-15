<?php
	use Illuminate\Database\Eloquent\Model;

	class Profesor extends Model{
	    protected $table = "profesor";
		protected $primaryKey = "id";
	    public $timestamps = false;
	}
