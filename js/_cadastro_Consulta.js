var consultas = [];
var horariosAgendados = [];

var nome = document.getElementById("name");
var medico = document.getElementById("selectMedico");
var especialidade = document.getElementById("inputEspecialidade");
var hora = document.getElementById("inputTime");
var data = document.getElementById("inputDate");
var phone = document.getElementById("phone");


// Botão enviar - Cadastro
$('#btnCadastro').click(function(){
    
    var horarioSelecionado = hora.value; 
    var horariosAgendadosMedico = horariosAgendados[medico.value] || {};
    if (horariosAgendadosMedico[data.value] && horariosAgendadosMedico[data.value].includes(horarioSelecionado)) {
        alert("Esse horário já está ocupado para o médico selecionado. Por favor, selecione outro horário ou médico.");
        return; 
    }

    // horário agendado ao médico correspondente na data selecionada
    if (!horariosAgendados[medico.value]) {
        horariosAgendados[medico.value] = {};
    }
    if (!horariosAgendados[medico.value][data.value]) {
        horariosAgendados[medico.value][data.value] = [];
    }
    horariosAgendados[medico.value][data.value].push(horarioSelecionado);

    if (nome.value === "" || medico.value === "" || especialidade.value === "" || 
    data.value === "" || hora.value === "" || phone.value === "") {
    alert("Por favor, preencha todos os campos do formulário.");
    return; // Bloqueia o cadastro se algum campo estiver vazio
}

    consultas.push(new Pacientes(
    nome.value,
    medico.value,
    especialidade.value,
    data.value,
    hora.value,
    phone.value

    ));

    alert("Consulta agendada com sucesso");
    document.getElementById('appointment-form').reset()

})



//--------------------Validando Datas--------------------------------
function validaData(){
    var dataAtual = new Date();
    dataAtual.setHours(0, 0, 0, 0); 
  
    var dataPartes = data.value.split('-');
    var dataSelecionada = new Date(dataPartes[0], dataPartes[1] - 1, dataPartes[2]);
  
    if (dataSelecionada >= dataAtual){
      return true;
    } else {
      alert("Selecione uma data futura.");
      return false;
    }
  }
class Pacientes{
    nome;
    medico;
    especialidade;
    data;
    hora;
    phone;
   

constructor(nome,medico,especialidade, data, hora,phone){
    this.nome = nome;
    this.medico = medico;
    this.especialidade = especialidade;
    this.data = data;
    this.hora = hora;
    this.phone = phone;
    

}
}


function exibirConsultas (){
    localStorage.setItem('consultas',
    JSON.stringify(consultas));

    window.location.href = "./agend_consulta.html"
}


