axios.post(`https://tcchotel.herokuapp.com/listarHospedes`)
.then(function(res){
if(res.data=='?'){ //erro
  window.location.assign('404.html')
}else{

  res.data.forEach(function(obj,indice){

    let tr = document.createElement("tr")
    let th = document.createElement("th")
    
    tr.id = obj._id

    th.scope = "row"
    th.innerHTML = obj.apt
    tr.appendChild(th);

    let nome = document.createElement("td")
    nome.innerHTML = obj.nome
    tr.appendChild(nome)

    let genero = document.createElement("td")
    genero.innerHTML = obj.genero
    tr.appendChild(genero)

    let idade = document.createElement("td")
    idade.innerHTML = obj.idade
    tr.appendChild(idade)

    let pcd = document.createElement("td")
    pcd.innerHTML = obj.pcd
    tr.appendChild(pcd)

    let entrada = document.createElement("td")
    entrada.innerHTML = obj.entrada
    tr.appendChild(entrada)

    let saida = document.createElement("td")
    saida.innerHTML = obj.saida
    tr.appendChild(saida)


    let edit = document.createElement("td")
    edit.innerHTML = `

    <div id='editIcons${obj._id}'>
    <a href='#' onclick='editarHospede("${obj._id}")'>
    <i class='fas fa-pencil-alt'></i>
    </a>

    &nbsp;&nbsp;&nbsp;

    <a href='#' onclick='excluirHospede("${obj._id}")'>
    <i class='fas fa-trash'></i>
    </a>
    </div>

    <div id='applyIcons${obj._id}' style='display:none;'>
    <a href='#' onclick='atualizarHospede("${obj._id}")'>
    <i class='fas fa-check'></i>
    </a>

    &nbsp;&nbsp;&nbsp;

    <a href='#' onclick='cancelar("${obj._id}")'>
    <i class='fas fa-times'></i>
    </a>
    </div>

    `
    tr.appendChild(edit)


    document.getElementById("hosp1").appendChild(tr)
  })


}
})


function excluirHospede(id) {
  axios.post(`https://tcchotel.herokuapp.com/excluirHospede`,{id})
  .then(function(res){
      if(res.data=='?'){ //erro
        window.location.assign('404.html')
      }else{
        window.location.reload()  
      }
    })
}

function atualizarHospede(id){
  
  let apt = document.getElementById(id).childNodes[0].lastChild.value
  let nome = document.getElementById(id).childNodes[1].lastChild.value
  let genero = document.getElementById(id).childNodes[2].lastChild.value
  let idade = document.getElementById(id).childNodes[3].lastChild.value
  let pcd = document.getElementById(id).childNodes[4].lastChild.value
  let entrada = document.getElementById(id).childNodes[5].lastChild.value
  let saida = document.getElementById(id).childNodes[6].lastChild.value

  axios.post(`https://tcchotel.herokuapp.com/atualizarHospede`,{id:id,apt:apt, nome:nome, genero:genero,idade:idade, pcd:pcd, entrada:entrada,saida:saida})
  alert("Hóspede Atualizado!")  
}

function editarHospede(id){

  document.getElementById(`editIcons${id}`).style = "display:none;"
  document.getElementById(`applyIcons${id}`).style = "display:block;"

  //apt
  var td = document.getElementById(id).childNodes[0];
  var campo = document.createElement("input")
  campo.type = "text"
  campo.className = "form-control"
  campo.style = "width:65px;"
  campo.value = td.innerHTML
  td.replaceChild(campo, td.childNodes[0]);

  //nome
  var td = document.getElementById(id).childNodes[1];
  var campo = document.createElement("input")
  campo.type = "text"
  campo.className = "form-control"
  campo.style = "width:200px;"
  campo.value = td.innerHTML
  td.replaceChild(campo, td.childNodes[0]);

  //genero
  var td = document.getElementById(id).childNodes[2];
  var campo = document.createElement("input")
  campo.type = "text"
  campo.className = "form-control"
  campo.style = "width:100px;"
  campo.value = td.innerHTML
  td.replaceChild(campo, td.childNodes[0]);

  //idade
  var td = document.getElementById(id).childNodes[3];
  var campo = document.createElement("input")
  campo.type = "number"
  campo.className = "form-control"
  campo.style = "width:70px;"
  campo.value = td.innerHTML
  td.replaceChild(campo, td.childNodes[0]);

  //pcd
  var td = document.getElementById(id).childNodes[4];
  var campo = document.createElement("input")
  campo.type = "text"
  campo.className = "form-control"
  campo.style = "width:130px;"
  campo.value = td.innerHTML
  td.replaceChild(campo, td.childNodes[0]);

  //dataEntrada
  var td = document.getElementById(id).childNodes[5];
  var campo = document.createElement("input")
  campo.type = "text"
  campo.className = "form-control"
  campo.style = "width:120px;"
  campo.value = td.innerHTML
  td.replaceChild(campo, td.childNodes[0]);

  //dataSaida
  var td = document.getElementById(id).childNodes[6];
  var campo = document.createElement("input")
  campo.type = "text"
  campo.className = "form-control"
  campo.style = "width:120px;"
  campo.value = td.innerHTML
  td.replaceChild(campo, td.childNodes[0]);
}