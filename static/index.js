const socket = io();

const messages = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("inputs");
const nickname = document.getElementById("nicknames");
const typing = document.getElementById("typing");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (input.value) {
        socket.emit("chat message", input.value, nickname.value);
        input.value = "";
    }
});

input.addEventListener("keypress", function (e) {
    if (nickname.value) {
        socket.emit("user typing", nickname.value);
    }
});

socket.on("user is typing", function (nickname) {
    if (nickname) {
        typing.innerText = nickname + " is typing...";
    }
});

socket.on("welcome user", function () {
    var item = document.createElement("li");
    item.textContent = "A user has joined!";
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

socket.on("chat message", function (msg, nickname) {
    var item = document.createElement("li");
    item.textContent = nickname + " : " + msg;
    messages.appendChild(item);
    typing.innerText = " "
    window.scrollTo(0, document.body.scrollHeight);
});