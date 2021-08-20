class User {
    constructor(edpoit) {
        this.edpoit = edpoit;
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




    async fetchEndPoint() {
        const response = await fetch(this.edpoit);
        const data = await response.json();
        return data;
    }

    generarCard(data) {
        const divPadre = document.querySelector('#row-cards');
        const json_data = data;
        for (let i = 0; i < data.length; i++) {
            const { about, first_name, last_name, hobbie, skill1, skill2, skill3, last_connected, user_name, email } = data[i];

            const divCol = document.createElement('div');
            divCol.classList.add('col-6');
            const cardmb = document.createElement('div');
            cardmb.classList.add('card', 'mb-3');
            cardmb.setAttribute('stryle', 'max-width: 540px;');


            const divrow = document.createElement('div');
            divrow.classList.add('row', 'g-0');



            //div e imagen 
            const divcolmd4 = document.createElement('div');
            divcolmd4.classList.add('col-md-4');
            const img = document.createElement('img');
            img.setAttribute('src', `http://localhost:8080/app/image/${email}`);
            img.classList.add('img-fluid');


            //abajo div imagen 
            const divmd8 = document.createElement('div');
            divmd8.classList.add("col-md-8");

            const divBody = document.createElement('div');
            divBody.classList.add("card-body");
            divBody.classList.add('size-body');

            const nombreTitle = document.createElement('h5');
            nombreTitle.classList.add('card-title');
            nombreTitle.textContent = first_name + ' ' + last_name;


            const pCardText = document.createElement('p');
            pCardText.classList.add('card-text');
            const h2Nombre = document.createElement('h2');
            h2Nombre.textContent = first_name + ' ' + last_name;

            const pAbout = document.createElement('p');
            pAbout.innerHTML = `<strong>About:</strong>${about}`;

            const pHobbies = document.createElement('p');
            pHobbies.innerHTML = `<strong>Hobbies:</strong>${hobbie}`;

            const pSkills = document.createElement('p');
            pSkills.innerHTML = `<strong>Skills: </strong>
            <span class="tags">${skill1}</span>
            <span class="tags">${skill2}</span>
            <span class="tags">${skill3}</span>
            </p>`;


            const pCardText2 = document.createElement('p');
            pCardText2.classList.add('card-text');
            const btnSeguir = document.createElement('button');
            btnSeguir.classList.add('btn', 'btn-primary', 'mr-2',
                'follow');
            btnSeguir.setAttribute('id', email);
            btnSeguir.textContent = "Follow";

            const btnPersonal = document.createElement('a');
            btnPersonal.classList.add('btn', 'btn-success');
            btnPersonal.setAttribute('href', `http://localhost:8080/app/profile/${user_name}`);
            btnPersonal.textContent = "Visit Profile";
            const br = document.createElement('br');
            const lastUpdate = document.createElement('small');
            lastUpdate.classList.add('text-muted');
            lastUpdate.textContent = `Last updated: ${last_connected}`;

            pCardText.appendChild(pAbout);
            pCardText.appendChild(pHobbies);
            pCardText.appendChild(pSkills);

            pCardText2.appendChild(btnSeguir);
            pCardText2.appendChild(btnPersonal);
            pCardText2.appendChild(br);
            pCardText2.appendChild(lastUpdate);

            //pCardText.appendChild(h2Nombre);

            divBody.appendChild(nombreTitle);
            divBody.appendChild(pCardText);
            divBody.appendChild(pCardText2);


            divmd8.appendChild(divBody);
            divcolmd4.appendChild(img)



            divrow.appendChild(divcolmd4);
            divrow.appendChild(divmd8);
            cardmb.appendChild(divrow);
            divCol.appendChild(cardmb);
            divPadre.appendChild(divCol);

        }

    }



    follow() {

    }



}



window.onload = async function() {
    const user = new User("http://localhost:8080/app/users");
    const data = await user.fetchEndPoint();
    user.generarCard(data);
}