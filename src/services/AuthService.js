var jwtDecode = require('jwt-decode');

const payload = {
    auth: false,
    token: null,
    name: null,
    userid: null,
    lastname: null,
    username: null,
    email: null,
    country: null,
    phone_number: null
}

export async function  Login(email, password) {

    var x = await fetch('https://backend-alysystem-v2.herokuapp.com/graphql', {  
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email, password: password
        })
    }).then((res) => res.json())

    if(x.data.error.ok != undefined && !x.data.error.ok)
        throw x.data.error.message
    else if (x.data.hasOwnProperty('data')){
        payload.auth = true;
        payload.token = x.data.data.token;
        payload.userid = jwtDecode(x.data.data.token).sub
        payload.lastname = x.data.data.lastname;
        payload.username = x.data.data.username;
        payload.email = x.data.data.email;
        payload.name = x.data.data.name;
        payload.country = x.data.data.country;
        payload.phone_number = x.data.data.phone_number;
        return payload;
    }

}