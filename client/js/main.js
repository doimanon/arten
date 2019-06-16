function sendData(){
    var artenname = document.getElementById('artenname').value
    var anzahlg = document.getElementById('anzahlg').value
    var anzahla = document.getElementById('anzahla').value
    var entwick = document.getElementById('entwick').value
    var lort = document.getElementById('lort').value
    var erhaltena = document.getElementById('erhaltena').value
    var idaus = document.getElementById('idaus').value

    socket.emit('csv_eintrag',{
        artenname: artenname,
        anzahlg: anzahlg,
        anzahla: anzahla,
        entwick: entwick,
        lort: lort,
        erhaltena: erhaltena,
        idaus: idaus
    })
}

function getDataById(id){
    
}