var colorBlanco = 0;
var colorAzul = 1;
var colorVerde = 2;
var colorNaranja = 3;
var colorRojo = 4;
var colegio = {

	toast: function(from, align,color,tiempo,icon,msg){
    	$.notify({
        	icon: icon,
        	message: msg
        },{
            type: type[color],
            timer: tiempo,
            placement: {
                from: from,
                align: align
            }
        });
	}

}