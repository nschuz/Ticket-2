class User {
    constructor(name) {
        this.name = name;
    }

    getCookie() {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${this.name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    alerta(message, error) {
        const mensaje = document.createElement("div");
        mensaje.classList.add('alert');
        if (error === "error") {
            mensaje.classList.add('alert-danger');
        } else {
            mensaje.classList.add('alert-success');
        }
        mensaje.textContent = message;

        //agegar al dom
        //Agregar al dom
        const container = document.querySelector('#alertaDiv');
        container.appendChild(mensaje);

        //Quitar la laerta despues de 5 segundos 
        setTimeout(() => {
            mensaje.remove();
        }, 2500);
    }

    parseJWT(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }

    async curretUser(email) {
        const response = await fetch(`http://localhost:8080/app/profile-data/${email}`);
        const data = await response.json();
        return data;
    }

    async renderChats() {
        const chats = await fetch(`http://localhost:8080/app/history-chat`);
        console.log(chats);
        const data = await chats.json();
        console.log(data);

        for (let i = 0; i < data.length; i++) {
            const { name, message, img } = data[i];
            const li = document.createElement('li');
            li.classList.add('messages-you', 'clearfix');

            const spanImage = document.createElement('span');
            spanImage.classList.add('message-img', 'img-circle');

            const img2 = document.createElement('img');
            img2.src = img;
            img2.setAttribute('width', '75');
            img2.setAttribute('height', '75');
            img2.classList.add('avatar-sm', 'border', 'rounded-circle');

            const bodymessage = document.createElement('div');
            bodymessage.classList.add('message-body', 'clearfix')

            const bodyHeader = document.createElement('div');
            bodyHeader.classList.add('message-header');
            bodyHeader.innerHTML = `<strong class="messages-title">${name}</strong>`;


            const p = document.createElement('p')
            p.classList.add('messages-p');
            p.innerText = message;

            bodymessage.appendChild(bodyHeader);
            bodymessage.appendChild(p);

            spanImage.appendChild(img2);

            li.appendChild(spanImage);
            li.appendChild(bodymessage);
            output.appendChild(li);

        }

    }


}

//DOM ELEMENTS
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');



window.onload = async function() {

    const user = new User('token');
    const userLogeado = user.parseJWT(user.getCookie());
    let { firstname, lastname, imagen } = await user.curretUser(userLogeado.email);
    firstname = firstname.toUpperCase();
    lastname = lastname.toUpperCase();
    await user.renderChats();
    const socket = io();
    btn.addEventListener('click', () => {
        socket.emit('chat:message', {
            username: firstname + " " + lastname,
            message: message.value,
            img: imagen,
        })

    })

    message.addEventListener('keypress', function() {
        socket.emit('chat:typing', firstname);
    })

    socket.on('chat:message', function(data) {
        actions = '';
        const li = document.createElement('li');
        li.classList.add('messages-you', 'clearfix');

        const spanImage = document.createElement('span');
        spanImage.classList.add('message-img', 'img-circle');

        const img = document.createElement('img');
        img.src = data.img;
        img.setAttribute('width', '75');
        img.setAttribute('height', '75');
        img.classList.add('avatar-sm', 'border', 'rounded-circle');

        const bodymessage = document.createElement('div');
        bodymessage.classList.add('message-body', 'clearfix')

        const bodyHeader = document.createElement('div');
        bodyHeader.classList.add('message-header');
        bodyHeader.innerHTML = `<strong class="messages-title">${data.username}</strong>`;


        const p = document.createElement('p')
        p.classList.add('messages-p');
        p.innerText = data.message;

        bodymessage.appendChild(bodyHeader);
        bodymessage.appendChild(p);

        spanImage.appendChild(img);

        li.appendChild(spanImage);
        li.appendChild(bodymessage);
        output.appendChild(li);


    })

    socket.on('chat:typing', function(data) {
        actions.innerHTML = `<p><em>${data} is typing a message</em></p>`
    })
}