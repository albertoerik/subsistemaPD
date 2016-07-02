function onDocumentReady() {
	var map = L.map('mimapa', {
		center: [-19.505, -426.09],
		zoom: 9
	});
	var tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
	map.addLayer(tiles);
}

$(document).on('ready', onDocumentReady);
// initialize the map on the "map" div with a given center and zoom
	
	//alert("hola leaflet");
	/*var socket=io();
	$("#enviar_btn").click(function(event){
		var valor = $('#msn_numero').val();
		socket.emit("numero",valor);
		console.log(valor);
	});
	socket.on("response",function(r){
		alert("numero enviado");
	});*/