var graphName;
var obj;

function searchTicker() {
    const loaderDiv = document.getElementById('loader');
    loaderDiv.classList.add('show');
    var tick = document.getElementById('tickerInput').value;
    tick = tick.toUpperCase();
    console.log(tick);
    //getCompanyInformation(tick)
    const details =
        {
            "ticker": tick
        }
    fetch("http://ec2-18-208-221-145.compute-1.amazonaws.com:6969/tickerInfo",
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
            graphName = data['Company Name']
            console.log("name of Graph", graphName);
            obj = data.PriceHistory;
            console.log("Price History", obj);
            const loaderDiv = document.getElementById('loader');
            loaderDiv.classList.remove('show');
            var showTable = document.getElementById("results");
            if (!showTable.classList.contains('show')){
                showTable.classList.add('show');
            }
            if (data.Ticker != null) {
                document.getElementById("card-title").innerHTML = `<div class="row"><div class="col-8">${data.Ticker}:${data['Company Name']}</div><div class="col-4"><img src=${data.Logo} height="100%" width="100%"></div></div>`;
                console.log(data['Company Name']);
                document.getElementById("response").innerHTML = `<table><tbody><tr><td><b>Industry: </b>${data.Industry}</td></tr><tr><td>${data.Summary}</td></tr></tbody></table>`;
                getGraph(graphName, obj);
            } else {
                document.getElementById("card-title").innerHTML = `Ticker: "${tick}" does not exist.`;
                document.getElementById("notes").innerHTML = '';
                document.getElementById("response").innerHTML = `<table><tbody><tr><td>Company with ticker name: <b>${tick}</b> not found. Did you mean: <b>${data.PossibleStock}</b>?</td></tr></tbody></table>`;
            }
        });
}

function getGraph(name, obj) {

    var xA = [];
    var yA = [];
    for (let key in obj) {
        xA.push(key)
        yA.push(obj[key])
        // console.log(key + " -> " + obj[key]);
    }
    // console.log("xA", xA)
    // console.log("yA", yA)


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
    console.log("Drawing Graph")
    Plotly.newPlot("notes", data2, layout);

}
