var filaParteD=0;
$(function(){
	var socket=io('http://192.168.1.6:5000');
	var socketBeto=io('http://192.168.1.7:5000');
	var socketJime=io();
	socket.emit("notificaciones");
	$('.avatarNombre').text(sessionStorage.getItem("Nombre"));
	var auuu=$('.dirImagen').text();
	if(auuu!=''){
		var direccionImg=$('.dirImagen').text();// F:/fmdskf/sfa
		var direction='http:// 192.168.43.117:5000/';
		for (var i = 0; i <direccionImg.length; i++) {
			direction=direction+direccionImg[i];
		};
		var almacenar=sessionStorage.getItem("CI");
		var noticia=sessionStorage.getItem("mensaje");
		var valor={noticia:noticia,ci:almacenar,direccion:direction}
		console.log('la nueva notificacion: ',valor);
		$('.dirImagen').text('');
		socket.emit("nuevaNoticia",valor);
	}
	socket.on('NotificacionResponse', function(r){
		$(".cajaNoticia").remove();
		$(".cajaPosicion").remove();
		$(".cajaNoticia strong").remove();
		$(".cajaNoticia span").remove();
		$(".cajaNoticia p").remove();
		$(".imagenNoti").remove();
		var img=r.direccionImg;
		console.log(img);
		var imagenesTotal=[];
		var img2="src='";
		for(var j=0;j<img.length;j++){
			var palabra=img[j].toString();
			for(var k=0;k<palabra.length;k++){
				img2=img2+palabra[k];
			}
			img2=img2+"'";
			imagenesTotal.push(img2);
			img2="src='";
		}
		for(var i=r.nombre.length-1; i>=0; i--){
			$(".noticias").append( '<div class=cajaNoticia><div class=cajaPosicion><strong>'+r.nombre[i]+'</strong><span>'+r.cargo[i]+' </span><span class=fecha>'+r.fecha[i]+'</span><p>'+r.descripcion[i]+'</p><img class=imagenNoti '+imagenesTotal[i]+'></div></div>');
		}
	});
	$("#btnNoticiaNew").click(function(){
		var mensaje=$('#textNoticiaNew').val();
		sessionStorage.setItem('mensaje',mensaje);
	});
	var nroFila=0;
	var URL=$(location).attr('href');
	if(URL=='http://localhost:5000/NuevoParteD'){
		var Ci=sessionStorage.getItem("CI");
		console.log(Ci);
		socketBeto.emit('enviandoCI',Ci);
	}
	socketBeto.on('RespuestaDatosPD',function(resultados){

		$('#nombreResidencia').text(resultados.idRes);

		for(var i=0;i<resultados.tramos.length;i++){
			$('.Tramos').append('<option>'+resultados.tramos[i]+'</option>');
		}
		for(var i=0;i<resultados.equipos.length;i++){
			$('.Equipos').append('<option>'+resultados.equipos[i]+'</option>');
		}
		$('#btnEnviar').click(function(){	
			var Ci=sessionStorage.getItem("CI");
			var idResidencia=resultados.idRes;
			var ocupacion=resultados.ocupacion;
			var DiaEntrada=$('#entradaM').val();
			var DiaSalida=$('#salidaM').val();
			var TardeEntrada=$('#entradaT').val();
			var TardeSalida=$('#salidaT').val();
			var item=$('#item').val();
			var tramo=$('.Tramos').val();
			var equipo=$('.Equipos').val();

			var HorometroInicio=$('#inicioH').val();
			var HorometroFin=$('#finH').val();
			var cantidadCombus=$('#CantidadCombustible').val();
			var tipoCombus=$('.TipoCombus').val();
			var fechavale=$('#Fechavale').val();

			var inicioDetalle=[];
			var finDetalle=[];
			var detalle=[];
			var detalleActividad1=$('#Detalle1').val();
			if(detalleActividad1!=''){
				var inicioActividad1=$('#Hinicio1').val();
				var finActividad1=$('#Hfin1').val();

				inicioDetalle.push(inicioActividad1);finDetalle.push(finActividad1);detalle.push(detalleActividad1);

				var detalleActividad2=$('#Detalle2').val();
				if(detalleActividad2!=''){
					var inicioActividad2=$('#Hinicio2').val();
					var finActividad2=$('#Hfin2').val();

					inicioDetalle.push(inicioActividad2);finDetalle.push(finActividad2);detalle.push(detalleActividad2);

					var detalleActividad3=$('#Detalle3').val();
					if(detalleActividad3!=''){
						var inicioActividad3=$('#Hinicio3').val();
						var finActividad3=$('#Hfin3').val();

						inicioDetalle.push(inicioActividad3);finDetalle.push(finActividad3);detalle.push(detalleActividad3);

						var detalleActividad4=$('#Detalle4').val();
						if(detalleActividad4!=''){
							var inicioActividad4=$('#Hinicio4').val();
							var finActividad4=$('#Hfin4').val();

							inicioDetalle.push(inicioActividad4);finDetalle.push(finActividad4);detalle.push(detalleActividad4);

							var detalleActividad5=$('#Detalle5').val();
							if(detalleActividad5!=''){
								var inicioActividad5=$('#Hinicio5').val();
								var finActividad5=$('#Hfin5').val();
								
								inicioDetalle.push(inicioActividad5);finDetalle.push(finActividad5);detalle.push(detalleActividad5);

								var detalleActividad6=$('#Detalle6').val();
								if(detalleActividad6!=''){
									var inicioActividad6=$('#Hinicio6').val();
									var finActividad6=$('#Hfin6').val();
									
									inicioDetalle.push(inicioActividad6);finDetalle.push(finActividad6);detalle.push(detalleActividad6);

									var detalleActividad7=$('#Detalle7').val();
									if(detalleActividad7!=''){
										var inicioActividad7=$('#Hinicio7').val();
										var finActividad7=$('#Hfin7').val();
										
										inicioDetalle.push(inicioActividad7);finDetalle.push(finActividad7);detalle.push(detalleActividad7);

										var detalleActividad8=$('#Detalle8').val();
										if(detalleActividad8!=''){
											var inicioActividad8=$('#Hinicio8').val();
											var finActividad8=$('#Hfin8').val();

											inicioDetalle.push(inicioActividad8);finDetalle.push(finActividad8);detalle.push(detalleActividad8);

											socketJime.emit('llenarParteDiario',{'ci':Ci,'idResidencia':idResidencia,'ocupacion':ocupacion,'DiaEntrada':DiaEntrada,'DiaSalida':DiaSalida,'TardeEntrada':TardeEntrada,'TardeSalida':TardeSalida,'item':item,'tramo':tramo,'equipo':equipo,'HorometroInicio':HorometroInicio,'HorometroFin':HorometroFin,'cantidadCombus':cantidadCombus,'tipoCombus':tipoCombus,'fechavale':fechavale,'inicioDetalle':inicioDetalle,'finDetalle':finDetalle,'detalle':detalle});
										}else{
											socketJime.emit('llenarParteDiario',{'ci':Ci,'idResidencia':idResidencia,'ocupacion':ocupacion,'DiaEntrada':DiaEntrada,'DiaSalida':DiaSalida,'TardeEntrada':TardeEntrada,'TardeSalida':TardeSalida,'item':item,'tramo':tramo,'equipo':equipo,'HorometroInicio':HorometroInicio,'HorometroFin':HorometroFin,'cantidadCombus':cantidadCombus,'tipoCombus':tipoCombus,'fechavale':fechavale,'inicioDetalle':inicioDetalle,'finDetalle':finDetalle,'detalle':detalle});
										}
									}else{
										socketJime.emit('llenarParteDiario',{'ci':Ci,'idResidencia':idResidencia,'ocupacion':ocupacion,'DiaEntrada':DiaEntrada,'DiaSalida':DiaSalida,'TardeEntrada':TardeEntrada,'TardeSalida':TardeSalida,'item':item,'tramo':tramo,'equipo':equipo,'HorometroInicio':HorometroInicio,'HorometroFin':HorometroFin,'cantidadCombus':cantidadCombus,'tipoCombus':tipoCombus,'fechavale':fechavale,'inicioDetalle':inicioDetalle,'finDetalle':finDetalle,'detalle':detalle});
									}
								}else{
									socketJime.emit('llenarParteDiario',{'ci':Ci,'idResidencia':idResidencia,'ocupacion':ocupacion,'DiaEntrada':DiaEntrada,'DiaSalida':DiaSalida,'TardeEntrada':TardeEntrada,'TardeSalida':TardeSalida,'item':item,'tramo':tramo,'equipo':equipo,'HorometroInicio':HorometroInicio,'HorometroFin':HorometroFin,'cantidadCombus':cantidadCombus,'tipoCombus':tipoCombus,'fechavale':fechavale,'inicioDetalle':inicioDetalle,'finDetalle':finDetalle,'detalle':detalle});
								}			
							}else{
								socketJime.emit('llenarParteDiario',{'ci':Ci,'idResidencia':idResidencia,'ocupacion':ocupacion,'DiaEntrada':DiaEntrada,'DiaSalida':DiaSalida,'TardeEntrada':TardeEntrada,'TardeSalida':TardeSalida,'item':item,'tramo':tramo,'equipo':equipo,'HorometroInicio':HorometroInicio,'HorometroFin':HorometroFin,'cantidadCombus':cantidadCombus,'tipoCombus':tipoCombus,'fechavale':fechavale,'inicioDetalle':inicioDetalle,'finDetalle':finDetalle,'detalle':detalle});
							}			
						}else{
							socketJime.emit('llenarParteDiario',{'ci':Ci,'idResidencia':idResidencia,'ocupacion':ocupacion,'DiaEntrada':DiaEntrada,'DiaSalida':DiaSalida,'TardeEntrada':TardeEntrada,'TardeSalida':TardeSalida,'item':item,'tramo':tramo,'equipo':equipo,'HorometroInicio':HorometroInicio,'HorometroFin':HorometroFin,'cantidadCombus':cantidadCombus,'tipoCombus':tipoCombus,'fechavale':fechavale,'inicioDetalle':inicioDetalle,'finDetalle':finDetalle,'detalle':detalle});
						}
					}else{
						socketJime.emit('llenarParteDiario',{'ci':Ci,'idResidencia':idResidencia,'ocupacion':ocupacion,'DiaEntrada':DiaEntrada,'DiaSalida':DiaSalida,'TardeEntrada':TardeEntrada,'TardeSalida':TardeSalida,'item':item,'tramo':tramo,'equipo':equipo,'HorometroInicio':HorometroInicio,'HorometroFin':HorometroFin,'cantidadCombus':cantidadCombus,'tipoCombus':tipoCombus,'fechavale':fechavale,'inicioDetalle':inicioDetalle,'finDetalle':finDetalle,'detalle':detalle});
					}
				}else{
					socketJime.emit('llenarParteDiario',{'ci':Ci,'idResidencia':idResidencia,'ocupacion':ocupacion,'DiaEntrada':DiaEntrada,'DiaSalida':DiaSalida,'TardeEntrada':TardeEntrada,'TardeSalida':TardeSalida,'item':item,'tramo':tramo,'equipo':equipo,'HorometroInicio':HorometroInicio,'HorometroFin':HorometroFin,'cantidadCombus':cantidadCombus,'tipoCombus':tipoCombus,'fechavale':fechavale,'inicioDetalle':inicioDetalle,'finDetalle':finDetalle,'detalle':detalle});
				}
			}else{
				console.log('no inserto ni un dato');
			}
		});	
		$('#Hfin1').keyup(function(){
			var aux=$(this).val();
			$('#Hinicio2').val(aux);
			$('#Fila1Coculta1').slideDown('fast');
			if($(this).val()==0){
				$('#Fila1Coculta1').slideUp('fast');
			}
		});
		$('#Hfin2').keyup(function(){
			var aux=$(this).val();
			$('#Hinicio3').val(aux);
			$('#Fila1Coculta2').slideDown('fast');
			if($(this).val()==0){
				$('#Fila1Coculta2').slideUp('fast');
			}
		});
		$('#Hfin3').keyup(function(){
			var aux=$(this).val();
			$('#Hinicio4').val(aux);
			$('#Fila1Coculta3').slideDown('fast');
			if($(this).val()==0){
				$('#Fila1Coculta3').slideUp('fast');
			}
		});
		$('#Hfin4').keyup(function(){
			var aux=$(this).val();
			$('#Hinicio5').val(aux);
			$('#Fila1Coculta4').slideDown('fast');
			if($(this).val()==0){
				$('#Fila1Coculta4').slideUp('fast');
			}
		});
		$('#Hfin5').keyup(function(){
			var aux=$(this).val();
			$('#Hinicio6').val(aux);
			$('#Fila1Coculta5').slideDown('fast');
			if($(this).val()==0){
				$('#Fila1Coculta5').slideUp('fast');
			}
		});
		$('#Hfin6').keyup(function(){
			var aux=$(this).val();
			$('#Hinicio7').val(aux);
			$('#Fila1Coculta6').slideDown('fast');
			if($(this).val()==0){
				$('#Fila1Coculta6').slideUp('fast');
			}
		});
		$('#Hfin7').keyup(function(){
			var aux=$(this).val();
			$('#Hinicio2').val(aux);
			$('#Fila1Coculta7').slideDown('fast');
			if($(this).val()==0){
				$('#Fila1Coculta7').slideUp('fast');
			}
		});
	});	
	socketJime.on('RespuestaParteDiario',function(valor){
		console.log(valor);
	});

	$('#prueba').calendar({
		tipsy_gravity: 's', // How do you want to anchor the tipsy notification? (n / s / e / w)
		click_callback: function(date) {
            console.log(date);
        },
        year: "2016", // Optional start year, defaults to current year - pass in a year - Integer or String
		scroll_to_date: false // Scroll to the current day?
	});
	
})