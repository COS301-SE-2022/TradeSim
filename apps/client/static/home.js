function getETFS()
{
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

             document.getElementById("etfs").innerHTML += "<table id='table1'>"

             for(var i = 0; i < numofetfs; i++)
             {
                 if(i % 2 == 0)
                 {
                     document.getElementById("table1").innerHTML += "<tr id='row" + i / 2 +"'></tr>"
                     document.getElementById("row" + i / 2).innerHTML += "<th>" +
                         jd.Data[i].ETFName + getGraph(userID, jd.Data[i].ETFID, jd.Data[i].Rules, jd.Data[i].Amount, jd.Data[i].Date) +
                         "</th>"
                 }
                 else
                 {
                    document.getElementById("row" + (i -1) /2).innerHTML += "<th>" +
                        jd.Data[i].ETFName + getGraph(userID, jd.Data[i].ETFID, jd.Data[i].Rules, jd.Data[i].Amount, jd.Data[i].Date) +
                        "</th>"
                 }

             }

             document.getElementById("etfs").innerHTML += "</table>"


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

function getGraph(uID, etfid, rules, amount, date)
{

    const details2=
    {
        // "UserID" : '"' + uID + '"',
        // "ETFid" : '"' + etfid + '"',
        // "Rules" : '"' + rules + '"',
        // "date" : '"' + date + '"',
        // "amount" : '"' + amount + '"'

        "UserID" : uID,
        "ETFid" :  etfid,
        "Rules" :  rules,
        "date" : date,
        "amount" : amount

    }

    // console.log(JSON.stringify(details2));
    fetch("http://127.0.0.1:6969/createRules",
{
    method: 'POST',
    headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
    },
    // Strigify the payload into JSON:
    body:JSON.stringify(details2)}
     ).then(response=> response.json())
         .then(data =>{
         console.log(data)
         // const jd = JSON.parse(data)
         // console.log(jd)
     });
}
