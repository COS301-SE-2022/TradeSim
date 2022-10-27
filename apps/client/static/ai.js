document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems);
  });

function checkCookie(name='UserIDAI') {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (!match) {
        window.location.href = "/login";
    }
}

window.onpaint = checkCookie();

function logout() {
    document.cookie = "UserIDAI=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    window.location.href = "/login"
}

function getwow()
{
        var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems);
    const mainLoad = document.getElementById('loaderAI');
    mainLoad.classList.add('show');
    var date = document.getElementById("options").value

    const details =
        {
            "date": date,
            "seedValue": "81"
        }


    fetch("http://ec2-54-82-241-49.compute-1.amazonaws.com:6969/AI",
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



            prevy = 0
            var xA = [];
            var yA = [];

            year = date.slice(0, 4);

            for (key in data.Values) {
                if (data.Values[key] > prevy / 1.5) {
                    xA.push(key)
                    yA.push(data.Values[key])
                    prevy = data.Values[key]
                }

            }



            var data2 = [{
                x: xA,
                y: yA,
                mode: "lines"
            }];

            var layout =
                {
                    xaxis: {title: "date"},
                    yaxis: {title: "price in dollars"},
                    title: year
                };

            chart = document.getElementById("chart")
            Plotly.newPlot(chart, data2, layout);

            document.getElementById("stocklist").innerHTML = `<li><div class="collapsible-header"><i class="material-icons">show_chart</i>Stocks</div><div class="collapsible-body"><table class="striped"><thead><tr><th>Ticker</th><th>Amount</th></tr></thead><tbody id="stock-var"></tbody></table></div></li>`;
            for (key in data.Stocks)
            {
                document.getElementById("stock-var").innerHTML += `<tr><td>${key}</td><td>${data.Stocks[key]}</td></tr>`;
            }

            var amt = 0;

            document.getElementById("ruleslists").innerHTML = `<li><div class="collapsible-header"><i class="material-icons">format_list_numbered</i>Rules</div><div class="collapsible-body"><table class="striped"><thead><tr><th>Rule</th></tr></thead><tbody id="ruleslist"></tbody></table></div></li>`;
            const mainContent1 = document.getElementById('loaderAI');
            mainContent1.classList.remove('show');

            const mainContent2 = document.getElementById('ruleslists');
            mainContent2.classList.add('show');

            const mainContent3 = document.getElementById('stocklist');
            mainContent3.classList.add('show');

            for (var j = 0; j < data.Rules.length; j++) {
                if (data.Rules[j][0] == "000") {
                    document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Company by Ticker: " + data.Rules[j][1] + "</td></tr>"
                } else if (data.Rules[j][0] == "001") {
                    if (data.Rules[j][1] == "100") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Sector by Name: Industrials</td></tr>"
                    } else if (data.Rules[j][1] == "101") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Sector by Name: Technology</td></tr>"
                    } else if (data.Rules[j][1] == "102") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Sector by Name: Consumer Defensive</td></tr>"
                    } else if (data.Rules[j][1] == "103") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Sector by Name: Consumer Cyclical</td></tr>"
                    } else if (data.Rules[j][1] == "104") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Sector by Name: Financial Services</td></tr>"
                    } else if (data.Rules[j][1] == "105") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Sector by Name: Utilities</td></tr>"
                    } else if (data.Rules[j][1] == "106") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Sector by Name: Healthcare</td></tr>"
                    } else if (data.Rules[j][1] == "107") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Sector by Name: Energy</td></tr>"
                    } else if (data.Rules[j][1] == "108") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Sector by Name: Business Services</td></tr>"
                    } else if (data.Rules[j][1] == "109") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Sector by Name: Real Estate</td></tr>"
                    } else if (data.Rules[j][1] == "110") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Sector by Name: Basic Materials</td></tr>"
                    } else if (data.Rules[j][1] == "111") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Sector by Name: Other</td></tr>"
                    }

                } else if (data.Rules[j][0] == "002") {
                    if (data.Rules[j][1] == "100001") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Industrial Products</td></tr>"
                    } else if (data.Rules[j][1] == "100002") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Business Services</td></tr>"
                    } else if (data.Rules[j][1] == "100003") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Engineering & Construction</td></tr>"
                    } else if (data.Rules[j][1] == "100004") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Waste Management</td></tr>"
                    } else if (data.Rules[j][1] == "100005") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Industrial Distribution</td></tr>"
                    } else if (data.Rules[j][1] == "100006") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Airlines</td></tr>"
                    } else if (data.Rules[j][1] == "100007") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Consulting & Outsourcing</td></tr>"
                    } else if (data.Rules[j][1] == "100008") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Aerospace & Defense</td></tr>"
                    } else if (data.Rules[j][1] == "100009") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Farm & Construction Machinery</td></tr>"
                    } else if (data.Rules[j][1] == "100010") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Transportation & Logistics</td></tr>"
                    } else if (data.Rules[j][1] == "100011") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Employment Services</td></tr>"
                    } else if (data.Rules[j][1] == "100012") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Truck Manufacturing</td></tr>"
                    } else if (data.Rules[j][1] == "100013") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Conglomerates</td></tr>"
                    } else if (data.Rules[j][1] == "101001") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Computer Hardware</td></tr>"
                    } else if (data.Rules[j][1] == "101002") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Online Media</td></tr>"
                    } else if (data.Rules[j][1] == "101003") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Application Software</td></tr>"
                    } else if (data.Rules[j][1] == "101004") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Semiconductors</td></tr>"
                    } else if (data.Rules[j][1] == "101005") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Communication Equipment</td></tr>"
                    } else if (data.Rules[j][1] == "102001") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Retail - Defensive</td></tr>"
                    } else if (data.Rules[j][1] == "102002") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Consumer Packaged Goods</td></tr>"
                    } else if (data.Rules[j][1] == "102003") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Tobacco Products</td></tr>"
                    } else if (data.Rules[j][1] == "102004") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Beverages - Alcoholic</td></tr>"
                    } else if (data.Rules[j][1] == "102005") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Beverages - Non-Alcoholic</td></tr>"
                    } else if (data.Rules[j][1] == "102006") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Education</td></tr>"
                    } else if (data.Rules[j][1] == "103001") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Entertainment</td></tr>"
                    } else if (data.Rules[j][1] == "103002") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Retail - Apparel & Specialty</td></tr>"
                    } else if (data.Rules[j][1] == "103003") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Restaurants</td></tr>"
                    } else if (data.Rules[j][1] == "103004") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Manufacturing - Apparel & Furniture</td></tr>"
                    } else if (data.Rules[j][1] == "103005") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Autos</td></tr>"
                    } else if (data.Rules[j][1] == "103011") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Advertising & Marketing Services</td></tr>"
                    } else if (data.Rules[j][1] == "103013") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Homebuilding & Construction</td></tr>"
                    } else if (data.Rules[j][1] == "103015") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Travel & Leisure</td></tr>"
                    } else if (data.Rules[j][1] == "103018") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Packaging & Containers</td></tr>"
                    } else if (data.Rules[j][1] == "103020") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Personal Services</td></tr>"
                    } else if (data.Rules[j][1] == "103026") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Publishing</td></tr>"
                    } else if (data.Rules[j][1] == "104001") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Asset Management</td></tr>"
                    } else if (data.Rules[j][1] == "104002") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Banks</td></tr>"
                    } else if (data.Rules[j][1] == "104003") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Brokers+ Exchanges & Other</td></tr>"
                    } else if (data.Rules[j][1] == "104004") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Insurance - Life</td></tr>"
                    } else if (data.Rules[j][1] == "104005") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Insurance</td></tr>"
                    } else if (data.Rules[j][1] == "104006") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Insurance - Property & Casualty</td></tr>"
                    } else if (data.Rules[j][1] == "104007") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Credit Services</td></tr>"
                    } else if (data.Rules[j][1] == "104013") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Insurance - Specialty</td></tr>"
                    } else if (data.Rules[j][1] == "105001") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Utilities - Regulated</td></tr>"
                    } else if (data.Rules[j][1] == "105002") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Utilities - Independent Power Producers</td></tr>"
                    } else if (data.Rules[j][1] == "106001") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Medical Diagnostics & Research</td></tr>"
                    } else if (data.Rules[j][1] == "106002") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Biotechnology</td></tr>"
                    } else if (data.Rules[j][1] == "106003") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Medical Instruments & Equipment</td></tr>"
                    } else if (data.Rules[j][1] == "106004") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Medical Devices</td></tr>"
                    } else if (data.Rules[j][1] == "106005") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Drug Manufacturers</td></tr>"
                    } else if (data.Rules[j][1] == "106006") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Health Care Plans</td></tr>"
                    } else if (data.Rules[j][1] == "106011") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Health Care Providers</td></tr>"
                    } else if (data.Rules[j][1] == "106014") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Medical Distribution</td></tr>"
                    } else if (data.Rules[j][1] == "107001") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Oil & Gas - Refining & Marketing</td></tr>"
                    } else if (data.Rules[j][1] == "107002") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Oil & Gas - E&P</td></tr>"
                    } else if (data.Rules[j][1] == "107003") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Oil & Gas - Midstream</td></tr>"
                    } else if (data.Rules[j][1] == "107004") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Oil & Gas - Services</td></tr>"
                    } else if (data.Rules[j][1] == "107005") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Oil & Gas - Integrated</td></tr>"
                    } else if (data.Rules[j][1] == "107006") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Oil & Gas - Drilling</td></tr>"
                    } else if (data.Rules[j][1] == "107007") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Alternative Energy Sources & Other</td></tr>"
                    } else if (data.Rules[j][1] == "108001") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Communication Services</td></tr>"
                    } else if (data.Rules[j][1] == "108002") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Consulting</td></tr>"
                    } else if (data.Rules[j][1] == "108003") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: HR & Staffing</td></tr>"
                    } else if (data.Rules[j][1] == "108004") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Business Other</td></tr>"
                    } else if (data.Rules[j][1] == "109001") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: REITs</td></tr>"
                    } else if (data.Rules[j][1] == "109002") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Real Estate Services</td></tr>"
                    } else if (data.Rules[j][1] == "110001") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Chemicals</td></tr>"
                    } else if (data.Rules[j][1] == "110002") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Forest Products</td></tr>"
                    } else if (data.Rules[j][1] == "110003") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Agriculture</td></tr>"
                    } else if (data.Rules[j][1] == "110004") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Metals & Mining</td></tr>"
                    } else if (data.Rules[j][1] == "110005") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Building Materials</td></tr>"
                    } else if (data.Rules[j][1] == "110006") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Coal</td></tr>"
                    } else if (data.Rules[j][1] == "110007") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Steel</td></tr>"
                    } else if (data.Rules[j][1] == "111001") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject Industry by Name: Diversified Holdings</td></tr>"
                    }


                } else if (data.Rules[j][0] == "003") {
                    if (data.Rules[j][1] == "AS") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: NYSE EURONEXT - EURONEXT AMSTERDAM</td></tr>"
                    } else if (data.Rules[j][1] == "AT") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: ATHENS EXCHANGE S.A. CASH MARKET</td></tr>"
                    } else if (data.Rules[j][1] == "AX") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: ASX - ALL MARKETS</td></tr>"
                    } else if (data.Rules[j][1] == "BA") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: BOLSA DE COMERCIO DE BUENOS AIRES</td></tr>"
                    } else if (data.Rules[j][1] == "BC") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: BOLSA DE VALORES DE COLOMBIA\n</td></tr>"
                    } else if (data.Rules[j][1] == "BD") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: BUDAPEST STOCK EXCHANGE\n</td></tr>"
                    } else if (data.Rules[j][1] == "BE") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: BOERSE BERLIN</td></tr>"
                    } else if (data.Rules[j][1] == "BK") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: STOCK EXCHANGE OF THAILAND</td></tr>"
                    } else if (data.Rules[j][1] == "BO") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: BSE LTD</td></tr>"
                    } else if (data.Rules[j][1] == "BR") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: NYSE EURONEXT - EURONEXT BRUSSELS</td></tr>"
                    } else if (data.Rules[j][1] == "CA") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: Egyptian Stock Exchange</td></tr>"
                    } else if (data.Rules[j][1] == "CN") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: CANADIAN NATIONAL STOCK EXCHANGE</td></tr>"
                    } else if (data.Rules[j][1] == "CO") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: OMX NORDIC EXCHANGE COPENHAGEN A/S</td></tr>"
                    } else if (data.Rules[j][1] == "CR") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: CARACAS STOCK EXCHANGE</td></tr>"
                    } else if (data.Rules[j][1] == "DB") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: DUBAI FINANCIAL MARKET</td></tr>"
                    } else if (data.Rules[j][1] == "DE") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: XETRA</td></tr>"
                    } else if (data.Rules[j][1] == "DU") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: BOERSE DUESSELDORF</td></tr>"
                    } else if (data.Rules[j][1] == "F") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: DEUTSCHE BOERSE AG</td></tr>"
                    } else if (data.Rules[j][1] == "HE") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: NASDAQ OMX HELSINKI LTD</td></tr>"
                    } else if (data.Rules[j][1] == "HK") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: HONG KONG EXCHANGES AND CLEARING LTD</td></tr>"
                    } else if (data.Rules[j][1] == "HM") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: HANSEATISCHE WERTPAPIERBOERSE HAMBURG</td></tr>"
                    } else if (data.Rules[j][1] == "IC") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: NASDAQ OMX ICELAND</td></tr>"
                    } else if (data.Rules[j][1] == "IR") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: IRISH STOCK EXCHANGE - ALL MARKET</td></tr>"
                    } else if (data.Rules[j][1] == "IS") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: BORSA ISTANBUL</td></tr>"
                    } else if (data.Rules[j][1] == "JK") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: INDONESIA STOCK EXCHANGE</td></tr>"
                    } else if (data.Rules[j][1] == "JO") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: JOHANNESBURG STOCK EXCHANGE</td></tr>"
                    } else if (data.Rules[j][1] == "KL") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: BURSA MALAYSIA</td></tr>"
                    } else if (data.Rules[j][1] == "KQ") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: KOREA EXCHANGE (KOSDAQ)</td></tr>"
                    } else if (data.Rules[j][1] == "KS") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: KOREA EXCHANGE (STOCK MARKET)</td></tr>"
                    } else if (data.Rules[j][1] == "L") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: LONDON STOCK EXCHANGE</td></tr>"
                    } else if (data.Rules[j][1] == "LN") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: Euronext London</td></tr>"
                    } else if (data.Rules[j][1] == "LS") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: NYSE EURONEXT - EURONEXT LISBON</td></tr>"
                    } else if (data.Rules[j][1] == "MC") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: BOLSA DE MADRID</td></tr>"
                    } else if (data.Rules[j][1] == "ME") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: MOSCOW EXCHANGE</td></tr>"
                    } else if (data.Rules[j][1] == "MI") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: Italian Stock Exchange</td></tr>"
                    } else if (data.Rules[j][1] == "MU") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: BOERSE MUENCHEN</td></tr>"
                    } else if (data.Rules[j][1] == "MX") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: BOLSA MEXICANA DE VALORES (MEXICAN STOCK EXCHANGE)</td></tr>"
                    } else if (data.Rules[j][1] == "NE") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: AEQUITAS NEO EXCHANGE</td></tr>"
                    } else if (data.Rules[j][1] == "NL") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: Nigerian Stock Exchange</td></tr>"
                    } else if (data.Rules[j][1] == "NS") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: NATIONAL STOCK EXCHANGE OF INDIA</td></tr>"
                    } else if (data.Rules[j][1] == "NZ") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: NEW ZEALAND EXCHANGE LTD</td></tr>"
                    } else if (data.Rules[j][1] == "OL") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: OSLO BORS ASA</td></tr>"
                    } else if (data.Rules[j][1] == "PA") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: NYSE EURONEXT - MARCHE LIBRE PARIS</td></tr>"
                    } else if (data.Rules[j][1] == "PM") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: Philippine Stock Exchange</td></tr>"
                    } else if (data.Rules[j][1] == "PR") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: PRAGUE STOCK EXCHANGE</td></tr>"
                    } else if (data.Rules[j][1] == "QA") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: QATAR EXCHANGE</td></tr>"
                    } else if (data.Rules[j][1] == "RG") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: NASDAQ OMX RIGA</td></tr>"
                    } else if (data.Rules[j][1] == "SA") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: Brazil Bolsa - Sao Paolo</td></tr>"
                    } else if (data.Rules[j][1] == "SG") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: BOERSE STUTTGART</td></tr>"
                    } else if (data.Rules[j][1] == "SI") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: SINGAPORE EXCHANGE</td></tr>"
                    } else if (data.Rules[j][1] == "SN") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: SANTIAGO STOCK EXCHANGE</td></tr>"
                    } else if (data.Rules[j][1] == "SR") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: SAUDI STOCK EXCHANGE</td></tr>"
                    } else if (data.Rules[j][1] == "SS") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: SHANGHAI STOCK EXCHANGE</td></tr>"
                    } else if (data.Rules[j][1] == "ST") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: NASDAQ OMX NORDIC STOCKHOLM</td></tr>"
                    } else if (data.Rules[j][1] == "SW") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: SWISS EXCHANGE</td></tr>"
                    } else if (data.Rules[j][1] == "SZ") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: SHENZHEN STOCK EXCHANGE</td></tr>"
                    } else if (data.Rules[j][1] == "T") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: TOKYO STOCK EXCHANGE-TOKYO PRO MARKET</td></tr>"
                    } else if (data.Rules[j][1] == "TA") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: TEL AVIV STOCK EXCHANGE</td></tr>"
                    } else if (data.Rules[j][1] == "TL") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: NASDAQ OMX TALLINN</td></tr>"
                    } else if (data.Rules[j][1] == "TO") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: TORONTO STOCK EXCHANGE</td></tr>"
                    } else if (data.Rules[j][1] == "TW") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: TAIWAN STOCK EXCHANGE</td></tr>"
                    } else if (data.Rules[j][1] == "TWO") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: TPEx</td></tr>"
                    } else if (data.Rules[j][1] == "US") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: US exchanges (NYSE, Nasdaq)</td></tr>"
                    } else if (data.Rules[j][1] == "V") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: TSX VENTURE EXCHANGE - NEX</td></tr>"
                    } else if (data.Rules[j][1] == "VI") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: Vienna Stock Exchange</td></tr>"
                    } else if (data.Rules[j][1] == "VN") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: Vietnam exchanges including HOSE, HNX and UPCOM</td></tr>"
                    } else if (data.Rules[j][1] == "VS") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: NASDAQ OMX VILNIUS</td></tr>"
                    } else if (data.Rules[j][1] == "WA") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: WARSAW STOCK EXCHANGE/EQUITIES/MAIN MARKET</td></tr>"
                    } else if (data.Rules[j][1] == "HA") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: Hanover Stock Exchange</td></tr>"
                    } else if (data.Rules[j][1] == "SX") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: DEUTSCHE BOERSE Stoxx</td></tr>"
                    } else if (data.Rules[j][1] == "TG") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: DEUTSCHE BOERSE TradeGate</td></tr>"
                    } else if (data.Rules[j][1] == "SC") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Reject companies based in: BOERSE_FRANKFURT_ZERTIFIKATE</td></tr>"
                    }


                } else if (data.Rules[j][0] == "011") {
                    document.getElementById("ruleslist").innerHTML += "<tr><td>Set Market Cap Min and Max:" + data.Rules[j][1] + "</td></tr>"
                } else if (data.Rules[j][0] == "012") {
                    document.getElementById("ruleslist").innerHTML += "<tr><td>Set Earnings Min and Max:" + data.Rules[j][1] + "</td></tr>"
                } else if (data.Rules[j][0] == "013") {
                    document.getElementById("ruleslist").innerHTML += "<tr><td>Set Stock Price Min and Max:" + data.Rules[j][1] + "</td></tr>"
                } else if (data.Rules[j][0] == "101") {
                    document.getElementById("ruleslist").innerHTML += "<tr><td>Request Company by Ticker: " + data.Rules[j][1] + "</td></tr>"
                } else if (data.Rules[j][0] == "102") {

                    if (data.Rules[j][1][0] == "100") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Sector by Name: Industrials " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "101") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Sector by Name: Technology " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "102") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Sector by Name: Consumer Defensive " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "103") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Sector by Name: Consumer Cyclical " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "104") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Sector by Name: Financial Services " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "105") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Sector by Name: Utilities " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "106") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Sector by Name: Healthcare " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "107") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Sector by Name: Energy " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "108") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Sector by Name: Business Services " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "109") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Sector by Name: Real Estate " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "110") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Sector by Name: Basic Materials " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "111") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Sector by Name: Other " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    }

                } else if (data.Rules[j][0] == "103") {

                    if (data.Rules[j][1][0] == "100001") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Industrial Products " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "100002") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Business Services " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "100003") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Engineering & Construction " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "100004") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Waste Management " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "100005") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Industrial Distribution " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "100006") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Airlines " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "100007") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Consulting & Outsourcing " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "100008") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Aerospace & Defense " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "100009") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Farm & Construction Machinery " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "100010") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Transportation & Logistics " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "100011") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Employment Services " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "100012") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Truck Manufacturing " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "100013") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Conglomerates " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "101001") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Computer Hardware " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "101002") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Online Media " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "101003") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Application Software " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "101004") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Semiconductors " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "101005") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Communication Equipment " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "102001") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Retail - Defensive " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "102002") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Consumer Packaged Goods " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "102003") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Tobacco Products " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "102004") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Beverages - Alcoholic " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "102005") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Beverages - Non-Alcoholic " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "102006") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Education " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "103001") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Entertainment " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "103002") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Retail - Apparel & Specialty " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "103003") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Restaurants " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "103004") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Manufacturing - Apparel & Furniture " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "103005") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Autos " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "103011") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Advertising & Marketing Services " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "103013") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Homebuilding & Construction " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "103015") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Travel & Leisure " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "103018") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Packaging & Containers " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "103020") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Personal Services " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "103026") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Publishing " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "104001") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Asset Management " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "104002") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Banks " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "104003") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Brokers+ Exchanges & Other " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "104004") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Insurance - Life " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "104005") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Insurance " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "104006") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Insurance - Property & Casualty " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "104007") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Credit Services " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "104013") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Insurance - Specialty " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "105001") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Utilities - Regulated " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "105002") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Utilities - Independent Power Producers " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "106001") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Medical Diagnostics & Research " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "106002") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Biotechnology " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "106003") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Medical Instruments & Equipment " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "106004") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Medical Devices " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "106005") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Drug Manufacturers " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "106006") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Health Care Plans " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "106011") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Health Care Providers " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "106014") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Medical Distribution " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "107001") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Oil & Gas - Refining & Marketing " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "107002") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Oil & Gas - E&P " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "107003") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Oil & Gas - Midstream " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "107004") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Oil & Gas - Services " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "107005") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Oil & Gas - Integrated " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "107006") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Oil & Gas - Drilling " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "107007") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Alternative Energy Sources & Other " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "108001") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Communication Services " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "108002") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Consulting " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "108003") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: HR & Staffing " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "108004") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Business Other " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "109001") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: REITs " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "109002") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Real Estate Services " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "110001") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Chemicals " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "110002") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Forest Products " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "110003") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Agriculture " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "110004") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Metals & Mining " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "110005") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Building Materials " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "110006") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Coal " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "110007") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Steel " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "111001") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request Indusrty by Name: Diversified Holdings " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    }


                } else if (data.Rules[j][0] == "104") {
                    document.getElementById("ruleslist").innerHTML += "<tr><td>Request the companies with the highest market cap:" + data.Rules[j][1] + "</td></tr>"
                } else if (data.Rules[j][0] == "105") {

                    if (data.Rules[j][1][0] == "AS") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: NYSE EURONEXT - EURONEXT AMSTERDAM " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "AT") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: ATHENS EXCHANGE S.A. CASH MARKET " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "AX") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: ASX - ALL MARKETS " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "BA") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: BOLSA DE COMERCIO DE BUENOS AIRES " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "BC") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: BOLSA DE VALORES DE COLOMBIA\n " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "BD") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: BUDAPEST STOCK EXCHANGE\n " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "BE") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: BOERSE BERLIN " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "BK") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: STOCK EXCHANGE OF THAILAND " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "BO") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: BSE LTD " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "BR") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: NYSE EURONEXT - EURONEXT BRUSSELS " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "CA") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: Egyptian Stock Exchange " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "CN") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: CANADIAN NATIONAL STOCK EXCHANGE " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "CO") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: OMX NORDIC EXCHANGE COPENHAGEN A/S " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "CR") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: CARACAS STOCK EXCHANGE " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "DB") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: DUBAI FINANCIAL MARKET " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "DE") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: XETRA " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "DU") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: BOERSE DUESSELDORF " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "F") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: DEUTSCHE BOERSE AG " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "HE") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: NASDAQ OMX HELSINKI LTD " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "HK") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: HONG KONG EXCHANGES AND CLEARING LTD " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "HM") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: HANSEATISCHE WERTPAPIERBOERSE HAMBURG " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "IC") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: NASDAQ OMX ICELAND " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "IR") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: IRISH STOCK EXCHANGE - ALL MARKET " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "IS") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: BORSA ISTANBUL " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "JK") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: INDONESIA STOCK EXCHANGE " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "JO") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: JOHANNESBURG STOCK EXCHANGE " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "KL") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: BURSA MALAYSIA " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "KQ") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: KOREA EXCHANGE (KOSDAQ) " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "KS") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: KOREA EXCHANGE (STOCK MARKET) " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "L") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: LONDON STOCK EXCHANGE " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "LN") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: Euronext London " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "LS") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: NYSE EURONEXT - EURONEXT LISBON " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "MC") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: BOLSA DE MADRID " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "ME") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: MOSCOW EXCHANGE " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "MI") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: Italian Stock Exchange " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "MU") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: BOERSE MUENCHEN " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "MX") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: BOLSA MEXICANA DE VALORES (MEXICAN STOCK EXCHANGE) " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "NE") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: AEQUITAS NEO EXCHANGE " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "NL") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: Nigerian Stock Exchange " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "NS") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: NATIONAL STOCK EXCHANGE OF INDIA " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "NZ") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: NEW ZEALAND EXCHANGE LTD " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "OL") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: OSLO BORS ASA " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "PA") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: NYSE EURONEXT - MARCHE LIBRE PARIS " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "PM") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: Philippine Stock Exchange " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "PR") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: PRAGUE STOCK EXCHANGE " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "QA") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: QATAR EXCHANGE " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "RG") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: NASDAQ OMX RIGA " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "SA") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: Brazil Bolsa - Sao Paolo " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "SG") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: BOERSE STUTTGART " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "SI") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: SINGAPORE EXCHANGE " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "SN") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: SANTIAGO STOCK EXCHANGE " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "SR") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: SAUDI STOCK EXCHANGE " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "SS") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: SHANGHAI STOCK EXCHANGE " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "ST") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: NASDAQ OMX NORDIC STOCKHOLM " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "SW") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: SWISS EXCHANGE " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "SZ") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: SHENZHEN STOCK EXCHANGE " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "T") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: TOKYO STOCK EXCHANGE-TOKYO PRO MARKET " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "TA") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: TEL AVIV STOCK EXCHANGE " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "TL") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: NASDAQ OMX TALLINN " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "TO") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: TORONTO STOCK EXCHANGE " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "TW") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: TAIWAN STOCK EXCHANGE " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "TWO") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: TPEx " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "US") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: US exchanges (NYSE, Nasdaq) " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "V") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: TSX VENTURE EXCHANGE - NEX " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "VI") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: Vienna Stock Exchange " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "VN") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: Vietnam exchanges including HOSE, HNX and UPCOM " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "VS") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: NASDAQ OMX VILNIUS " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "WA") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: WARSAW STOCK EXCHANGE/EQUITIES/MAIN MARKET " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "HA") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: Hanover Stock Exchange " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "SX") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: DEUTSCHE BOERSE Stoxx " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "TG") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: DEUTSCHE BOERSE TradeGate " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    } else if (data.Rules[j][1][0] == "SC") {
                        document.getElementById("ruleslist").innerHTML += "<tr><td>Request companies based in: BOERSE_FRANKFURT_ZERTIFIKATE " + data.Rules[j][1][1] + " " + data.Rules[j][1][2] + "</td></tr>"
                    }

                } else if (data.Rules[j][0] == "106") {
                    document.getElementById("ruleslist").innerHTML += "<tr><td>Request the companies with the highest revenue: " + data.Rules[j][1] + "</td></tr>"
                } else if (data.Rules[j][0] == "200") {
                    document.getElementById("ruleslist").innerHTML += "<tr><td>Set a balance period: " + data.Rules[j][1] + "</td></tr>"
                } else if (data.Rules[j][0] == "202") {
                    document.getElementById("ruleslist").innerHTML += "<tr><td>Set a reconsider period: " + data.Rules[j][1] + "</td></tr>"
                }

            }

        }).catch((error) => {

    });
}

