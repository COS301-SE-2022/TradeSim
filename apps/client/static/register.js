function validateform() {

    var flag = true;
    var name = document.myform.name.value;
    var email = document.myform.email.value;
    var password = document.myform.password.value;

    if (name == null || name == "") {
        alert("Name can't be blank");
        flag = false;
    }
    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        flag = false;
    }

    var firstpassword = document.myform.password.value;
    var secondpassword = document.myform.cpsw.value;

    if (firstpassword != secondpassword) {
        alert("password must be same!");
        flag = false;
    }

    
        password = hash(password);
        const details =
        {
            "Data" : [name , email, password]
        }

         fetch("http://127.0.0.1:6969/register",
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
        // Strigify the payload into JSON:
        body:JSON.stringify(details)}
         ).then(response=> response.json())
             .then(data =>{
             console.log(data)
             const jd = JSON.parse(data)
             document.getElementById("response").innerHTML = jd.error;
         });





}


 function hash(p)
 {
  var hash = 0, i, c;
  if (p.length === 0)
  {
    return hash;
  }
  for (i = 0; i < p.length; i++)
  {
    c   = p.charCodeAt(i);
    hash  = ((hash << 5) - hash) + c;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}
