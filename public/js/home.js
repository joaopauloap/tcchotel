
	var confTimer = setInterval(carregarConfiguracoes,10000)
	carregarConfiguracoes()


	function carregarConfiguracoes(){
		axios.post(`https://tcchotel.herokuapp.com/qtdHospedes`)
		.then(function(res){

		    if(res.data=='?'){ //erro
		    	window.location.assign('404.html')
		    }else{
		    	document.getElementById("qtdHospedes").innerHTML = res.data
		    }
		})
		axios.post(`https://tcchotel.herokuapp.com/carregarConfiguracoes`)
		.then(function(res){

		    if(res.data=='?'){ //erro
		    	window.location.assign('404.html')
		    }else{
		    	document.getElementById("consumopp").value = res.data.consumo
		    	document.getElementById("capacidade").value = res.data.capacidade
		    	document.getElementById("nivel").value = res.data.nivel
		    	atualizarNivelAtual()
		    }
		})

	}

	function atualizarConf(){

		let consumopp = document.getElementById("consumopp").value
		let capacidade = document.getElementById("capacidade").value
		let nivel = document.getElementById("nivel").value

		axios.post(`https://tcchotel.herokuapp.com/atualizarConf`,{consumopp,capacidade,nivel})
		.then(function(res){
			
			    if(res.data=='?'){ //erro
			    	window.location.assign('404.html')
			    }else{

			    }
			})
	}

	function waterTankHide(){
		document.getElementById("waterTank").style = "display:none;"
		document.getElementById("chartArea").className = "col-xl-12 col-lg-7"
		document.getElementById("grafico").width = 1024
		document.getElementById("botaoWaterTankShow").style = "display:block;"
	}	

	function waterTankShow(){
		document.getElementById("waterTank").style = "display:block;"
		document.getElementById("chartArea").className = "col-xl-8 col-lg-7"
		document.getElementById("grafico").width = 640
		document.getElementById("botaoWaterTankShow").style = "display:none;"
	}
