//***************************

var timerSimulacao
var timerCountdown
var seconds
var newSeconds = 1
var mediaConsumo = 300
//var consumoPorSegundo = mediaConsumo*0.000011574


document.getElementById("nivel").addEventListener("input", atualizarNivelAtual)
document.getElementById("consumopp").addEventListener("input", atualizarNivelAtual)

function timer() {
  var days        = Math.floor(seconds/24/60/60)
  var hoursLeft   = Math.floor((seconds) - (days*86400))
  var hours       = Math.floor(hoursLeft/3600)
  var minutesLeft = Math.floor((hoursLeft) - (hours*3600))
  var minutes     = Math.floor(minutesLeft/60)
  var remainingSeconds = (seconds % 60).toFixed(0)
  function pad(n) {
    return (n < 10 ? "0" + n : n)
  }
  document.getElementById('tempoRestante').innerHTML = pad(days)+"d " + pad(hours) + ":" + pad(minutes) + ":" + pad(remainingSeconds)
  if (seconds <= 0) {
    document.getElementById('tempoRestante').innerHTML = "--"
  } else {
    seconds=seconds-newSeconds;
  }
}


function atualizarNivelAtual(){

  mediaConsumo = document.getElementById("consumopp").value
  let nivel = document.getElementById("nivel").value
  let qtdHospedes = parseInt(document.getElementById("qtdHospedes").innerHTML)
  let capacidade = document.getElementById("capacidade").value
  let capacidadeFornecimento = nivel/mediaConsumo
  document.getElementById("capacidadeFornecimento").innerHTML = Math.floor(capacidadeFornecimento)
  
  
  if(capacidadeFornecimento>qtdHospedes*2){
    //document.getElementById("status").style = "color:Green;"
    document.getElementById("status").innerHTML = "Nível Eficiente!"
    document.getElementById("status").className = "h5 mb-0 font-weight-bold text-success"
    document.getElementById("statusText").className = "text-xs font-weight-bold text-success text-uppercase mb-1"
    document.getElementById("statusShadow").className = "card border-left-success shadow h-10 py-2"
  }

  if((capacidadeFornecimento>=qtdHospedes)&&(capacidadeFornecimento<=qtdHospedes*2)){
    //document.getElementById("status").style = "color:limegreen;"
    document.getElementById("status").innerHTML = "Nível Razoável!"
    document.getElementById("status").className = "h5 mb-0 font-weight-bold text-success"
    document.getElementById("statusText").className = "text-xs font-weight-bold text-success text-uppercase mb-1"
    document.getElementById("statusShadow").className = "card border-left-success shadow h-10 py-2"
  }

  if(capacidadeFornecimento<=qtdHospedes){
    //document.getElementById("status").style = "color:Orange;"
    document.getElementById("status").innerHTML = "Nível Insuficiente!"
    document.getElementById("status").className = "h5 mb-0 font-weight-bold text-warning"
    document.getElementById("statusText").className = "text-xs font-weight-bold text-warning text-uppercase mb-1"
    document.getElementById("statusShadow").className = "card border-left-warning shadow h-10 py-2"

  }

  if(capacidadeFornecimento<qtdHospedes/2){
    //document.getElementById("status").style = "color:Red;"
    document.getElementById("status").innerHTML = "Nível Crítico!"
    document.getElementById("status").className = "h5 mb-0 font-weight-bold text-danger"
    document.getElementById("statusText").className = "text-xs font-weight-bold text-danger text-uppercase mb-1"
    document.getElementById("statusShadow").className = "card border-left-danger shadow h-10 py-2"

  }

  if(nivel<=0.5){
    //document.getElementById("status").style = "color: darkred;"
    document.getElementById("status").innerHTML = "Reservatório Vazio!"
    document.getElementById("status").className = "h6 mb-0 font-weight-bold text-dark"
    document.getElementById("statusText").className = "text-xs font-weight-bold text-dark text-uppercase mb-1"
    document.getElementById("statusShadow").className = "card border-left-dark shadow h-10 py-2"

  }


  if(qtdHospedes<=0){
    seconds = 0 
    timer()
  }else{
    let conversaoTempo = (((capacidadeFornecimento/qtdHospedes) * 24)*60*60) //Converte dia p/ segundo 
    seconds = conversaoTempo
    timer()
  }

  let convLevel = (nivel/capacidade)*100
  setLevel(convLevel)
}


