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
             //document.getElementById("etfbody").innerHTML = jd.error
         }
         else
         {
             let numofetfs = jd.Data.length;

             for(var i = 0; i < numofetfs; i++)
             {
                 document.getElementById("etf1").innerHTML +=
                     "<option value=" + "'" + JSON.stringify(jd.Data[i]) + "'" + ">" + jd.Data[i].ETFName + "</option>"
                   // console.log(test)

                 document.getElementById("etf2").innerHTML +=
                     "<option value=" + "'" + JSON.stringify(jd.Data[i]) + "'" + ">" + jd.Data[i].ETFName + "</option>"
             }

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

async function confirm(chartnum)
{

    info = JSON.parse(document.getElementById("etf" + chartnum).value)

    date = document.getElementById("selectdate").value;

    console.log(info)
    console.log(date)

    if(date == '')
    {
        date = "2022-01-01"
    }
    //document.getElementById("notes" + chartnum).innerHTML = "LOADING... <br>"
    getGraph(info.ETFName, getUserID(), info.ETFID, info.Rules, info.Amount, date, chartnum)




}

function getGraph(name, uID, etfid, rules, amount, date, chartnum)
{

    document.getElementById("notes" + chartnum).innerHTML = name + " Loading<br>"

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

          var data2 = [{
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

    Plotly.newPlot("chart" + String(chartnum), data2, layout);
    document.getElementById("notes" + chartnum).innerHTML = "Cash Overflow: " + data.CashOverFlow[details2.date] + "<br>Stocks: <br>"

     var i = 1;
     for(key in data.Stocks)
     {
         var stocks = "";
         for (x in data.Stocks[x]){
             // console.log((x));
             // console.log((data.Stocks));
             // console.log((data.Stocks[x]));
             stocks += data.Stocks[x];
         }
         console.log(stocks);
         document.getElementById("notes" + chartnum).innerHTML += key + " = " + stocks + " "

         if(i % 5 == 0)
         {
             document.getElementById("notes" + chartnum).innerHTML += '<br>'
             i = 1;
         }
         else
         {
             i++
         }
         console.log(i)


     }


    // document.getElementById("notes" + chartnum).innerHTML = ""
     }).catch((error) => {
         document.getElementById("notes" + chartnum).innerHTML = name + " could not generate ETF<br>"
      // alert( "ETF " + name + " does not generate any stocks!")
    });


}

function changedate()
{
    confirm(1)
    confirm(2)
}

