'use strict';

var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var socket = require('socket.io');
var io = socket(server);

var rooms = {};

// On server connection, new socket object
io.on("connection", function (socket) {
  // Attach event listener "join room", pull roomID off url
  socket.on("join room", function (roomID) {
    // Server checks if room is in the room collection, and pushes the id into the same array
    if (rooms[roomID]) {
      rooms[roomID].push(socket.id);
    } else {
      // If it doesnt exist, the id is put into a new room array in the rooms object
      rooms[roomID] = [socket.id];
    }

    // Is there somebody in the room? See if  there is an id in that array that is not ours
    var otherUser = rooms[roomID].find(function (id) {
      return id !== socket.id;
    });
    // Let ourselves know that there is a user in the room, and the other user that we are joining
    if (otherUser) {
      socket.emit("other user", otherUser);
      socket.to(otherUser).emit("user joined", socket.id);
    }
  });

  // When the offer event is fired, it accepts the payload as an argument
  socket.on("offer", function (payload) {
    // Send an event to payload.target (the person you are calling)
    // Emit the offer event, and the information with who you are, and the offer you are sending to the other user
    io.to(payload.target).emit("offer", payload);
  });
  // Listen on answer, get the payload object
  socket.on("answer", function (payload) {
    // Emits an answer with the payload to the calling peer
    io.to(payload.target).emit("answer", payload);
  });
  // Ice-candidate is a way for 2 peers to agree upon a connection
  // Used by both peers when peer 1 or 2 come up with a candidate, until they find one that works
  socket.on("ice-candidate", function (incoming) {
    io.to(incoming.target).emit("ice-candidate", incoming.candidate);
  });
});

module.exports = { app: app, server: server };
//# sourceMappingURL=app.js.map