// Servidor de chat (server.js)
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: { origin: "*" } // Permite que cualquier usuario se conecte
});

// Cuando un usuario entra a la web...
io.on('connection', (socket) => {
    
    // Alguien inicia sesión con su Nickname
    socket.on('user_connected', (username) => {
        socket.username = username;
        // Avisa a todos los demás que alguien entró
        io.emit('irc_system_message', `[SYSTEM] User ${username} has joined #exclusion-zone`);
    });

    // Alguien envía un mensaje de texto
    socket.on('send_message', (text) => {
        // Reenvía el mensaje instantáneamente a TODOS los conectados
        io.emit('receive_message', {
            user: socket.username,
            message: text
        });
    });
});

http.listen(3000, () => console.log('IRC Server running on port 3000'));

const socket = io("https://tu-servidor-irc.com"); // Dirección del servidor en la nube

function connectToIRC() {
    // ... tu código actual que cambia la pantalla ...
    
    // AVISAR AL SERVIDOR ONLINE: "Me he conectado con este nombre"
    socket.emit('user_connected', currentNickname);
}

function sendTransmission() {
    const msgInput = document.getElementById("messageInput");
    const text = msgInput.value.trim();
    if (text === "") return;

    // ENVIAR AL SERVIDOR ONLINE: "Envía este texto a todos"
    socket.emit('send_message', text);
    msgInput.value = "";
}

// ESCUCHAR AL SERVIDOR ONLINE: Cuando el servidor avise que alguien escribió
socket.on('receive_message', (data) => {
    const msgBox = document.getElementById("ircMessages");
    
    // Crear el mensaje dinámicamente en pantalla (como ya haces)
    const msgRow = document.createElement("div");
    msgRow.className = "irc-msg";
    msgRow.innerHTML = `<span class="user-tag">&lt;${data.user}&gt;</span> ${data.message}`;
    
    msgBox.appendChild(msgRow);
    msgBox.scrollTop = msgBox.scrollHeight;
});