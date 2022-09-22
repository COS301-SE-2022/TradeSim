function validateform() {

    var flag = true;
    var name = (document.myform.name.value).replace(/ /g, "");;
    var email = document.myform.email.value;
    var password = document.myform.password.value;

    if (name == null || name == "") {
        document.getElementById("response").innerHTML = `<div class="alert alert-danger" role="alert">Name can't be blank!</div>`;
        flag = false;
    }
    if (password.length < 6) {
        document.getElementById("response").innerHTML = `<div class="alert alert-danger" role="alert">Password must be at least 6 characters long!</div>`;
        flag = false;
    }

    var firstpassword = document.myform.password.value;
    var secondpassword = document.myform.cpsw.value;

    if (firstpassword != secondpassword) {
        document.getElementById("response").innerHTML = `<div class="alert alert-danger" role="alert">password must be same!</div>`;
        flag = false;
    }


    password = hash(password);
    const details =
        {
            "Data": [name, email, password]
        }

    if (flag) {
        fetch("http://127.0.0.1:6969/register",
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                },
                // Strigify the payload into JSON:
                body: JSON.stringify(details)
            }
        ).then(response => response.json())
            .then(data => {
                console.log(data)
                const jd = JSON.parse(data)
                if (jd.error == "successfully signed up")
                    document.getElementById("response").innerHTML = `<div class="alert alert-success" role="alert">${jd.error}</div>`;
                else
                    document.getElementById("response").innerHTML = `<div class="alert alert-danger" role="alert">${jd.error}</div>`;
            });
    }
}


function hash(p) {
    var hash = 0, i, c;
    if (p.length === 0) {
        return hash;
    }
    for (i = 0; i < p.length; i++) {
        c = p.charCodeAt(i);
        hash = ((hash << 5) - hash) + c;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}
