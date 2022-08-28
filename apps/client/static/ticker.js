function searchTicker() {
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
        "ticker" : tick
    }
    fetch("http://127.0.0.1:6969/tickerInfo",
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
             console.log("data",data)
                 if (data.Ticker != null)
                    document.getElementById("response").innerHTML += `<tr><td>${data['Company Name']}</td><td>${data.Ticker}</td><td>${data.Sector}</td><td>${data.Summary}</td></tr>`;
                 else
                     document.getElementById("response").innerHTML += `<tr><td>Company with ticker name: <b>${tick}</b> not found. Did you mean: <b>${data.PossibleStock}</b>?</td></tr>`;
             });
}