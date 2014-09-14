var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);



app.get('/', function(req, res){
    res.sendfile('index.html');
});


io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('chat message', function(msg){
        var msg = msg.replace(/(<([^>]+)>)/ig,"");
        socket.broadcast.emit('chat message', msg);
    });
    socket.on('is typing', function(msg){
        socket.broadcast.emit('is typing');
    });
    socket.on('stopped typing', function(msg){
        socket.broadcast.emit('stopped typing');
    });
});


http.listen(80, function(){
    console.log('listening on *:3000');
});