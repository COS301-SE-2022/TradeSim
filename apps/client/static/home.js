document.addEventListener('DOMContentLoaded', function () {
    var drop = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(drop, {
        coverTrigger: false,
        closeOnClick: true
    })
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems);
})
var newsBool = false;
var graphBool = false;

function getETFS() {
    const loaderDiv = document.getElementById('loader');
    loaderDiv.classList.add('show');

    var userID = getUserID();
    const details =
        {
            "Data": [userID]
        }

    fetch("http://127.0.0.1:6969/getETFS",
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
            if (jd.status == "failure") {
                console.log(jd.error);
                document.getElementById("graph-content").innerHTML = `<div class="noETF center"><div class="section"><h5 class="brand-logo">${(jd.error).toUpperCase()}</h5><a class="waves-effect waves-light btn blue" href="/addETF"><i class="material-icons left">add</i>Create New ETF</a></div></div>`;
                const mainContent1 = document.getElementById('graph-content');
                mainContent1.classList.add('show');
                graphBool = true;
                removeLoader();
            } else {
                console.log(jd);
                let numofetfs = jd.Data.length;

                document.getElementById("etfs").innerHTML += "<table id='table1'>"

                for (var i = 0; i < numofetfs; i++) {

                    document.getElementById("table1").innerHTML += "<tr id='row" + i + "'></tr>"
                    document.getElementById("row" + i).innerHTML += "<th>" +
                        '<div id="' + i + '" style="width:100%;max-width:900px"></div>' +
                        "</th></tr>"

                    //  var retrievedObject = localStorage.getItem('ETFName');
                    // alert(retrievedObject);

                    getGraph(jd.Data[i].ETFName, userID, jd.Data[i].ETFID, jd.Data[i].Rules, jd.Data[i].Amount, jd.Data[i].Date, i)


                }


                document.getElementById("etfs").innerHTML += "</table>"


            }
            getNews();

        });
}

function confirm() {
    //document.getElementById("etfs").innerHTML = '.';
    var replace = document.getElementById("etfs");
    var ddl = document.getElementById("options");
    var selectedValue = ddl.options[ddl.selectedIndex].id;
    const loaderDiv = document.getElementById('loader');
    loaderDiv.classList.add('show');
    const hideTbl = document.getElementById('tblnoteshome');
    hideTbl.classList.remove('show');

    //    info = document.getElementById("options" ) //.value
    //
    // // date = document.getElementById("selectdate").value;
    //
    //  console.log(info)
    // // console.log(date)
    //
    //
    //  //document.getElementById("notes" + chartnum).innerHTML = "LOADING... <br>"
    //  getGraph2(info.ETFName, getUserID(), info.ETFID, info.Rules, info.Amount, info.date)
    //

    var userID = getUserID();
    const details =
        {
            "Data": [userID]
        }

    fetch("http://127.0.0.1:6969/getETFS",
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
            if (jd.status == "failure") {
                console.log(jd.error);
                document.getElementById("display").innerHTML = jd.error
            } else {
                console.log(jd);
                let numofetfs = jd.Data.length;

                document.getElementById("display").innerHTML += "<table id='table1'>" //etfs

                for (var i = 0; i < numofetfs; i++) {
                    document.getElementById("row" + i).innerHTML = '';
                    if (selectedValue == jd.Data[i].ETFName) {
                        document.getElementById("table1").innerHTML += "<tr id='row" + i + "'></tr>"
                        document.getElementById("row" + i).innerHTML += "<th>" +
                            '<div id="' + i + '" style="width:100%;max-width:900px"></div>' +
                            "</th></tr>"
                        //  document.getElementById("etfs").innerHTML = '.'
                        getGraph3(jd.Data[i].ETFName, userID, jd.Data[i].ETFID, jd.Data[i].Rules, jd.Data[i].Amount, jd.Data[i].Date, i)
                    }

                }


                document.getElementById("display").innerHTML += "</table>";
                //   replace.replaceChildren();


            }

        });

}


function getETFS2() {
    var userID = getUserID()

    const details =
        {
            "Data": [userID]
        }

    fetch("http://127.0.0.1:6969/getETFS",
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
            if (jd.status == "failure") {
                console.log(jd.error);
                document.getElementById("etfs").innerHTML = `<div class="container">${jd.error}</div>`;
                const mainContent1 = document.getElementById('graph-content');
                mainContent1.classList.add('show');
            } else {
                console.log(jd);
                let numofetfs = jd.Data.length;

                for (var i = 0; i < numofetfs; i++) {
                    document.getElementById("options").innerHTML +=
                        "<option value=" + '"' + jd.Data[i].ETFID + '"' + " id=" + '"' + jd.Data[i].ETFName + '"' + ">" + jd.Data[i].ETFName + "</option>"
                }


            }


        });
}

function getGraph(name, uID, etfid, rules, amount, date, chartnum) {

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
    fetch("http://127.0.0.1:6969/createRules",
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
                if (data.Values[key] > prevy / 10) {
                    xA.push(key)
                    yA.push(data.Values[key])
                    prevy = data.Values[key]
                }

            }
            console.log(xA)
            console.log(yA)
            graphBool = true;
            removeLoader()
            const mainContent1 = document.getElementById('graph-content');
            mainContent1.classList.add('show');
            var data = [{
                x: xA,
                y: yA,
                mode: "lines"
            }];

            var layout =
                {
                    xaxis: {title: "date"},
                    yaxis: {title: "price in dollars"},
                    title: `${name}` // href="/ETFinfo"
                };


            Plotly.newPlot(String(chartnum), data, layout);
            // ****  document.getElementById("load" + chartnum).innerHTML = ""
            return
        }).catch((error) => {

        document.getElementById("load" + chartnum).innerHTML = name + " could not generate ETF<br>"
        //alert( "ETF " + name + " does not generate any stocks!")
    });


}

function removeLoader() {
    console.log("NB: ", newsBool, "GB: ", graphBool)
    if (newsBool && graphBool) {
        const loaderDiv = document.getElementById('loader');
        loaderDiv.classList.remove('show');
    }
}

function getNews(value) {
    value = value || "";

    console.log("cat", value)
    if (value != "") {
        details =
            {
                "category": `${value}`
            }
        console.log("category", value)
    } else {
        details =
            {
                "category": "crypto"
            }
        console.log("category", value)
    }

    fetch("http://127.0.0.1:6969/news",
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
            console.log("data", data)
            //date: "2022-09-06"
            // headline
            // "Energy Trade Risks Collapsing Over Margin Calls of $1.5 Trillion"
            // image
            // "https://data.bloomberglp.com/company/sites/2/2019/01/logobbg-wht.png"
            // source
            // "Bloomberg"
            // summary
            // "European energy trading risks grinding to a halt unless governments extend liquidity to cover margin calls of at least $1.5 trillion, according to Norwegian energy company Equinor ASA."
            // url
            // "https://www.bloomberg.com/news/articles/2022-09-06/energy-t
            var disp = ``;
            for (let i = 0; i < 10; i++) {
                console.log("THE DATA: " + data[i].headline);
                disp += `<li class="collection-item avatar"><div class="col-11"><img src=${data[i].image} class="circle"><span class="title">${data[i].headline}</span><p>${data[i].summary}</p></div><div class="col-1"><a href="${data[i].url}" class="secondary-content" target="_blank"><i class="material-icons">open_in_new</i></a></div></li>`;
            }

            document.getElementById("news-col").innerHTML = disp;
            const mainContent2 = document.getElementById('news-content');
            mainContent2.classList.add('show');
            newsBool = true;
            removeLoader();
        });
}


function getGraph3(name, uID, etfid, rules, amount, date, chartnum) {

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
    fetch("http://127.0.0.1:6969/createRules",
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
                if (data.Values[key] > prevy / 10) {
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
                    xaxis: {title: "date"},
                    yaxis: {title: "price in dollars"},
                    title: name
                };

            Plotly.newPlot(String(chartnum), data2, layout);
            const showTbl = document.getElementById('tblnoteshome');
            showTbl.classList.add('show');

            var i = 1;
            for (key in data.Stocks) {
                var stockArr = data.Stocks[key];
                var stocks = "";
                var test = "";
                var arr = new Array();
                for (const x in data.Stocks) {
                    arr = data.Stocks[x];
                }
                document.getElementById("compnotes").innerHTML += `<li><div class="collapsible-header"><i class="material-icons">date_range</i>Cash Overflow on ${key}: $${(data.CashOverFlow[key]).toFixed(2)}</div><div class="collapsible-body"><table class="striped"><thead><tr><th>Ticker</th><th>Amount</th></tr></thead><tbody id="${key + data.CashOverFlow[key]}"></tbody></table></div></li>`;
                for (const works in stockArr) {
                    document.getElementById(key + data.CashOverFlow[key]).innerHTML += `<tr><td>${works}</td><td>${stockArr[works]}</td></tr> `;
                }
                const hideTbl = document.getElementById('tblnoteshome');
                hideTbl.classList.add('show');
                const loaderDiv = document.getElementById('loader');
                loaderDiv.classList.remove('show');

                if (i % 5 == 0) {
                    i = 1;
                } else {
                    i++
                }
                console.log(i)
            }
        }).catch((error) => {
        console.log("Error Notes: ", error);
        document.getElementById("compnotes").innerHTML = name + " could not generate ETF<br>"
        // alert( "ETF " + name + " does not generate any stocks!")
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

