$(function(){
	var socket=io('http://192.168.43.81:5000');
	$('#btnEnviarLogin').click(function(){
		var nombre=$('#nombre').val();
		var contras=$('#contraseña').val();
		var datos={nombre:nombre, contras:contras};
		console.log(datos);
		if(nombre!=''&&contras!=''){
			socket.emit('Login',datos);
		}	
	});
	socket.on('LoginRespuesta',function(rows){
		var nombre=rows.nombre;
		var ci=rows.ci;
		var estado=rows.estado;
		if(estado==true){
			sessionStorage.setItem('Nombre',nombre);
			sessionStorage.setItem('CI',ci);
			location.href="http://localhost:5000/Trabajador";
		}
		else{
			$('.error').text('verifique sus datos')
			$('.errorLogo').slideDown('fast');

		}
		console.log(rows);
	});
})