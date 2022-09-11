var graphName;
var obj;

function searchTicker() {
    const loaderDiv = document.getElementById('loader');
    loaderDiv.classList.add('show');
    var showTable = document.getElementById("results");
    if (showTable.style.display === "none") {
        showTable.style.display = "block";
    }
    var tick = document.getElementById('tickerInput').value;
    tick = tick.toUpperCase();
    console.log(tick);
    //getCompanyInformation(tick)
    const details =
        {
            "ticker": tick
        }
    fetch("http://127.0.0.1:6969/tickerInfo",
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
            if (data.Ticker != null) {
                document.getElementById("response").innerHTML = `<tr><td>${data['Company Name']}</td><td>${data.Ticker}</td><td>${data.Sector}</td><td>${data.Summary}</td></tr>`;
                getGraph(graphName, obj);
            } else {
                document.getElementById("response").innerHTML = `<tr><td>Company with ticker name: <b>${tick}</b> not found. Did you mean: <b>${data.PossibleStock}</b>?</td></tr>`;
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