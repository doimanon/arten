var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server, {});
var fs = require('fs'); 
var csv = require('fast-csv');

var dir = '/client/'

var t = fs.readFileSync('colony.csv').toString()
//console.log(t)



app.get('/', function (req, res) {
    res.sendFile(__dirname + dir)
});
app.get('/tabelle', function (req, res) {
    res.sendFile(__dirname + dir+'index.html')
});
app.get('/formular', function (req, res) {
    res.sendFile(__dirname + dir+'formular.html')
});
app.get('/formular/search=*', function (req, res) {
    res.sendFile(__dirname + dir+'formular.html')
});

app.use('/client', express.static(__dirname + '/client'))
server.listen(2000);

//   0   Artenname 
//   1   Anzahl Königinnen
//   2   Anzahl Arbeiterinnen   
//   3   Kolonieentwicklung
//   4   Lagerort
//   5   Erhalten am
//   6   Verkauft am
//   7   ID

io.sockets.on('connection', function (socket) {
    socket.emit('höchste_id',{id_:fs.readFileSync('colony.csv').toString().split('\n').length})

    socket.on('csv_eintrag',data=>{
        var d_string = ''
        for(var i in data){
            console.log(i+": "+data[i])
            d_string += data[i]+','
        }
        fs.appendFile("colony.csv", "\n"+d_string,'utf8',(err)=>{if (err) throw err;})
    })
    socket.on('csv_auslesen',()=>{
        console.log(fs.readFileSync('colony.csv').toString())
    })
    socket.on('csv_auslesen_byID',id_data=>{
        var table_ = fs.readFileSync('colony.csv').toString()
        var rows_ = table_.split('\n')
        console.log(rows_)
        for(var i=0;i<rows_.length;i++){
            var element_array = rows_[i].split(',')
            if(element_array[6] == id_data){
                socket.emit('csv_line_array',{array :rows_[i]})
                
            }
        }


    })
    socket.on('verkauft',data=>{//id datum

        var table_ = fs.readFileSync('colony.csv').toString()
        var rows_ = table_.split('\n')
        var element_array = rows_[data.id].split(',')
        element_array[5] = data.datum
        
    })


});




