var counter = 0;
var string = "hello";
var impJSON;
var selectedValuee = "";
var exportValues = new Array();
var selEtfAmt = 0;
var eName = "";
var gloUserID = getUserID();

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems);
});

window.onload = function () {
    document.getElementById("jsonfileinput").addEventListener("change", function () {
        var file_to_read = document.getElementById("jsonfileinput").files[0];
        var fileread = new FileReader();
        fileread.onload = function (e) {
            var content = e.target.result;
            const objImport = JSON.parse(content);
            console.log(objImport);
            impJSON = objImport;
            console.log("IMP: ", impJSON);
            const details =
                {
                    "Data": [gloUserID, impJSON.Data[0].ETFName, impJSON.Data[0].Amount, impJSON.Data[0].Rules, impJSON.Data[0].Date]
                }
            console.log("Imp Dets: ", details)
            fetch("http://ec2-54-82-241-49.compute-1.amazonaws.com:6969/import",
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
                    console.log("data:", data)
                    const jd = JSON.parse(data)
                    console.log("jd: ", jd)

                });
        };
        fileread.readAsText(file_to_read);
    });
}


function validatenaa() {

    var flag = true;
    var name = document.getElementById("etfName").value;
    var amount = document.getElementById("etfAmount").value;
    var idnum = getCookie("UserIDAI")

    const details =
        {
            "Data": [idnum, name, amount]
        }

    fetch("http://ec2-54-82-241-49.compute-1.amazonaws.com:6969/createName",
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
                confirm();
                // alert(jd.error)
            } else {
                confirm();

            }


        });

}

function validatenaa2() {

    var flag = true;
    var name = document.getElementById("etfName").value;
    var amount = document.getElementById("etfAmount").value;
    var idnum = getCookie("UserIDAI")

     if((document.getElementById("etfName").value == '') || (document.getElementById("etfAmount").value == ''))
     {
          alert("Please enter a valid ETF name and amount.")
         return;
     }

         const details =
             {
                 "Data": [idnum, name, amount]
             }

         fetch("http://ec2-54-82-241-49.compute-1.amazonaws.com:6969/createName",
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
                     // confirm2();
                     alert(jd.error)
                 } else {
                     // document.getElementById("options").style.display = "none";
                         document.getElementById("btn").innerHTML = ''
                         document.getElementById("btn").innerHTML += '  <a class="waves-effect waves-light btn blue right" onclick="addRule2()" >add</a> '
                         confirm2();


                 }


             });


}

function getCookie(cookiename) {
    let name = cookiename + "=";
    let decCookie = decodeURIComponent(document.cookie);
    let cookievalue = decCookie.split(';');
    for (let i = 0; i < cookievalue.length; i++) {
        let cookie = cookievalue[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
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
            const jd = JSON.parse(data)
            if (jd.status == "failure") {
                console.log(jd.error);
                document.getElementById("etfs").innerHTML = jd.error
            } else {
                console.log(jd);
                impJSON = jd;
                let numofetfs = jd.Data.length;



                for (var i = 0; i < numofetfs; i++) {
                    document.getElementById("options").innerHTML +=
                        "<option value=" + '"' + jd.Data[i].ETFID + '"' + " id=" + '"' + jd.Data[i].ETFName + '"' + ">" + jd.Data[i].ETFName + "</option>"
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



function addRule() {


    var rule = document.getElementById("rule");


    if (document.getElementById('r1').selected == true) {
        counter++;
        rule.innerHTML =
            '<b >' + document.getElementById('r1').textContent + '</b>' + //style="color: black; position: relative; bottom: 180px; right: 10px;"
            '<div class="card2" id="etfbody" >' + //style="width:108% ; position: relative; bottom: 110px; right: 12px"
            // '<label for="etf" style=" color: white; position: relative; top: 8px; left: 10px;" id="label2"><b>Rule:</b></label>' +
            '<div class="custom-select">' + // style="display: inline-block; position: relative; top:5px; left:25px;"
            '<input id="input1" type="text" placeholder="ticker name of company" >' + //style=" width:250px; height:25px; font-size: 12px; "
            '<a class="waves-effect waves-light btn blue right" onclick="ConfirmRule(0)" >Confirm Rule</a>' +  //style="width: 50px; display: inline-block; position: relative; left: 660px; bottom: 1px;"
            '</div>' +
            '</div>'
    }

    if (document.getElementById('r2').selected == true) {
        counter++;
        rule.innerHTML = '<b>' + document.getElementById('r2').textContent + '</b>' + // style="color: black; position: relative; bottom: 180px; right: 10px;"
            '<div class="amount-input-row">' +
            '<div class="card2" id="etfbody" >' + //style="width:1125px ; position: relative; bottom: 110px; right: 12px"
            // '<label for="etf" style=" color: white; position: relative; top: 8px; left: 10px;" id="label2"><b>Rule:</b></label>' +
            '<div class="custom-select">' + // style="width:200px; display: inline-block; position: relative; left: 32px; top: 8px;"
            '<select id="secopt">' +
            '<option disabled selected hidden value="0">Select sector by name:</option>' +
            '<option value="100" id="s1">Industrials</option>' +
            '<option value="101" id="s2">Technology</option>' +
            '<option value="102" id="s3">Consumer Defensive</option>' +
            '<option value="103" id="s4">Consumer Cyclical</option>' +
            '<option value="104" id="s5">Financial Services</option>' +
            '<option value="105" id="s6">Utilities</option>' +
            '<option value="106" id="s7">Healthcare</option>' +
            '<option value="107" id="s8">Energy</option>' +
            '<option value="108" id="s9">Business Services</option>' +
            '<option value="109" id="s10">Real Estate</option>' +
            '<option value="110" id="s11">Basic Materials</option>' +
            '<option value="111" id="s12">Other</option>' +
            '</select>' +
            '</div>' +
            '<a class="waves-effect waves-light btn blue right" onclick="ConfirmRule(1)" >Confirm Rule</a>' + // style="width: 50px; display: inline-block; position: relative; left: 730px; top: 3px;"
            '</div>' +
            '</div>'
    }

    if (document.getElementById('r3').selected == true) {
        counter++;
        rule.innerHTML = '<b >' + document.getElementById('r3').textContent + '</b>' + //style="color: black; position: relative; bottom: 180px; right: 10px;"
            '<div class="amount-input-row">' +
            '<div class="card2" id="etfbody" >' + //style="width:1125px ; position: relative; bottom:110px; right: 12px"
            // '<label for="etf" id="label2"><b>Rule:</b></label>' + // style=" color: white; position: relative; top: 8px; left: 10px;"
            '<div class="custom-select" >' + //style="width:200px; display: inline-block; position: relative; left: 32px; top: 8px;"
            '<select id="indopt">' +
            '<option disabled selected hidden value="0">Select industry by name:</option>' +
            '<option value="100001" id="i1">Industrial Products</option>' +
            '<option value="100002" id="i2">Business Services</option>' +
            '<option value="100003" id="i3">Engineering & Construction</option>' +
            '<option value="100004" id="i4">Waste Management</option>' +
            '<option value="100005" id="i5">Industrial Distribution</option>' +
            '<option value="100006" id="i6">Airlines</option>' +
            '<option value="100007" id="i7">Consulting & Outsourcing</option>' +
            '<option value="100008" id="i8">Aerospace & Defense</option>' +
            '<option value="100009" id="i9">Farm & Construction Machinery</option>' +
            '<option value="100010" id="i10">Transportation & Logistics</option>' +
            '<option value="100011" id="i11">Employment Services</option>' +
            '<option value="100012" id="i12">Truck Manufacturing</option>' +
            '<option value="100013" id="i13">Conglomerates</option>' +
            '<option value="101001" id="i14">Computer Hardware</option>' +
            '<option value="101002" id="i15">Online Media</option>' +
            '<option value="101003" id="i16">Application Software</option>' +
            '<option value="101004" id="i17">Semiconductors</option>' +
            '<option value="101005" id="i18">Communication Equipment</option>' +
            '<option value="102001" id="i19">Retail - Defensive</option>' +
            '<option value="102002" id="i20">Consumer Packaged Goods</option>' +
            '<option value="102003" id="i21">Tobacco Products</option>' +
            '<option value="102004" id="i22">Beverages - Alcoholic</option>' +
            '<option value="102005" id="i23">Beverages - Non-Alcoholic</option>' +
            '<option value="102006" id="i24">Education</option>' +
            '<option value="103001" id="i25">Entertainment</option>' +
            '<option value="103002" id="i26">Retail - Apparel & Specialty</option>' +
            '<option value="103003" id="i27">Restaurants</option>' +
            '<option value="103004" id="i28">Manufacturing - Apparel & Furniture</option>' +
            '<option value="103005" id="i29">Autos</option>' +
            '<option value="103011" id="i30">Advertising & Marketing Services</option>' +
            '<option value="103013" id="i31">Homebuilding & Construction</option>' +
            '<option value="103015" id="i32">Travel & Leisure</option>' +
            '<option value="103018" id="i33">Packaging & Containers</option>' +
            '<option value="103020" id="i34">Personal Services</option>' +
            '<option value="103026" id="i35">Publishing</option>' +
            '<option value="104001" id="i36">Asset Management</option>' +
            '<option value="104002" id="i37">Banks</option>' +
            '<option value="104003" id="i38">Brokers+ Exchanges & Other</option>' +
            '<option value="104004" id="i39">Insurance - Life</option>' +
            '<option value="104005" id="i40">Insurance</option>' +
            '<option value="104006" id="i41">Insurance - Property & Casualty</option>' +
            '<option value="104007" id="i42">Credit Services</option>' +
            '<option value="104013" id="i43">Insurance - Specialty</option>' +
            '<option value="105001" id="i44">Utilities - Regulated</option>' +
            '<option value="105002" id="i45">Utilities - Independent Power Producers</option>' +
            '<option value="106001" id="i46">Medical Diagnostics & Research</option>' +
            '<option value="106002" id="i47">Biotechnology</option>' +
            '<option value="106003" id="i48">Medical Instruments & Equipment</option>' +
            '<option value="106004" id="i49">Medical Devices</option>' +
            '<option value="106005" id="i50">Drug Manufacturers</option>' +
            '<option value="106006" id="i51">Health Care Plans</option>' +
            '<option value="106011" id="i52">Health Care Providers</option>' +
            '<option value="106014" id="i53">Medical Distribution</option>' +
            '<option value="107001" id="i54">Oil & Gas - Refining & Marketing</option>' +
            '<option value="107002" id="i55">Oil & Gas - E&P</option>' +
            '<option value="107003" id="i56">Oil & Gas - Midstream</option>' +
            '<option value="107004" id="i57">Oil & Gas - Services</option>' +
            '<option value="107005" id="i58">Oil & Gas - Integrated</option>' +
            '<option value="107006" id="i59">Oil & Gas - Drilling</option>' +
            '<option value="107007" id="i60">Alternative Energy Sources & Other</option>' +
            '<option value="108001" id="i61">Communication Services</option>' +
            '<option value="108002" id="i62">Consulting</option>' +
            '<option value="108003" id="i63">HR & Staffing</option>' +
            '<option value="108004" id="i64">Business Other</option>' +
            '<option value="109001" id="i65">REITs</option>' +
            '<option value="109002" id="i66">Real Estate Services</option>' +
            '<option value="110001" id="i67">Chemicals</option>' +
            '<option value="110002" id="i68">Forest Products</option>' +
            '<option value="110003" id="i69">Agriculture</option>' +
            '<option value="110004" id="i70">Metals & Mining</option>' +
            '<option value="110005" id="i71">Building Materials</option>' +
            '<option value="110006" id="i72">Coal</option>' +
            '<option value="110007" id="i73">Steel</option>' +
            '<option value="111001" id="i74">Diversified Holdings</option>' +
            '</select>' +
            '</div>' +
            // '<button class="create-btn" id="btn3" onclick="ConfirmRule(2)">+</button>' + // style="width: 50px; display: inline-block; position: relative; left: 730px; top: 3px;"
            '<a class="waves-effect waves-light btn blue right" onclick="ConfirmRule(2)" >Confirm Rule</a>' +
            '</div>' +
            '</div>'
    }

    if (document.getElementById('r4').selected == true) {
        counter++;
        rule.innerHTML = '<b >' + document.getElementById('r4').textContent + '</b>' + //style="color: black; position: relative; bottom: 180px; right: 10px;"
            '<div class="amount-input-row">' +
            '<div class="card2" id="etfbody">' + // style="width:1125px ; position: relative; bottom:110px; right: 12px"
            // '<label for="etf" id="label2"><b>Rule:</b></label>' + // style=" color: white; position: relative; top: 8px; left: 10px;"
            '<div class="custom-select" >' + //style="width:200px; display: inline-block; position: relative; left: 32px; top: 8px;"
            '<select id="cbropt">' +
            '<option disabled selected hidden value="0">Select a country exchange:</option>' +
            '<option value="AS" id="e1">AS: NYSE EURONEXT - EURONEXT AMSTERDAM</option>' +
            '<option value="AT" id="e2">AT: ATHENS EXCHANGE S.A. CASH MARKET</option>' +
            '<option value="AX" id="e3">AX: ASX - ALL MARKETS</option>' +
            '<option value="BA" id="e4">BA: BOLSA DE COMERCIO DE BUENOS AIRES</option>' +
            '<option value="BC" id="e5">BC: BOLSA DE VALORES DE COLOMBIA</option>' +
            '<option value="BD" id="e6">BD: BUDAPEST STOCK EXCHANGE</option>' +
            '<option value="BE" id="e7">BE: BOERSE BERLIN</option>' +
            '<option value="BK" id="e8">BK: STOCK EXCHANGE OF THAILAND</option>' +
            '<option value="BO" id="e9">BO: BSE LTD</option>' +
            '<option value="BR" id="e10">BR: NYSE EURONEXT - EURONEXT BRUSSELS</option>' +
            '<option value="CA" id="e11">CA: Egyptian Stock Exchange</option>' +
            '<option value="CN" id="e12">CN: CANADIAN NATIONAL STOCK EXCHANGE</option>' +
            '<option value="CO" id="e13">CO: OMX NORDIC EXCHANGE COPENHAGEN A/S</option>' +
            '<option value="CR" id="e14">CR: CARACAS STOCK EXCHANGE</option>' +
            '<option value="DB" id="e15">DB: DUBAI FINANCIAL MARKET</option>' +
            '<option value="DE" id="e16">DE: XETRA</option>' +
            '<option value="DU" id="e17">DU: BOERSE DUESSELDORF</option>' +
            '<option value="F" id="e18">F: DEUTSCHE BOERSE AG</option>' +
            '<option value="HE" id="e19">HE: NASDAQ OMX HELSINKI LTD</option>' +
            '<option value="HK" id="e20">HK: HONG KONG EXCHANGES AND CLEARING LTD</option>' +
            '<option value="HM" id="e21">HM: HANSEATISCHE WERTPAPIERBOERSE HAMBURG</option>' +
            '<option value="IC" id="e22">IC: NASDAQ OMX ICELAND</option>' +
            '<option value="IR" id="e23">IR: IRISH STOCK EXCHANGE - ALL MARKET</option>' +
            '<option value="IS" id="e24">IS: BORSA ISTANBUL</option>' +
            '<option value="JK" id="e25">JK: INDONESIA STOCK EXCHANGE</option>' +
            '<option value="JO" id="e26">JO: JOHANNESBURG STOCK EXCHANGE</option>' +
            '<option value="KL" id="e27">KL: BURSA MALAYSIA</option>' +
            '<option value="KQ" id="e28">KQ: KOREA EXCHANGE (KOSDAQ)</option>' +
            '<option value="KS" id="e29">KS: KOREA EXCHANGE (STOCK MARKET)</option>' +
            '<option value="L" id="e30">L: LONDON STOCK EXCHANGE</option>' +
            '<option value="LN" id="e31">LN: Euronext London</option>' +
            '<option value="LS" id="e32">LS: NYSE EURONEXT - EURONEXT LISBON</option>' +
            '<option value="MC" id="e33">MC: BOLSA DE MADRID</option>' +
            '<option value="ME" id="e34">ME: MOSCOW EXCHANGE</option>' +
            '<option value="MI" id="e35">MI: Italian Stock Exchange</option>' +
            '<option value="MU" id="e36">MU: BOERSE MUENCHEN</option>' +
            '<option value="MX" id="e37">MX: BOLSA MEXICANA DE VALORES (MEXICAN STOCK EXCHANGE)</option>' +
            '<option value="NE" id="e38">NE: AEQUITAS NEO EXCHANGE</option>' +
            '<option value="NL" id="e39">NL: Nigerian Stock Exchange</option>' +
            '<option value="NS" id="e40">NS: NATIONAL STOCK EXCHANGE OF INDIA</option>' +
            '<option value="NZ" id="e41">NZ: NEW ZEALAND EXCHANGE LTD</option>' +
            '<option value="OL" id="e42">OL: OSLO BORS ASA</option>' +
            '<option value="PA" id="e43">PA: NYSE EURONEXT - MARCHE LIBRE PARIS</option>' +
            '<option value="PM" id="e44">PM: Philippine Stock Exchange</option>' +
            '<option value="PR" id="e45">PR: PRAGUE STOCK EXCHANGE</option>' +
            '<option value="QA" id="e46">QA: QATAR EXCHANGE</option>' +
            '<option value="RG" id="e47">RG: NASDAQ OMX RIGA</option>' +
            '<option value="SA" id="e48">SA: Brazil Bolsa - Sao Paolo</option>' +
            '<option value="SG" id="e49">SG: BOERSE STUTTGART</option>' +
            '<option value="SI" id="e50">SI: SINGAPORE EXCHANGE</option>' +
            '<option value="SN" id="e51">SN: SANTIAGO STOCK EXCHANGE</option>' +
            '<option value="SR" id="e52">SR: SAUDI STOCK EXCHANGE</option>' +
            '<option value="SS" id="e53">SS: SHANGHAI STOCK EXCHANGE</option>' +
            '<option value="ST" id="e54">ST: NASDAQ OMX NORDIC STOCKHOLM</option>' +
            '<option value="SW" id="e55">SW: SWISS EXCHANGE</option>' +
            '<option value="SZ" id="e56">SZ: SHENZHEN STOCK EXCHANGE</option>' +
            '<option value="T" id="e57">T: TOKYO STOCK EXCHANGE-TOKYO PRO MARKET</option>' +
            '<option value="TA" id="e58">TA: TEL AVIV STOCK EXCHANGE</option>' +
            '<option value="TL" id="e59">TL: NASDAQ OMX TALLINN</option>' +
            '<option value="TO" id="e60">TO: TORONTO STOCK EXCHANGE</option>' +
            '<option value="TW" id="e61">TW: TAIWAN STOCK EXCHANGE</option>' +
            '<option value="TWO" id="e62">TWO: TPEx</option>' +
            '<option value="US" id="e63">US: US exchanges (NYSE, Nasdaq)</option>' +
            '<option value="V" id="e64">V: TSX VENTURE EXCHANGE - NEX</option>' +
            '<option value="VI" id="e65">VI: Vienna Stock Exchange</option>' +
            '<option value="VN" id="e66">VN: Vietnam exchanges including HOSE, HNX and UPCOM</option>' +
            '<option value="VS" id="e67">VS: NASDAQ OMX VILNIUS</option>' +
            '<option value="WA" id="e68">WA: WARSAW STOCK EXCHANGE/EQUITIES/MAIN MARKET</option>' +
            '<option value="HA" id="e69">HA: Hanover Stock Exchange</option>' +
            '<option value="SX" id="e70">SX: DEUTSCHE BOERSE Stoxx</option>' +
            '<option value="TG" id="e71">TG: DEUTSCHE BOERSE TradeGate </option>' +
            '<option value="SC" id="e72">SC: BOERSE_FRANKFURT_ZERTIFIKATE</option>' +
            '</select>' +
            '</div>' +
            // '<button class="create-btn" id="btn4"  onclick="ConfirmRule(3)">+</button>' + //style="width: 50px; display: inline-block; position: relative; left: 730px; top: 3px;"
            '<a class="waves-effect waves-light btn blue right" onclick="ConfirmRule(3)" >Confirm Rule</a>' +
            '</div>' +
            '</div>'
    }

    if (document.getElementById('r6').selected == true) {
        counter++;
        rule.innerHTML = '<b >' + document.getElementById('r6').textContent + '</b>' + //style="color: black; position: relative; bottom: 180px; right: 10px;"
            '<div class="amount-input-row">' +
            '<div class="card2" id="etfbody" >' +  //'<div class="card2" id="etfbody" >'
            // '<label for="etf" style=" color: white; position: relative; top: 8px; left: 10px;" id="label2"><b>Rule:</b></label>' +
            '<div class="custom-select" >' +
            '<input id="inputmin" type="text" placeholder="Market cap min" >' + //style=" width:350px; height:25px; font-size: 12px; "
            '<input id="inputmax"type="text" placeholder="Market cap max" >' + //style=" width:350px; height:25px; font-size: 12px; "
            // '<button class="create-btn" id="btn6"  onclick="ConfirmRule(11)">+</button>' + //style="width: 50px; display: inline-block; position: relative; left: 205px; bottom: 1px;"
            '<a class="waves-effect waves-light btn blue right" onclick="ConfirmRule(11)" >Confirm Rule</a>' +
            '</div>' +
            '</div>' +
            '</div>'

    }

    if (document.getElementById('r7').selected == true) {
        counter++;
        rule.innerHTML = '<b >' + document.getElementById('r7').textContent + '</b>' +  //style="color: black; position: relative; bottom: 180px; right: 10px;"
            '<div class="amount-input-row">' +
            '<div class="card2" id="etfbody">' + // style="width:1125px ; position: relative; bottom: 110px; right: 12px"
            // '<label for="etf" style=" color: white; position: relative; top: 8px; left: 10px;" id="label2"><b>Rule:</b></label>' +
            '<div class="custom-select" >' + //style="display: inline-block; position: relative; top:5px; left:25px;"
            '<input id="inputemin" type="text" placeholder="Earnings min" >' + //style=" width:350px; height:25px; font-size: 12px; "
            '<input id="inputemax" type="text" placeholder="Earnings max" >' + //style=" width:350px; height:25px; font-size: 12px; "
            // '<button class="create-btn" id="btn7"  onclick="ConfirmRule(12)">+</button>' + //style="width: 50px; display: inline-block; position: relative; left: 205px; bottom: 1px;"
            '<a class="waves-effect waves-light btn blue right" onclick="ConfirmRule(12)" >Confirm Rule</a>' +
            '</div>' +
            '</div>' +
            '</div>'


    }

    if (document.getElementById('r8').selected == true) {
        counter++;
        rule.innerHTML = '<div class="amount-input-row">' +
            '<div class="card2" id="etfbody" >' + //style="width:1125px ; position: relative; bottom: 110px; right: 12px"
            // '<label for="etf" style=" color: white; position: relative; top: 8px; left: 10px;" id="label2"><b>Rule:</b></label>' +
            '<div class="custom-select" >' + //style="display: inline-block; position: relative; top:5px; left:25px;"
            '<input id="inputsmin" type="text" placeholder="Min price for shares" >' +  //style=" width:350px; height:25px; font-size: 12px; "
            '<input id="inputsmax" type="text" placeholder="Max prices for shares" >' + //style=" width:350px; height:25px; font-size: 12px; "
            // '<button class="create-btn" id="btn8"  onclick="ConfirmRule(13)">+</button>' + //style="width: 50px; display: inline-block; position: relative; left: 205px; bottom: 1px;"
            '<a class="waves-effect waves-light btn blue right" onclick="ConfirmRule(13)" >Confirm Rule</a>' +
            '</div>' +
            '</div>' +
            '</div>'

    }

    if (document.getElementById('r10').selected == true) {
        counter++;
        rule.innerHTML = '<b >' + document.getElementById('r10').textContent + '</b>' + //style="color: black; position: relative; bottom: 180px; right: 10px;"
            '<div class="amount-input-row">' +
            '<div class="card2" id="etfbody" >' + //style="width:1125px ; position: relative; bottom: 110px; right: 12px"
            //  '<label for="etf" style=" color: white; position: relative; top: 8px; left: 10px;" id="label2"><b>Rule:</b></label>' +
            '<div class="custom-select" >' + //style="display: inline-block; position: relative; top:5px; left:25px;"
            '<input id="inputName" type="text" placeholder="Ticker name" >' + //style=" width:350px; height:25px; font-size: 12px; "
            '<input id="inputperc" type="text" placeholder="Percentage amount" >' + //style=" width:350px; height:25px; font-size: 12px; "
            // '<button class="create-btn" id="btn10"  onclick="ConfirmRule(101)">+</button>' + //style="width: 50px; display: inline-block; position: relative; left: 205px; bottom: 1px;"
            '<a class="waves-effect waves-light btn blue right" onclick="ConfirmRule(101)" >Confirm Rule</a>' +
            '</div>' +
            '</div>' +
            '</div>'

    }

    if (document.getElementById('r11').selected == true) {
        counter++;
        rule.innerHTML = '<b >' + document.getElementById('r11').textContent + '</b>' + //style="color: black; position: relative; bottom: 180px; right: 10px;"
            '<div class="amount-input-row">' +
            '<div class="card2" id="etfbody" >' + //style="width:1125px ; position: relative; bottom:110px; right: 12px"
            // '<label for="etf" style=" color: white; position: relative; top: 8px; left: 10px;" id="label2"><b>Rule:</b></label>' +
            '<div class="custom-select">' + // style="display: inline-block; position: relative; top:5px; left:25px;"
            '<select id="secopt2">' +
            '<option disabled selected hidden value="0">Select sector by name:</option>' +
            '<option value="100" id="s1">Industrials</option>' +
            '<option value="101" id="s2">Technology</option>' +
            '<option value="102" id="s3">Consumer Defensive</option>' +
            '<option value="103" id="s4">Consumer Cyclical</option>' +
            '<option value="104" id="s5">Financial Services</option>' +
            '<option value="105" id="s6">Utilities</option>' +
            '<option value="106" id="s7">Healthcare</option>' +
            '<option value="107" id="s8">Energy</option>' +
            '<option value="108" id="s9">Business Services</option>' +
            '<option value="109" id="s10">Real Estate</option>' +
            '<option value="110" id="s11">Basic Materials</option>' +
            '<option value="111" id="s12">Other</option>' +
            '</select>' +
            '<input id="inputp2" type="text" placeholder="Percentage amount" >' + //style=" width:350px; height:25px; font-size: 12px; "
            '<input id="inputamount2" type="text" placeholder="Amount of companies" >' + //style=" width:350px; height:25px; font-size: 12px; "
            // '<button class="create-btn" id="btn11"  onclick="ConfirmRule(102)">+</button>' + //style="width: 50px; display: inline-block; position: relative; left: 35px; bottom: 1px;"
            '<a class="waves-effect waves-light btn blue right" onclick="ConfirmRule(102)" >Confirm Rule</a>' +
            '</div>' +
            '</div>' +
            '</div>'

    }

    if (document.getElementById('r12').selected == true) {
        counter++;
        rule.innerHTML = '<b>' + document.getElementById('r12').textContent + '</b>' + //style="color: black; position: relative; bottom: 180px; right: 10px;"
            '<div class="amount-input-row">' +
            '<div class="card2" id="etfbody" >' + //style="width:1125px ; position: relative; bottom: 110px; right: 12px"
            //'<label for="etf" style=" color: white; position: relative; top: 8px; left: 10px;" id="label2"><b>Rule:</b></label>' +
            '<div class="custom-select" >' + //style="display: inline-block; position: relative; top:5px; left:25px;"
            '<select id="indopt2">' +
            '<option disabled selected hidden value="0">Select industry by name:</option>' +
            '<option value="100001" id="i1">Industrial Products</option>' +
            '<option value="100002" id="i2">Business Services</option>' +
            '<option value="100003" id="i3">Engineering & Construction</option>' +
            '<option value="100004" id="i4">Waste Management</option>' +
            '<option value="100005" id="i5">Industrial Distribution</option>' +
            '<option value="100006" id="i6">Airlines</option>' +
            '<option value="100007" id="i7">Consulting & Outsourcing</option>' +
            '<option value="100008" id="i8">Aerospace & Defense</option>' +
            '<option value="100009" id="i9">Farm & Construction Machinery</option>' +
            '<option value="100010" id="i10">Transportation & Logistics</option>' +
            '<option value="100011" id="i11">Employment Services</option>' +
            '<option value="100012" id="i12">Truck Manufacturing</option>' +
            '<option value="100013" id="i13">Conglomerates</option>' +
            '<option value="101001" id="i14">Computer Hardware</option>' +
            '<option value="101002" id="i15">Online Media</option>' +
            '<option value="101003" id="i16">Application Software</option>' +
            '<option value="101004" id="i17">Semiconductors</option>' +
            '<option value="101005" id="i18">Communication Equipment</option>' +
            '<option value="102001" id="i19">Retail - Defensive</option>' +
            '<option value="102002" id="i20">Consumer Packaged Goods</option>' +
            '<option value="102003" id="i21">Tobacco Products</option>' +
            '<option value="102004" id="i22">Beverages - Alcoholic</option>' +
            '<option value="102005" id="i23">Beverages - Non-Alcoholic</option>' +
            '<option value="102006" id="i24">Education</option>' +
            '<option value="103001" id="i25">Entertainment</option>' +
            '<option value="103002" id="i26">Retail - Apparel & Specialty</option>' +
            '<option value="103003" id="i27">Restaurants</option>' +
            '<option value="103004" id="i28">Manufacturing - Apparel & Furniture</option>' +
            '<option value="103005" id="i29">Autos</option>' +
            '<option value="103011" id="i30">Advertising & Marketing Services</option>' +
            '<option value="103013" id="i31">Homebuilding & Construction</option>' +
            '<option value="103015" id="i32">Travel & Leisure</option>' +
            '<option value="103018" id="i33">Packaging & Containers</option>' +
            '<option value="103020" id="i34">Personal Services</option>' +
            '<option value="103026" id="i35">Publishing</option>' +
            '<option value="104001" id="i36">Asset Management</option>' +
            '<option value="104002" id="i37">Banks</option>' +
            '<option value="104003" id="i38">Brokers+ Exchanges & Other</option>' +
            '<option value="104004" id="i39">Insurance - Life</option>' +
            '<option value="104005" id="i40">Insurance</option>' +
            '<option value="104006" id="i41">Insurance - Property & Casualty</option>' +
            '<option value="104007" id="i42">Credit Services</option>' +
            '<option value="104013" id="i43">Insurance - Specialty</option>' +
            '<option value="105001" id="i44">Utilities - Regulated</option>' +
            '<option value="105002" id="i45">Utilities - Independent Power Producers</option>' +
            '<option value="106001" id="i46">Medical Diagnostics & Research</option>' +
            '<option value="106002" id="i47">Biotechnology</option>' +
            '<option value="106003" id="i48">Medical Instruments & Equipment</option>' +
            '<option value="106004" id="i49">Medical Devices</option>' +
            '<option value="106005" id="i50">Drug Manufacturers</option>' +
            '<option value="106006" id="i51">Health Care Plans</option>' +
            '<option value="106011" id="i52">Health Care Providers</option>' +
            '<option value="106014" id="i53">Medical Distribution</option>' +
            '<option value="107001" id="i54">Oil & Gas - Refining & Marketing</option>' +
            '<option value="107002" id="i55">Oil & Gas - E&P</option>' +
            '<option value="107003" id="i56">Oil & Gas - Midstream</option>' +
            '<option value="107004" id="i57">Oil & Gas - Services</option>' +
            '<option value="107005" id="i58">Oil & Gas - Integrated</option>' +
            '<option value="107006" id="i59">Oil & Gas - Drilling</option>' +
            '<option value="107007" id="i60">Alternative Energy Sources & Other</option>' +
            '<option value="108001" id="i61">Communication Services</option>' +
            '<option value="108002" id="i62">Consulting</option>' +
            '<option value="108003" id="i63">HR & Staffing</option>' +
            '<option value="108004" id="i64">Business Other</option>' +
            '<option value="109001" id="i65">REITs</option>' +
            '<option value="109002" id="i66">Real Estate Services</option>' +
            '<option value="110001" id="i67">Chemicals</option>' +
            '<option value="110002" id="i68">Forest Products</option>' +
            '<option value="110003" id="i69">Agriculture</option>' +
            '<option value="110004" id="i70">Metals & Mining</option>' +
            '<option value="110005" id="i71">Building Materials</option>' +
            '<option value="110006" id="i72">Coal</option>' +
            '<option value="110007" id="i73">Steel</option>' +
            '<option value="111001" id="i74">Diversified Holdings</option>' +
            '</select>' +
            '<input id="inputp3" type="text" placeholder="Percentage amount" >' + //style=" width:350px; height:25px; font-size: 12px; "
            '<input id="inputa3" type="text" placeholder="Amount of companies" >' + //style=" width:350px; height:25px; font-size: 12px; "
            // '<button class="create-btn" id="btn12"  onclick="ConfirmRule(103)">+</button>' + //style="width: 50px; display: inline-block; position: relative; left: 5px; bottom: 1px;"
            '<a class="waves-effect waves-light btn blue right" onclick="ConfirmRule(103)" >Confirm Rule</a>' +
            '</div>' +
            '</div>' +
            '</div>'
    }

    if (document.getElementById('r13').selected == true) {
        counter++;
        rule.innerHTML =
            '<b >' + document.getElementById('r13').textContent + '</b>' + //style="color: black; position: relative; bottom: 180px; right: 10px;"
            '<div class="amount-input-row">' +
            '<div class="card2" id="etfbody">' + // style="width:1125px ; position: relative; bottom: 110px; right: 12px"
            //  '<label for="etf" style=" color: white; position: relative; top: 8px; left: 10px;" id="label2"><b>Rule:</b></label>' +
            '<div class="custom-select" >' + //style="display: inline-block; position: relative; top:5px; left:25px;"
            '<input id="inputp4" type="text" placeholder="Percentage" >' + //style=" width:350px; height:25px; font-size: 12px; "
            '<input id="inputa4" type="text" placeholder="Amount of companies" >' + //style=" width:350px; height:25px; font-size: 12px; "
            // '<button class="create-btn" id="btn13"  onclick="ConfirmRule(104)">+</button>' + //style="width: 50px; display: inline-block; position: relative; left: 265px; bottom: 1px;"
            '<a class="waves-effect waves-light btn blue right" onclick="ConfirmRule(104)" >Confirm Rule</a>' +
            '</div>' +
            '</div>' +
            '</div>'

    }

    if (document.getElementById('r14').selected == true) {
        counter++;
        rule.innerHTML = '<b >' + document.getElementById('r14').textContent + '</b>' + //style="color: black; position: relative; bottom: 180px; right: 10px;"
            '<div class="amount-input-row">' +
            '<div class="card2" id="etfbody" >' + //style="width:1125px ; position: relative; bottom: 110px; right: 12px"
            // '<label for="etf" style=" color: white; position: relative; top: 8px; left: 10px;" id="label2"><b>Rule:</b></label>' +
            '<div class="custom-select">' + // style="display: inline-block; position: relative; top:5px; left:25px;"
            '<select id="cbropt2">' +
            '<option disabled selected hidden value="0">Select a country exchange:</option>' +
            '<option value="AS" id="e1">AS: NYSE EURONEXT - EURONEXT AMSTERDAM</option>' +
            '<option value="AT" id="e2">AT: ATHENS EXCHANGE S.A. CASH MARKET</option>' +
            '<option value="AX" id="e3">AX: ASX - ALL MARKETS</option>' +
            '<option value="BA" id="e4">BA: BOLSA DE COMERCIO DE BUENOS AIRES</option>' +
            '<option value="BC" id="e5">BC: BOLSA DE VALORES DE COLOMBIA</option>' +
            '<option value="BD" id="e6">BD: BUDAPEST STOCK EXCHANGE</option>' +
            '<option value="BE" id="e7">BE: BOERSE BERLIN</option>' +
            '<option value="BK" id="e8">BK: STOCK EXCHANGE OF THAILAND</option>' +
            '<option value="BO" id="e9">BO: BSE LTD</option>' +
            '<option value="BR" id="e10">BR: NYSE EURONEXT - EURONEXT BRUSSELS</option>' +
            '<option value="CA" id="e11">CA: Egyptian Stock Exchange</option>' +
            '<option value="CN" id="e12">CN: CANADIAN NATIONAL STOCK EXCHANGE</option>' +
            '<option value="CO" id="e13">CO: OMX NORDIC EXCHANGE COPENHAGEN A/S</option>' +
            '<option value="CR" id="e14">CR: CARACAS STOCK EXCHANGE</option>' +
            '<option value="DB" id="e15">DB: DUBAI FINANCIAL MARKET</option>' +
            '<option value="DE" id="e16">DE: XETRA</option>' +
            '<option value="DU" id="e17">DU: BOERSE DUESSELDORF</option>' +
            '<option value="F" id="e18">F: DEUTSCHE BOERSE AG</option>' +
            '<option value="HE" id="e19">HE: NASDAQ OMX HELSINKI LTD</option>' +
            '<option value="HK" id="e20">HK: HONG KONG EXCHANGES AND CLEARING LTD</option>' +
            '<option value="HM" id="e21">HM: HANSEATISCHE WERTPAPIERBOERSE HAMBURG</option>' +
            '<option value="IC" id="e22">IC: NASDAQ OMX ICELAND</option>' +
            '<option value="IR" id="e23">IR: IRISH STOCK EXCHANGE - ALL MARKET</option>' +
            '<option value="IS" id="e24">IS: BORSA ISTANBUL</option>' +
            '<option value="JK" id="e25">JK: INDONESIA STOCK EXCHANGE</option>' +
            '<option value="JO" id="e26">JO: JOHANNESBURG STOCK EXCHANGE</option>' +
            '<option value="KL" id="e27">KL: BURSA MALAYSIA</option>' +
            '<option value="KQ" id="e28">KQ: KOREA EXCHANGE (KOSDAQ)</option>' +
            '<option value="KS" id="e29">KS: KOREA EXCHANGE (STOCK MARKET)</option>' +
            '<option value="L" id="e30">L: LONDON STOCK EXCHANGE</option>' +
            '<option value="LN" id="e31">LN: Euronext London</option>' +
            '<option value="LS" id="e32">LS: NYSE EURONEXT - EURONEXT LISBON</option>' +
            '<option value="MC" id="e33">MC: BOLSA DE MADRID</option>' +
            '<option value="ME" id="e34">ME: MOSCOW EXCHANGE</option>' +
            '<option value="MI" id="e35">MI: Italian Stock Exchange</option>' +
            '<option value="MU" id="e36">MU: BOERSE MUENCHEN</option>' +
            '<option value="MX" id="e37">MX: BOLSA MEXICANA DE VALORES (MEXICAN STOCK EXCHANGE)</option>' +
            '<option value="NE" id="e38">NE: AEQUITAS NEO EXCHANGE</option>' +
            '<option value="NL" id="e39">NL: Nigerian Stock Exchange</option>' +
            '<option value="NS" id="e40">NS: NATIONAL STOCK EXCHANGE OF INDIA</option>' +
            '<option value="NZ" id="e41">NZ: NEW ZEALAND EXCHANGE LTD</option>' +
            '<option value="OL" id="e42">OL: OSLO BORS ASA</option>' +
            '<option value="PA" id="e43">PA: NYSE EURONEXT - MARCHE LIBRE PARIS</option>' +
            '<option value="PM" id="e44">PM: Philippine Stock Exchange</option>' +
            '<option value="PR" id="e45">PR: PRAGUE STOCK EXCHANGE</option>' +
            '<option value="QA" id="e46">QA: QATAR EXCHANGE</option>' +
            '<option value="RG" id="e47">RG: NASDAQ OMX RIGA</option>' +
            '<option value="SA" id="e48">SA: Brazil Bolsa - Sao Paolo</option>' +
            '<option value="SG" id="e49">SG: BOERSE STUTTGART</option>' +
            '<option value="SI" id="e50">SI: SINGAPORE EXCHANGE</option>' +
            '<option value="SN" id="e51">SN: SANTIAGO STOCK EXCHANGE</option>' +
            '<option value="SR" id="e52">SR: SAUDI STOCK EXCHANGE</option>' +
            '<option value="SS" id="e53">SS: SHANGHAI STOCK EXCHANGE</option>' +
            '<option value="ST" id="e54">ST: NASDAQ OMX NORDIC STOCKHOLM</option>' +
            '<option value="SW" id="e55">SW: SWISS EXCHANGE</option>' +
            '<option value="SZ" id="e56">SZ: SHENZHEN STOCK EXCHANGE</option>' +
            '<option value="T" id="e57">T: TOKYO STOCK EXCHANGE-TOKYO PRO MARKET</option>' +
            '<option value="TA" id="e58">TA: TEL AVIV STOCK EXCHANGE</option>' +
            '<option value="TL" id="e59">TL: NASDAQ OMX TALLINN</option>' +
            '<option value="TO" id="e60">TO: TORONTO STOCK EXCHANGE</option>' +
            '<option value="TW" id="e61">TW: TAIWAN STOCK EXCHANGE</option>' +
            '<option value="TWO" id="e62">TWO: TPEx</option>' +
            '<option value="US" id="e63">US: US exchanges (NYSE, Nasdaq)</option>' +
            '<option value="V" id="e64">V: TSX VENTURE EXCHANGE - NEX</option>' +
            '<option value="VI" id="e65">VI: Vienna Stock Exchange</option>' +
            '<option value="VN" id="e66">VN: Vietnam exchanges including HOSE, HNX and UPCOM</option>' +
            '<option value="VS" id="e67">VS: NASDAQ OMX VILNIUS</option>' +
            '<option value="WA" id="e68">WA: WARSAW STOCK EXCHANGE/EQUITIES/MAIN MARKET</option>' +
            '<option value="HA" id="e69">HA: Hanover Stock Exchange</option>' +
            '<option value="SX" id="e70">SX: DEUTSCHE BOERSE Stoxx</option>' +
            '<option value="TG" id="e71">TG: DEUTSCHE BOERSE TradeGate </option>' +
            '<option value="SC" id="e72">SC: BOERSE_FRANKFURT_ZERTIFIKATE</option>' +
            '</select>' +
            '<input id="inputp5" type="text" placeholder="Percentage amount" >' + //style=" width:130px; height:25px; font-size: 12px; "
            '<input id="inputa5" type="text" placeholder="Amount of companies" >' + //style=" width:150px; height:25px; font-size: 12px; "
            // '<button class="create-btn" id="btn14"  onclick="ConfirmRule(105)">+</button>' + //style="width: 50px; display: inline-block; position: relative; left: 55px; bottom: 1px;"
            '<a class="waves-effect waves-light btn blue right" onclick="ConfirmRule(105)" >Confirm Rule</a>' +
            '</div>' +
            '</div>' +
            '</div>'
    }

    if (document.getElementById('r15').selected == true) {
        counter++;
        rule.innerHTML = '<b >' + document.getElementById('r15').textContent + '</b>' + // style="color: black; position: relative; bottom: 180px; right: 10px;"
            '<div class="amount-input-row">' +
            '<div class="card2" id="etfbody">' + // style="width:1125px ; position: relative; bottom: 110px; right: 12px"
            // '<label for="etf" style=" color: white; position: relative; top: 8px; left: 10px;" id="label2"><b>Rule:</b></label>' +
            '<div class="custom-select" >' + //style="display: inline-block; position: relative; top:5px; left:25px;"
            '<input id="inputp6" type="text" placeholder="Percentage">' + // style=" width:350px; height:25px; font-size: 12px; "
            '<input id="inputa6" type="text" placeholder="Amount of companies">' + // style=" width:350px; height:25px; font-size: 12px; "
            // '<button class="create-btn" id="btn15"  onclick="ConfirmRule(106)">+</button>' + //style="width: 50px; display: inline-block; position: relative; left: 255px; bottom: 1px;"
            '<a class="waves-effect waves-light btn blue right" onclick="ConfirmRule(106)" >Confirm Rule</a>' +
            '</div>' +
            '</div>' +
            '</div>'
    }

    if (document.getElementById('r16').selected == true) {
        counter++;
        rule.innerHTML = '<b >' + document.getElementById('r16').textContent + '</b>' + //style="color: black; position: relative; bottom: 180px; right: 10px;"
            '<div class="amount-input-row">' +
            '<div class="card2" id="etfbody" >' + //style="width:1125px ; position: relative; bottom: 110px; right: 12px"
            // '<label for="etf" style=" color: white; position: relative; top: 8px; left: 10px;" id="label2"><b>Rule:</b></label>' +
            '<div class="custom-select" >' + //style="display: inline-block; position: relative; top:5px; left:25px;"
            '<input id="inputw" type="text" placeholder="Balance period in weeks" >' + //style=" width:350px; height:25px; font-size: 12px; "
            // '<button class="create-btn" id="btn16"  onclick="ConfirmRule(200)">+</button>' + //style="width: 50px; display: inline-block; position: relative; left: 550px; bottom: 1px;"
            '<a class="waves-effect waves-light btn blue right" onclick="ConfirmRule(200)" >Confirm Rule</a>' +
            '</div>' +
            '</div>' +
            '</div>'
    }


    if (document.getElementById('r18').selected == true) {
        counter++;
        rule.innerHTML = '<b >' + document.getElementById('r18').textContent + '</b>' + //style="color: black; position: relative; bottom: 130px; right: 10px;"
            '<div class="amount-input-row">' +
            '<div class="card2" id="etfbody">' + // style="width:1125px ; position: relative; bottom: 70px; right: 12px"
            // '<label for="etf" style=" color: white; position: relative; top: 8px; left: 10px;" id="label2"><b>Rule:</b></label>' +
            '<div class="custom-select" >' + //style="display: inline-block; position: relative; top:5px; left:25px;"
            //  '<input type="text" placeholder="Number of weeks until reconsideration" >' + //style=" width:350px; height:25px; font-size: 12px; "
            '<input id="inputw" type="text" placeholder="Number of weeks until reconsideration" >' +
            // '<button class="create-btn" id="btn18"  onclick="ConfirmRule("202")">+</button>' + //style="width: 50px; display: inline-block; position: relative; left: 550px; bottom: 1px;"
            '<a class="waves-effect waves-light btn blue right" onclick="ConfirmRule(202)" >Confirm Rule</a>' +
            '</div>' +
            '</div>' +
            '</div>'
    }

}

function addRule2() {

    2
    var rule = document.getElementById("rule");


    if (document.getElementById('r1').selected == true) {
        counter++;
        rule.innerHTML =
            '<b >' + document.getElementById('r1').textContent + '</b>' + //style="color: black; position: relative; bottom: 180px; right: 10px;"
            '<div class="amount-input-row">' +
            '<div class="card2" id="etfbody" >' + //style="width:108% ; position: relative; bottom: 110px; right: 12px"
            // '<label for="etf" style=" color: white; position: relative; top: 8px; left: 10px;" id="label2"><b>Rule:</b></label>' +
            '<div class="custom-select">' + // style="display: inline-block; position: relative; top:5px; left:25px;"
            '<input id="input1" type="text" placeholder="ticker name of company" >' + //style=" width:250px; height:25px; font-size: 12px; "
            '<a class="waves-effect waves-light btn blue right" onclick="ConfirmRule2(0)" >Confirm Rule</a>' +  //style="width: 50px; display: inline-block; position: relative; left: 660px; bottom: 1px;"
            '</div>' +
            '</div>' +
            '</div>'
    }

    if (document.getElementById('r2').selected == true) {
        counter++;
        rule.innerHTML = '<b>' + document.getElementById('r2').textContent + '</b>' + // style="color: black; position: relative; bottom: 180px; right: 10px;"
            '<div class="amount-input-row">' +
            '<div class="card2" id="etfbody" >' + //style="width:1125px ; position: relative; bottom: 110px; right: 12px"
            // '<label for="etf" style=" color: white; position: relative; top: 8px; left: 10px;" id="label2"><b>Rule:</b></label>' +
            '<div class="custom-select">' + // style="width:200px; display: inline-block; position: relative; left: 32px; top: 8px;"
            '<select id="secopt">' +
            '<option disabled selected hidden value="0">Select sector by name:</option>' +
            '<option value="100" id="s1">Industrials</option>' +
            '<option value="101" id="s2">Technology</option>' +
            '<option value="102" id="s3">Consumer Defensive</option>' +
            '<option value="103" id="s4">Consumer Cyclical</option>' +
            '<option value="104" id="s5">Financial Services</option>' +
            '<option value="105" id="s6">Utilities</option>' +
            '<option value="106" id="s7">Healthcare</option>' +
            '<option value="107" id="s8">Energy</option>' +
            '<option value="108" id="s9">Business Services</option>' +
            '<option value="109" id="s10">Real Estate</option>' +
            '<option value="110" id="s11">Basic Materials</option>' +
            '<option value="111" id="s12">Other</option>' +
            '</select>' +
            '</div>' +
            '<a class="waves-effect waves-light btn blue right" onclick="ConfirmRule2(1)" >Confirm Rule</a>' + // style="width: 50px; display: inline-block; position: relative; left: 730px; top: 3px;"
            '</div>' +
            '</div>'
    }

    if (document.getElementById('r3').selected == true) {
        counter++;
        rule.innerHTML = '<b >' + document.getElementById('r3').textContent + '</b>' + //style="color: black; position: relative; bottom: 180px; right: 10px;"
            '<div class="amount-input-row">' +
            '<div class="card2" id="etfbody" >' + //style="width:1125px ; position: relative; bottom:110px; right: 12px"
            // '<label for="etf" id="label2"><b>Rule:</b></label>' + // style=" color: white; position: relative; top: 8px; left: 10px;"
            '<div class="custom-select" >' + //style="width:200px; display: inline-block; position: relative; left: 32px; top: 8px;"
            '<select id="indopt">' +
            '<option disabled selected hidden value="0">Select industry by name:</option>' +
            '<option value="100001" id="i1">Industrial Products</option>' +
            '<option value="100002" id="i2">Business Services</option>' +
            '<option value="100003" id="i3">Engineering & Construction</option>' +
            '<option value="100004" id="i4">Waste Management</option>' +
            '<option value="100005" id="i5">Industrial Distribution</option>' +
            '<option value="100006" id="i6">Airlines</option>' +
            '<option value="100007" id="i7">Consulting & Outsourcing</option>' +
            '<option value="100008" id="i8">Aerospace & Defense</option>' +
            '<option value="100009" id="i9">Farm & Construction Machinery</option>' +
            '<option value="100010" id="i10">Transportation & Logistics</option>' +
            '<option value="100011" id="i11">Employment Services</option>' +
            '<option value="100012" id="i12">Truck Manufacturing</option>' +
            '<option value="100013" id="i13">Conglomerates</option>' +
            '<option value="101001" id="i14">Computer Hardware</option>' +
            '<option value="101002" id="i15">Online Media</option>' +
            '<option value="101003" id="i16">Application Software</option>' +
            '<option value="101004" id="i17">Semiconductors</option>' +
            '<option value="101005" id="i18">Communication Equipment</option>' +
            '<option value="102001" id="i19">Retail - Defensive</option>' +
            '<option value="102002" id="i20">Consumer Packaged Goods</option>' +
            '<option value="102003" id="i21">Tobacco Products</option>' +
            '<option value="102004" id="i22">Beverages - Alcoholic</option>' +
            '<option value="102005" id="i23">Beverages - Non-Alcoholic</option>' +
            '<option value="102006" id="i24">Education</option>' +
            '<option value="103001" id="i25">Entertainment</option>' +
            '<option value="103002" id="i26">Retail - Apparel & Specialty</option>' +
            '<option value="103003" id="i27">Restaurants</option>' +
            '<option value="103004" id="i28">Manufacturing - Apparel & Furniture</option>' +
            '<option value="103005" id="i29">Autos</option>' +
            '<option value="103011" id="i30">Advertising & Marketing Services</option>' +
            '<option value="103013" id="i31">Homebuilding & Construction</option>' +
            '<option value="103015" id="i32">Travel & Leisure</option>' +
            '<option value="103018" id="i33">Packaging & Containers</option>' +
            '<option value="103020" id="i34">Personal Services</option>' +
            '<option value="103026" id="i35">Publishing</option>' +
            '<option value="104001" id="i36">Asset Management</option>' +
            '<option value="104002" id="i37">Banks</option>' +
            '<option value="104003" id="i38">Brokers+ Exchanges & Other</option>' +
            '<option value="104004" id="i39">Insurance - Life</option>' +
            '<option value="104005" id="i40">Insurance</option>' +
            '<option value="104006" id="i41">Insurance - Property & Casualty</option>' +
            '<option value="104007" id="i42">Credit Services</option>' +
            '<option value="104013" id="i43">Insurance - Specialty</option>' +
            '<option value="105001" id="i44">Utilities - Regulated</option>' +
            '<option value="105002" id="i45">Utilities - Independent Power Producers</option>' +
            '<option value="106001" id="i46">Medical Diagnostics & Research</option>' +
            '<option value="106002" id="i47">Biotechnology</option>' +
            '<option value="106003" id="i48">Medical Instruments & Equipment</option>' +
            '<option value="106004" id="i49">Medical Devices</option>' +
            '<option value="106005" id="i50">Drug Manufacturers</option>' +
            '<option value="106006" id="i51">Health Care Plans</option>' +
            '<option value="106011" id="i52">Health Care Providers</option>' +
            '<option value="106014" id="i53">Medical Distribution</option>' +
            '<option value="107001" id="i54">Oil & Gas - Refining & Marketing</option>' +
            '<option value="107002" id="i55">Oil & Gas - E&P</option>' +
            '<option value="107003" id="i56">Oil & Gas - Midstream</option>' +
            '<option value="107004" id="i57">Oil & Gas - Services</option>' +
            '<option value="107005" id="i58">Oil & Gas - Integrated</option>' +
            '<option value="107006" id="i59">Oil & Gas - Drilling</option>' +
            '<option value="107007" id="i60">Alternative Energy Sources & Other</option>' +
            '<option value="108001" id="i61">Communication Services</option>' +
            '<option value="108002" id="i62">Consulting</option>' +
            '<option value="108003" id="i63">HR & Staffing</option>' +
            '<option value="108004" id="i64">Business Other</option>' +
            '<option value="109001" id="i65">REITs</option>' +
            '<option value="109002" id="i66">Real Estate Services</option>' +
            '<option value="110001" id="i67">Chemicals</option>' +
            '<option value="110002" id="i68">Forest Products</option>' +
            '<option value="110003" id="i69">Agriculture</option>' +
            '<option value="110004" id="i70">Metals & Mining</option>' +
            '<option value="110005" id="i71">Building Materials</option>' +
            '<option value="110006" id="i72">Coal</option>' +
            '<option value="110007" id="i73">Steel</option>' +
            '<option value="111001" id="i74">Diversified Holdings</option>' +
            '</select>' +
            '</div>' +
            // '<button class="create-btn" id="btn3" onclick="ConfirmRule(2)">+</button>' + // style="width: 50px; display: inline-block; position: relative; left: 730px; top: 3px;"
            '<a class="waves-effect waves-light btn blue right" onclick="ConfirmRule2(2)" >Confirm Rule</a>' +
            '</div>' +
            '</div>'
    }

    if (document.getElementById('r4').selected == true) {
        counter++;
        rule.innerHTML = '<b >' + document.getElementById('r4').textContent + '</b>' + //style="color: black; position: relative; bottom: 180px; right: 10px;"
            '<div class="amount-input-row">' +
            '<div class="card2" id="etfbody">' + // style="width:1125px ; position: relative; bottom:110px; right: 12px"
            // '<label for="etf" id="label2"><b>Rule:</b></label>' + // style=" color: white; position: relative; top: 8px; left: 10px;"
            '<div class="custom-select" >' + //style="width:200px; display: inline-block; position: relative; left: 32px; top: 8px;"
            '<select id="cbropt">' +
            '<option disabled selected hidden value="0">Select a country exchange:</option>' +
            '<option value="AS" id="e1">AS: NYSE EURONEXT - EURONEXT AMSTERDAM</option>' +
            '<option value="AT" id="e2">AT: ATHENS EXCHANGE S.A. CASH MARKET</option>' +
            '<option value="AX" id="e3">AX: ASX - ALL MARKETS</option>' +
            '<option value="BA" id="e4">BA: BOLSA DE COMERCIO DE BUENOS AIRES</option>' +
            '<option value="BC" id="e5">BC: BOLSA DE VALORES DE COLOMBIA</option>' +
            '<option value="BD" id="e6">BD: BUDAPEST STOCK EXCHANGE</option>' +
            '<option value="BE" id="e7">BE: BOERSE BERLIN</option>' +
            '<option value="BK" id="e8">BK: STOCK EXCHANGE OF THAILAND</option>' +
            '<option value="BO" id="e9">BO: BSE LTD</option>' +
            '<option value="BR" id="e10">BR: NYSE EURONEXT - EURONEXT BRUSSELS</option>' +
            '<option value="CA" id="e11">CA: Egyptian Stock Exchange</option>' +
            '<option value="CN" id="e12">CN: CANADIAN NATIONAL STOCK EXCHANGE</option>' +
            '<option value="CO" id="e13">CO: OMX NORDIC EXCHANGE COPENHAGEN A/S</option>' +
            '<option value="CR" id="e14">CR: CARACAS STOCK EXCHANGE</option>' +
            '<option value="DB" id="e15">DB: DUBAI FINANCIAL MARKET</option>' +
            '<option value="DE" id="e16">DE: XETRA</option>' +
            '<option value="DU" id="e17">DU: BOERSE DUESSELDORF</option>' +
            '<option value="F" id="e18">F: DEUTSCHE BOERSE AG</option>' +
            '<option value="HE" id="e19">HE: NASDAQ OMX HELSINKI LTD</option>' +
            '<option value="HK" id="e20">HK: HONG KONG EXCHANGES AND CLEARING LTD</option>' +
            '<option value="HM" id="e21">HM: HANSEATISCHE WERTPAPIERBOERSE HAMBURG</option>' +
            '<option value="IC" id="e22">IC: NASDAQ OMX ICELAND</option>' +
            '<option value="IR" id="e23">IR: IRISH STOCK EXCHANGE - ALL MARKET</option>' +
            '<option value="IS" id="e24">IS: BORSA ISTANBUL</option>' +
            '<option value="JK" id="e25">JK: INDONESIA STOCK EXCHANGE</option>' +
            '<option value="JO" id="e26">JO: JOHANNESBURG STOCK EXCHANGE</option>' +
            '<option value="KL" id="e27">KL: BURSA MALAYSIA</option>' +
            '<option value="KQ" id="e28">KQ: KOREA EXCHANGE (KOSDAQ)</option>' +
            '<option value="KS" id="e29">KS: KOREA EXCHANGE (STOCK MARKET)</option>' +
            '<option value="L" id="e30">L: LONDON STOCK EXCHANGE</option>' +
            '<option value="LN" id="e31">LN: Euronext London</option>' +
            '<option value="LS" id="e32">LS: NYSE EURONEXT - EURONEXT LISBON</option>' +
            '<option value="MC" id="e33">MC: BOLSA DE MADRID</option>' +
            '<option value="ME" id="e34">ME: MOSCOW EXCHANGE</option>' +
            '<option value="MI" id="e35">MI: Italian Stock Exchange</option>' +
            '<option value="MU" id="e36">MU: BOERSE MUENCHEN</option>' +
            '<option value="MX" id="e37">MX: BOLSA MEXICANA DE VALORES (MEXICAN STOCK EXCHANGE)</option>' +
            '<option value="NE" id="e38">NE: AEQUITAS NEO EXCHANGE</option>' +
            '<option value="NL" id="e39">NL: Nigerian Stock Exchange</option>' +
            '<option value="NS" id="e40">NS: NATIONAL STOCK EXCHANGE OF INDIA</option>' +
            '<option value="NZ" id="e41">NZ: NEW ZEALAND EXCHANGE LTD</option>' +
            '<option value="OL" id="e42">OL: OSLO BORS ASA</option>' +
            '<option value="PA" id="e43">PA: NYSE EURONEXT - MARCHE LIBRE PARIS</option>' +
            '<option value="PM" id="e44">PM: Philippine Stock Exchange</option>' +
            '<option value="PR" id="e45">PR: PRAGUE STOCK EXCHANGE</option>' +
            '<option value="QA" id="e46">QA: QATAR EXCHANGE</option>' +
            '<option value="RG" id="e47">RG: NASDAQ OMX RIGA</option>' +
            '<option value="SA" id="e48">SA: Brazil Bolsa - Sao Paolo</option>' +
            '<option value="SG" id="e49">SG: BOERSE STUTTGART</option>' +
            '<option value="SI" id="e50">SI: SINGAPORE EXCHANGE</option>' +
            '<option value="SN" id="e51">SN: SANTIAGO STOCK EXCHANGE</option>' +
            '<option value="SR" id="e52">SR: SAUDI STOCK EXCHANGE</option>' +
            '<option value="SS" id="e53">SS: SHANGHAI STOCK EXCHANGE</option>' +
            '<option value="ST" id="e54">ST: NASDAQ OMX NORDIC STOCKHOLM</option>' +
            '<option value="SW" id="e55">SW: SWISS EXCHANGE</option>' +
            '<option value="SZ" id="e56">SZ: SHENZHEN STOCK EXCHANGE</option>' +
            '<option value="T" id="e57">T: TOKYO STOCK EXCHANGE-TOKYO PRO MARKET</option>' +
            '<option value="TA" id="e58">TA: TEL AVIV STOCK EXCHANGE</option>' +
            '<option value="TL" id="e59">TL: NASDAQ OMX TALLINN</option>' +
            '<option value="TO" id="e60">TO: TORONTO STOCK EXCHANGE</option>' +
            '<option value="TW" id="e61">TW: TAIWAN STOCK EXCHANGE</option>' +
            '<option value="TWO" id="e62">TWO: TPEx</option>' +
            '<option value="US" id="e63">US: US exchanges (NYSE, Nasdaq)</option>' +
            '<option value="V" id="e64">V: TSX VENTURE EXCHANGE - NEX</option>' +
            '<option value="VI" id="e65">VI: Vienna Stock Exchange</option>' +
            '<option value="VN" id="e66">VN: Vietnam exchanges including HOSE, HNX and UPCOM</option>' +
            '<option value="VS" id="e67">VS: NASDAQ OMX VILNIUS</option>' +
            '<option value="WA" id="e68">WA: WARSAW STOCK EXCHANGE/EQUITIES/MAIN MARKET</option>' +
            '<option value="HA" id="e69">HA: Hanover Stock Exchange</option>' +
            '<option value="SX" id="e70">SX: DEUTSCHE BOERSE Stoxx</option>' +
            '<option value="TG" id="e71">TG: DEUTSCHE BOERSE TradeGate </option>' +
            '<option value="SC" id="e72">SC: BOERSE_FRANKFURT_ZERTIFIKATE</option>' +
            '</select>' +
            '</div>' +
            // '<button class="create-btn" id="btn4"  onclick="ConfirmRule(3)">+</button>' + //style="width: 50px; display: inline-block; position: relative; left: 730px; top: 3px;"
            '<a class="waves-effect waves-light btn blue right" onclick="ConfirmRule2(3)" >Confirm Rule</a>' +
            '</div>' +
            '</div>'
    }

    if (document.getElementById('r6').selected == true) {
        counter++;
        rule.innerHTML = '<b >' + document.getElementById('r6').textContent + '</b>' + //style="color: black; position: relative; bottom: 180px; right: 10px;"
            '<div class="amount-input-row">' +
            '<div class="card2" id="etfbody" >' +  //'<div class="card2" id="etfbody" >'
            // '<label for="etf" style=" color: white; position: relative; top: 8px; left: 10px;" id="label2"><b>Rule:</b></label>' +
            '<div class="custom-select" >' +
            '<input id="inputmin" type="text" placeholder="Market cap min" >' + //style=" width:350px; height:25px; font-size: 12px; "
            '<input id="inputmax"type="text" placeholder="Market cap max" >' + //style=" width:350px; height:25px; font-size: 12px; "
            // '<button class="create-btn" id="btn6"  onclick="ConfirmRule(11)">+</button>' + //style="width: 50px; display: inline-block; position: relative; left: 205px; bottom: 1px;"
            '<a class="waves-effect waves-light btn blue right" onclick="ConfirmRule2(11)" >Confirm Rule</a>' +
            '</div>' +
            '</div>' +
            '</div>'

    }

    if (document.getElementById('r7').selected == true) {
        counter++;
        rule.innerHTML = '<b >' + document.getElementById('r7').textContent + '</b>' +  //style="color: black; position: relative; bottom: 180px; right: 10px;"
            '<div class="amount-input-row">' +
            '<div class="card2" id="etfbody">' + // style="width:1125px ; position: relative; bottom: 110px; right: 12px"
            // '<label for="etf" style=" color: white; position: relative; top: 8px; left: 10px;" id="label2"><b>Rule:</b></label>' +
            '<div class="custom-select" >' + //style="display: inline-block; position: relative; top:5px; left:25px;"
            '<input id="inputemin" type="text" placeholder="Earnings min" >' + //style=" width:350px; height:25px; font-size: 12px; "
            '<input id="inputemax" type="text" placeholder="Earnings max" >' + //style=" width:350px; height:25px; font-size: 12px; "
            // '<button class="create-btn" id="btn7"  onclick="ConfirmRule(12)">+</button>' + //style="width: 50px; display: inline-block; position: relative; left: 205px; bottom: 1px;"
            '<a class="waves-effect waves-light btn blue right" onclick="ConfirmRule2(12)" >Confirm Rule</a>' +
            '</div>' +
            '</div>' +
            '</div>'


    }

    if (document.getElementById('r8').selected == true) {
        counter++;
        rule.innerHTML = '<div class="amount-input-row">' +
            '<div class="card2" id="etfbody" >' + //style="width:1125px ; position: relative; bottom: 110px; right: 12px"
            // '<label for="etf" style=" color: white; position: relative; top: 8px; left: 10px;" id="label2"><b>Rule:</b></label>' +
            '<div class="custom-select" >' + //style="display: inline-block; position: relative; top:5px; left:25px;"
            '<input id="inputsmin" type="text" placeholder="Min price for shares" >' +  //style=" width:350px; height:25px; font-size: 12px; "
            '<input id="inputsmax" type="text" placeholder="Max prices for shares" >' + //style=" width:350px; height:25px; font-size: 12px; "
            // '<button class="create-btn" id="btn8"  onclick="ConfirmRule(13)">+</button>' + //style="width: 50px; display: inline-block; position: relative; left: 205px; bottom: 1px;"
            '<a class="waves-effect waves-light btn blue right" onclick="ConfirmRule2(13)" >Confirm Rule</a>' +
            '</div>' +
            '</div>' +
            '</div>'

    }

    if (document.getElementById('r10').selected == true) {
        counter++;
        rule.innerHTML = '<b >' + document.getElementById('r10').textContent + '</b>' + //style="color: black; position: relative; bottom: 180px; right: 10px;"
            '<div class="amount-input-row">' +
            '<div class="card2" id="etfbody" >' + //style="width:1125px ; position: relative; bottom: 110px; right: 12px"
            //  '<label for="etf" style=" color: white; position: relative; top: 8px; left: 10px;" id="label2"><b>Rule:</b></label>' +
            '<div class="custom-select" >' + //style="display: inline-block; position: relative; top:5px; left:25px;"
            '<input id="inputName" type="text" placeholder="Ticker name" >' + //style=" width:350px; height:25px; font-size: 12px; "
            '<input id="inputperc" type="text" placeholder="Percentage amount" >' + //style=" width:350px; height:25px; font-size: 12px; "
            // '<button class="create-btn" id="btn10"  onclick="ConfirmRule(101)">+</button>' + //style="width: 50px; display: inline-block; position: relative; left: 205px; bottom: 1px;"
            '<a class="waves-effect waves-light btn blue right" onclick="ConfirmRule2(101)" >Confirm Rule</a>' +
            '</div>' +
            '</div>' +
            '</div>'

    }

    if (document.getElementById('r11').selected == true) {
        counter++;
        rule.innerHTML = '<b >' + document.getElementById('r11').textContent + '</b>' + //style="color: black; position: relative; bottom: 180px; right: 10px;"
            '<div class="amount-input-row">' +
            '<div class="card2" id="etfbody" >' + //style="width:1125px ; position: relative; bottom:110px; right: 12px"
            // '<label for="etf" style=" color: white; position: relative; top: 8px; left: 10px;" id="label2"><b>Rule:</b></label>' +
            '<div class="custom-select">' + // style="display: inline-block; position: relative; top:5px; left:25px;"
            '<select id="secopt2">' +
            '<option disabled selected hidden value="0">Select sector by name:</option>' +
            '<option value="100" id="s1">Industrials</option>' +
            '<option value="101" id="s2">Technology</option>' +
            '<option value="102" id="s3">Consumer Defensive</option>' +
            '<option value="103" id="s4">Consumer Cyclical</option>' +
            '<option value="104" id="s5">Financial Services</option>' +
            '<option value="105" id="s6">Utilities</option>' +
            '<option value="106" id="s7">Healthcare</option>' +
            '<option value="107" id="s8">Energy</option>' +
            '<option value="108" id="s9">Business Services</option>' +
            '<option value="109" id="s10">Real Estate</option>' +
            '<option value="110" id="s11">Basic Materials</option>' +
            '<option value="111" id="s12">Other</option>' +
            '</select>' +
            '<input id="inputp2" type="text" placeholder="Percentage amount" >' + //style=" width:350px; height:25px; font-size: 12px; "
            '<input id="inputamount2" type="text" placeholder="Amount of companies" >' + //style=" width:350px; height:25px; font-size: 12px; "
            // '<button class="create-btn" id="btn11"  onclick="ConfirmRule(102)">+</button>' + //style="width: 50px; display: inline-block; position: relative; left: 35px; bottom: 1px;"
            '<a class="waves-effect waves-light btn blue right" onclick="ConfirmRule2(102)" >Confirm Rule</a>' +
            '</div>' +
            '</div>' +
            '</div>'

    }

    if (document.getElementById('r12').selected == true) {
        counter++;
        rule.innerHTML = '<b>' + document.getElementById('r12').textContent + '</b>' + //style="color: black; position: relative; bottom: 180px; right: 10px;"
            '<div class="amount-input-row">' +
            '<div class="card2" id="etfbody" >' + //style="width:1125px ; position: relative; bottom: 110px; right: 12px"
            //'<label for="etf" style=" color: white; position: relative; top: 8px; left: 10px;" id="label2"><b>Rule:</b></label>' +
            '<div class="custom-select" >' + //style="display: inline-block; position: relative; top:5px; left:25px;"
            '<select id="indopt2">' +
            '<option disabled selected hidden value="0">Select industry by name:</option>' +
            '<option value="100001" id="i1">Industrial Products</option>' +
            '<option value="100002" id="i2">Business Services</option>' +
            '<option value="100003" id="i3">Engineering & Construction</option>' +
            '<option value="100004" id="i4">Waste Management</option>' +
            '<option value="100005" id="i5">Industrial Distribution</option>' +
            '<option value="100006" id="i6">Airlines</option>' +
            '<option value="100007" id="i7">Consulting & Outsourcing</option>' +
            '<option value="100008" id="i8">Aerospace & Defense</option>' +
            '<option value="100009" id="i9">Farm & Construction Machinery</option>' +
            '<option value="100010" id="i10">Transportation & Logistics</option>' +
            '<option value="100011" id="i11">Employment Services</option>' +
            '<option value="100012" id="i12">Truck Manufacturing</option>' +
            '<option value="100013" id="i13">Conglomerates</option>' +
            '<option value="101001" id="i14">Computer Hardware</option>' +
            '<option value="101002" id="i15">Online Media</option>' +
            '<option value="101003" id="i16">Application Software</option>' +
            '<option value="101004" id="i17">Semiconductors</option>' +
            '<option value="101005" id="i18">Communication Equipment</option>' +
            '<option value="102001" id="i19">Retail - Defensive</option>' +
            '<option value="102002" id="i20">Consumer Packaged Goods</option>' +
            '<option value="102003" id="i21">Tobacco Products</option>' +
            '<option value="102004" id="i22">Beverages - Alcoholic</option>' +
            '<option value="102005" id="i23">Beverages - Non-Alcoholic</option>' +
            '<option value="102006" id="i24">Education</option>' +
            '<option value="103001" id="i25">Entertainment</option>' +
            '<option value="103002" id="i26">Retail - Apparel & Specialty</option>' +
            '<option value="103003" id="i27">Restaurants</option>' +
            '<option value="103004" id="i28">Manufacturing - Apparel & Furniture</option>' +
            '<option value="103005" id="i29">Autos</option>' +
            '<option value="103011" id="i30">Advertising & Marketing Services</option>' +
            '<option value="103013" id="i31">Homebuilding & Construction</option>' +
            '<option value="103015" id="i32">Travel & Leisure</option>' +
            '<option value="103018" id="i33">Packaging & Containers</option>' +
            '<option value="103020" id="i34">Personal Services</option>' +
            '<option value="103026" id="i35">Publishing</option>' +
            '<option value="104001" id="i36">Asset Management</option>' +
            '<option value="104002" id="i37">Banks</option>' +
            '<option value="104003" id="i38">Brokers+ Exchanges & Other</option>' +
            '<option value="104004" id="i39">Insurance - Life</option>' +
            '<option value="104005" id="i40">Insurance</option>' +
            '<option value="104006" id="i41">Insurance - Property & Casualty</option>' +
            '<option value="104007" id="i42">Credit Services</option>' +
            '<option value="104013" id="i43">Insurance - Specialty</option>' +
            '<option value="105001" id="i44">Utilities - Regulated</option>' +
            '<option value="105002" id="i45">Utilities - Independent Power Producers</option>' +
            '<option value="106001" id="i46">Medical Diagnostics & Research</option>' +
            '<option value="106002" id="i47">Biotechnology</option>' +
            '<option value="106003" id="i48">Medical Instruments & Equipment</option>' +
            '<option value="106004" id="i49">Medical Devices</option>' +
            '<option value="106005" id="i50">Drug Manufacturers</option>' +
            '<option value="106006" id="i51">Health Care Plans</option>' +
            '<option value="106011" id="i52">Health Care Providers</option>' +
            '<option value="106014" id="i53">Medical Distribution</option>' +
            '<option value="107001" id="i54">Oil & Gas - Refining & Marketing</option>' +
            '<option value="107002" id="i55">Oil & Gas - E&P</option>' +
            '<option value="107003" id="i56">Oil & Gas - Midstream</option>' +
            '<option value="107004" id="i57">Oil & Gas - Services</option>' +
            '<option value="107005" id="i58">Oil & Gas - Integrated</option>' +
            '<option value="107006" id="i59">Oil & Gas - Drilling</option>' +
            '<option value="107007" id="i60">Alternative Energy Sources & Other</option>' +
            '<option value="108001" id="i61">Communication Services</option>' +
            '<option value="108002" id="i62">Consulting</option>' +
            '<option value="108003" id="i63">HR & Staffing</option>' +
            '<option value="108004" id="i64">Business Other</option>' +
            '<option value="109001" id="i65">REITs</option>' +
            '<option value="109002" id="i66">Real Estate Services</option>' +
            '<option value="110001" id="i67">Chemicals</option>' +
            '<option value="110002" id="i68">Forest Products</option>' +
            '<option value="110003" id="i69">Agriculture</option>' +
            '<option value="110004" id="i70">Metals & Mining</option>' +
            '<option value="110005" id="i71">Building Materials</option>' +
            '<option value="110006" id="i72">Coal</option>' +
            '<option value="110007" id="i73">Steel</option>' +
            '<option value="111001" id="i74">Diversified Holdings</option>' +
            '</select>' +
            '<input id="inputp3" type="text" placeholder="Percentage amount" >' + //style=" width:350px; height:25px; font-size: 12px; "
            '<input id="inputa3" type="text" placeholder="Amount of companies" >' + //style=" width:350px; height:25px; font-size: 12px; "
            // '<button class="create-btn" id="btn12"  onclick="ConfirmRule(103)">+</button>' + //style="width: 50px; display: inline-block; position: relative; left: 5px; bottom: 1px;"
            '<a class="waves-effect waves-light btn blue right" onclick="ConfirmRule2(103)" >Confirm Rule</a>' +
            '</div>' +
            '</div>' +
            '</div>'
    }

    if (document.getElementById('r13').selected == true) {
        counter++;
        rule.innerHTML =
            '<b >' + document.getElementById('r13').textContent + '</b>' + //style="color: black; position: relative; bottom: 180px; right: 10px;"
            '<div class="amount-input-row">' +
            '<div class="card2" id="etfbody">' + // style="width:1125px ; position: relative; bottom: 110px; right: 12px"
            //  '<label for="etf" style=" color: white; position: relative; top: 8px; left: 10px;" id="label2"><b>Rule:</b></label>' +
            '<div class="custom-select" >' + //style="display: inline-block; position: relative; top:5px; left:25px;"
            '<input id="inputp4" type="text" placeholder="Percentage" >' + //style=" width:350px; height:25px; font-size: 12px; "
            '<input id="inputa4" type="text" placeholder="Amount of companies" >' + //style=" width:350px; height:25px; font-size: 12px; "
            // '<button class="create-btn" id="btn13"  onclick="ConfirmRule(104)">+</button>' + //style="width: 50px; display: inline-block; position: relative; left: 265px; bottom: 1px;"
            '<a class="waves-effect waves-light btn blue right" onclick="ConfirmRule2(104)" >Confirm Rule</a>' +
            '</div>' +
            '</div>' +
            '</div>'

    }

    if (document.getElementById('r14').selected == true) {
        counter++;
        rule.innerHTML = '<b >' + document.getElementById('r14').textContent + '</b>' + //style="color: black; position: relative; bottom: 180px; right: 10px;"
            '<div class="amount-input-row">' +
            '<div class="card2" id="etfbody" >' + //style="width:1125px ; position: relative; bottom: 110px; right: 12px"
            // '<label for="etf" style=" color: white; position: relative; top: 8px; left: 10px;" id="label2"><b>Rule:</b></label>' +
            '<div class="custom-select">' + // style="display: inline-block; position: relative; top:5px; left:25px;"
            '<select id="cbropt2">' +
            '<option disabled selected hidden value="0">Select a country exchange:</option>' +
            '<option value="AS" id="e1">AS: NYSE EURONEXT - EURONEXT AMSTERDAM</option>' +
            '<option value="AT" id="e2">AT: ATHENS EXCHANGE S.A. CASH MARKET</option>' +
            '<option value="AX" id="e3">AX: ASX - ALL MARKETS</option>' +
            '<option value="BA" id="e4">BA: BOLSA DE COMERCIO DE BUENOS AIRES</option>' +
            '<option value="BC" id="e5">BC: BOLSA DE VALORES DE COLOMBIA</option>' +
            '<option value="BD" id="e6">BD: BUDAPEST STOCK EXCHANGE</option>' +
            '<option value="BE" id="e7">BE: BOERSE BERLIN</option>' +
            '<option value="BK" id="e8">BK: STOCK EXCHANGE OF THAILAND</option>' +
            '<option value="BO" id="e9">BO: BSE LTD</option>' +
            '<option value="BR" id="e10">BR: NYSE EURONEXT - EURONEXT BRUSSELS</option>' +
            '<option value="CA" id="e11">CA: Egyptian Stock Exchange</option>' +
            '<option value="CN" id="e12">CN: CANADIAN NATIONAL STOCK EXCHANGE</option>' +
            '<option value="CO" id="e13">CO: OMX NORDIC EXCHANGE COPENHAGEN A/S</option>' +
            '<option value="CR" id="e14">CR: CARACAS STOCK EXCHANGE</option>' +
            '<option value="DB" id="e15">DB: DUBAI FINANCIAL MARKET</option>' +
            '<option value="DE" id="e16">DE: XETRA</option>' +
            '<option value="DU" id="e17">DU: BOERSE DUESSELDORF</option>' +
            '<option value="F" id="e18">F: DEUTSCHE BOERSE AG</option>' +
            '<option value="HE" id="e19">HE: NASDAQ OMX HELSINKI LTD</option>' +
            '<option value="HK" id="e20">HK: HONG KONG EXCHANGES AND CLEARING LTD</option>' +
            '<option value="HM" id="e21">HM: HANSEATISCHE WERTPAPIERBOERSE HAMBURG</option>' +
            '<option value="IC" id="e22">IC: NASDAQ OMX ICELAND</option>' +
            '<option value="IR" id="e23">IR: IRISH STOCK EXCHANGE - ALL MARKET</option>' +
            '<option value="IS" id="e24">IS: BORSA ISTANBUL</option>' +
            '<option value="JK" id="e25">JK: INDONESIA STOCK EXCHANGE</option>' +
            '<option value="JO" id="e26">JO: JOHANNESBURG STOCK EXCHANGE</option>' +
            '<option value="KL" id="e27">KL: BURSA MALAYSIA</option>' +
            '<option value="KQ" id="e28">KQ: KOREA EXCHANGE (KOSDAQ)</option>' +
            '<option value="KS" id="e29">KS: KOREA EXCHANGE (STOCK MARKET)</option>' +
            '<option value="L" id="e30">L: LONDON STOCK EXCHANGE</option>' +
            '<option value="LN" id="e31">LN: Euronext London</option>' +
            '<option value="LS" id="e32">LS: NYSE EURONEXT - EURONEXT LISBON</option>' +
            '<option value="MC" id="e33">MC: BOLSA DE MADRID</option>' +
            '<option value="ME" id="e34">ME: MOSCOW EXCHANGE</option>' +
            '<option value="MI" id="e35">MI: Italian Stock Exchange</option>' +
            '<option value="MU" id="e36">MU: BOERSE MUENCHEN</option>' +
            '<option value="MX" id="e37">MX: BOLSA MEXICANA DE VALORES (MEXICAN STOCK EXCHANGE)</option>' +
            '<option value="NE" id="e38">NE: AEQUITAS NEO EXCHANGE</option>' +
            '<option value="NL" id="e39">NL: Nigerian Stock Exchange</option>' +
            '<option value="NS" id="e40">NS: NATIONAL STOCK EXCHANGE OF INDIA</option>' +
            '<option value="NZ" id="e41">NZ: NEW ZEALAND EXCHANGE LTD</option>' +
            '<option value="OL" id="e42">OL: OSLO BORS ASA</option>' +
            '<option value="PA" id="e43">PA: NYSE EURONEXT - MARCHE LIBRE PARIS</option>' +
            '<option value="PM" id="e44">PM: Philippine Stock Exchange</option>' +
            '<option value="PR" id="e45">PR: PRAGUE STOCK EXCHANGE</option>' +
            '<option value="QA" id="e46">QA: QATAR EXCHANGE</option>' +
            '<option value="RG" id="e47">RG: NASDAQ OMX RIGA</option>' +
            '<option value="SA" id="e48">SA: Brazil Bolsa - Sao Paolo</option>' +
            '<option value="SG" id="e49">SG: BOERSE STUTTGART</option>' +
            '<option value="SI" id="e50">SI: SINGAPORE EXCHANGE</option>' +
            '<option value="SN" id="e51">SN: SANTIAGO STOCK EXCHANGE</option>' +
            '<option value="SR" id="e52">SR: SAUDI STOCK EXCHANGE</option>' +
            '<option value="SS" id="e53">SS: SHANGHAI STOCK EXCHANGE</option>' +
            '<option value="ST" id="e54">ST: NASDAQ OMX NORDIC STOCKHOLM</option>' +
            '<option value="SW" id="e55">SW: SWISS EXCHANGE</option>' +
            '<option value="SZ" id="e56">SZ: SHENZHEN STOCK EXCHANGE</option>' +
            '<option value="T" id="e57">T: TOKYO STOCK EXCHANGE-TOKYO PRO MARKET</option>' +
            '<option value="TA" id="e58">TA: TEL AVIV STOCK EXCHANGE</option>' +
            '<option value="TL" id="e59">TL: NASDAQ OMX TALLINN</option>' +
            '<option value="TO" id="e60">TO: TORONTO STOCK EXCHANGE</option>' +
            '<option value="TW" id="e61">TW: TAIWAN STOCK EXCHANGE</option>' +
            '<option value="TWO" id="e62">TWO: TPEx</option>' +
            '<option value="US" id="e63">US: US exchanges (NYSE, Nasdaq)</option>' +
            '<option value="V" id="e64">V: TSX VENTURE EXCHANGE - NEX</option>' +
            '<option value="VI" id="e65">VI: Vienna Stock Exchange</option>' +
            '<option value="VN" id="e66">VN: Vietnam exchanges including HOSE, HNX and UPCOM</option>' +
            '<option value="VS" id="e67">VS: NASDAQ OMX VILNIUS</option>' +
            '<option value="WA" id="e68">WA: WARSAW STOCK EXCHANGE/EQUITIES/MAIN MARKET</option>' +
            '<option value="HA" id="e69">HA: Hanover Stock Exchange</option>' +
            '<option value="SX" id="e70">SX: DEUTSCHE BOERSE Stoxx</option>' +
            '<option value="TG" id="e71">TG: DEUTSCHE BOERSE TradeGate </option>' +
            '<option value="SC" id="e72">SC: BOERSE_FRANKFURT_ZERTIFIKATE</option>' +
            '</select>' +
            '<input id="inputp5" type="text" placeholder="Percentage amount" >' + //style=" width:130px; height:25px; font-size: 12px; "
            '<input id="inputa5" type="text" placeholder="Amount of companies" >' + //style=" width:150px; height:25px; font-size: 12px; "
            // '<button class="create-btn" id="btn14"  onclick="ConfirmRule(105)">+</button>' + //style="width: 50px; display: inline-block; position: relative; left: 55px; bottom: 1px;"
            '<a class="waves-effect waves-light btn blue right" onclick="ConfirmRule2(105)" >Confirm Rule</a>' +
            '</div>' +
            '</div>' +
            '</div>'
    }

    if (document.getElementById('r15').selected == true) {
        counter++;
        rule.innerHTML = '<b >' + document.getElementById('r15').textContent + '</b>' + // style="color: black; position: relative; bottom: 180px; right: 10px;"
            '<div class="amount-input-row">' +
            '<div class="card2" id="etfbody">' + // style="width:1125px ; position: relative; bottom: 110px; right: 12px"
            // '<label for="etf" style=" color: white; position: relative; top: 8px; left: 10px;" id="label2"><b>Rule:</b></label>' +
            '<div class="custom-select" >' + //style="display: inline-block; position: relative; top:5px; left:25px;"
            '<input id="inputp6" type="text" placeholder="Percentage">' + // style=" width:350px; height:25px; font-size: 12px; "
            '<input id="inputa6" type="text" placeholder="Amount of companies">' + // style=" width:350px; height:25px; font-size: 12px; "
            // '<button class="create-btn" id="btn15"  onclick="ConfirmRule(106)">+</button>' + //style="width: 50px; display: inline-block; position: relative; left: 255px; bottom: 1px;"
            '<a class="waves-effect waves-light btn blue right" onclick="ConfirmRule2(106)" >Confirm Rule</a>' +
            '</div>' +
            '</div>' +
            '</div>'
    }

    if (document.getElementById('r16').selected == true) {
        counter++;
        rule.innerHTML = '<b >' + document.getElementById('r16').textContent + '</b>' + //style="color: black; position: relative; bottom: 180px; right: 10px;"
            '<div class="amount-input-row">' +
            '<div class="card2" id="etfbody" >' + //style="width:1125px ; position: relative; bottom: 110px; right: 12px"
            '<div class="custom-select" >' + //style="display: inline-block; position: relative; top:5px; left:25px;"
            '<input id="inputw" type="text" placeholder="Balance period in weeks" >' + //style=" width:350px; height:25px; font-size: 12px; "
            '<a class="waves-effect waves-light btn blue right" onclick="ConfirmRule2(200)" >Confirm Rule</a>' +
            '</div>' +
            '</div>' +
            '</div>'
    }


    if (document.getElementById('r18').selected == true) {
        counter++;
        rule.innerHTML = '<b >' + document.getElementById('r18').textContent + '</b>' + //style="color: black; position: relative; bottom: 130px; right: 10px;"
            '<div class="amount-input-row">' +
            '<div class="card2" id="etfbody">' + // style="width:1125px ; position: relative; bottom: 70px; right: 12px"
            '<div class="custom-select" >' + //style="display: inline-block; position: relative; top:5px; left:25px;"
            '<input id="inputw" type="text" placeholder="Number of weeks until reconsideration" >' +
            '<a class="waves-effect waves-light btn blue right" onclick="ConfirmRule2(202)" >Confirm Rule</a>' +
            '</div>' +
            '</div>' +
            '</div>'
    }

}

function confirm() {
    document.getElementById("btn").innerHTML = ''

    document.getElementById("btn").innerHTML += '  <a class="waves-effect waves-light btn blue right" onclick="addRule()" >add</a> '
    console.log(document.getElementById("options").value)
    etfid = document.getElementById("options").value

    const loaderDiv = document.getElementById('etfeditor');
    loaderDiv.classList.add('etfeditor');

    document.getElementById("etfeditor").innerHTML =
      
        '<a class="waves-effect waves-light btn blue" onclick="editamount()">Edit Amount</a>' + " " +
        '<a class="waves-effect waves-light btn blue" onclick="editname()">Edit Name</a>' + " " +
        '<a class="waves-effect waves-light btn blue" onclick="clearRules()">Clear Rules</a>' + " " +
        '<a class="waves-effect waves-light btn blue right" onclick="deleteETF()"> Delete ETF</a>' 


        document.getElementById("ruleadder").innerHTML =
            "<div class=\"amount-input-row\">\n" +
            "                <div class=\"card2\" id=\"etfbody\" >\n" + 
            "                    <div class=\"custom-select\" >\n" + 
            "\n" +
            "                        <select>\n" +
            "                          <option disabled selected hidden value=\"0\">Select rule:</option>\n" +
            "\n" +
            "                          <option value=\"1\" id=\"r1\">Reject specific companies by ticker.</option>\n" +
            "                          <option value=\"2\" id=\"r2\">Reject specific sectors by name.</option>\n" +
            "                          <option value=\"3\" id=\"r3\">Reject specific industries by name.</option>\n" +
            "                          <option value=\"4\" id=\"r4\">Reject companies based in specific countries.</option>\n" +
            "                          <option value=\"6\" id=\"r6\">Set the market cap min and max values.</option>\n" +
            "                          <option value=\"7\" id=\"r7\">Set the earnings min and max value.</option>\n" +
            "                          <option value=\"8\" id=\"r8\">Set a minimum and maximum price for shares.</option>\n" +
            "                          <option value=\"10\" id=\"r10\">Request certain companies by ticker.</option>\n" +
            "                          <option value=\"11\" id=\"r11\">Request a percentage in a specific sector.</option>\n" +
            "                          <option value=\"12\" id=\"r12\">Request a percentage in a specific industry by name or ticker</option>\n" +
            "                          <option value=\"13\" id=\"r13\">Request the companies with the highest market cap</option>\n" +
            "                          <option value=\"14\" id=\"r14\">Invest in companies based in specific countries</option>\n" +
            "                          <option value=\"15\" id=\"r15\">Request the companies with the highest revenue</option>\n" +
            "                           <option  value=\"16\" id=\"r16\">Set a balance period</option>\n" +
            "                          <option  value=\"18\" id=\"r18\">Set reconsider period</option>\n" +
            "\n" +
            "                        </select>\n" +
            "                    </div>\n" +
            "\n" +
            "                    <div class=\"create-button-div-add row\">\n" +
            "\n"
    "                    </div>\n" +
    "\n" +
    "\n" +
    "                </div>\n" +
    "            </div>"


    // validatenaa()
    getRules()


}

function confirm2() {




    getETFS();
    document.getElementById("ruleadder").innerHTML =
        "<div class=\"amount-input-row\">\n" +
        "                <div class=\"card2\" id=\"etfbody\" >\n" + //style="width:108% ; position: relative; bottom: 95px; right: 12px"
        "                    <div class=\"custom-select\" >\n" + //style="width:200px; display: inline-block; position: relative; left: 12px; top: 8px;"
        "\n" +
        "                        <select>\n" +
        "                          <option disabled selected hidden value=\"0\">Select rule:</option>\n" +
        "\n" +
        "                          <option value=\"1\" id=\"r1\">Reject specific companies by ticker.</option>\n" +
        "                          <option value=\"2\" id=\"r2\">Reject specific sectors by name.</option>\n" +
        "                          <option value=\"3\" id=\"r3\">Reject specific industries by name.</option>\n" +
        "                          <option value=\"4\" id=\"r4\">Reject companies based in specific countries.</option>\n" +
        "                          <option value=\"6\" id=\"r6\">Set the market cap min and max values.</option>\n" +
        "                          <option value=\"7\" id=\"r7\">Set the earnings min and max value.</option>\n" +
        "                          <option value=\"8\" id=\"r8\">Set a minimum and maximum price for shares.</option>\n" +
        "                          <option value=\"10\" id=\"r10\">Request certain companies by ticker.</option>\n" +
        "                          <option value=\"11\" id=\"r11\">Request a percentage in a specific sector.</option>\n" +
        "                          <option value=\"12\" id=\"r12\">Request a percentage in a specific industry by name or ticker</option>\n" +
        "                          <option value=\"13\" id=\"r13\">Request the companies with the highest market cap</option>\n" +
        "                          <option value=\"14\" id=\"r14\">Invest in companies based in specific countries</option>\n" +
        "                          <option value=\"15\" id=\"r15\">Request the companies with the highest revenue</option>\n" +
        "                          <option  value=\"16\" id=\"r16\">Set a balance period</option>\n" +
        "                          <option  value=\"18\" id=\"r18\">Set reconsider period</option>\n" +
        "\n" +
        "                        </select>\n" +
        "                    </div>\n" +
        "\n" +
        "                    <div class=\"create-button-div-add row\">\n" +
        "\n"
    "                    </div>\n" +
    "\n" +
    "\n" +
    "                </div>\n" +
    "            </div>"


    addRule2()


}

function getRules() {
    var amt = 0;

    document.getElementById("ruleslist").innerHTML = '';

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
            const jd = JSON.parse(data)
            if (jd.status == "failure") {
                console.log(jd.error);
       
            } else {
                console.log(jd);
                let numofetfs = jd.Data.length;
                document.getElementById("ruleslist").innerHTML = '';



                for (var i = 0; i < numofetfs; i++) {
                    if (jd.Data[i].ETFID == document.getElementById("options").value) {
                        console.log(jd.Data[i].Rules)
                        exportValues.push(jd.Data[i].Rules);
                        for (var j = 0; j < jd.Data[i].Rules.length; j++) {
                            if (jd.Data[i].Rules[j][0] == "000") {
                                document.getElementById("ruleslist").innerHTML += "Reject Company by Ticker: " + jd.Data[i].Rules[j][1] + "<br>"
                            } else if (jd.Data[i].Rules[j][0] == "001") {
                                if (jd.Data[i].Rules[j][1] == "100") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Sector by Name: Industrials<br>"
                                } else if (jd.Data[i].Rules[j][1] == "101") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Sector by Name: Technology<br>"
                                } else if (jd.Data[i].Rules[j][1] == "102") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Sector by Name: Consumer Defensive<br>"
                                } else if (jd.Data[i].Rules[j][1] == "103") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Sector by Name: Consumer Cyclical<br>"
                                } else if (jd.Data[i].Rules[j][1] == "104") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Sector by Name: Financial Services<br>"
                                } else if (jd.Data[i].Rules[j][1] == "105") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Sector by Name: Utilities<br>"
                                } else if (jd.Data[i].Rules[j][1] == "106") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Sector by Name: Healthcare<br>"
                                } else if (jd.Data[i].Rules[j][1] == "107") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Sector by Name: Energy<br>"
                                } else if (jd.Data[i].Rules[j][1] == "108") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Sector by Name: Business Services<br>"
                                } else if (jd.Data[i].Rules[j][1] == "109") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Sector by Name: Real Estate<br>"
                                } else if (jd.Data[i].Rules[j][1] == "110") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Sector by Name: Basic Materials<br>"
                                } else if (jd.Data[i].Rules[j][1] == "111") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Sector by Name: Other<br>"
                                }

                            } else if (jd.Data[i].Rules[j][0] == "002") {
                                if (jd.Data[i].Rules[j][1] == "100001") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Industrial Products<br>"
                                } else if (jd.Data[i].Rules[j][1] == "100002") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Business Services<br>"
                                } else if (jd.Data[i].Rules[j][1] == "100003") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Engineering & Construction<br>"
                                } else if (jd.Data[i].Rules[j][1] == "100004") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Waste Management<br>"
                                } else if (jd.Data[i].Rules[j][1] == "100005") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Industrial Distribution<br>"
                                } else if (jd.Data[i].Rules[j][1] == "100006") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Airlines<br>"
                                } else if (jd.Data[i].Rules[j][1] == "100007") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Consulting & Outsourcing<br>"
                                } else if (jd.Data[i].Rules[j][1] == "100008") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Aerospace & Defense<br>"
                                } else if (jd.Data[i].Rules[j][1] == "100009") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Farm & Construction Machinery<br>"
                                } else if (jd.Data[i].Rules[j][1] == "100010") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Transportation & Logistics<br>"
                                } else if (jd.Data[i].Rules[j][1] == "100011") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Employment Services<br>"
                                } else if (jd.Data[i].Rules[j][1] == "100012") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Truck Manufacturing<br>"
                                } else if (jd.Data[i].Rules[j][1] == "100013") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Conglomerates<br>"
                                } else if (jd.Data[i].Rules[j][1] == "101001") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Computer Hardware<br>"
                                } else if (jd.Data[i].Rules[j][1] == "101002") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Online Media<br>"
                                } else if (jd.Data[i].Rules[j][1] == "101003") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Application Software<br>"
                                } else if (jd.Data[i].Rules[j][1] == "101004") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Semiconductors<br>"
                                } else if (jd.Data[i].Rules[j][1] == "101005") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Communication Equipment<br>"
                                } else if (jd.Data[i].Rules[j][1] == "102001") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Retail - Defensive<br>"
                                } else if (jd.Data[i].Rules[j][1] == "102002") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Consumer Packaged Goods<br>"
                                } else if (jd.Data[i].Rules[j][1] == "102003") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Tobacco Products<br>"
                                } else if (jd.Data[i].Rules[j][1] == "102004") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Beverages - Alcoholic<br>"
                                } else if (jd.Data[i].Rules[j][1] == "102005") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Beverages - Non-Alcoholic<br>"
                                } else if (jd.Data[i].Rules[j][1] == "102006") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Education<br>"
                                } else if (jd.Data[i].Rules[j][1] == "103001") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Entertainment<br>"
                                } else if (jd.Data[i].Rules[j][1] == "103002") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Retail - Apparel & Specialty<br>"
                                } else if (jd.Data[i].Rules[j][1] == "103003") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Restaurants<br>"
                                } else if (jd.Data[i].Rules[j][1] == "103004") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Manufacturing - Apparel & Furniture<br>"
                                } else if (jd.Data[i].Rules[j][1] == "103005") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Autos<br>"
                                } else if (jd.Data[i].Rules[j][1] == "103011") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Advertising & Marketing Services<br>"
                                } else if (jd.Data[i].Rules[j][1] == "103013") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Homebuilding & Construction<br>"
                                } else if (jd.Data[i].Rules[j][1] == "103015") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Travel & Leisure<br>"
                                } else if (jd.Data[i].Rules[j][1] == "103018") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Packaging & Containers<br>"
                                } else if (jd.Data[i].Rules[j][1] == "103020") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Personal Services<br>"
                                } else if (jd.Data[i].Rules[j][1] == "103026") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Publishing<br>"
                                } else if (jd.Data[i].Rules[j][1] == "104001") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Asset Management<br>"
                                } else if (jd.Data[i].Rules[j][1] == "104002") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Banks<br>"
                                } else if (jd.Data[i].Rules[j][1] == "104003") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Brokers+ Exchanges & Other<br>"
                                } else if (jd.Data[i].Rules[j][1] == "104004") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Insurance - Life<br>"
                                } else if (jd.Data[i].Rules[j][1] == "104005") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Insurance<br>"
                                } else if (jd.Data[i].Rules[j][1] == "104006") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Insurance - Property & Casualty<br>"
                                } else if (jd.Data[i].Rules[j][1] == "104007") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Credit Services<br>"
                                } else if (jd.Data[i].Rules[j][1] == "104013") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Insurance - Specialty<br>"
                                } else if (jd.Data[i].Rules[j][1] == "105001") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Utilities - Regulated<br>"
                                } else if (jd.Data[i].Rules[j][1] == "105002") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Utilities - Independent Power Producers<br>"
                                } else if (jd.Data[i].Rules[j][1] == "106001") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Medical Diagnostics & Research<br>"
                                } else if (jd.Data[i].Rules[j][1] == "106002") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Biotechnology<br>"
                                } else if (jd.Data[i].Rules[j][1] == "106003") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Medical Instruments & Equipment<br>"
                                } else if (jd.Data[i].Rules[j][1] == "106004") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Medical Devices<br>"
                                } else if (jd.Data[i].Rules[j][1] == "106005") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Drug Manufacturers<br>"
                                } else if (jd.Data[i].Rules[j][1] == "106006") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Health Care Plans<br>"
                                } else if (jd.Data[i].Rules[j][1] == "106011") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Health Care Providers<br>"
                                } else if (jd.Data[i].Rules[j][1] == "106014") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Medical Distribution<br>"
                                } else if (jd.Data[i].Rules[j][1] == "107001") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Oil & Gas - Refining & Marketing<br>"
                                } else if (jd.Data[i].Rules[j][1] == "107002") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Oil & Gas - E&P<br>"
                                } else if (jd.Data[i].Rules[j][1] == "107003") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Oil & Gas - Midstream<br>"
                                } else if (jd.Data[i].Rules[j][1] == "107004") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Oil & Gas - Services<br>"
                                } else if (jd.Data[i].Rules[j][1] == "107005") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Oil & Gas - Integrated<br>"
                                } else if (jd.Data[i].Rules[j][1] == "107006") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Oil & Gas - Drilling<br>"
                                } else if (jd.Data[i].Rules[j][1] == "107007") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Alternative Energy Sources & Other<br>"
                                } else if (jd.Data[i].Rules[j][1] == "108001") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Communication Services<br>"
                                } else if (jd.Data[i].Rules[j][1] == "108002") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Consulting<br>"
                                } else if (jd.Data[i].Rules[j][1] == "108003") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: HR & Staffing<br>"
                                } else if (jd.Data[i].Rules[j][1] == "108004") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Business Other<br>"
                                } else if (jd.Data[i].Rules[j][1] == "109001") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: REITs<br>"
                                } else if (jd.Data[i].Rules[j][1] == "109002") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Real Estate Services<br>"
                                } else if (jd.Data[i].Rules[j][1] == "110001") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Chemicals<br>"
                                } else if (jd.Data[i].Rules[j][1] == "110002") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Forest Products<br>"
                                } else if (jd.Data[i].Rules[j][1] == "110003") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Agriculture<br>"
                                } else if (jd.Data[i].Rules[j][1] == "110004") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Metals & Mining<br>"
                                } else if (jd.Data[i].Rules[j][1] == "110005") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Building Materials<br>"
                                } else if (jd.Data[i].Rules[j][1] == "110006") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Coal<br>"
                                } else if (jd.Data[i].Rules[j][1] == "110007") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Steel<br>"
                                } else if (jd.Data[i].Rules[j][1] == "111001") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Diversified Holdings<br>"
                                }


                            } else if (jd.Data[i].Rules[j][0] == "003") {
                                if (jd.Data[i].Rules[j][1] == "AS") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: NYSE EURONEXT - EURONEXT AMSTERDAM<br>"
                                } else if (jd.Data[i].Rules[j][1] == "AT") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: ATHENS EXCHANGE S.A. CASH MARKET<br>"
                                } else if (jd.Data[i].Rules[j][1] == "AX") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: ASX - ALL MARKETS<br>"
                                } else if (jd.Data[i].Rules[j][1] == "BA") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: BOLSA DE COMERCIO DE BUENOS AIRES<br>"
                                } else if (jd.Data[i].Rules[j][1] == "BC") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: BOLSA DE VALORES DE COLOMBIA\n<br>"
                                } else if (jd.Data[i].Rules[j][1] == "BD") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: BUDAPEST STOCK EXCHANGE\n<br>"
                                } else if (jd.Data[i].Rules[j][1] == "BE") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: BOERSE BERLIN<br>"
                                } else if (jd.Data[i].Rules[j][1] == "BK") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: STOCK EXCHANGE OF THAILAND<br>"
                                } else if (jd.Data[i].Rules[j][1] == "BO") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: BSE LTD<br>"
                                } else if (jd.Data[i].Rules[j][1] == "BR") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: NYSE EURONEXT - EURONEXT BRUSSELS<br>"
                                } else if (jd.Data[i].Rules[j][1] == "CA") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: Egyptian Stock Exchange<br>"
                                } else if (jd.Data[i].Rules[j][1] == "CN") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: CANADIAN NATIONAL STOCK EXCHANGE<br>"
                                } else if (jd.Data[i].Rules[j][1] == "CO") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: OMX NORDIC EXCHANGE COPENHAGEN A/S<br>"
                                } else if (jd.Data[i].Rules[j][1] == "CR") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: CARACAS STOCK EXCHANGE<br>"
                                } else if (jd.Data[i].Rules[j][1] == "DB") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: DUBAI FINANCIAL MARKET<br>"
                                } else if (jd.Data[i].Rules[j][1] == "DE") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: XETRA<br>"
                                } else if (jd.Data[i].Rules[j][1] == "DU") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: BOERSE DUESSELDORF<br>"
                                } else if (jd.Data[i].Rules[j][1] == "F") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: DEUTSCHE BOERSE AG<br>"
                                } else if (jd.Data[i].Rules[j][1] == "HE") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: NASDAQ OMX HELSINKI LTD<br>"
                                } else if (jd.Data[i].Rules[j][1] == "HK") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: HONG KONG EXCHANGES AND CLEARING LTD<br>"
                                } else if (jd.Data[i].Rules[j][1] == "HM") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: HANSEATISCHE WERTPAPIERBOERSE HAMBURG<br>"
                                } else if (jd.Data[i].Rules[j][1] == "IC") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: NASDAQ OMX ICELAND<br>"
                                } else if (jd.Data[i].Rules[j][1] == "IR") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: IRISH STOCK EXCHANGE - ALL MARKET<br>"
                                } else if (jd.Data[i].Rules[j][1] == "IS") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: BORSA ISTANBUL<br>"
                                } else if (jd.Data[i].Rules[j][1] == "JK") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: INDONESIA STOCK EXCHANGE<br>"
                                } else if (jd.Data[i].Rules[j][1] == "JO") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: JOHANNESBURG STOCK EXCHANGE<br>"
                                } else if (jd.Data[i].Rules[j][1] == "KL") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: BURSA MALAYSIA<br>"
                                } else if (jd.Data[i].Rules[j][1] == "KQ") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: KOREA EXCHANGE (KOSDAQ)<br>"
                                } else if (jd.Data[i].Rules[j][1] == "KS") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: KOREA EXCHANGE (STOCK MARKET)<br>"
                                } else if (jd.Data[i].Rules[j][1] == "L") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: LONDON STOCK EXCHANGE<br>"
                                } else if (jd.Data[i].Rules[j][1] == "LN") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: Euronext London<br>"
                                } else if (jd.Data[i].Rules[j][1] == "LS") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: NYSE EURONEXT - EURONEXT LISBON<br>"
                                } else if (jd.Data[i].Rules[j][1] == "MC") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: BOLSA DE MADRID<br>"
                                } else if (jd.Data[i].Rules[j][1] == "ME") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: MOSCOW EXCHANGE<br>"
                                } else if (jd.Data[i].Rules[j][1] == "MI") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: Italian Stock Exchange<br>"
                                } else if (jd.Data[i].Rules[j][1] == "MU") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: BOERSE MUENCHEN<br>"
                                } else if (jd.Data[i].Rules[j][1] == "MX") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: BOLSA MEXICANA DE VALORES (MEXICAN STOCK EXCHANGE)<br>"
                                } else if (jd.Data[i].Rules[j][1] == "NE") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: AEQUITAS NEO EXCHANGE<br>"
                                } else if (jd.Data[i].Rules[j][1] == "NL") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: Nigerian Stock Exchange<br>"
                                } else if (jd.Data[i].Rules[j][1] == "NS") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: NATIONAL STOCK EXCHANGE OF INDIA<br>"
                                } else if (jd.Data[i].Rules[j][1] == "NZ") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: NEW ZEALAND EXCHANGE LTD<br>"
                                } else if (jd.Data[i].Rules[j][1] == "OL") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: OSLO BORS ASA<br>"
                                } else if (jd.Data[i].Rules[j][1] == "PA") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: NYSE EURONEXT - MARCHE LIBRE PARIS<br>"
                                } else if (jd.Data[i].Rules[j][1] == "PM") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: Philippine Stock Exchange<br>"
                                } else if (jd.Data[i].Rules[j][1] == "PR") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: PRAGUE STOCK EXCHANGE<br>"
                                } else if (jd.Data[i].Rules[j][1] == "QA") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: QATAR EXCHANGE<br>"
                                } else if (jd.Data[i].Rules[j][1] == "RG") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: NASDAQ OMX RIGA<br>"
                                } else if (jd.Data[i].Rules[j][1] == "SA") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: Brazil Bolsa - Sao Paolo<br>"
                                } else if (jd.Data[i].Rules[j][1] == "SG") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: BOERSE STUTTGART<br>"
                                } else if (jd.Data[i].Rules[j][1] == "SI") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: SINGAPORE EXCHANGE<br>"
                                } else if (jd.Data[i].Rules[j][1] == "SN") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: SANTIAGO STOCK EXCHANGE<br>"
                                } else if (jd.Data[i].Rules[j][1] == "SR") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: SAUDI STOCK EXCHANGE<br>"
                                } else if (jd.Data[i].Rules[j][1] == "SS") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: SHANGHAI STOCK EXCHANGE<br>"
                                } else if (jd.Data[i].Rules[j][1] == "ST") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: NASDAQ OMX NORDIC STOCKHOLM<br>"
                                } else if (jd.Data[i].Rules[j][1] == "SW") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: SWISS EXCHANGE<br>"
                                } else if (jd.Data[i].Rules[j][1] == "SZ") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: SHENZHEN STOCK EXCHANGE<br>"
                                } else if (jd.Data[i].Rules[j][1] == "T") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: TOKYO STOCK EXCHANGE-TOKYO PRO MARKET<br>"
                                } else if (jd.Data[i].Rules[j][1] == "TA") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: TEL AVIV STOCK EXCHANGE<br>"
                                } else if (jd.Data[i].Rules[j][1] == "TL") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: NASDAQ OMX TALLINN<br>"
                                } else if (jd.Data[i].Rules[j][1] == "TO") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: TORONTO STOCK EXCHANGE<br>"
                                } else if (jd.Data[i].Rules[j][1] == "TW") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: TAIWAN STOCK EXCHANGE<br>"
                                } else if (jd.Data[i].Rules[j][1] == "TWO") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: TPEx<br>"
                                } else if (jd.Data[i].Rules[j][1] == "US") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: US exchanges (NYSE, Nasdaq)<br>"
                                } else if (jd.Data[i].Rules[j][1] == "V") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: TSX VENTURE EXCHANGE - NEX<br>"
                                } else if (jd.Data[i].Rules[j][1] == "VI") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: Vienna Stock Exchange<br>"
                                } else if (jd.Data[i].Rules[j][1] == "VN") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: Vietnam exchanges including HOSE, HNX and UPCOM<br>"
                                } else if (jd.Data[i].Rules[j][1] == "VS") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: NASDAQ OMX VILNIUS<br>"
                                } else if (jd.Data[i].Rules[j][1] == "WA") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: WARSAW STOCK EXCHANGE/EQUITIES/MAIN MARKET<br>"
                                } else if (jd.Data[i].Rules[j][1] == "HA") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: Hanover Stock Exchange<br>"
                                } else if (jd.Data[i].Rules[j][1] == "SX") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: DEUTSCHE BOERSE Stoxx<br>"
                                } else if (jd.Data[i].Rules[j][1] == "TG") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: DEUTSCHE BOERSE TradeGate<br>"
                                } else if (jd.Data[i].Rules[j][1] == "SC") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: BOERSE_FRANKFURT_ZERTIFIKATE<br>"
                                }


                            } else if (jd.Data[i].Rules[j][0] == "011") {
                                document.getElementById("ruleslist").innerHTML += "Set Market Cap Min and Max:" + jd.Data[i].Rules[j][1] + "<br>"
                            } else if (jd.Data[i].Rules[j][0] == "012") {
                                document.getElementById("ruleslist").innerHTML += "Set Earnings Min and Max:" + jd.Data[i].Rules[j][1] + "<br>"
                            } else if (jd.Data[i].Rules[j][0] == "013") {
                                document.getElementById("ruleslist").innerHTML += "Set Stock Price Min and Max:" + jd.Data[i].Rules[j][1] + "<br>"
                            } else if (jd.Data[i].Rules[j][0] == "101") {
                                document.getElementById("ruleslist").innerHTML += "Request Company by Ticker: " + jd.Data[i].Rules[j][1] + "<br>"
                            } else if (jd.Data[i].Rules[j][0] == "102") {

                                if (jd.Data[i].Rules[j][1][0] == "100") {
                                    document.getElementById("ruleslist").innerHTML += "Request Sector by Name: Industrials " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "101") {
                                    document.getElementById("ruleslist").innerHTML += "Request Sector by Name: Technology " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "102") {
                                    document.getElementById("ruleslist").innerHTML += "Request Sector by Name: Consumer Defensive " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "103") {
                                    document.getElementById("ruleslist").innerHTML += "Request Sector by Name: Consumer Cyclical " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "104") {
                                    document.getElementById("ruleslist").innerHTML += "Request Sector by Name: Financial Services " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "105") {
                                    document.getElementById("ruleslist").innerHTML += "Request Sector by Name: Utilities " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "106") {
                                    document.getElementById("ruleslist").innerHTML += "Request Sector by Name: Healthcare " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "107") {
                                    document.getElementById("ruleslist").innerHTML += "Request Sector by Name: Energy " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "108") {
                                    document.getElementById("ruleslist").innerHTML += "Request Sector by Name: Business Services " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "109") {
                                    document.getElementById("ruleslist").innerHTML += "Request Sector by Name: Real Estate " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "110") {
                                    document.getElementById("ruleslist").innerHTML += "Request Sector by Name: Basic Materials " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "111") {
                                    document.getElementById("ruleslist").innerHTML += "Request Sector by Name: Other " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                }

                            } else if (jd.Data[i].Rules[j][0] == "103") {

                                if (jd.Data[i].Rules[j][1][0] == "100001") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Industrial Products " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "100002") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Business Services " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "100003") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Engineering & Construction " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "100004") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Waste Management " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "100005") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Industrial Distribution " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "100006") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Airlines " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "100007") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Consulting & Outsourcing " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "100008") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Aerospace & Defense " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "100009") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Farm & Construction Machinery " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "100010") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Transportation & Logistics " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "100011") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Employment Services " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "100012") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Truck Manufacturing " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "100013") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Conglomerates " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "101001") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Computer Hardware " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "101002") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Online Media " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "101003") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Application Software " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "101004") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Semiconductors " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "101005") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Communication Equipment " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "102001") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Retail - Defensive " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "102002") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Consumer Packaged Goods " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "102003") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Tobacco Products " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "102004") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Beverages - Alcoholic " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "102005") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Beverages - Non-Alcoholic " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "102006") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Education " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "103001") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Entertainment " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "103002") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Retail - Apparel & Specialty " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "103003") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Restaurants " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "103004") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Manufacturing - Apparel & Furniture " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "103005") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Autos " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "103011") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Advertising & Marketing Services " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "103013") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Homebuilding & Construction " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "103015") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Travel & Leisure " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "103018") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Packaging & Containers " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "103020") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Personal Services " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "103026") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Publishing " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "104001") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Asset Management " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "104002") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Banks " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "104003") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Brokers+ Exchanges & Other " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "104004") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Insurance - Life " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "104005") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Insurance " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "104006") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Insurance - Property & Casualty " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "104007") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Credit Services " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "104013") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Insurance - Specialty " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "105001") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Utilities - Regulated " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "105002") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Utilities - Independent Power Producers " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "106001") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Medical Diagnostics & Research " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "106002") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Biotechnology " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "106003") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Medical Instruments & Equipment " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "106004") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Medical Devices " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "106005") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Drug Manufacturers " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "106006") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Health Care Plans " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "106011") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Health Care Providers " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "106014") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Medical Distribution " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "107001") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Oil & Gas - Refining & Marketing " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "107002") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Oil & Gas - E&P " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "107003") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Oil & Gas - Midstream " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "107004") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Oil & Gas - Services " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "107005") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Oil & Gas - Integrated " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "107006") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Oil & Gas - Drilling " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "107007") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Alternative Energy Sources & Other " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "108001") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Communication Services " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "108002") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Consulting " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "108003") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: HR & Staffing " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "108004") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Business Other " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "109001") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: REITs " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "109002") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Real Estate Services " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "110001") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Chemicals " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "110002") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Forest Products " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "110003") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Agriculture " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "110004") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Metals & Mining " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "110005") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Building Materials " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "110006") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Coal " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "110007") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Steel " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "111001") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Diversified Holdings " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                }


                            } else if (jd.Data[i].Rules[j][0] == "104") {
                                document.getElementById("ruleslist").innerHTML += "Request the companies with the highest market cap:" + jd.Data[i].Rules[j][1] + "<br>"
                            } else if (jd.Data[i].Rules[j][0] == "105") {
                                console.log(jd.Data[i].Rules[j][1][0])
                                if (jd.Data[i].Rules[j][1][0] == "AS") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: NYSE EURONEXT - EURONEXT AMSTERDAM " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "AT") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: ATHENS EXCHANGE S.A. CASH MARKET " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "AX") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: ASX - ALL MARKETS " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "BA") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: BOLSA DE COMERCIO DE BUENOS AIRES " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "BC") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: BOLSA DE VALORES DE COLOMBIA\n " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "BD") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: BUDAPEST STOCK EXCHANGE\n " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "BE") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: BOERSE BERLIN " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "BK") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: STOCK EXCHANGE OF THAILAND " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "BO") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: BSE LTD " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "BR") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: NYSE EURONEXT - EURONEXT BRUSSELS " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "CA") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: Egyptian Stock Exchange " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "CN") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: CANADIAN NATIONAL STOCK EXCHANGE " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "CO") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: OMX NORDIC EXCHANGE COPENHAGEN A/S " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "CR") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: CARACAS STOCK EXCHANGE " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "DB") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: DUBAI FINANCIAL MARKET " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "DE") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: XETRA " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "DU") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: BOERSE DUESSELDORF " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "F") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: DEUTSCHE BOERSE AG " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "HE") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: NASDAQ OMX HELSINKI LTD " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "HK") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: HONG KONG EXCHANGES AND CLEARING LTD " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "HM") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: HANSEATISCHE WERTPAPIERBOERSE HAMBURG " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "IC") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: NASDAQ OMX ICELAND " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "IR") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: IRISH STOCK EXCHANGE - ALL MARKET " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "IS") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: BORSA ISTANBUL " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "JK") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: INDONESIA STOCK EXCHANGE " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "JO") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: JOHANNESBURG STOCK EXCHANGE " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "KL") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: BURSA MALAYSIA " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "KQ") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: KOREA EXCHANGE (KOSDAQ) " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "KS") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: KOREA EXCHANGE (STOCK MARKET) " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "L") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: LONDON STOCK EXCHANGE " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "LN") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: Euronext London " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "LS") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: NYSE EURONEXT - EURONEXT LISBON " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "MC") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: BOLSA DE MADRID " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "ME") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: MOSCOW EXCHANGE " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "MI") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: Italian Stock Exchange " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "MU") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: BOERSE MUENCHEN " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "MX") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: BOLSA MEXICANA DE VALORES (MEXICAN STOCK EXCHANGE) " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "NE") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: AEQUITAS NEO EXCHANGE " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "NL") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: Nigerian Stock Exchange " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "NS") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: NATIONAL STOCK EXCHANGE OF INDIA " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "NZ") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: NEW ZEALAND EXCHANGE LTD " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "OL") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: OSLO BORS ASA " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "PA") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: NYSE EURONEXT - MARCHE LIBRE PARIS " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "PM") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: Philippine Stock Exchange " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "PR") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: PRAGUE STOCK EXCHANGE " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "QA") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: QATAR EXCHANGE " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "RG") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: NASDAQ OMX RIGA " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "SA") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: Brazil Bolsa - Sao Paolo " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "SG") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: BOERSE STUTTGART " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "SI") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: SINGAPORE EXCHANGE " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "SN") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: SANTIAGO STOCK EXCHANGE " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "SR") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: SAUDI STOCK EXCHANGE " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "SS") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: SHANGHAI STOCK EXCHANGE " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "ST") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: NASDAQ OMX NORDIC STOCKHOLM " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "SW") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: SWISS EXCHANGE " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "SZ") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: SHENZHEN STOCK EXCHANGE " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "T") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: TOKYO STOCK EXCHANGE-TOKYO PRO MARKET " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "TA") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: TEL AVIV STOCK EXCHANGE " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "TL") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: NASDAQ OMX TALLINN " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "TO") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: TORONTO STOCK EXCHANGE " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "TW") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: TAIWAN STOCK EXCHANGE " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "TWO") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: TPEx " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "US") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: US exchanges (NYSE, Nasdaq) " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "V") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: TSX VENTURE EXCHANGE - NEX " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "VI") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: Vienna Stock Exchange " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "VN") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: Vietnam exchanges including HOSE, HNX and UPCOM " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "VS") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: NASDAQ OMX VILNIUS " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "WA") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: WARSAW STOCK EXCHANGE/EQUITIES/MAIN MARKET " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "HA") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: Hanover Stock Exchange " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "SX") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: DEUTSCHE BOERSE Stoxx " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "TG") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: DEUTSCHE BOERSE TradeGate " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "SC") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: BOERSE_FRANKFURT_ZERTIFIKATE " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                }

                            } else if (jd.Data[i].Rules[j][0] == "106") {
                                document.getElementById("ruleslist").innerHTML += "Request the companies with the highest revenue: " + jd.Data[i].Rules[j][1] + "<br>"
                            } else if (jd.Data[i].Rules[j][0] == "200") {
                                document.getElementById("ruleslist").innerHTML += "Set a balance period: " + jd.Data[i].Rules[j][1] + "<br>"
                            } else if (jd.Data[i].Rules[j][0] == "202") {
                                document.getElementById("ruleslist").innerHTML += "Set a reconsider period: " + jd.Data[i].Rules[j][1] + "<br>"
                            }

                        }

                    }


                    var ddl = document.getElementById("options");
                    var selectedValue = ddl.options[ddl.selectedIndex].id;

                }

                //2
                eName = selectedValue;
                console.log(selectedValue);

                document.getElementById("etfName").value = selectedValue;


                var ddll = document.getElementById("options");
                var selectedValuee = ddll.options[ddll.selectedIndex].id;


                for (var i = 0; i < numofetfs; i++) {
                    if (selectedValuee == jd.Data[i].ETFName) {
                        amt = jd.Data[i].Amount;
                    }
                }
                selEtfAmt = amt;
                console.log(amt);
                const loaderDiv = document.getElementById('exportBtn');
                // loaderDiv.classList.add('show');
                document.getElementById("etfAmount").value = "$" + amt;
                 document.getElementById("ruleslist").innerHTML += '<a class="waves-effect blue waves-light btn" onClick="exportRules()">Export ETF<i class="material-icons right">arrow_upward</i></a>';

                 
            }


        });
}



function getRules2() {
    var amt = 0;

    document.getElementById("ruleslist").innerHTML = '';

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
            const jd = JSON.parse(data)
            if (jd.status == "failure") {
                console.log(jd.error);
                // document.getElementById("etfbody").innerHTML = jd.error
            } else {
                console.log(jd);
                let numofetfs = jd.Data.length;
                document.getElementById("ruleslist").innerHTML = '';
                var theSelect = document.getElementById('options');
                var eID = theSelect.options[theSelect.options.length - 1].value;
                for (var i = 0; i < numofetfs; i++) {
                    if (jd.Data[i].ETFID == eID) {
                        console.log(jd.Data[i].Rules)
                        for (var j = 0; j < jd.Data[i].Rules.length; j++) {
                            if (jd.Data[i].Rules[j][0] == "000") {
                                document.getElementById("ruleslist").innerHTML += "Reject Company by Ticker: " + jd.Data[i].Rules[j][1] + "<br>"
                            } else if (jd.Data[i].Rules[j][0] == "001") {
                                if (jd.Data[i].Rules[j][1] == "100") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Sector by Name: Industrials<br>"
                                } else if (jd.Data[i].Rules[j][1] == "101") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Sector by Name: Technology<br>"
                                } else if (jd.Data[i].Rules[j][1] == "102") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Sector by Name: Consumer Defensive<br>"
                                } else if (jd.Data[i].Rules[j][1] == "103") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Sector by Name: Consumer Cyclical<br>"
                                } else if (jd.Data[i].Rules[j][1] == "104") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Sector by Name: Financial Services<br>"
                                } else if (jd.Data[i].Rules[j][1] == "105") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Sector by Name: Utilities<br>"
                                } else if (jd.Data[i].Rules[j][1] == "106") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Sector by Name: Healthcare<br>"
                                } else if (jd.Data[i].Rules[j][1] == "107") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Sector by Name: Energy<br>"
                                } else if (jd.Data[i].Rules[j][1] == "108") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Sector by Name: Business Services<br>"
                                } else if (jd.Data[i].Rules[j][1] == "109") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Sector by Name: Real Estate<br>"
                                } else if (jd.Data[i].Rules[j][1] == "110") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Sector by Name: Basic Materials<br>"
                                } else if (jd.Data[i].Rules[j][1] == "111") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Sector by Name: Other<br>"
                                }

                            } else if (jd.Data[i].Rules[j][0] == "002") {
                                if (jd.Data[i].Rules[j][1] == "100001") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Industrial Products<br>"
                                } else if (jd.Data[i].Rules[j][1] == "100002") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Business Services<br>"
                                } else if (jd.Data[i].Rules[j][1] == "100003") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Engineering & Construction<br>"
                                } else if (jd.Data[i].Rules[j][1] == "100004") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Waste Management<br>"
                                } else if (jd.Data[i].Rules[j][1] == "100005") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Industrial Distribution<br>"
                                } else if (jd.Data[i].Rules[j][1] == "100006") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Airlines<br>"
                                } else if (jd.Data[i].Rules[j][1] == "100007") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Consulting & Outsourcing<br>"
                                } else if (jd.Data[i].Rules[j][1] == "100008") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Aerospace & Defense<br>"
                                } else if (jd.Data[i].Rules[j][1] == "100009") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Farm & Construction Machinery<br>"
                                } else if (jd.Data[i].Rules[j][1] == "100010") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Transportation & Logistics<br>"
                                } else if (jd.Data[i].Rules[j][1] == "100011") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Employment Services<br>"
                                } else if (jd.Data[i].Rules[j][1] == "100012") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Truck Manufacturing<br>"
                                } else if (jd.Data[i].Rules[j][1] == "100013") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Conglomerates<br>"
                                } else if (jd.Data[i].Rules[j][1] == "101001") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Computer Hardware<br>"
                                } else if (jd.Data[i].Rules[j][1] == "101002") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Online Media<br>"
                                } else if (jd.Data[i].Rules[j][1] == "101003") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Application Software<br>"
                                } else if (jd.Data[i].Rules[j][1] == "101004") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Semiconductors<br>"
                                } else if (jd.Data[i].Rules[j][1] == "101005") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Communication Equipment<br>"
                                } else if (jd.Data[i].Rules[j][1] == "102001") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Retail - Defensive<br>"
                                } else if (jd.Data[i].Rules[j][1] == "102002") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Consumer Packaged Goods<br>"
                                } else if (jd.Data[i].Rules[j][1] == "102003") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Tobacco Products<br>"
                                } else if (jd.Data[i].Rules[j][1] == "102004") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Beverages - Alcoholic<br>"
                                } else if (jd.Data[i].Rules[j][1] == "102005") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Beverages - Non-Alcoholic<br>"
                                } else if (jd.Data[i].Rules[j][1] == "102006") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Education<br>"
                                } else if (jd.Data[i].Rules[j][1] == "103001") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Entertainment<br>"
                                } else if (jd.Data[i].Rules[j][1] == "103002") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Retail - Apparel & Specialty<br>"
                                } else if (jd.Data[i].Rules[j][1] == "103003") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Restaurants<br>"
                                } else if (jd.Data[i].Rules[j][1] == "103004") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Manufacturing - Apparel & Furniture<br>"
                                } else if (jd.Data[i].Rules[j][1] == "103005") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Autos<br>"
                                } else if (jd.Data[i].Rules[j][1] == "103011") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Advertising & Marketing Services<br>"
                                } else if (jd.Data[i].Rules[j][1] == "103013") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Homebuilding & Construction<br>"
                                } else if (jd.Data[i].Rules[j][1] == "103015") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Travel & Leisure<br>"
                                } else if (jd.Data[i].Rules[j][1] == "103018") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Packaging & Containers<br>"
                                } else if (jd.Data[i].Rules[j][1] == "103020") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Personal Services<br>"
                                } else if (jd.Data[i].Rules[j][1] == "103026") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Publishing<br>"
                                } else if (jd.Data[i].Rules[j][1] == "104001") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Asset Management<br>"
                                } else if (jd.Data[i].Rules[j][1] == "104002") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Banks<br>"
                                } else if (jd.Data[i].Rules[j][1] == "104003") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Brokers+ Exchanges & Other<br>"
                                } else if (jd.Data[i].Rules[j][1] == "104004") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Insurance - Life<br>"
                                } else if (jd.Data[i].Rules[j][1] == "104005") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Insurance<br>"
                                } else if (jd.Data[i].Rules[j][1] == "104006") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Insurance - Property & Casualty<br>"
                                } else if (jd.Data[i].Rules[j][1] == "104007") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Credit Services<br>"
                                } else if (jd.Data[i].Rules[j][1] == "104013") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Insurance - Specialty<br>"
                                } else if (jd.Data[i].Rules[j][1] == "105001") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Utilities - Regulated<br>"
                                } else if (jd.Data[i].Rules[j][1] == "105002") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Utilities - Independent Power Producers<br>"
                                } else if (jd.Data[i].Rules[j][1] == "106001") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Medical Diagnostics & Research<br>"
                                } else if (jd.Data[i].Rules[j][1] == "106002") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Biotechnology<br>"
                                } else if (jd.Data[i].Rules[j][1] == "106003") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Medical Instruments & Equipment<br>"
                                } else if (jd.Data[i].Rules[j][1] == "106004") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Medical Devices<br>"
                                } else if (jd.Data[i].Rules[j][1] == "106005") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Drug Manufacturers<br>"
                                } else if (jd.Data[i].Rules[j][1] == "106006") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Health Care Plans<br>"
                                } else if (jd.Data[i].Rules[j][1] == "106011") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Health Care Providers<br>"
                                } else if (jd.Data[i].Rules[j][1] == "106014") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Medical Distribution<br>"
                                } else if (jd.Data[i].Rules[j][1] == "107001") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Oil & Gas - Refining & Marketing<br>"
                                } else if (jd.Data[i].Rules[j][1] == "107002") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Oil & Gas - E&P<br>"
                                } else if (jd.Data[i].Rules[j][1] == "107003") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Oil & Gas - Midstream<br>"
                                } else if (jd.Data[i].Rules[j][1] == "107004") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Oil & Gas - Services<br>"
                                } else if (jd.Data[i].Rules[j][1] == "107005") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Oil & Gas - Integrated<br>"
                                } else if (jd.Data[i].Rules[j][1] == "107006") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Oil & Gas - Drilling<br>"
                                } else if (jd.Data[i].Rules[j][1] == "107007") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Alternative Energy Sources & Other<br>"
                                } else if (jd.Data[i].Rules[j][1] == "108001") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Communication Services<br>"
                                } else if (jd.Data[i].Rules[j][1] == "108002") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Consulting<br>"
                                } else if (jd.Data[i].Rules[j][1] == "108003") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: HR & Staffing<br>"
                                } else if (jd.Data[i].Rules[j][1] == "108004") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Business Other<br>"
                                } else if (jd.Data[i].Rules[j][1] == "109001") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: REITs<br>"
                                } else if (jd.Data[i].Rules[j][1] == "109002") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Real Estate Services<br>"
                                } else if (jd.Data[i].Rules[j][1] == "110001") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Chemicals<br>"
                                } else if (jd.Data[i].Rules[j][1] == "110002") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Forest Products<br>"
                                } else if (jd.Data[i].Rules[j][1] == "110003") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Agriculture<br>"
                                } else if (jd.Data[i].Rules[j][1] == "110004") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Metals & Mining<br>"
                                } else if (jd.Data[i].Rules[j][1] == "110005") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Building Materials<br>"
                                } else if (jd.Data[i].Rules[j][1] == "110006") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Coal<br>"
                                } else if (jd.Data[i].Rules[j][1] == "110007") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Steel<br>"
                                } else if (jd.Data[i].Rules[j][1] == "111001") {
                                    document.getElementById("ruleslist").innerHTML += "Reject Industry by Name: Diversified Holdings<br>"
                                }


                            } else if (jd.Data[i].Rules[j][0] == "003") {
                                if (jd.Data[i].Rules[j][1] == "AS") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: NYSE EURONEXT - EURONEXT AMSTERDAM<br>"
                                } else if (jd.Data[i].Rules[j][1] == "AT") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: ATHENS EXCHANGE S.A. CASH MARKET<br>"
                                } else if (jd.Data[i].Rules[j][1] == "AX") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: ASX - ALL MARKETS<br>"
                                } else if (jd.Data[i].Rules[j][1] == "BA") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: BOLSA DE COMERCIO DE BUENOS AIRES<br>"
                                } else if (jd.Data[i].Rules[j][1] == "BC") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: BOLSA DE VALORES DE COLOMBIA\n<br>"
                                } else if (jd.Data[i].Rules[j][1] == "BD") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: BUDAPEST STOCK EXCHANGE\n<br>"
                                } else if (jd.Data[i].Rules[j][1] == "BE") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: BOERSE BERLIN<br>"
                                } else if (jd.Data[i].Rules[j][1] == "BK") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: STOCK EXCHANGE OF THAILAND<br>"
                                } else if (jd.Data[i].Rules[j][1] == "BO") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: BSE LTD<br>"
                                } else if (jd.Data[i].Rules[j][1] == "BR") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: NYSE EURONEXT - EURONEXT BRUSSELS<br>"
                                } else if (jd.Data[i].Rules[j][1] == "CA") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: Egyptian Stock Exchange<br>"
                                } else if (jd.Data[i].Rules[j][1] == "CN") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: CANADIAN NATIONAL STOCK EXCHANGE<br>"
                                } else if (jd.Data[i].Rules[j][1] == "CO") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: OMX NORDIC EXCHANGE COPENHAGEN A/S<br>"
                                } else if (jd.Data[i].Rules[j][1] == "CR") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: CARACAS STOCK EXCHANGE<br>"
                                } else if (jd.Data[i].Rules[j][1] == "DB") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: DUBAI FINANCIAL MARKET<br>"
                                } else if (jd.Data[i].Rules[j][1] == "DE") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: XETRA<br>"
                                } else if (jd.Data[i].Rules[j][1] == "DU") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: BOERSE DUESSELDORF<br>"
                                } else if (jd.Data[i].Rules[j][1] == "F") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: DEUTSCHE BOERSE AG<br>"
                                } else if (jd.Data[i].Rules[j][1] == "HE") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: NASDAQ OMX HELSINKI LTD<br>"
                                } else if (jd.Data[i].Rules[j][1] == "HK") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: HONG KONG EXCHANGES AND CLEARING LTD<br>"
                                } else if (jd.Data[i].Rules[j][1] == "HM") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: HANSEATISCHE WERTPAPIERBOERSE HAMBURG<br>"
                                } else if (jd.Data[i].Rules[j][1] == "IC") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: NASDAQ OMX ICELAND<br>"
                                } else if (jd.Data[i].Rules[j][1] == "IR") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: IRISH STOCK EXCHANGE - ALL MARKET<br>"
                                } else if (jd.Data[i].Rules[j][1] == "IS") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: BORSA ISTANBUL<br>"
                                } else if (jd.Data[i].Rules[j][1] == "JK") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: INDONESIA STOCK EXCHANGE<br>"
                                } else if (jd.Data[i].Rules[j][1] == "JO") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: JOHANNESBURG STOCK EXCHANGE<br>"
                                } else if (jd.Data[i].Rules[j][1] == "KL") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: BURSA MALAYSIA<br>"
                                } else if (jd.Data[i].Rules[j][1] == "KQ") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: KOREA EXCHANGE (KOSDAQ)<br>"
                                } else if (jd.Data[i].Rules[j][1] == "KS") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: KOREA EXCHANGE (STOCK MARKET)<br>"
                                } else if (jd.Data[i].Rules[j][1] == "L") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: LONDON STOCK EXCHANGE<br>"
                                } else if (jd.Data[i].Rules[j][1] == "LN") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: Euronext London<br>"
                                } else if (jd.Data[i].Rules[j][1] == "LS") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: NYSE EURONEXT - EURONEXT LISBON<br>"
                                } else if (jd.Data[i].Rules[j][1] == "MC") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: BOLSA DE MADRID<br>"
                                } else if (jd.Data[i].Rules[j][1] == "ME") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: MOSCOW EXCHANGE<br>"
                                } else if (jd.Data[i].Rules[j][1] == "MI") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: Italian Stock Exchange<br>"
                                } else if (jd.Data[i].Rules[j][1] == "MU") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: BOERSE MUENCHEN<br>"
                                } else if (jd.Data[i].Rules[j][1] == "MX") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: BOLSA MEXICANA DE VALORES (MEXICAN STOCK EXCHANGE)<br>"
                                } else if (jd.Data[i].Rules[j][1] == "NE") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: AEQUITAS NEO EXCHANGE<br>"
                                } else if (jd.Data[i].Rules[j][1] == "NL") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: Nigerian Stock Exchange<br>"
                                } else if (jd.Data[i].Rules[j][1] == "NS") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: NATIONAL STOCK EXCHANGE OF INDIA<br>"
                                } else if (jd.Data[i].Rules[j][1] == "NZ") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: NEW ZEALAND EXCHANGE LTD<br>"
                                } else if (jd.Data[i].Rules[j][1] == "OL") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: OSLO BORS ASA<br>"
                                } else if (jd.Data[i].Rules[j][1] == "PA") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: NYSE EURONEXT - MARCHE LIBRE PARIS<br>"
                                } else if (jd.Data[i].Rules[j][1] == "PM") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: Philippine Stock Exchange<br>"
                                } else if (jd.Data[i].Rules[j][1] == "PR") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: PRAGUE STOCK EXCHANGE<br>"
                                } else if (jd.Data[i].Rules[j][1] == "QA") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: QATAR EXCHANGE<br>"
                                } else if (jd.Data[i].Rules[j][1] == "RG") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: NASDAQ OMX RIGA<br>"
                                } else if (jd.Data[i].Rules[j][1] == "SA") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: Brazil Bolsa - Sao Paolo<br>"
                                } else if (jd.Data[i].Rules[j][1] == "SG") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: BOERSE STUTTGART<br>"
                                } else if (jd.Data[i].Rules[j][1] == "SI") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: SINGAPORE EXCHANGE<br>"
                                } else if (jd.Data[i].Rules[j][1] == "SN") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: SANTIAGO STOCK EXCHANGE<br>"
                                } else if (jd.Data[i].Rules[j][1] == "SR") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: SAUDI STOCK EXCHANGE<br>"
                                } else if (jd.Data[i].Rules[j][1] == "SS") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: SHANGHAI STOCK EXCHANGE<br>"
                                } else if (jd.Data[i].Rules[j][1] == "ST") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: NASDAQ OMX NORDIC STOCKHOLM<br>"
                                } else if (jd.Data[i].Rules[j][1] == "SW") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: SWISS EXCHANGE<br>"
                                } else if (jd.Data[i].Rules[j][1] == "SZ") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: SHENZHEN STOCK EXCHANGE<br>"
                                } else if (jd.Data[i].Rules[j][1] == "T") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: TOKYO STOCK EXCHANGE-TOKYO PRO MARKET<br>"
                                } else if (jd.Data[i].Rules[j][1] == "TA") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: TEL AVIV STOCK EXCHANGE<br>"
                                } else if (jd.Data[i].Rules[j][1] == "TL") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: NASDAQ OMX TALLINN<br>"
                                } else if (jd.Data[i].Rules[j][1] == "TO") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: TORONTO STOCK EXCHANGE<br>"
                                } else if (jd.Data[i].Rules[j][1] == "TW") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: TAIWAN STOCK EXCHANGE<br>"
                                } else if (jd.Data[i].Rules[j][1] == "TWO") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: TPEx<br>"
                                } else if (jd.Data[i].Rules[j][1] == "US") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: US exchanges (NYSE, Nasdaq)<br>"
                                } else if (jd.Data[i].Rules[j][1] == "V") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: TSX VENTURE EXCHANGE - NEX<br>"
                                } else if (jd.Data[i].Rules[j][1] == "VI") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: Vienna Stock Exchange<br>"
                                } else if (jd.Data[i].Rules[j][1] == "VN") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: Vietnam exchanges including HOSE, HNX and UPCOM<br>"
                                } else if (jd.Data[i].Rules[j][1] == "VS") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: NASDAQ OMX VILNIUS<br>"
                                } else if (jd.Data[i].Rules[j][1] == "WA") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: WARSAW STOCK EXCHANGE/EQUITIES/MAIN MARKET<br>"
                                } else if (jd.Data[i].Rules[j][1] == "HA") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: Hanover Stock Exchange<br>"
                                } else if (jd.Data[i].Rules[j][1] == "SX") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: DEUTSCHE BOERSE Stoxx<br>"
                                } else if (jd.Data[i].Rules[j][1] == "TG") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: DEUTSCHE BOERSE TradeGate<br>"
                                } else if (jd.Data[i].Rules[j][1] == "SC") {
                                    document.getElementById("ruleslist").innerHTML += "Reject companies based in: BOERSE_FRANKFURT_ZERTIFIKATE<br>"
                                }


                            } else if (jd.Data[i].Rules[j][0] == "011") {
                                document.getElementById("ruleslist").innerHTML += "Set Market Cap Min and Max:" + jd.Data[i].Rules[j][1] + "<br>"
                            } else if (jd.Data[i].Rules[j][0] == "012") {
                                document.getElementById("ruleslist").innerHTML += "Set Earnings Min and Max:" + jd.Data[i].Rules[j][1] + "<br>"
                            } else if (jd.Data[i].Rules[j][0] == "013") {
                                document.getElementById("ruleslist").innerHTML += "Set Stock Price Min and Max:" + jd.Data[i].Rules[j][1] + "<br>"
                            } else if (jd.Data[i].Rules[j][0] == "101") {
                                document.getElementById("ruleslist").innerHTML += "Request Company by Ticker: " + jd.Data[i].Rules[j][1] + "<br>"
                            } else if (jd.Data[i].Rules[j][0] == "102") {

                                if (jd.Data[i].Rules[j][1][0] == "100") {
                                    document.getElementById("ruleslist").innerHTML += "Request Sector by Name: Industrials " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "101") {
                                    document.getElementById("ruleslist").innerHTML += "Request Sector by Name: Technology " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "102") {
                                    document.getElementById("ruleslist").innerHTML += "Request Sector by Name: Consumer Defensive " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "103") {
                                    document.getElementById("ruleslist").innerHTML += "Request Sector by Name: Consumer Cyclical " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "104") {
                                    document.getElementById("ruleslist").innerHTML += "Request Sector by Name: Financial Services " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "105") {
                                    document.getElementById("ruleslist").innerHTML += "Request Sector by Name: Utilities " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "106") {
                                    document.getElementById("ruleslist").innerHTML += "Request Sector by Name: Healthcare " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "107") {
                                    document.getElementById("ruleslist").innerHTML += "Request Sector by Name: Energy " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "108") {
                                    document.getElementById("ruleslist").innerHTML += "Request Sector by Name: Business Services " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "109") {
                                    document.getElementById("ruleslist").innerHTML += "Request Sector by Name: Real Estate " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "110") {
                                    document.getElementById("ruleslist").innerHTML += "Request Sector by Name: Basic Materials " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "111") {
                                    document.getElementById("ruleslist").innerHTML += "Request Sector by Name: Other " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                }

                            } else if (jd.Data[i].Rules[j][0] == "103") {

                                if (jd.Data[i].Rules[j][1][0] == "100001") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Industrial Products " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "100002") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Business Services " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "100003") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Engineering & Construction " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "100004") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Waste Management " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "100005") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Industrial Distribution " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "100006") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Airlines " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "100007") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Consulting & Outsourcing " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "100008") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Aerospace & Defense " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "100009") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Farm & Construction Machinery " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "100010") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Transportation & Logistics " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "100011") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Employment Services " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "100012") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Truck Manufacturing " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "100013") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Conglomerates " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "101001") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Computer Hardware " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "101002") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Online Media " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "101003") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Application Software " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "101004") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Semiconductors " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "101005") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Communication Equipment " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "102001") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Retail - Defensive " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "102002") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Consumer Packaged Goods " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "102003") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Tobacco Products " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "102004") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Beverages - Alcoholic " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "102005") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Beverages - Non-Alcoholic " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "102006") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Education " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "103001") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Entertainment " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "103002") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Retail - Apparel & Specialty " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "103003") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Restaurants " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "103004") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Manufacturing - Apparel & Furniture " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "103005") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Autos " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "103011") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Advertising & Marketing Services " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "103013") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Homebuilding & Construction " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "103015") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Travel & Leisure " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "103018") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Packaging & Containers " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "103020") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Personal Services " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "103026") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Publishing " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "104001") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Asset Management " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "104002") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Banks " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "104003") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Brokers+ Exchanges & Other " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "104004") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Insurance - Life " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "104005") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Insurance " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "104006") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Insurance - Property & Casualty " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "104007") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Credit Services " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "104013") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Insurance - Specialty " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "105001") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Utilities - Regulated " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "105002") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Utilities - Independent Power Producers " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "106001") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Medical Diagnostics & Research " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "106002") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Biotechnology " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "106003") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Medical Instruments & Equipment " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "106004") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Medical Devices " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "106005") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Drug Manufacturers " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "106006") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Health Care Plans " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "106011") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Health Care Providers " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "106014") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Medical Distribution " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "107001") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Oil & Gas - Refining & Marketing " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "107002") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Oil & Gas - E&P " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "107003") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Oil & Gas - Midstream " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "107004") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Oil & Gas - Services " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "107005") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Oil & Gas - Integrated " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "107006") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Oil & Gas - Drilling " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "107007") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Alternative Energy Sources & Other " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "108001") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Communication Services " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "108002") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Consulting " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "108003") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: HR & Staffing " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "108004") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Business Other " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "109001") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: REITs " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "109002") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Real Estate Services " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "110001") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Chemicals " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "110002") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Forest Products " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "110003") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Agriculture " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "110004") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Metals & Mining " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "110005") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Building Materials " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "110006") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Coal " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "110007") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Steel " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "111001") {
                                    document.getElementById("ruleslist").innerHTML += "Request Indusrty by Name: Diversified Holdings " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                }


                            } else if (jd.Data[i].Rules[j][0] == "104") {
                                document.getElementById("ruleslist").innerHTML += "Request the companies with the highest market cap:" + jd.Data[i].Rules[j][1] + "<br>"
                            } else if (jd.Data[i].Rules[j][0] == "105") {
                                console.log(jd.Data[i].Rules[j][1][0])
                                if (jd.Data[i].Rules[j][1][0] == "AS") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: NYSE EURONEXT - EURONEXT AMSTERDAM " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "AT") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: ATHENS EXCHANGE S.A. CASH MARKET " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "AX") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: ASX - ALL MARKETS " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "BA") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: BOLSA DE COMERCIO DE BUENOS AIRES " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "BC") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: BOLSA DE VALORES DE COLOMBIA\n " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "BD") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: BUDAPEST STOCK EXCHANGE\n " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "BE") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: BOERSE BERLIN " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "BK") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: STOCK EXCHANGE OF THAILAND " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "BO") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: BSE LTD " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "BR") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: NYSE EURONEXT - EURONEXT BRUSSELS " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "CA") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: Egyptian Stock Exchange " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "CN") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: CANADIAN NATIONAL STOCK EXCHANGE " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "CO") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: OMX NORDIC EXCHANGE COPENHAGEN A/S " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "CR") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: CARACAS STOCK EXCHANGE " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "DB") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: DUBAI FINANCIAL MARKET " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "DE") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: XETRA " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "DU") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: BOERSE DUESSELDORF " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "F") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: DEUTSCHE BOERSE AG " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "HE") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: NASDAQ OMX HELSINKI LTD " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "HK") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: HONG KONG EXCHANGES AND CLEARING LTD " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "HM") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: HANSEATISCHE WERTPAPIERBOERSE HAMBURG " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "IC") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: NASDAQ OMX ICELAND " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "IR") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: IRISH STOCK EXCHANGE - ALL MARKET " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "IS") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: BORSA ISTANBUL " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "JK") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: INDONESIA STOCK EXCHANGE " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "JO") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: JOHANNESBURG STOCK EXCHANGE " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "KL") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: BURSA MALAYSIA " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "KQ") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: KOREA EXCHANGE (KOSDAQ) " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "KS") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: KOREA EXCHANGE (STOCK MARKET) " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "L") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: LONDON STOCK EXCHANGE " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "LN") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: Euronext London " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "LS") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: NYSE EURONEXT - EURONEXT LISBON " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "MC") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: BOLSA DE MADRID " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "ME") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: MOSCOW EXCHANGE " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "MI") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: Italian Stock Exchange " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "MU") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: BOERSE MUENCHEN " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "MX") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: BOLSA MEXICANA DE VALORES (MEXICAN STOCK EXCHANGE) " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "NE") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: AEQUITAS NEO EXCHANGE " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "NL") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: Nigerian Stock Exchange " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "NS") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: NATIONAL STOCK EXCHANGE OF INDIA " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "NZ") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: NEW ZEALAND EXCHANGE LTD " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "OL") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: OSLO BORS ASA " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "PA") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: NYSE EURONEXT - MARCHE LIBRE PARIS " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "PM") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: Philippine Stock Exchange " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "PR") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: PRAGUE STOCK EXCHANGE " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "QA") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: QATAR EXCHANGE " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "RG") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: NASDAQ OMX RIGA " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "SA") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: Brazil Bolsa - Sao Paolo " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "SG") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: BOERSE STUTTGART " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "SI") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: SINGAPORE EXCHANGE " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "SN") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: SANTIAGO STOCK EXCHANGE " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "SR") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: SAUDI STOCK EXCHANGE " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "SS") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: SHANGHAI STOCK EXCHANGE " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "ST") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: NASDAQ OMX NORDIC STOCKHOLM " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "SW") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: SWISS EXCHANGE " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "SZ") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: SHENZHEN STOCK EXCHANGE " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "T") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: TOKYO STOCK EXCHANGE-TOKYO PRO MARKET " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "TA") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: TEL AVIV STOCK EXCHANGE " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "TL") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: NASDAQ OMX TALLINN " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "TO") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: TORONTO STOCK EXCHANGE " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "TW") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: TAIWAN STOCK EXCHANGE " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "TWO") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: TPEx " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "US") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: US exchanges (NYSE, Nasdaq) " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "V") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: TSX VENTURE EXCHANGE - NEX " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "VI") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: Vienna Stock Exchange " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "VN") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: Vietnam exchanges including HOSE, HNX and UPCOM " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "VS") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: NASDAQ OMX VILNIUS " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "WA") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: WARSAW STOCK EXCHANGE/EQUITIES/MAIN MARKET " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "HA") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: Hanover Stock Exchange " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "SX") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: DEUTSCHE BOERSE Stoxx " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "TG") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: DEUTSCHE BOERSE TradeGate " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                } else if (jd.Data[i].Rules[j][1][0] == "SC") {
                                    document.getElementById("ruleslist").innerHTML += "Request companies based in: BOERSE_FRANKFURT_ZERTIFIKATE " + jd.Data[i].Rules[j][1][1] + " " + jd.Data[i].Rules[j][1][2] + "<br>"
                                }

                            } else if (jd.Data[i].Rules[j][0] == "106") {
                                document.getElementById("ruleslist").innerHTML += "Request the companies with the highest revenue: " + jd.Data[i].Rules[j][1] + "<br>"
                            } else if (jd.Data[i].Rules[j][0] == "200") {
                                document.getElementById("ruleslist").innerHTML += "Set a balance period: " + jd.Data[i].Rules[j][1] + "<br>"
                            } else if (jd.Data[i].Rules[j][0] == "202") {
                                document.getElementById("ruleslist").innerHTML += "Set a reconsider period: " + jd.Data[i].Rules[j][1] + "<br>"
                            }


                        }

                    }


                }


                //document.getElementById("last_name").remove();


            }


        });
}

async function ConfirmRule(rulecode) {

    if (rulecode == 0) {

        if (document.getElementById("input1").value == '') {
            alert("please enter value")
            return
        }

        rulecode = "000"
        var eID = document.getElementById("options").value;
        var param1 = document.getElementById("input1").value
        var param2 = "";
        var param3 = "";

        const details =
            {
                "Data": [eID, param1, param2, param3, rulecode]
            }

        fetch("http://ec2-54-82-241-49.compute-1.amazonaws.com:6969/setRule",
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
                console.log(jd)
                document.getElementById("rule").innerHTML = ""


            });

    } else if (rulecode == 1) {

        rulecode = "001"
        var eID = document.getElementById("options").value;
        var param1 = document.getElementById("secopt").value
        var param2 = "";
        var param3 = "";

        const details =
            {
                "Data": [eID, param1, param2, param3, rulecode]
            }
        fetch("http://ec2-54-82-241-49.compute-1.amazonaws.com:6969/setRule",
            {
                method: 'POST',
                headers:
                    {
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
                console.log(jd)
                document.getElementById("rule").innerHTML = ""


            });
    } else if (rulecode == 2) {

        rulecode = "002"
        var eID = document.getElementById("options").value;
        var param1 = document.getElementById("indopt").value
        var param2 = "";
        var param3 = "";

        const details =
            {
                "Data": [eID, param1, param2, param3, rulecode]
            }
        fetch("http://ec2-54-82-241-49.compute-1.amazonaws.com:6969/setRule",
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
                console.log(jd)
                document.getElementById("rule").innerHTML = ""


            });
    } else if (rulecode == 3) {

        rulecode = "003"
        var eID = document.getElementById("options").value;
        var param1 = document.getElementById("cbropt").value
        var param2 = "";
        var param3 = "";

        const details =
            {
                "Data": [eID, param1, param2, param3, rulecode]
            }
        fetch("http://ec2-54-82-241-49.compute-1.amazonaws.com:6969/setRule",
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
                console.log(jd)
                document.getElementById("rule").innerHTML = ""


            });
    } else if (rulecode == 11) {
        if (document.getElementById("inputmin").value == '' || document.getElementById("inputmax").value == '') {
            alert("please enter value")
            return
        }

        if (document.getElementById("inputmin").value > document.getElementById("inputmax").value) {
            alert("min value cannot be greater than max value")
            return
        }

        if (document.getElementById("inputmin").value < 0 || document.getElementById("inputmax").value < 0) {
            alert("values cannot be lower than zero")
            return
        }


        rulecode = "011"
        var eID = document.getElementById("options").value;
        var param1 = document.getElementById("inputmin").value;
        var param2 = document.getElementById("inputmax").value;
        var param3 = "";

        const details =
            {
                "Data": [eID, param1, param2, param3, rulecode]
            }

        fetch("http://ec2-54-82-241-49.compute-1.amazonaws.com:6969/setRule",
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
                console.log(jd)
                document.getElementById("rule").innerHTML = ""


            });

    } else if (rulecode == 12) {
        if (document.getElementById("inputemin").value == '' || document.getElementById("inputemax").value == '') {
            alert("please enter value")
            return
        }

        if (document.getElementById("inputemin").value > document.getElementById("inputemax").value) {
            alert("min value cannot be greater than max value")
            return
        }

        if (document.getElementById("inputemin").value < 0 || document.getElementById("inputemax").value < 0) {
            alert("values cannot be lower than zero")
            return
        }


        rulecode = "012"
        var eID = document.getElementById("options").value;
        var param1 = document.getElementById("inputemin").value;
        var param2 = document.getElementById("inputemax").value;
        var param3 = "";

        const details =
            {
                "Data": [eID, param1, param2, param3, rulecode]
            }

        fetch("http://ec2-54-82-241-49.compute-1.amazonaws.com:6969/setRule",
            {
                method: 'POST',
                headers:
                    {
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
                console.log(jd)
                document.getElementById("rule").innerHTML = ""

            });

    } else if (rulecode == 13) {
        if (document.getElementById("inputsmin").value == '' || document.getElementById("inputsmax").value == '') {
            alert("please enter value")
            return
        }

        if (document.getElementById("inputsmin").value > document.getElementById("inputsmax").value) {
            alert("min value cannot be greater than max value")
            return
        }

        if (document.getElementById("inputsmin").value < 0 || document.getElementById("inputsmax").value < 0) {
            alert("values cannot be lower than zero")
            return
        }


        rulecode = "013"
        var eID = document.getElementById("options").value;
        var param1 = document.getElementById("inputsmin").value;
        var param2 = document.getElementById("inputsmax").value;
        var param3 = "";

        const details =
            {
                "Data": [eID, param1, param2, param3, rulecode]
            }

        fetch("http://ec2-54-82-241-49.compute-1.amazonaws.com:6969/setRule",
            {
                method: 'POST',
                headers:
                    {
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
                console.log(jd)
                document.getElementById("rule").innerHTML = ""

            });

    } else if (rulecode == 101) {
        if (document.getElementById("inputName").value == '' || document.getElementById("inputperc").value == '') {
            alert("please enter value")
            return
        }

        if (document.getElementById("inputperc").value < 0 || document.getElementById("inputperc").value > 100) {
            alert("invalid percentage")
            return
        }

        rulecode = "101"
        var eID = document.getElementById("options").value;
        var param1 = document.getElementById("inputName").value;
        var param2 = document.getElementById("inputperc").value;
        var param3 = "";

        const details =
            {
                "Data": [eID, param1, param2, param3, rulecode]
            }

        fetch("http://ec2-54-82-241-49.compute-1.amazonaws.com:6969/setRule",
            {
                method: 'POST',
                headers:
                    {
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
                console.log(jd)
                document.getElementById("rule").innerHTML = ""

            });

    } else if (rulecode == 102) {

        if (document.getElementById("inputp2").value < 0 || document.getElementById("inputp2").value > 100) {
            alert("invalid percentage")
            return
        }

        if (document.getElementById("inputamount2").value < 0) {
            alert("number must be greater than zero")
            return;
        }

        rulecode = "102"
        var eID = document.getElementById("options").value;
        var param1 = document.getElementById("secopt2").value
        var param2 = document.getElementById("inputp2").value;
        var param3 = document.getElementById("inputamount2").value;

        const details =
            {
                "Data": [eID, param1, param2, param3, rulecode]
            }
        fetch("http://ec2-54-82-241-49.compute-1.amazonaws.com:6969/setRule",
            {
                method: 'POST',
                headers:
                    {
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
                console.log(jd)
                document.getElementById("rule").innerHTML = ""


            });
    } else if (rulecode == 103) {

        if (document.getElementById("inputp3").value < 0 || document.getElementById("inputp3").value > 100) {
            alert("invalid percentage")
            return
        }

        if (document.getElementById("inputa3").value < 0) {
            alert("number must be greater than zero")
            return;
        }

        rulecode = "103"
        var eID = document.getElementById("options").value;
        var param1 = document.getElementById("indopt2").value
        var param2 = document.getElementById("inputp3").value;
        var param3 = document.getElementById("inputa3").value;

        const details =
            {
                "Data": [eID, param1, param2, param3, rulecode]
            }
        fetch("http://ec2-54-82-241-49.compute-1.amazonaws.com:6969/setRule",
            {
                method: 'POST',
                headers:
                    {
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
                console.log(jd)
                document.getElementById("rule").innerHTML = ""


            });
    } else if (rulecode == 104) {
        if (document.getElementById("inputp4").value == '' || document.getElementById("inputa4").value == '') {
            alert("please enter value")
            return
        }


        if (document.getElementById("inputp4").value < 0 || document.getElementById("inputp4").value > 100) {
            alert("invalid percentage")
            return
        }

        if (document.getElementById("inputa4").value < 0) {
            alert("amount cannot be lower than zero")
            return
        }


        rulecode = "104"
        var eID = document.getElementById("options").value;
        var param1 = document.getElementById("inputp4").value;
        var param2 = document.getElementById("inputa4").value;
        var param3 = "";

        const details =
            {
                "Data": [eID, param1, param2, param3, rulecode]
            }

        fetch("http://ec2-54-82-241-49.compute-1.amazonaws.com:6969/setRule",
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
                console.log(jd)
                document.getElementById("rule").innerHTML = ""


            });

    } else if (rulecode == 105) {

        if (document.getElementById("inputp5").value < 0 || document.getElementById("inputp5").value > 100) {
            alert("invalid percentage")
            return
        }

        if (document.getElementById("inputa5").value < 0) {
            alert("number must be greater than zero")
            return;
        }

        rulecode = "105"
        var eID = document.getElementById("options").value;
        var param1 = document.getElementById("cbropt2").value
        var param2 = document.getElementById("inputp5").value;
        var param3 = document.getElementById("inputa5").value;

        const details =
            {
                "Data": [eID, param1, param2, param3, rulecode]
            }
        fetch("http://ec2-54-82-241-49.compute-1.amazonaws.com:6969/setRule",
            {
                method: 'POST',
                headers:
                    {
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
                console.log(jd)
                document.getElementById("rule").innerHTML = ""


            });
    } else if (rulecode == 106) {

        if (document.getElementById("inputp6").value < 0 || document.getElementById("inputp6").value > 100) {
            alert("invalid percentage")
            return
        }

        if (document.getElementById("inputa6").value < 0) {
            alert("number must be greater than zero")
            return;
        }

        rulecode = "106"
        var eID = document.getElementById("options").value;
        var param1 = document.getElementById("inputp6").value
        var param2 = document.getElementById("inputa6").value;
        var param3 = '';

        const details =
            {
                "Data": [eID, param1, param2, param3, rulecode]
            }
        fetch("http://ec2-54-82-241-49.compute-1.amazonaws.com:6969/setRule",
            {
                method: 'POST',
                headers:
                    {
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
                console.log(jd)
                document.getElementById("rule").innerHTML = ""


            });
    } else if (rulecode == 200) {
        if (document.getElementById("inputw").value == '') {
            alert("please enter value")
            return
        }

        if (document.getElementById("inputw").value < 1) {
            alert("please enter valid time period")
            return
        }

        rulecode = "200"
        var eID = document.getElementById("options").value;
        var param1 = document.getElementById("inputw").value
        var param2 = "";
        var param3 = "";

        const details =
            {
                "Data": [eID, param1, param2, param3, rulecode]
            }

        fetch("http://ec2-54-82-241-49.compute-1.amazonaws.com:6969/setRule",
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
                console.log(jd)
                document.getElementById("rule").innerHTML = ""


            });

    } else if (rulecode == 202) {
        if (document.getElementById("inputw").value == '') {
            alert("please enter value")
            return
        }

        if (document.getElementById("inputw").value < 1) {
            alert("please enter valid time period")
            return
        }

        rulecode = "202"
        var eID = document.getElementById("options").value;
        var param1 = document.getElementById("inputw").value
        var param2 = "";
        var param3 = "";

        const details =
            {
                "Data": [eID, param1, param2, param3, rulecode]
            }

        fetch("http://ec2-54-82-241-49.compute-1.amazonaws.com:6969/setRule",
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
                console.log(jd)
                document.getElementById("rule").innerHTML = ""


            });


    }
    await new Promise(r => setTimeout(r, 2000)).then(getRules)
}

async function ConfirmRule2(rulecode) {

    if (rulecode == 0) {

        if (document.getElementById("input1").value == '') {
            alert("please enter value")
            return
        }

        rulecode = "000"
  
        var theSelect = document.getElementById('options');
        var eID = theSelect.options[theSelect.options.length - 1].value;


        var param1 = document.getElementById("input1").value
        var param2 = "";
        var param3 = "";

        const details =
            {
                "Data": [eID, param1, param2, param3, rulecode]
            }

        fetch("http://ec2-54-82-241-49.compute-1.amazonaws.com:6969/setRule",
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
                console.log(jd)
                document.getElementById("rule").innerHTML = ""


            });

    } else if (rulecode == 1) {

        rulecode = "001"

        var theSelect = document.getElementById('options');
        var eID = theSelect.options[theSelect.options.length - 1].value;
        var param1 = document.getElementById("secopt").value
        var param2 = "";
        var param3 = "";

        const details =
            {
                "Data": [eID, param1, param2, param3, rulecode]
            }
        fetch("http://ec2-54-82-241-49.compute-1.amazonaws.com:6969/setRule",
            {
                method: 'POST',
                headers:
                    {
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
                console.log(jd)
                document.getElementById("rule").innerHTML = ""


            });
    } else if (rulecode == 2) {

        rulecode = "002"
    
        var theSelect = document.getElementById('options');
        var eID = theSelect.options[theSelect.options.length - 1].value;
        var param1 = document.getElementById("indopt").value
        var param2 = "";
        var param3 = "";

        const details =
            {
                "Data": [eID, param1, param2, param3, rulecode]
            }
        fetch("http://ec2-54-82-241-49.compute-1.amazonaws.com:6969/setRule",
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
                console.log(jd)
                document.getElementById("rule").innerHTML = ""


            });
    } else if (rulecode == 3) {

        rulecode = "003"
       
        var theSelect = document.getElementById('options');
        var eID = theSelect.options[theSelect.options.length - 1].value;
        var param1 = document.getElementById("cbropt").value
        var param2 = "";
        var param3 = "";

        const details =
            {
                "Data": [eID, param1, param2, param3, rulecode]
            }
        fetch("http://ec2-54-82-241-49.compute-1.amazonaws.com:6969/setRule",
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
                console.log(jd)
                document.getElementById("rule").innerHTML = ""


            });
    } else if (rulecode == 11) {
        if (document.getElementById("inputmin").value == '' || document.getElementById("inputmax").value == '') {
            alert("please enter value")
            return
        }

        if (document.getElementById("inputmin").value > document.getElementById("inputmax").value) {
            alert("min value cannot be greater than max value")
            return
        }

        if (document.getElementById("inputmin").value < 0 || document.getElementById("inputmax").value < 0) {
            alert("values cannot be lower than zero")
            return
        }


        rulecode = "011"
     
        var theSelect = document.getElementById('options');
        var eID = theSelect.options[theSelect.options.length - 1].value;
        var param1 = document.getElementById("inputmin").value;
        var param2 = document.getElementById("inputmax").value;
        var param3 = "";

        const details =
            {
                "Data": [eID, param1, param2, param3, rulecode]
            }

        fetch("http://ec2-54-82-241-49.compute-1.amazonaws.com:6969/setRule",
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
                console.log(jd)
                document.getElementById("rule").innerHTML = ""


            });

    } else if (rulecode == 12) {
        if (document.getElementById("inputemin").value == '' || document.getElementById("inputemax").value == '') {
            alert("please enter value")
            return
        }

        if (document.getElementById("inputemin").value > document.getElementById("inputemax").value) {
            alert("min value cannot be greater than max value")
            return
        }

        if (document.getElementById("inputemin").value < 0 || document.getElementById("inputemax").value < 0) {
            alert("values cannot be lower than zero")
            return
        }


        rulecode = "012"
       
        var theSelect = document.getElementById('options');
        var eID = theSelect.options[theSelect.options.length - 1].value;
        var param1 = document.getElementById("inputemin").value;
        var param2 = document.getElementById("inputemax").value;
        var param3 = "";

        const details =
            {
                "Data": [eID, param1, param2, param3, rulecode]
            }

        fetch("http://ec2-54-82-241-49.compute-1.amazonaws.com:6969/setRule",
            {
                method: 'POST',
                headers:
                    {
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
                console.log(jd)
                document.getElementById("rule").innerHTML = ""

            });

    } else if (rulecode == 13) {
        if (document.getElementById("inputsmin").value == '' || document.getElementById("inputsmax").value == '') {
            alert("please enter value")
            return
        }

        if (document.getElementById("inputsmin").value > document.getElementById("inputsmax").value) {
            alert("min value cannot be greater than max value")
            return
        }

        if (document.getElementById("inputsmin").value < 0 || document.getElementById("inputsmax").value < 0) {
            alert("values cannot be lower than zero")
            return
        }


        rulecode = "013"
        //  var eID = document.getElementById("options").value;
        var theSelect = document.getElementById('options');
        var eID = theSelect.options[theSelect.options.length - 1].value;
        var param1 = document.getElementById("inputsmin").value;
        var param2 = document.getElementById("inputsmax").value;
        var param3 = "";

        const details =
            {
                "Data": [eID, param1, param2, param3, rulecode]
            }

        fetch("http://ec2-54-82-241-49.compute-1.amazonaws.com:6969/setRule",
            {
                method: 'POST',
                headers:
                    {
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
                console.log(jd)
                document.getElementById("rule").innerHTML = ""

            });

    } else if (rulecode == 101) {
        if (document.getElementById("inputName").value == '' || document.getElementById("inputperc").value == '') {
            alert("please enter value")
            return
        }

        if (document.getElementById("inputperc").value < 0 || document.getElementById("inputperc").value > 100) {
            alert("invalid percentage")
            return
        }

        rulecode = "101"
        // var eID = document.getElementById("options").value;
        var theSelect = document.getElementById('options');
        var eID = theSelect.options[theSelect.options.length - 1].value;
        var param1 = document.getElementById("inputName").value;
        var param2 = document.getElementById("inputperc").value;
        var param3 = "";

        const details =
            {
                "Data": [eID, param1, param2, param3, rulecode]
            }

        fetch("http://ec2-54-82-241-49.compute-1.amazonaws.com:6969/setRule",
            {
                method: 'POST',
                headers:
                    {
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
                console.log(jd)
                document.getElementById("rule").innerHTML = ""

            });

    } else if (rulecode == 102) {

        if (document.getElementById("inputp2").value < 0 || document.getElementById("inputp2").value > 100) {
            alert("invalid percentage")
            return
        }

        if (document.getElementById("inputamount2").value < 0) {
            alert("number must be greater than zero")
            return;
        }

        rulecode = "102"
    
        var theSelect = document.getElementById('options');
        var eID = theSelect.options[theSelect.options.length - 1].value;
        var param1 = document.getElementById("secopt2").value
        var param2 = document.getElementById("inputp2").value;
        var param3 = document.getElementById("inputamount2").value;

        const details =
            {
                "Data": [eID, param1, param2, param3, rulecode]
            }
        fetch("http://ec2-54-82-241-49.compute-1.amazonaws.com:6969/setRule",
            {
                method: 'POST',
                headers:
                    {
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
                console.log(jd)
                document.getElementById("rule").innerHTML = ""


            });
    } else if (rulecode == 103) {

        if (document.getElementById("inputp3").value < 0 || document.getElementById("inputp3").value > 100) {
            alert("invalid percentage")
            return
        }

        if (document.getElementById("inputa3").value < 0) {
            alert("number must be greater than zero")
            return;
        }

        rulecode = "103"
   
        var theSelect = document.getElementById('options');
        var eID = theSelect.options[theSelect.options.length - 1].value;
        var param1 = document.getElementById("indopt2").value
        var param2 = document.getElementById("inputp3").value;
        var param3 = document.getElementById("inputa3").value;

        const details =
            {
                "Data": [eID, param1, param2, param3, rulecode]
            }
        fetch("http://ec2-54-82-241-49.compute-1.amazonaws.com:6969/setRule",
            {
                method: 'POST',
                headers:
                    {
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
                console.log(jd)
                document.getElementById("rule").innerHTML = ""


            });
    } else if (rulecode == 104) {
        if (document.getElementById("inputp4").value == '' || document.getElementById("inputa4").value == '') {
            alert("please enter value")
            return
        }


        if (document.getElementById("inputp4").value < 0 || document.getElementById("inputp4").value > 100) {
            alert("invalid percentage")
            return
        }

        if (document.getElementById("inputa4").value < 0) {
            alert("amount cannot be lower than zero")
            return
        }


        rulecode = "104"
        // var eID = document.getElementById("options").value;
        var theSelect = document.getElementById('options');
        var eID = theSelect.options[theSelect.options.length - 1].value;
        var param1 = document.getElementById("inputp4").value;
        var param2 = document.getElementById("inputa4").value;
        var param3 = "";

        const details =
            {
                "Data": [eID, param1, param2, param3, rulecode]
            }

        fetch("http://ec2-54-82-241-49.compute-1.amazonaws.com:6969/setRule",
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
                console.log(jd)
                document.getElementById("rule").innerHTML = ""


            });

    } else if (rulecode == 105) {

        if (document.getElementById("inputp5").value < 0 || document.getElementById("inputp5").value > 100) {
            alert("invalid percentage")
            return
        }

        if (document.getElementById("inputa5").value < 0) {
            alert("number must be greater than zero")
            return;
        }

        rulecode = "105"
        //  var eID = document.getElementById("options").value;
        var theSelect = document.getElementById('options');
        var eID = theSelect.options[theSelect.options.length - 1].value;
        var param1 = document.getElementById("cbropt2").value
        var param2 = document.getElementById("inputp5").value;
        var param3 = document.getElementById("inputa5").value;

        const details =
            {
                "Data": [eID, param1, param2, param3, rulecode]
            }
        fetch("http://ec2-54-82-241-49.compute-1.amazonaws.com:6969/setRule",
            {
                method: 'POST',
                headers:
                    {
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
                console.log(jd)
                document.getElementById("rule").innerHTML = ""


            });
    } else if (rulecode == 106) {

        if (document.getElementById("inputp6").value < 0 || document.getElementById("inputp6").value > 100) {
            alert("invalid percentage")
            return
        }

        if (document.getElementById("inputa6").value < 0) {
            alert("number must be greater than zero")
            return;
        }

        rulecode = "106"
        // var eID = document.getElementById("options").value;
        var theSelect = document.getElementById('options');
        var eID = theSelect.options[theSelect.options.length - 1].value;
        var param1 = document.getElementById("inputp6").value
        var param2 = document.getElementById("inputa6").value;
        var param3 = '';

        const details =
            {
                "Data": [eID, param1, param2, param3, rulecode]
            }
        fetch("http://ec2-54-82-241-49.compute-1.amazonaws.com:6969/setRule",
            {
                method: 'POST',
                headers:
                    {
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
                console.log(jd)
                document.getElementById("rule").innerHTML = ""


            });
    } else if (rulecode == 200) {
        if (document.getElementById("inputw").value == '') {
            alert("please enter value")
            return
        }

        if (document.getElementById("inputw").value < 1) {
            alert("please enter valid time period")
            return
        }

        rulecode = "200"
        //  var eID = document.getElementById("options").value;
        var theSelect = document.getElementById('options');
        var eID = theSelect.options[theSelect.options.length - 1].value;
        var param1 = document.getElementById("inputw").value
        var param2 = "";
        var param3 = "";

        const details =
            {
                "Data": [eID, param1, param2, param3, rulecode]
            }

        fetch("http://ec2-54-82-241-49.compute-1.amazonaws.com:6969/setRule",
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
                console.log(jd)
                document.getElementById("rule").innerHTML = ""


            });

    } else if (rulecode == 202) {
        if (document.getElementById("inputw").value == '') {
            alert("please enter value")
            return
        }

        if (document.getElementById("inputw").value < 1) {
            alert("please enter valid time period")
            return
        }

        rulecode = "202"
        var theSelect = document.getElementById('options');
        var eID = theSelect.options[theSelect.options.length - 1].value;
        var param1 = document.getElementById("inputw").value
        var param2 = "";
        var param3 = "";

        const details =
            {
                "Data": [eID, param1, param2, param3, rulecode]
            }

        fetch("http://ec2-54-82-241-49.compute-1.amazonaws.com:6969/setRule",
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
                console.log(jd)
                document.getElementById("rule").innerHTML = ""


            });


    }
    await new Promise(r => setTimeout(r, 2000)).then(getRules2)


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

function editname() {

    var eID = document.getElementById("options").value;
    var newName = document.getElementById("etfName").value;

    //  document.getElementByID("etfName").innerHTML += jd.ETFID + '"' + ">" + jd.ETFName;
    document.getElementById("etfName").value = newName;

    if (document.getElementById("etfName").value == '') {
        alert("please enter value")
        return
    }

    const details =
        {
            "Data": [eID, newName]
        }

    fetch("http://ec2-54-82-241-49.compute-1.amazonaws.com:6969/changename",
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
            console.log(jd)
            alert("ETF name has been updated.")
            window.location.href = "/addETF"

        });
}

function editamount() {

    var eID = document.getElementById("options").value;
    var newAmount = document.getElementById("etfAmount").value;

    if (document.getElementById("etfAmount").value == '') {
        alert("please enter value")
        return
    }

    const details =
        {
            "Data": [eID, newAmount]
        }

    fetch("http://ec2-54-82-241-49.compute-1.amazonaws.com:6969/changeamount",
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
            console.log(jd)
            alert("Amount has been updated.")
            window.location.href = "/addETF"

        });
}

function clearRules() {

    var eID = document.getElementById("options").value;

    const details =
        {
            "Data": [eID]
        }

    fetch("http://ec2-54-82-241-49.compute-1.amazonaws.com:6969/clearrules",
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
            console.log(jd)
            alert("Rules have been cleared.")
            // document.getElementById("ruleadder")
            window.location.href = "/addETF"

        });
}

function deleteETF() {

    var eID = document.getElementById("options").value;

    const details =
        {
            "Data": [eID]
        }

    fetch("http://ec2-54-82-241-49.compute-1.amazonaws.com:6969/deleteetf",
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
            console.log(jd)
            if (jd.status == "failure") {
                console.log(jd.error);

                // alert(jd.error)
            } else {
                alert("ETF deleted")

                window.location.href = "/addETF" //addRule
            }

        });
}


function exportRules() {
    var expRules;
    const details =
        {
            "Data": [gloUserID, eName]
        }
    console.log("Exp Dets: ", JSON.stringify(details))
    fetch("http://ec2-54-82-241-49.compute-1.amazonaws.com:6969/export",
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
            console.log("data:", data)
            expRules = JSON.parse(data)
            console.log("jd: ", expRules)
            // window.location.href = "/addETF"

            const anchor = document.createElement("a");
            anchor.href = URL.createObjectURL(new Blob([JSON.stringify(expRules, null, 2)], {
                type: "application/json"
            }));
            anchor.setAttribute("download", "rules.json");
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor);
        });


}

function importRules() {
    document.getElementById("jsonfileinput").click();

}

