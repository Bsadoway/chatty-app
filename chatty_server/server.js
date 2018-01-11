// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({
  server
});

function checkIncomingMessage(message, color){
  const parsed = JSON.parse(message);
  let newMessage = '';
  
  if (parsed.type === 'postMessage') {
    newMessage = {
      type: "incomingMessage",
      id: uuidv1(),
      username: parsed.username,
      content: parsed.content,
      colour: color
    };
    console.log(`User ${parsed.username} says ${parsed.content}`);
  } else if (parsed.type === 'postNotification') {
    newMessage = {
      id: uuidv1(),
      type: "incomingNotification",
      content: parsed.content
    };
    console.log(parsed.content);
  } else {
    newMessage = {
      content: 'An error occurred with the type being sent'
    };
  }
  return newMessage;
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  const colours = ['#ED2127', '#67BB48', '#3855A3', '#BC549C'];
  const randColour = colours[Math.floor(Math.random() * colours.length)];

  console.log('Client connected');

  // handle the client count
  wss.clients.forEach(function each(client) {
    if (client.readyState === ws.OPEN) {
      client.send(JSON.stringify({
        size: wss.clients.size
      }));
    }
  });

  //handle each message being sent to the server
  ws.on('message', function incoming(message) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === ws.OPEN) {
        client.send(JSON.stringify(checkIncomingMessage(message,randColour)));
      }
    });
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
      wss.clients.forEach(function each(client) {
        if (client.readyState === ws.OPEN) {
          client.send(JSON.stringify({
            size: wss.clients.size
          }));
        }
      });
      console.log('Client disconnected');
  });

});
