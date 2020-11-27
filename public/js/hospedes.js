


                  axios.post(`https://tcchotel.herokuapp.com/listarHospedes`)
                  .then(function(res){
                if(res.data=='?'){ //erro
                  window.location.assign('404.html')
                }else{

                  res.data.forEach(function(obj,indice){

                    var tr = document.createElement("tr")
                    var th = document.createElement("th")
                    th.scope = "row"
                    th.innerHTML = obj.apt
                    tr.appendChild(th);
                    
                    var nome = document.createElement("td")
                    nome.innerHTML = obj.nome
                    tr.appendChild(nome)

                    var genero = document.createElement("td")
                    genero.innerHTML = obj.genero
                    tr.appendChild(genero)
                    
                    var idade = document.createElement("td")
                    idade.innerHTML = obj.idade
                    tr.appendChild(idade)

                    var pcd = document.createElement("td")
                    pcd.innerHTML = obj.pcd
                    tr.appendChild(pcd)
                    
                    var entrada = document.createElement("td")
                    entrada.innerHTML = obj.entrada
                    tr.appendChild(entrada)

                    var saida = document.createElement("td")
                    saida.innerHTML = obj.saida
                    tr.appendChild(saida)


                    var edit = document.createElement("td")
                    edit.innerHTML = `<a href='#' onclick='editarHospede'><i class='fas fa-pencil-alt'></a></i>&nbsp;&nbsp;&nbsp;<a href='#' onclick='excluirHospede("${obj._id}")'><i class='fas fa-times'></i></a>`
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
