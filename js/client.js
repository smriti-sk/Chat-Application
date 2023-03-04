const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInput');
const messageContainer = document.querySelector('.messageWindow')

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position)
    messageContainer.append(messageElement);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right')
    socket.emit('send', message)
    messageInput.value = '';
})

const name = prompt("Enter your name to join LetsChat");
socket.emit('new-user-joined', name);

socket.on('user-joined', data => {
    append(`${name} joined the chat`, 'left')
})

socket.on('receive', data=> {
    append(`${data.message}: ${data.user}`, right);
})