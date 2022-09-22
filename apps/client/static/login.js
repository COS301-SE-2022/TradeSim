function validateform() {

    var flag = true;
    var name = document.myform.name.value;
    var password = document.myform.password.value;

    password = hash(password);
    const details =
    {
        "Data" : [name, password]
    }

     fetch("http://ec2-54-87-29-139.compute-1.amazonaws.com:6969/login",
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
         if(jd.status == "failure")
         {
             document.getElementById("response").innerHTML = document.getElementById("response").innerHTML = `<div class="alert alert-danger" role="alert">${jd.error}</div>`;
         }
         else
         {
             document.cookie = "UserIDAI= " + jd.id;
             document.getElementById("response").innerHTML = document.getElementById("response").innerHTML = `<div class="alert alert-success" role="alert">You have successfully logged in.</div>`;
             window.location.href = "/home"
         }


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
