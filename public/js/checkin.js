

                  var form = document.getElementById("registerForm")

                  var formSubmit = function(event) {
                    event.preventDefault()
                    register()
                  }

                  form.addEventListener("submit", formSubmit, true)



                  function register(){
                    
                    var d = new Date()
                    var entrada = d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear()
                    let apt = document.getElementById("apt").value
                    let saida = document.getElementById("previsaoSaida").value
                    let nome = document.getElementById("nome").value
                    let genero = document.getElementById("genero").value
                    let pcd = document.getElementById("pcd").value
                    let idade = d.getFullYear() -parseInt(document.getElementById("dataNascimento").value.substring(6,10))


                    axios.post(`https://tcchotel.herokuapp.com/register`,{apt:apt, nome:nome, genero:genero,idade:idade, pcd:pcd, entrada:entrada,saida:saida})
                    

                    alert("Hóspede Cadastrado!")
                    document.getElementById("registerForm").reset();
                  }

                