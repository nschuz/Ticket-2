class Profile {
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

    async getCurrentUser(username) {
        const data = await fetch(`http://localhost:8080/app/profile-data/${username}`);
        const json = await data.json();
        //console.log("json", json);
        const { imagen } = json;
        const img = document.querySelector('#photoMessage');
        //console.log("Imagen", imagen);
        img.src = imagen;
        return json;
    }

    async saveComment(txtValue, email, username, imagen, idUser) {
        const emailDestino = document.querySelector('#email').innerHTML;
        const data = await fetch(`http://localhost:8080/app/profile-data/${emailDestino}`);
        const json = await data.json();
        const { id } = json;

        if (emailDestino == email) {
            this.alerta("No te puedes auto comentar", "error");
            return;
        }

        fetch('http://localhost:8080/app/comment', {
                method: 'POST',
                body: new URLSearchParams({
                    'user_name': email,
                    'message': txtValue,
                    'id_user': id,
                })
            }).then(() => {
                this.alerta("Comentario Insertado");
            }).then(() => {
                window.location.reload();
            })
            .catch(err => {
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

    async renderFriends() {
        const emailDestino = document.querySelector('#email').innerHTML;
        const data = await fetch(`http://localhost:8080/app/friends/${emailDestino}`);
        const json = await data.json();
        for (let i = 0; i < json.length; i++) {
            //user_name=email
            const { email_ori } = json[i];
            //obtenemos nombre e imagen
            const dataOrigen = await fetch(`http://localhost:8080/app/profile-data/${email_ori}`);
            const { imagen, firstname, lastname, profession, username } = await dataOrigen.json();
            const divPeople = document.querySelector('#people');

            const divUser = document.createElement('div');
            divUser.classList.add('nearby-user');

            const divrow = document.createElement('div');
            divrow.classList.add('row');

            const divImage = document.createElement('div');
            divImage.classList.add('col-md-2', 'col-sm-2');

            const img = document.createElement('img');
            img.src = imagen;
            img.classList.add('profile-photo-lg');

            const divData = document.createElement('div');
            divData.classList.add('col-md-7', 'col-sm-7');
            const h5 = document.createElement('h5');
            h5.innerHTML = `<a href="http://localhost:8080/app/profile/${username}" class="profile-link">${firstname} ${lastname}</a>`;
            const p = document.createElement('p');
            p.innerText = profession;

            const divBoton = document.createElement('div');
            divBoton.classList.add('col-md-3', 'col-sm-3');
            const btn = document.createElement('btn');
            btn.classList.add('btn', 'btn-primary', 'pull-right');
            btn.innerText = "Follow";

            divBoton.appendChild(btn);
            divData.appendChild(h5);
            divData.appendChild(p);
            divImage.appendChild(img);

            divrow.appendChild(divImage);
            divrow.appendChild(divData);
            divrow.appendChild(divBoton);

            divUser.appendChild(divrow);
            divPeople.appendChild(divUser);






        }

    }


}

window.onload = async function() {
    const user = new Profile("token");
    const usernamecookie = user.parseJWT(user.getCookie());
    //console.log(usernamecookie);
    const { email, username, imagen, id } = await user.getCurrentUser(usernamecookie.email);
    user.renderComents();
    user.renderFriends();
    //console.log(email, username, imagen, id);

    const btnComment = document.querySelector('#btnMessage');
    btnComment.addEventListener("click", function(e) {
        const txtValue = document.querySelector('#txtMessage').value;
        user.saveComment(txtValue, email, username, imagen, id);
    })



}