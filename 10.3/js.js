const messageInput = document.querySelector('.message');
const sendBtn = document.querySelector('.j-btn-message');
const textWindow = document.querySelector('.text-window');
const geoBtn = document.querySelector('.j-btn-geo');

const wsUri = "wss://echo.websocket.org/";
const placeholder = 'Здесь вводится текст сообщения';

let websocket = new WebSocket(wsUri); 

websocket.onopen = function(evt) {
    console.log("CONNECTED");
};

websocket.onerror = function(evt) {
    console.log(evt.data)
};

websocket.onmessage = function(evt) {
  console.log(evt.data);
  addMessage(evt.data, 'flex-start');
};

sendBtn.addEventListener('click', () => {
    let message = messageInput.value;
    websocket.send(message);
    addMessage(message);
    messageInput.value = ''
})

function addMessage(message, position='flex-end') {
    let element = `
        <p class='message-window' style='align-self: ${position}'>
            ${message}
        </p>
    `;
    let chat = textWindow.innerHTML;
    textWindow.innerHTML = chat + element;
}

const error = () => {
    let error = "Позиция не может быть определена" 
    addMessage(error);
}

const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    let link = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    addLink(link)
}

function addLink(link) {
    let element = `
    <a  href='${link}'
        target='_blank'
        style='text-decoration: none;'
        >
        Гео-позиция
        </a>
    `;
    let chat = textWindow.innerHTML;
    textWindow.innerHTML = chat + element;
};

geoBtn.addEventListener('click', () => {
    if (!navigator.geolocation) {
        console.log("You can't use geolocation")
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    };
});