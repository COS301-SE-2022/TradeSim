function validatenaa() {

    var flag = true;
    var name = document.getElementById("etfName").value;
    var amount = document.getElementById("etfAmount").value;
    var idnum = getCookie("UserIDAI")

    const details =
    {
        "Data" : [idnum, name, amount]
    }

     fetch("http://127.0.0.1:6969/createName",
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
             console.log(jd.error);
             alert(jd.error)
         }
         else
         {
             window.location.href = "/addRule"
         }


     });
}

function getCookie(cookiename)
{
  let name = cookiename + "=";
  let decCookie = decodeURIComponent(document.cookie);
  let cookievalue = decCookie.split(';');
  for(let i = 0; i <cookievalue.length; i++)
  {
    let cookie = cookievalue[i];
    while (cookie.charAt(0) == ' ')
    {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) == 0)
    {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return "";
}
