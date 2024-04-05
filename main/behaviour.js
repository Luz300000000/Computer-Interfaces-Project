// Seleciona o elemento de menu, o ícone de seta e a div do relógio
const menu = document.getElementById('menu');
const arrowIcon = document.getElementById('next');
const clockDiv = document.getElementById('clock');

// var backButtons = document.getElementsByClassName('back-btn');
const backButtons = document.getElementById('back-btn');
const homeBtn = document.getElementById('homeBtn');
const addBtn = document.getElementById('btnAdicionar');
const dellBtn = document.getElementById('btnRemover')
const cancelarBtn = document.getElementById('btnCancelar');
const btnAddDell = document.getElementById('btnAddDell'); 

const registosOp = document.getElementById('registos-op');
const monitorizarOp = document.getElementById('monitorizar-op');
const listaPacientesOp = document.getElementById('listaPacientes-op');

const divListaPacientes = document.getElementById('lista-pacientes');
const ulListaUtentes = document.getElementById('listaUtentes');

const registoPacienteDiv = document.getElementById('registo-paciente');
const monitorarPacienteDiv = document.getElementById('monitorizar');
const listaPacientesDiv = document.getElementById('listaPacientes');
const alarmesDiv = document.getElementById('alarmes');

const numAlarmsController = document.getElementById('numAlarmsController');
const incAlarms = document.getElementById('incAlarms');
const decAlarms = document.getElementById('decAlarms');

const numAlarmsButton = document.getElementById('numAlarmsButton');
const alarmsButton = document.getElementById('alarms-button');

const updateVitalsButton = document.getElementById('updateVitals');

const controlAlarms = document.getElementById('control-alarms');
const controlVitals = document.getElementById('control-vitals');

const addPacienteForm = document.getElementById('addPacienteDiv');
const formPaciente = document.getElementById('addPaciente-form');
const ecraCapturaVoz = document.getElementById('ecraAdd');

var undo = [];

var pacientInstances = [];
var listaPacientes = [];

var alarmes = 0;
var listaAlarmes = [];
var checkAlarmButtons = [];

let novoPaciente1 = {
    dados: {
        nome: 'Paciente 1',
        contacto: '911111111',
        numeroUtente: '111222333',
        infoUtente: 'F | 28 anos | Bloco 2C'
    },
    sinaisVitais: {
        freqCardiaca: 90,
        pressaoArterial: '140/90',
        freqRespiratoria: 10
    },
    fichaTecnica: {
        descricao: 'Febre Alta; Pressão no peito; Frequência respiratória abaixo do normal.'
    },
    alarmeAtivo: false
};

let novoPaciente2 = {
    dados: {
        nome: 'Paciente 2',
        contacto: '966666666',
        numeroUtente: '444555666',
        infoUtente: 'M | 36 anos | Bloco 3A'
    },
    sinaisVitais: {
        freqCardiaca: 75,
        pressaoArterial: '135/88',
        freqRespiratoria: 12
    },
    fichaTecnica: {
        descricao: 'Ferimentos profundos; Fratura do rádio; Possíveis hemorragias devido aos ferimentos.'
    },
    alarmeAtivo: false
};

listaPacientes.push(novoPaciente1);
listaPacientes.push(novoPaciente2);

document.getElementById("homeBtn").addEventListener("click", voltarHome);
numAlarmsController.textContent = 'Alarmes: ' + alarmes;
numAlarmsButton.textContent = alarmes;

function voltarHome() {
    divListaPacientes.classList.remove('show');
    hideListaPacientes();
    
    registoPacienteDiv.classList.remove('show');
    hideRegistoUtente();

    monitorarPacienteDiv.classList.remove('show');
    hideMonitorarUtente();

    hideAlarmes();

    hideEcraAdd();
    //showMenu();
    hideBtns();
    hideForm();
    hideMenu();
    showLockscreen();
    
}

function showMenu() {
    menu.classList.add('show');
    undo = [hideMenu, showLockscreen];
    homeBtn.disabled = false;
    alarmsButton.disabled = false;
}

function hideMenu() {
    menu.classList.remove('show');    
}

function showVoltar() {
    backButtons.classList.add('show');
}

function hideVoltar() {
    backButtons.classList.remove('show');
}

function showLockscreen() {
    // Toggles the "shrink" class on the clock div element
    clockDiv.classList.remove('shrink');
    // Adds seta
    arrowIcon.style.display = 'block';
    hideVoltar()
    homeBtn.disabled = true;
    alarmsButton.disabled = false;

    // Centra o notifications button (alarmes)
    alarmsButton.classList.remove('menu');

    hideVoltar();
}

function hideLockscreen() {
    // Toggles the "shrink" class on the clock div element
    clockDiv.classList.add('shrink');
    // Remove seta
    arrowIcon.style.display = 'none';
    alarmsButton.classList.add('menu');
}

function showRegistos() {
    hideMenu();
    undo = [hideListaPacientes, hideRegistos, showMenu];
    showListaPacientes();
    callRegistoUtente();
}

function hideRegistos() {
    divListaPacientes.classList.toggle('show');
}

function showMonitorar() {
    hideMenu();
    undo = [hideListaPacientes, hideRegistos, showMenu]; 
    showListaPacientes();
    callMonitorarUtente();
}

function showMenuLista () {
    undo = [hideListaPacientes, hideRegistos, showMenu, hideBtns, hideForm];
    btnAddDell.classList.add('show');
    showListaPacientesComCheckbox();
}


listaPacientesOp.addEventListener('click', () => {
    hideMenu();
    showMenuLista();
});

function showListaPacientesComCheckbox() {
    showListaPacientes();
    
    const listaItems = ulListaUtentes.querySelectorAll('li');
    for (let item of listaItems) {
        let checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        item.insertBefore(checkbox, item.firstChild);
    }
    
    desativa();
}

function desativa() {
    let allCheckbox = document.querySelectorAll('input[type="checkbox"]');
    allCheckbox.forEach(function(checkbox){
    checkbox.addEventListener('change', function() {

        let someChecked = false;
        Array.from(allCheckbox).forEach(checkbox => {
            if (checkbox.checked)
                someChecked = true;
        });

        if (someChecked)
            dellBtn.disabled = false;
        else
            dellBtn.disabled = true;
    });
});
}

cancelarBtn.addEventListener('click', () => {
    formPaciente.reset();
    addPacienteForm.classList.remove('show');
    hideEcraAdd ();
    hideListaPacientes();
    showMenuLista();
    showVoltar();

    alarmsButton.disabled = false;
    console.log(listaPacientes);
});

function hideBtns() {
    btnAddDell.classList.remove('show');
}

function ecraAdicionar (){
    ecraCapturaVoz.classList.toggle('show');
}

function hideEcraAdd (){
    ecraCapturaVoz.classList.remove('show');
}

function hideForm() {
    addPacienteForm.classList.remove('show');
}

addBtn.addEventListener('click', () => {
    alarmsButton.disabled = true;
    hideVoltar();
    hideListaPacientes();
    divListaPacientes.classList.remove('show');
    addPacienteForm.classList.toggle('show');

    controlAlarms.classList.add('hide');
    controlVitals.classList.add('hide');
    
    ecraAdicionar();
    hideBtns();
    undo = [hideEcraAdd, showMenuLista];
    formPaciente.addEventListener('submit', function(evento) {
        evento.preventDefault(); // impedir que o formulário seja enviado
        evento.stopImmediatePropagation();

        let validPacient = false;
        // verificar se todos os campos obrigatórios têm um valor
        if (formPaciente.nome.value != '' &&
            formPaciente.contacto.value != '' &&
            formPaciente.numeroUtente.value != '' &&
            formPaciente.sexo.value != '' &&
            formPaciente.idade.value != '' &&
            formPaciente.bloco.value != '' &&
            formPaciente.fichaTecnica.value != '') {

            validPacient = true;
    
            // obter valores do formulário
            const nome = formPaciente.nome.value;
            const contacto = formPaciente.contacto.value;
            const numeroUtente = formPaciente.numeroUtente.value;
            const sexo = formPaciente.sexo.value;
            const idade = formPaciente.idade.value;
            const bloco = formPaciente.bloco.value;
            const infoUtente = `${sexo} | ${idade} anos | Bloco ${bloco}`;
            const descricao = formPaciente.fichaTecnica.value;
    
            // criar objeto do paciente com informações fornecidas e sinais vitais nulos
            let novoPaciente = {
            dados: {
                nome,
                contacto,
                numeroUtente,
                infoUtente
            },
            sinaisVitais: {
                freqCardiaca: 0,
                pressaoArterial: '0',
                freqRespiratoria: 0
            },
            fichaTecnica: {
                descricao
            },
            alarmeAtivo: false
            };
    
            // exibir o novo objeto do paciente no console
            console.log(novoPaciente);
            formPaciente.reset(); // limpar o formulário
            listaPacientes.push(novoPaciente);

            addPacienteForm.classList.remove('show');
            hideEcraAdd();
            hideListaPacientes();
            showMenuLista();
            showVoltar();
            cleanEmptyPacientes();

            controlAlarms.classList.remove('hide');
            controlVitals.classList.remove('hide');

        }
        else {
            // exibir mensagem de erro para o usuário
            alert('Não foi possível adicionar o paciente.');
        }
    });
  
    //dellBtn.disabled = true;
    console.log(listaPacientes);
  });

function cleanEmptyPacientes() {
    for (let i = 0; i < listaPacientes.length; i++) {
        if (listaPacientes[i].dados.numeroUtente.length == 0) {
            let listaPacientesLeft = listaPacientes.slice(0, i);
            let listaPacientesRight = listaPacientes.slice(i + 1);
            listaPacientes = listaPacientesLeft.concat(listaPacientesRight);
        }
    }
}

dellBtn.addEventListener('click', () => { 
    desativa();
    const elementosSelecionados = ulListaUtentes.querySelectorAll('li input[type="checkbox"]:checked');
    elementosSelecionados.forEach(elemento => {
        
        let numeroUtenteRemover = elemento.parentNode.textContent.trim();
        for (let i = 0; i < listaPacientes.length; i++) {
            if (listaPacientes[i].dados.numeroUtente === numeroUtenteRemover) {
              listaPacientes.splice(i, 1);
              break;
            }
        }
        console.log(listaPacientes);
        hideListaPacientes();
        showListaPacientesComCheckbox();
        
    });
    desativa();
   
});



// Gera um random alarme consoante os dados de um paciente (random) que esteja no array de pacientes
function generateAlarm() {
    // Gera um random index da listaPacientes
    let i = Math.floor((Math.random() * listaPacientes.length - 1) + 1);
    
    // Verifica se o paciente já tem um alarme ativo
    if (listaPacientes[i].alarmeAtivo)
        console.log('O ' + listaPacientes[i].dados.nome + ' já tem um alarme ativo.');
    else {
        // Create alarm object
        let alarme = {
            nomePaciente: listaPacientes[i].dados.nome,
            infoPaciente: listaPacientes[i].dados.infoUtente,
            numeroUtente: listaPacientes[i].dados.numeroUtente
        };
    
        listaAlarmes.push(alarme);
        listaPacientes[i].alarmeAtivo = true;
        alarmes++;
        console.log(alarme);
    }
}

function showAlarmes() {
    hideMenu();
    alarmesDiv.classList.add('show');
    alarmsButton.disabled = true;
    undo = [hideAlarmes, showMenu];
    
    let alarmesTitle = document.createTextNode('Alarmes');
    let hrElement = document.createElement('hr');
    let alarmesSubDiv = document.createElement('div');
    alarmesSubDiv.setAttribute('id', 'listaAlarmes');
    alarmesDiv.appendChild(alarmesTitle);
    alarmesDiv.appendChild(hrElement);
    alarmesDiv.appendChild(alarmesSubDiv);

    for (let i = 0; i < listaAlarmes.length; i++) {
        let nomeElement = document.createElement('h4');
        let infoElement = document.createElement('p');
        let nomeText = document.createTextNode(listaAlarmes[i].nomePaciente);
        let infoText = document.createTextNode(listaAlarmes[i].infoPaciente);
        nomeElement.appendChild(nomeText);
        infoElement.appendChild(infoText);

        let checkAlarm = document.createElement('button');
        checkAlarm.classList.add('checkAlarm');

        let alarmePaciente = document.createElement('div');
        alarmePaciente.classList.add('alarmePaciente');
        
        alarmePaciente.appendChild(checkAlarm);
        alarmePaciente.appendChild(nomeElement);
        alarmePaciente.appendChild(infoElement);
        alarmesSubDiv.appendChild(alarmePaciente);

        checkAlarmButtons.push(checkAlarm);
    }

    let alarmePacienteLista = alarmesSubDiv.getElementsByClassName('alarmePaciente');

    checkAlarmButtons.forEach(element => {
        element.addEventListener('click', () => {
            let buttonIndex = checkAlarmButtons.indexOf(element);
            console.log('clicked button ' + buttonIndex);

            // Remover alarme da listAlarmes e remover a div
            deleteAlarme(buttonIndex);
            alarmesSubDiv.removeChild(alarmePacienteLista[buttonIndex]);            
        
            // Remover o respetivo botão de atender alarme
            let checkAlarmButtonsLeft = checkAlarmButtons.slice(0, buttonIndex);
            let checkAlarmButtonsRight = checkAlarmButtons.slice(buttonIndex + 1);
            checkAlarmButtons = checkAlarmButtonsLeft.concat(checkAlarmButtonsRight);

            updateAlarmsCounter();
        });
    });
}

// Adiciona um evento de clique ao ícone da seta
arrowIcon.addEventListener('click', () => {
    hideLockscreen();
    showMenu();
    showVoltar();
});

backButtons.addEventListener('click', () => {
    undo.forEach(function(undoFunction) {
        undoFunction();
    });
});

// Adiciona um evento de clique na opção de 'Consultar Registos'
registosOp.addEventListener('click', () => {
    hideLockscreen();
    showRegistos();
});

function callRegistoUtente() {
    let listaUtentes = Array.from(ulListaUtentes.querySelectorAll('li'));
    listaUtentes.forEach(function(utente) {
        utente.addEventListener('click', function() {
            hideRegistos();
            showRegistoUtente(utente.textContent);
            hideListaPacientes();
            undo = [showRegistos, hideRegistoUtente]
        });
    });
}

function callMonitorarUtente() {
    let listaUtentes = Array.from(ulListaUtentes.querySelectorAll('li'));
    listaUtentes.forEach(function(utente) {
        utente.addEventListener('click', function() {
            hideRegistos();
            showMonitorarUtente(utente.textContent);
            hideListaPacientes();
            undo = [showMonitorar, hideMonitorarUtente]
        });
    }); 
}


function showRegistoUtente(numUtente) {

    let pacienteProcurado = encontrarPacientePorNumeroUtente(numUtente);
    
    console.log(pacienteProcurado);
    let nomeElement = document.createElement('h2');
    let nomeText = document.createTextNode(pacienteProcurado.dados.nome);
    nomeElement.appendChild(nomeText);

    let infoUtenteElement = document.createElement('p');
    let infoUtenteText = document.createTextNode(pacienteProcurado.dados.infoUtente);
    infoUtenteElement.appendChild(infoUtenteText);
    infoUtenteElement.setAttribute('style', 'font-weight:bold');

    let descricaoElement = document.createElement('p');
    let descricaoText = document.createTextNode(pacienteProcurado.fichaTecnica.descricao);
    descricaoElement.appendChild(descricaoText);

    registoPacienteDiv.appendChild(nomeElement);
    registoPacienteDiv.appendChild(infoUtenteElement);
    registoPacienteDiv.appendChild(descricaoElement);

    //registoPacienteDiv.removeChild(nomeElement);
    //registoPacienteDiv.removeChild(descricaoElement);

}

function showMonitorarUtente(numUtente) {

    let pacienteProcurado = encontrarPacientePorNumeroUtente(numUtente);
    
    let sinaisVitais = pacienteProcurado.sinaisVitais;

    let nomeElement = document.createElement('h2');
    let nomeText = document.createTextNode(pacienteProcurado.dados.nome);
    nomeElement.appendChild(nomeText);

    const sinaisVitaisHTML = document.createElement('ul');

    const freqCardiacaItem = document.createElement('li');
    freqCardiacaItem.textContent = `Frequência cardíaca: ${sinaisVitais.freqCardiaca}`;

    const pressaoArterialItem = document.createElement('li');
    pressaoArterialItem.textContent = `Pressão arterial: ${sinaisVitais.pressaoArterial}`;

    const freqRespiratoriaItem = document.createElement('li');
    freqRespiratoriaItem.textContent = `Frequência respiratória: ${sinaisVitais.freqRespiratoria}`;

    sinaisVitaisHTML.appendChild(freqCardiacaItem);
    sinaisVitaisHTML.appendChild(pressaoArterialItem);
    sinaisVitaisHTML.appendChild(freqRespiratoriaItem);

    monitorarPacienteDiv.appendChild(nomeElement);
    monitorarPacienteDiv.appendChild(sinaisVitaisHTML);
}

function hideRegistoUtente() {
    while (registoPacienteDiv.firstChild) {
        registoPacienteDiv.removeChild(registoPacienteDiv.lastChild);
    }
}

function hideMonitorarUtente() {
    while (monitorarPacienteDiv.firstChild) {
        monitorarPacienteDiv.removeChild(monitorarPacienteDiv.lastChild);
    }
}

function hideAlarmes() {
    while (alarmesDiv.firstChild) {
        alarmesDiv.removeChild(alarmesDiv.lastChild);
    }
    alarmesDiv.classList.remove('show');
    deleteAlarmButtons();
}

function deleteAlarmButtons() {
    while (checkAlarmButtons.length != 0)
        checkAlarmButtons.pop();
}

function deleteAlarme(alarmeIndex) {
    let indexPaciente = getPacientIndex(listaAlarmes[alarmeIndex].numeroUtente);
    listaPacientes[indexPaciente].alarmeAtivo = false;
    let listaAlarmesLeft = listaAlarmes.slice(0, alarmeIndex);
    let listaAlarmesRight = listaAlarmes.slice(alarmeIndex + 1);
    listaAlarmes = listaAlarmesLeft.concat(listaAlarmesRight);
    alarmes--;
}

// Retorna o index do paciente na listaPacientes a partir do numeroUtente
function getPacientIndex(numeroUtente) {
    for (let i = 0; i < listaPacientes.length; i++) {
        if (listaPacientes[i].dados.numeroUtente == numeroUtente)
            return i;
    }
}

// Gera novos valores para simular o update dos vitais em tempo real
function updateVitals() {
    for (let i = 0; i < listaPacientes.length; i++) {
        let freqCardiaca = Math.floor((Math.random() * 41) + 60);
        let pressaoArterialNum1 = Math.floor((Math.random() * 21) + 130);
        let pressaoArterialNum2 = Math.floor((Math.random() * 21) + 80);
        let pressaoArterial = pressaoArterialNum1 + '/' + pressaoArterialNum2;
        let freqRespiratoria = Math.floor((Math.random() * 9)+ 12);
        listaPacientes[i].sinaisVitais.freqCardiaca = freqCardiaca;
        listaPacientes[i].sinaisVitais.pressaoArterial = pressaoArterial;
        listaPacientes[i].sinaisVitais.freqRespiratoria = freqRespiratoria;
    }
}

// Adiciona um evento de clique na opção de 'Monitorizar Paciente'
monitorizarOp.addEventListener('click', () => {
    hideLockscreen();
    showMonitorar();
});

// Adiciona um evento de clique para atualizar (simular) os sinais vitais dos pacientes
updateVitalsButton.addEventListener('click', () => {
    updateVitals();
});

// Atualiza os counters dos alarmes (screen + controlador)
function updateAlarmsCounter() {
    numAlarmsController.textContent = 'Alarmes: ' + alarmes;
    numAlarmsButton.textContent = alarmes;
}

// Incrementa o numero de alarmes recebidos
incAlarms.addEventListener('click', () => {
    generateAlarm();
    updateAlarmsCounter();
});

// Decrementa o numero de alarmes recebidos
decAlarms.addEventListener('click', () => {
    deleteAlarme(0);
    updateAlarmsCounter();
});

// Acede diretamente ao menu dos alarmes a partir do icon das notificações de alarmes
alarmsButton.addEventListener('click', () => {
    hideLockscreen();

    divListaPacientes.classList.remove('show');
    hideListaPacientes();

    registoPacienteDiv.classList.remove('show');
    hideRegistoUtente();

    monitorarPacienteDiv.classList.remove('show');
    hideMonitorarUtente();

    hideEcraAdd();
    showMenu();
    hideBtns();

    showAlarmes();
    showVoltar();

    homeBtn.disabled = false;
});

function showListaPacientes() {
    divListaPacientes.classList.add('show');
    
    let numerosUtente = [];
    for (let paciente of listaPacientes) {
        if (paciente.dados.numeroUtente.length != 0)
            numerosUtente.push(paciente.dados.numeroUtente);
    }
    pacientInstances = [];
    for (let numero of numerosUtente) {
        const item = document.createElement('li');
        item.textContent = numero;
        ulListaUtentes.appendChild(item);
        pacientInstances.push(item);
        console.log("Created item");
    }
}

function hideListaPacientes() {
    pacientInstances.forEach(function (elem) {
        if (isDescendant(ulListaUtentes, elem))
            ulListaUtentes.removeChild(elem);
    });
}

// Define uma função para procurar pacientes por número de utente
function encontrarPacientePorNumeroUtente(numeroUtente) {
    let pacienteEncontrado = listaPacientes.find(function(paciente) {
      return paciente.dados.numeroUtente === numeroUtente;
    });
    return pacienteEncontrado;
}

function displayTime() {

    var dateTime = new Date();
    var hours = dateTime.getHours();
    var min = dateTime.getMinutes();

    if (min < 10) {
        var min = min.toString().padStart(2, '0'); 
    }

    if (hours < 10) {
        var hours = hours.toString().padStart(2, '0'); 
    }
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = min;
}
setInterval(displayTime, 10);

function isDescendant(node, child) {
    if (node === child) {
      return true;
    }
    if (!node.children) {
      return false;
    }
    for (let i = 0; i < node.children.length; i++) {
      if (isDescendant(node.children[i], child)) {
        return true;
      }
    }
    return false;
  }