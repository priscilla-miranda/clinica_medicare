var exames = [];
var horariosAgendados = [];

var nome = document.getElementById("name");
var tipoExame = document.getElementById("selectExame");
var medico = document.getElementById("selectMedico")
var hora = document.getElementById("inputTime")
var data = document.getElementById("inputDate");
var phone = document.getElementById("phone");


// Botão enviar - Cadastro
$('#btnCadastro').click(function(){

    var horarioSelecionado = hora.value;

     var horariosAgendadosExame = horariosAgendados[tipoExame.value] || {};
    if (horariosAgendadosExame[data.value] && horariosAgendadosExame[data.value].includes(horarioSelecionado)) {
        alert("Esse horário já está ocupado para o exame selecionado. Por favor, selecione outro horário ou data.");
        return; 
    }

    //Verifica se o horário do exame já está agendado
    if (!horariosAgendados[tipoExame.value]) {horariosAgendados[tipoExame.value] = {};
    }
    if (!horariosAgendados[tipoExame.value][data.value]) {
        horariosAgendados[tipoExame.value][data.value] = [];
    }
    horariosAgendados[tipoExame.value][data.value].push(horarioSelecionado);

   
    if (nome.value === "" || tipoExame.value === "" || medico.value === "" || 
    data.value === "" || hora.value === "" || phone.value === "") {
    alert("Por favor, preencha todos os campos do formulário.");
    return; // Bloqueia o cadastro se algum campo estiver vazio
    }

    exames.push(new CadastroExame(
    nome.value,
    tipoExame.value,
    medico.value,
    data.value,
    hora.value,
    phone.value
     
    ));

    alert("Exame agendado com sucesso");
    document.getElementById('appointment-form').reset()
});


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

class CadastroExame{
    nome;
    tipoExame;
    medico;
    data;
    hora;
    phone;
   

constructor(nome,tipoExame,medico,data,hora,phone){
    this.nome = nome;
    this.tipoExame = tipoExame;
    this.medico = medico;
    this.data = data;
    this.hora = hora;
    this.phone = phone;
    

}
 
}

function exibirExames (){
    localStorage.setItem('exames',
    JSON.stringify(exames));

    window.location.href = "./agend_exame.html"
}




