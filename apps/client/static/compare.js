var graphCount = 0;

function checkCookie(name='UserIDAI') {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (!match) {
        window.location.href = "/login";
    }
}

window.onpaint = checkCookie();

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems);
  });

function logout() {
    document.cookie = "UserIDAI=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    window.location.href = "/login"
}

function getETFS() {
    var userID = getUserID()

    const details =
        {
            "Data": [userID]
        }


    fetch("http://ec2-54-82-241-49.compute-1.amazonaws.com:6969/getETFS",
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
            // const mainCompare = document.getElementById('main-compare');
            // mainCompare.classList.add('show');
            const jd = JSON.parse(data)
            if (jd.status == "failure") {
                console.log(jd.error);
                //document.getElementById("etfbody").innerHTML = jd.error
            } else {
                let numofetfs = jd.Data.length;

                for (var i = 0; i < numofetfs; i++) {
                    document.getElementById("etf1").innerHTML +=
                        "<option value=" + "'" + JSON.stringify(jd.Data[i]) + "'" + ">" + jd.Data[i].ETFName + "</option>"
                    // console.log(test)

                    document.getElementById("etf2").innerHTML +=
                        "<option value=" + "'" + JSON.stringify(jd.Data[i]) + "'" + ">" + jd.Data[i].ETFName + "</option>"
                }

            }


        });
}

function getUserID() {
    let id = "UserIDAI=";
    let decCookie = decodeURIComponent(document.cookie);
    let cookievalue = decCookie.split(';');
    for (let i = 0; i < cookievalue.length; i++) {
        let cookie = cookievalue[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(id) == 0) {
            return cookie.substring(id.length, cookie.length);
        }
    }
    return "";
}

async function confirm(chartnum) {

    info = JSON.parse(document.getElementById("etf" + chartnum).value)

    date = document.getElementById("selectdate").value;

    console.log(info)
    console.log(date)

    if (date == '') {
        date = "2022-01-01"
    }
    //document.getElementById("notes" + chartnum).innerHTML = "LOADING... <br>"
    getGraph(info.ETFName, getUserID(), info.ETFID, info.Rules, info.Amount, date, chartnum)


}

function getGraph(name, uID, etfid, rules, amount, date, chartnum) {

    // document.getElementById("notes" + chartnum).innerHTML = name + " Loading<br>"

    var xA = [];
    var yA = [];

    const details2 =
        {

            "UserID": uID,
            "ETFid": etfid,
            "Rules": rules,
            "date": date,
            "amount": amount

        }

    console.log(JSON.stringify(details2));
    fetch("http://ec2-54-82-241-49.compute-1.amazonaws.com:6969/createRules",
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            // Strigify the payload into JSON:
            body: JSON.stringify(details2)
        }
    ).then(response => response.json())
        .then(data => {

            console.log(data)


            var prevy = 0
            for (key in data.Values) {
                if (data.Values[key] > prevy / 1.5) {
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
                mode: "lines"
            }];

            var layout =
                {
                    xaxis: {title: "Date"},
                    yaxis: {title: "Price in Dollars [$]"},
                    title: name
                };

            Plotly.newPlot("chart" + String(chartnum), data2, layout);
            graphCount++;
            console.log("GraphCount: ", graphCount);
            if (graphCount == 2) {
                const loaderDiv = document.getElementById('loader-compare');
                loaderDiv.classList.remove('show');

                const showTbl1 = document.getElementById('tblnotes1');
                showTbl1.classList.add('tblComp');

                const showTbl2 = document.getElementById('tblnotes2');
                showTbl2.classList.add('tblComp');
            }


            var i = 1;
            for (key in data.Stocks) {
                var stockArr = data.Stocks[key];
                // console.log("SArr: ", stockArr);
                var stocks = "";
                var test = "";
                var arr = new Array();
                for (const x in data.Stocks) {
                    arr = data.Stocks[x];
                    // for (const key in arr) {
                    // console.log(`${key}: ${arr[key]}`);
                    // console.log("x: ",x,"arr:",arr,"data:",data);
                    console.log("KEY v2: ", x);
                    // document.getElementById(x).innerHTML += `<tr><td>${x}</td><td>${arr[x]}</td></tr> `;
                    // }
                }
                document.getElementById("notes" + chartnum).innerHTML = `<li><div class="collapsible-header"><i class="material-icons">date_range</i>Cash Overflow on ${key}: $${(data.CashOverFlow[key]).toFixed(2)}</div><div class="collapsible-body"><table class="striped"><thead><tr><th>Ticker</th><th>Amount</th></tr></thead><tbody id="${key+data.CashOverFlow[key]}"></tbody></table></div></li>`;
                for (const works in stockArr){
                    document.getElementById(key+data.CashOverFlow[key]).innerHTML += `<tr><td>${works}</td><td>${stockArr[works]}</td></tr> `;
                }

                if (i % 5 == 0) {
                    // document.getElementById("notes" + chartnum).innerHTML += '<br>'
                    i = 1;
                } else {
                    i++
                }
                console.log(i)


            }


            // document.getElementById("notes" + chartnum).innerHTML = ""
        }).catch((error) => {
        console.log("Error Notes: ", error);
        document.getElementById("notes" + chartnum).innerHTML = name + " could not generate ETF<br>"
        // alert( "ETF " + name + " does not generate any stocks!")
    });


}

function changedate() {
    const loaderDiv = document.getElementById('loader-compare');
    loaderDiv.classList.add('show');
    // const graphDiv = document.getElementById('graph-table');
    // graphDiv.classList.add('show');
    console.log("SHARE: ", loaderDiv);
    confirm(1)
    confirm(2)
}

