var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var db=require("mysql_orm");
var fs=require('fs');
var nombreAvatar;
var settings={
	host:"localhost",
	user:"root",
	password:"",
	database:"EjemploSistema",
	port:""
}
var query=db.mysql(settings);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Servicio Departamental De Caminos Potosi' });
});
router.get('/EncargadoResidencia', function(req, res, next) {
  res.render('EncargadoResidencia');
});
router.post('/EncargadoResidencia', function(req, res) {
	var dirImagen='';
	var f = new Date().toString();
    var fechaa='';
    for(var i=0;i<f.length-43;i++){
        if(f[i]!=' '&&f[i]!=':'){
            fechaa=fechaa+f[i];
        } 
    }
    var form = new formidable.IncomingForm();
    form.parse(req);
    form.on('fileBegin', function (name, file){
        var DirRouter=__dirname;
        var DirRout='';
        for(var i=0;i<DirRouter.length-7;i++){
            DirRout=DirRout+DirRouter[i];
        }
        file.path = DirRout+'/public/images/Upload/'+fechaa + file.name;
        dirImagen = 'images/Upload/'+ fechaa + file.name;
    });
    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
        res.render('EncargadoResidencia',{ title: 'residente', dirImagen:dirImagen});
    });
});
router.get('/Trabajador', function(req, res) {
  res.render('Trabajador');
});
router.get('/NuevoParteD', function(req, res) {
  res.render('NuevoParteD');
});
router.get('/JefeOperacion', function(req, res, next) {
  res.render('JefeOperacion');
});
router.get('/Usuarios', function(req, res) {
	console.log('usuariiooo',nombreAvatar);
	res.render('Usuarios',{ title: 'Administrador', nombre: nombreAvatar });
});
router.get('/RegistrarUsuario',function(req ,res){
	res.render('RegistrarUsuario',{ title: 'Administrador', nombre: nombreAvatar });
});
router.post('/RegistrarUsuario',function(req ,res){
	var user=Object();
	user.nick=req.body.nombres;
	user.apellidos=req.body.apellidos;
	user.pass=req.body.password;
	user.cargo=req.body.cargo;
	user.domicilio=req.body.domicilio;
	user.telefono=req.body.telefono;
	console.log({nombre:user.nick,apellido:user.apellido,contraseña:user.pass,cargo:user.cargo,domicilio:user.domicilio, telefono: user.telefono});
	query.save("usuarios",user,(function(r){
		res.redirect('Usuarios');
	}));
});

//LOGEAR USUARIOS
router.post('/', function(req, res) {
	var nick=req.body.nombre;
	nombreAvatar=nick;
	console.log(nombreAvatar);
	var pass=req.body.contraseña;
	console.log(nick, pass);
	query.get("usuarios").where({"nick":nick,"pass":pass}).execute(function(v){
		if(v.result.length==1){
			var aux=v.result[0].cargo;
			console.log(v.result[0].cargo);
			if(aux=='residente')
				res.render('EncargadoResidencia',{ title: 'residente', nombre: nick });
			else{
				if(aux=='Trabajador')
					res.render('Trabajador',{ title: 'trabajador', nombre: nick });
				else
					res.render('JefeOperacion');
			}
		}
		else{
			res.render('index', { error:'ERROR: Verifique sus datos'});
		}
	});
});
/*router.get('/Usuarios', function(req, res) {
	query.get("usuarios").execute(function(todoslosusuarios){
	 var aux='';
	 for(var i=0;i<todoslosusuarios.result.length;i++){
	 	aux=todoslosusuarios.result[0].ci;
		console.log(todoslosusuarios.result.length);
	 }
	 res.render('Usuarios',{nombres:'todos',ci:aux,password:'todoslosusuario'});
	});
});
*/

module.exports = router;