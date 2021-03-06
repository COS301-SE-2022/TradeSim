

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
                 document.getElementById("loading").innerHTML += "<a id='load" + i + "'>" + jd.Data[i].ETFName + " LOADING... <br></a>"
             }

             for(var i = 0; i < numofetfs; i++)
             {

                 document.getElementById("table1").innerHTML += "<tr id='row" + i + "'></tr>"
                 document.getElementById("row" + i).innerHTML += "<th>" +
                     '<div id="' + i + '" style="width:100%;max-width:900px"></div>' +
                     "</th></tr>"
                    getGraph(jd.Data[i].ETFName, userID, jd.Data[i].ETFID, jd.Data[i].Rules, jd.Data[i].Amount, jd.Data[i].Date, i)


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

function getGraph(name, uID, etfid, rules, amount, date, chartnum)
{

    var xA = [];
    var yA = [];

    const details2=
    {

        "UserID" : uID,
        "ETFid" :  etfid,
        "Rules" :  rules,
        "date" : date,
        "amount" : amount

    }

    console.log(JSON.stringify(details2));
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

         var prevy = 0
         for(key in data.Values)
         {
             if(data.Values[key] > prevy/10)
             {
                xA.push(key)
                yA.push(data.Values[key])
                 prevy = data.Values[key]
             }

         }
         console.log(xA)
         console.log(yA)

          var data = [{
          x: xA,
          y: yA,
          mode:"lines"
         }];

        var layout =
        {
          xaxis: {title: "date"},
          yaxis: {title: "price in dollars"},
          title: name
        };

        Plotly.newPlot(String(chartnum), data, layout);
        document.getElementById("load" + chartnum).innerHTML = ""
        return
     }).catch((error) => {

        document.getElementById("load" + chartnum).innerHTML = name + " could not generate ETF<br>"
        //alert( "ETF " + name + " does not generate any stocks!")
    });


}
