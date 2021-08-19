class Welcome {
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

    getData(email) {
        const about = document.querySelector('#about').value;
        const hobbies = document.querySelector('#hobbies').value;
        const profession = document.querySelector('#profession').value;
        const phone = document.querySelector('#phone').value;
        const web = document.querySelector('#website').value;
        const english = document.querySelector('#english').value;
        const experience = document.querySelector('#experience').value;
        const skill1 = document.querySelector('#skill1')
        const skill1Value = skill1.options[skill1.selectedIndex].text;
        const skill2 = document.querySelector('#skill2')
        const skill2Value = skill2.options[skill2.selectedIndex].text;
        const skill3 = document.querySelector('#skill3')
        const skill3Value = skill3.options[skill3.selectedIndex].text;
        console.log(skill1Value, skill2Value, skill3Value);
        const file = document.querySelector('input[type=file]').files[0];
        console.log(file);

        fetch('http://localhost:8080/app/welcome/' + email, {
                method: 'POST',
                // headers: {
                //     'Content-Type': 'application/x-www-form-urlencoded',
                //     'Content-Type': 'multipart/form-data'
                // },
                body: new URLSearchParams({
                    'about': about,
                    'hobbie': hobbies,
                    'skill1': skill1Value,
                    'skill2': skill2Value,
                    'skill3': skill3Value,
                    'proffesion': profession,
                    'phone_number': phone,
                    'english_level': english,
                    'experience': experience,
                    'image': file,
                })
            })
            .then(() => {

                let form = new FormData();
                const filename = file.name;
                console.log(filename);
                const extension = filename.split('.').pop();

                const myNewFile = new File([file], `${email}.${extension}`);
                form.append('image', myNewFile);

                fetch('http://localhost:8080/app/welcome/' + email, {
                    method: 'POST',
                    // headers: {
                    //     'Content-Type': 'multipart/form-data'
                    // },
                    body: form


                })
            })
            .then(response => response.json())
            .then((data => {
                console.log(data);
                if (data === "ok") {
                    //     window.location.replace("http://localhost:8080/app/myprofile");
                }
            }));

    }
}


window.onload = async function() {
    const user = new Welcome("token");
    const filei = document.querySelector('input[type=file]').files[0];
    const inpuImage = document.querySelector('#image');
    const imagen = document.querySelector('#imagen');
    const data = user.parseJWT(user.getCookie());
    console.log(data.email);
    const btnSubmit = document.getElementById('submit');

    inpuImage.addEventListener('change', () => {
        console.log("hola");
        const [file] = inpuImage.files;
        if (file) {
            imagen.src = URL.createObjectURL(file)
        }
    })

    btnSubmit.addEventListener('click', function() {
        user.getData(data.email);
    });



}