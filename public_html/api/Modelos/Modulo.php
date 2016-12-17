<?php
	use Illuminate\Database\Eloquent\Model;

	class Modulo extends Model{
	    protected $table = "modulo";
		protected $primaryKey = "id";
	    public $timestamps = false;
	}