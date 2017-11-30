// Based off of Shawn Van Every's Live Web
// http://itp.nyu.edu/~sve204/liveweb_fall2013/week3.html

// Using express: http://expressjs.com/
var express = require('express');
var osc = require('node-osc');
var directory = require('serve-index');


// Create the app
var app = express();


// Set up the server
// process.env.PORT is related to deploying on heroku
console.log('process.env.PORT:' + process.env.PORT);
var server = app.listen(8080, listen);

// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}

app.use(directory('public'));
app.use(express.static('public'));


// WebSocket Portion
// WebSockets work with the HTTP server
var io = require('socket.io')(server);

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection',
  // We are given a websocket object in our function
  function (socket) {
  
    console.log("We have a new client: " + socket.id);
    
    socket.on('disconnect', function() {
      console.log("Client has disconnected");
    });
  }
);


//OSC

var oscServer, oscClient;

console.log(Date.now());

var oscip = '127.0.0.1';
var listeningPort = 3333;

//this is where we are listening for OSC messages
console.log('listening to OSC messages on ' + oscip + ':'+ listeningPort);
oscServer = new osc.Server(listeningPort, oscip);

var msgCounter = 0;
oscServer.on('message', function(msg, rinfo) {
  //  console.log(msg, rinfo);
    msgCounter++;
    if(msgCounter % 1000 == 0){
      //console.log(msg[0]);
      console.log('received osc messages from ' + oscip + ':'+ listeningPort +': ' +  msgCounter);
    }
    io.sockets.emit("muse", msg);
});

console.log(Date.now());



