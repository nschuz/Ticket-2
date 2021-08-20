class Profile {
    constructor(name) {
        this.name = name;
    }

    getCookie() {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${this.name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    parseJWT(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }

    async getCurrentUser(username) {
        const data = await fetch(`http://localhost:8080/app/profile-data/${username}`);
        const json = await data.json();
        console.log("json", json);
        const { imagen } = json;
        const img = document.querySelector('#photoMessage');
        console.log("Imagen", imagen);
        img.src = imagen;
        return json;
    }

    async saveComment(txtValue, email, username, imagen, idUser) {
        const emailDestino = document.querySelector('#email').innerHTML;
        const data = await fetch(`http://localhost:8080/app/profile-data/${emailDestino}`);
        const json = await data.json();
        const { id } = json;

        fetch('http://localhost:8080/app/comment', {
            method: 'POST',
            body: new URLSearchParams({
                'user_name': email,
                'message': txtValue,
                'id_user': id,
            })
        }).then(() => {
            console.log("Comentario insertado");
        }).catch(err => {
            console.log("Error: " + err);
        });
    }

    async renderComents() {
        const emailDestino = document.querySelector('#email').innerHTML;
        const data = await fetch(`http://localhost:8080/app/comment/${emailDestino}`);
        const json = await data.json();
        for (let i = 0; i < json.length; i++) {
            //user_name=email
            const { message, user_name } = json[i];
            //obtenemos nombre e imagen
            const dataOrigen = await fetch(`http://localhost:8080/app/profile-data/${user_name}`);
            const jsonOrigen = await dataOrigen.json();
            const { firstname, lastname, imagen, username } = jsonOrigen;
            const divPadre = document.querySelector('#divPadre');
            const divInput = document.querySelector('#divInput');

            const divHijo = document.createElement('div');
            divHijo.classList.add('bg-white', 'p-2');

            const divAbuelo = document.createElement('div');
            divAbuelo.classList.add('d-flex', 'flex-row', 'user-info');

            const img = document.createElement('img');
            img.classList.add('rounded-circle');
            img.setAttribute('width', '40');
            img.src = imagen;

            const divNombre = document.createElement('div');
            divNombre.classList.add('d-flex', 'flex-column', 'justify-content-start', 'ml-2');
            const spanNombre = document.createElement('a');
            spanNombre.classList.add('d-block', 'font-weight-bold', 'name');
            spanNombre.textContent = `${firstname} ${lastname}`;
            spanNombre.setAttribute('href', `http://localhost:8080/app/profile/${username}`);

            const divMessage = document.createElement('div');
            divMessage.classList.add('mt-2');
            const p = document.createElement('p');
            p.classList.add('comment-text');
            p.textContent = message;

            divMessage.appendChild(p);
            divNombre.appendChild(spanNombre);

            divAbuelo.appendChild(img);
            divAbuelo.appendChild(divNombre);

            divHijo.appendChild(divAbuelo);
            divHijo.appendChild(divMessage);

            divPadre.insertBefore(divHijo, divInput);


        }
    }


}

window.onload = async function() {
    const user = new Profile("token");
    const usernamecookie = user.parseJWT(user.getCookie());
    console.log(usernamecookie);
    const { email, username, imagen, id } = await user.getCurrentUser(usernamecookie.email);
    user.renderComents();
    //console.log(email, username, imagen, id);

    const btnComment = document.querySelector('#btnMessage');
    btnComment.addEventListener("click", function(e) {
        const txtValue = document.querySelector('#txtMessage').value;
        user.saveComment(txtValue, email, username, imagen, id);
    })



}