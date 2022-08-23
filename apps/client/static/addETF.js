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

function getETFS(){
    var userID = getUserID()

    const details =
    {
        "Data" : [userID]
    }

   fetch("http://127.0.0.1:6969/getETFS",
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
             document.getElementById("etfs").innerHTML = jd.error
         }
         else
         {
             console.log(jd);
             let numofetfs = jd.Data.length;

             // document.getElementById("etfs").innerHTML += "<div id='table1'>"

              for(var i = 0; i < numofetfs; i++)
             {
                 document.getElementById("collection").innerHTML += "<a className='collection-item' id='load" + i + "'>"+ jd.Data[i].ETFName + "  <i className='material-icons right blue-text'>delete</i></a><br>"
             }

             // for(var i = 0; i < numofetfs; i++)
             // {
             //
             //     document.getElementById("table1").innerHTML += "<tr id='row" + i + "'></tr>"
             //     document.getElementById("row" + i).innerHTML += "<th>" +
             //         '<div id="' + i + '" style="width:100%;max-width:900px"></div>' +
             //         "</th></tr>"
             //        getGraph(jd.Data[i].ETFName, userID, jd.Data[i].ETFID, jd.Data[i].Rules, jd.Data[i].Amount, jd.Data[i].Date, i)
             //
             //
             // }

            // document.getElementById("etfs").innerHTML += "</table>"


         }


     });
}
function getUserID()
{
  let id = "UserIDAI=";
  let decCookie = decodeURIComponent(document.cookie);
  let cookievalue = decCookie.split(';');
  for(let i = 0; i <cookievalue.length; i++)
  {
    let cookie = cookievalue[i];
    while (cookie.charAt(0) == ' ')
    {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(id) == 0)
    {
      return cookie.substring(id.length, cookie.length);
    }
  }
  return "";
}