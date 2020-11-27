var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var cors = require('cors')

var port = process.env.PORT || 5000
var app = express()

app.use(cors());
app.use(express.json())

app.use(express.static(path.join(__dirname, './web'), { maxAge: 86400000 }));
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())


var mongodbstr = 'mongodb+srv://joao:qwerty123@cluster0-i7dxf.gcp.mongodb.net/tcchotel?retryWrites=true&w=majority'
var usersModel = mongoose.model('hospedes', {apt: Number, nome: String, genero: String, idade:Number, pcd: String, idade: Number, entrada: String, saida:String})	
var configuracoesModel = mongoose.model('configuracoes', {consumo: Number, capacidade: Number, nivel: Number})	
var graficoModel = mongoose.model('nivel', {tempo: String, nivel: Number})	

mongoose.connect(mongodbstr,{'useNewUrlParser': true,'useFindAndModify': false,'useCreateIndex': true,'useUnifiedTopology': true})

var capacidade = 0


app.listen(port)
console.log(`\nServidor rodando na porta: ${port}\n\n`)

function funcHorario(){

	let date_ob = new Date();
	let dia = ("0" + date_ob.getDate()).slice(-2);
	let mes = ("0" + (date_ob.getMonth() + 1)).slice(-2);
	let hora = date_ob.getHours();
	let minuto = date_ob.getMinutes();

	let horario = dia + "/" + mes + " " + hora + ":" + minuto
	return horario
}

app.post('/register',function(req,res){

	if(res){

		let apt = req.body.apt
		let nome = req.body.nome
		let genero = req.body.genero
		let idade = req.body.idade
		let pcd = req.body.pcd
		let entrada = req.body.entrada
		let saida = req.body.saida

		var registrarHospede = new usersModel({ apt:apt, nome:nome, genero:genero, idade:idade, pcd:pcd, entrada:entrada, saida:saida })

		let horario = funcHorario()

		registrarHospede.save(function(err, usersModel) {
			if (err) return console.error(err)
				console.log(horario + " - Novo Check-In")
		})
	}

})

app.post('/listarHospedes',function(req,res){
	usersModel.find({}, function(err, result) {
		if (err) return console.error(err)
			res.json(result)
	})
})

app.post('/qtdHospedes',function(req,res){
	usersModel.countDocuments({}, function(err, result) {
		if (err) return console.error(err)
			res.json(result)    
	})
})

app.post('/carregarConfiguracoes',function(req,res){
	configuracoesModel.find({}, function(err, result) {
		if (err) return console.error(err)
			res.json(result[0])
		capacidade = parseInt(result[0].capacidade)
	})
})

app.post('/atualizarConf',function(req,res){
	if(res){
		let consumo = req.body.consumopp
		let capacidade = req.body.capacidade
		let nivel = req.body.nivel

		let horario = funcHorario()

		configuracoesModel.findOneAndUpdate({}, {consumo:consumo,capacidade:capacidade,nivel:nivel}, function(err, result) {
			if (err) return console.error(err)
				console.log(horario + " - Configuracoes Atualizadas!")
		});
	}
})

app.post('/atualizarNivel',function(req,res){
	if(res){
		let nivel = req.body.nivel
		configuracoesModel.findOneAndUpdate({}, {nivel:nivel}, function(err, result) {
			if (err) return console.error(err)
		});


		let horario = funcHorario()

		graficoModel({tempo:horario,nivel:nivel}).save(function(err, usersModel) {
			if (err) return console.error(err)
				console.log(horario + " - Nivel Registrado! " + nivel+" L")
		})
	}
})

app.post('/excluirHospede',function(req,res){

	if(res){
		let id = req.body.id
		usersModel.findByIdAndDelete(id, function(err, result) {
			if (err){
				res.send('?')
				return console.error(err)
			}
			if(result){
				let horario = funcHorario()
				console.log(horario + " - Hóspede "+id+" Excluido!")
				res.send('Hospede Excluido!')
			}
		});
	}
})


app.get('/nivel',function(req,res){

	let nivelPorcentagem = parseInt(req.query.nivel)

	let nivel = capacidade * (nivelPorcentagem/100)

	configuracoesModel.findOneAndUpdate({}, {nivel:nivel}, function(err, result) {
		if (err) return console.error(err)
	});

})


app.get('/teste',function(req,res){
	res.send('joao')
	console.log('/teste')
})

app.get('*',function(req,res){
	res.send('<center><h1>404</h1></center>')
})





