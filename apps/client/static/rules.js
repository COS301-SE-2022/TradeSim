var counter = 0;
var string = "hello";

function addRule() {


    var rule = document.getElementById("addRule");
    var r0 = document.getElementById('rule');


    if (document.getElementById('r1').selected == true) {
        counter++;
        rule.innerHTML += '<div class="amount-input-row">' +
            '<div class="card2" id="etfbody" style="width:1125px ; position: relative; bottom: 70px; right: 12px">' +
            '<label for="etf" style=" color: white; position: relative; top: 8px; left: 10px;" id="label2"><b>Rule ' + counter + ':</b></label>' +
            '<div class="custom-select" style="display: inline-block; position: relative; top:5px; left:25px;">' +
            '<input type="text" placeholder="Name or ticker name of company" style=" width:250px; height:25px; font-size: 12px; ">' +
            '<button class="create-btn" id="btn1" style="width: 50px; display: inline-block; position: relative; left: 660px; bottom: 1px;" onclick="removeRule()">-</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<b style="color: black; position: relative; bottom: 130px; right: 10px;">' + document.getElementById('r1').textContent + '</b>'
    }

    if (document.getElementById('r2').selected == true) {
        counter++;
        rule.innerHTML += '<div class="amount-input-row">' +
            '<div class="card2" id="etfbody" style="width:1125px ; position: relative; bottom: 70px; right: 12px">' +
            '<label for="etf" style=" color: white; position: relative; top: 8px; left: 10px;" id="label2"><b>Rule ' + counter + ':</b></label>' +
            '<div class="custom-select" style="width:200px; display: inline-block; position: relative; left: 32px; top: 8px;">' +
            '<select>' +
            '<option value="0">Select sector by name:</option>' +
            '<option value="1" id="r1">Industrials</option>' +
            '<option value="2" id="r2">Technology</option>' +
            '<option value="3" id="r3">Consumer Defensive</option>' +
            '<option value="4" id="r4">Consumer Cyclical</option>' +
            '<option value="5" id="r5">Financial Services</option>' +
            '<option value="6" id="r6">Utilities</option>' +
            '<option value="7" id="r7">Healthcare</option>' +
            '<option value="8" id="r8">Energy</option>' +
            '<option value="9" id="r9">Business Services</option>' +
            '<option value="10" id="r10">Real Estate</option>' +
            '<option value="11" id="r11">Basic Materials</option>' +
            '<option value="12" id="r12">Other</option>' +
            '</select>' +
            '</div>' +
            '<button class="create-btn" id="btn2" style="width: 50px; display: inline-block; position: relative; left: 730px; top: 3px;" onclick="removeRule()">-</button>' +
            '</div>' +
            '</div>' +
            '<b style="color: black; position: relative; bottom: 130px; right: 10px;">' + document.getElementById('r2').textContent + '</b>'
    }

    if (document.getElementById('r3').selected == true) {
        counter++;
        rule.innerHTML += '<div class="amount-input-row">' +
            '<div class="card2" id="etfbody" style="width:1125px ; position: relative; bottom: 70px; right: 12px">' +
            '<label for="etf" style=" color: white; position: relative; top: 8px; left: 10px;" id="label2"><b>Rule ' + counter + ':</b></label>' +
            '<div class="custom-select" style="width:200px; display: inline-block; position: relative; left: 32px; top: 8px;">' +
            '<select>' +
            '<option value="0">Select industry by name:</option>' +
            '<option value="1" id="r1">Industrial Products</option>' +
            '<option value="2" id="r2">Business Services</option>' +
            '<option value="3" id="r3">Engineering & Construction</option>' +
            '<option value="4" id="r4">Waste Management</option>' +
            '<option value="5" id="r5">Industrial Distribution</option>' +
            '<option value="6" id="r6">Airlines</option>' +
            '<option value="7" id="r7">Consulting & Outsourcing</option>' +
            '<option value="8" id="r8">Aerospace & Defense</option>' +
            '<option value="9" id="r9">Farm & Construction Machinery</option>' +
            '<option value="10" id="r10">Transportation & Logistics</option>' +
            '<option value="11" id="r11">Employment Services</option>' +
            '<option value="12" id="r12">Truck Manufacturing</option>' +
            '<option value="13" id="r13">Conglomerates</option>' +
            '<option value="14" id="r14">Computer Hardware</option>' +
            '<option value="15" id="r15">Online Media</option>' +
            '<option value="16" id="r16">Application Software</option>' +
            '<option value="17" id="r17">Semiconductors</option>' +
            '<option value="18" id="r18">Communication Equipment</option>' +
            '<option value="19" id="r19">Retail - Defensive</option>' +
            '<option value="20" id="r20">Consumer Packaged Goods</option>' +
            '<option value="21" id="r21">Tobacco Products</option>' +
            '<option value="22" id="r22">Beverages - Alcoholic</option>' +
            '<option value="23" id="r23">Beverages - Non-Alcoholic</option>' +
            '<option value="24" id="r24">Education</option>' +
            '<option value="25" id="r25">Entertainment</option>' +
            '<option value="26" id="r26">Retail - Apparel & Specialty</option>' +
            '<option value="27" id="r27">Restaurants</option>' +
            '<option value="28" id="r28">Manufacturing - Apparel & Furniture</option>' +
            '<option value="29" id="r29">Autos</option>' +
            '<option value="30" id="r30">Advertising & Marketing Services</option>' +
            '<option value="31" id="r31">Homebuilding & Construction</option>' +
            '<option value="32" id="r32">Travel & Leisure</option>' +
            '<option value="33" id="r33">Packaging & Containers</option>' +
            '<option value="34" id="r34">Personal Services</option>' +
            '<option value="35" id="r35">Publishing</option>' +
            '<option value="36" id="r36">Asset Management</option>' +
            '<option value="37" id="r37">Banks</option>' +
            '<option value="38" id="r38">Brokers+ Exchanges & Other</option>' +
            '<option value="39" id="r39">Insurance - Life</option>' +
            '<option value="40" id="r40">Insurance</option>' +
            '<option value="41" id="r41">Insurance - Property & Casualty</option>' +
            '<option value="42" id="r42">Credit Services</option>' +
            '<option value="43" id="r43">Insurance - Specialty</option>' +
            '<option value="44" id="r44">Utilities - Regulated</option>' +
            '<option value="45" id="r45">Utilities - Independent Power Producers</option>' +
            '<option value="46" id="r46">Medical Diagnostics & Research</option>' +
            '<option value="47" id="r47">Biotechnology</option>' +
            '<option value="48" id="r48">Medical Instruments & Equipment</option>' +
            '<option value="49" id="r49">Medical Devices</option>' +
            '<option value="50" id="r50">Drug Manufacturers</option>' +
            '<option value="51" id="r51">Health Care Plans</option>' +
            '<option value="52" id="r52">Health Care Providers</option>' +
            '<option value="53" id="r53">Medical Distribution</option>' +
            '<option value="54" id="r54">Oil & Gas - Refining & Marketing</option>' +
            '<option value="55" id="r55">Oil & Gas - E&P</option>' +
            '<option value="56" id="r56">Oil & Gas - Midstream</option>' +
            '<option value="57" id="r57">Oil & Gas - Services</option>' +
            '<option value="58" id="r58">Oil & Gas - Integrated</option>' +
            '<option value="59" id="r59">Oil & Gas - Drilling</option>' +
            '<option value="60" id="r60">Alternative Energy Sources & Other</option>' +
            '<option value="61" id="r61">Communication Services</option>' +
            '<option value="62" id="r62">Consulting</option>' +
            '<option value="63" id="r63">HR & Staffing</option>' +
            '<option value="64" id="r64">Other</option>' +
            '<option value="65" id="r65">REITs</option>' +
            '<option value="66" id="r66">Real Estate Services</option>' +
            '<option value="67" id="r67">Chemicals</option>' +
            '<option value="68" id="r68">Forest Products</option>' +
            '<option value="69" id="r69">Agriculture</option>' +
            '<option value="70" id="r70">Metals & Mining</option>' +
            '<option value="71" id="r71">Building Materials</option>' +
            '<option value="72" id="r72">Coal</option>' +
            '<option value="73" id="r73">Steel</option>' +
            '<option value="74" id="r74">Diversified Holdings</option>' +
            '</select>' +
            '</div>' +
            '<button class="create-btn" id="btn3" style="width: 50px; display: inline-block; position: relative; left: 730px; top: 3px;" onclick="removeRule()">-</button>' +
            '</div>' +
            '</div>' +
            '<b style="color: black; position: relative; bottom: 130px; right: 10px;">' + document.getElementById('r3').textContent + '</b>'
    }



    if (document.getElementById('r4').selected == true) {
        counter++;
        rule.innerHTML += '<div class="amount-input-row">' +
            '<div class="card2" id="etfbody" style="width:1125px ; position: relative; bottom: 70px; right: 12px">' +
            '<label for="etf" style=" color: white; position: relative; top: 8px; left: 10px;" id="label2"><b>Rule ' + counter + ':</b></label>' +
            '<div class="custom-select" style="width:200px; display: inline-block; position: relative; left: 32px; top: 8px;">' +
            '<select>' +
            '<option value="0">Select a country exchange:</option>' +
            '<option value="1" id="r1">AS: NYSE EURONEXT - EURONEXT AMSTERDAM</option>' +
            '<option value="2" id="r2">AT: ATHENS EXCHANGE S.A. CASH MARKET</option>' +
            '<option value="3" id="r3">AX: ASX - ALL MARKETS</option>' +
            '<option value="4" id="r4">BA: BOLSA DE COMERCIO DE BUENOS AIRES</option>' +
            '<option value="5" id="r5">BC: BOLSA DE VALORES DE COLOMBIA</option>' +
            '<option value="6" id="r6">BD: BUDAPEST STOCK EXCHANGE</option>' +
            '<option value="7" id="r7">BE: BOERSE BERLIN</option>' +
            '<option value="8" id="r8">BK: STOCK EXCHANGE OF THAILAND</option>' +
            '<option value="9" id="r9">BO: BSE LTD</option>' +
            '<option value="10" id="r10">BR: NYSE EURONEXT - EURONEXT BRUSSELS</option>' +
            '<option value="11" id="r11">CA: Egyptian Stock Exchange</option>' +
            '<option value="12" id="r12">CN: CANADIAN NATIONAL STOCK EXCHANGE</option>' +
            '<option value="13" id="r13">CO: OMX NORDIC EXCHANGE COPENHAGEN A/S</option>' +
            '<option value="14" id="r14">CR: CARACAS STOCK EXCHANGE</option>' +
            '<option value="15" id="r15">DB: DUBAI FINANCIAL MARKET</option>' +
            '<option value="16" id="r16">DE: XETRA</option>' +
            '<option value="17" id="r17">DU: BOERSE DUESSELDORF</option>' +
            '<option value="18" id="r18">F: DEUTSCHE BOERSE AG</option>' +
            '<option value="19" id="r19">HE: NASDAQ OMX HELSINKI LTD</option>' +
            '<option value="20" id="r20">HK: HONG KONG EXCHANGES AND CLEARING LTD</option>' +
            '<option value="21" id="r21">HM: HANSEATISCHE WERTPAPIERBOERSE HAMBURG</option>' +
            '<option value="22" id="r22">IC: NASDAQ OMX ICELAND</option>' +
            '<option value="23" id="r23">IR: IRISH STOCK EXCHANGE - ALL MARKET</option>' +
            '<option value="24" id="r24">IS: BORSA ISTANBUL</option>' +
            '<option value="25" id="r25">JK: INDONESIA STOCK EXCHANGE</option>' +
            '<option value="26" id="r26">JO: JOHANNESBURG STOCK EXCHANGE</option>' +
            '<option value="27" id="r27">KL: BURSA MALAYSIA</option>' +
            '<option value="28" id="r28">KQ: KOREA EXCHANGE (KOSDAQ)</option>' +
            '<option value="29" id="r29">KS: KOREA EXCHANGE (STOCK MARKET)</option>' +
            '<option value="30" id="r30">L: LONDON STOCK EXCHANGE</option>' +
            '<option value="31" id="r31">LN: Euronext London</option>' +
            '<option value="32" id="r32">LS: NYSE EURONEXT - EURONEXT LISBON</option>' +
            '<option value="33" id="r33">MC: BOLSA DE MADRID</option>' +
            '<option value="34" id="r34">ME: MOSCOW EXCHANGE</option>' +
            '<option value="35" id="r35">MI: Italian Stock Exchange</option>' +
            '<option value="36" id="r36">MU: BOERSE MUENCHEN</option>' +
            '<option value="37" id="r37">MX: BOLSA MEXICANA DE VALORES (MEXICAN STOCK EXCHANGE)</option>' +
            '<option value="38" id="r38">NE: AEQUITAS NEO EXCHANGE</option>' +
            '<option value="39" id="r39">NL: Nigerian Stock Exchange</option>' +
            '<option value="40" id="r40">NS: NATIONAL STOCK EXCHANGE OF INDIA</option>' +
            '<option value="41" id="r41">NZ: NEW ZEALAND EXCHANGE LTD</option>' +
            '<option value="42" id="r42">OL: OSLO BORS ASA</option>' +
            '<option value="43" id="r43">PA: NYSE EURONEXT - MARCHE LIBRE PARIS</option>' +
            '<option value="44" id="r44">PM: Philippine Stock Exchange</option>' +
            '<option value="45" id="r45">PR: PRAGUE STOCK EXCHANGE</option>' +
            '<option value="46" id="r46">QA: QATAR EXCHANGE</option>' +
            '<option value="47" id="r47">RG: NASDAQ OMX RIGA</option>' +
            '<option value="48" id="r48">SA: Brazil Bolsa - Sao Paolo</option>' +
            '<option value="49" id="r49">SG: BOERSE STUTTGART</option>' +
            '<option value="50" id="r50">SI: SINGAPORE EXCHANGE</option>' +
            '<option value="51" id="r51">SN: SANTIAGO STOCK EXCHANGE</option>' +
            '<option value="52" id="r52">SR: SAUDI STOCK EXCHANGE</option>' +
            '<option value="53" id="r53">SS: SHANGHAI STOCK EXCHANGE</option>' +
            '<option value="54" id="r54">ST: NASDAQ OMX NORDIC STOCKHOLM</option>' +
            '<option value="55" id="r55">SW: SWISS EXCHANGE</option>' +
            '<option value="56" id="r56">SZ: SHENZHEN STOCK EXCHANGE</option>' +
            '<option value="57" id="r57">T: TOKYO STOCK EXCHANGE-TOKYO PRO MARKET</option>' +
            '<option value="58" id="r58">TA: TEL AVIV STOCK EXCHANGE</option>' +
            '<option value="59" id="r59">TL: NASDAQ OMX TALLINN</option>' +
            '<option value="60" id="r60">TO: TORONTO STOCK EXCHANGE</option>' +
            '<option value="61" id="r61">TW: TAIWAN STOCK EXCHANGE</option>' +
            '<option value="62" id="r62">TWO: TPEx</option>' +
            '<option value="63" id="r63">US: US exchanges (NYSE, Nasdaq)</option>' +
            '<option value="64" id="r64">V: TSX VENTURE EXCHANGE - NEX</option>' +
            '<option value="65" id="r65">VI: Vienna Stock Exchange</option>' +
            '<option value="66" id="r66">VN: Vietnam exchanges including HOSE, HNX and UPCOM</option>' +
            '<option value="67" id="r67">VS: NASDAQ OMX VILNIUS</option>' +
            '<option value="68" id="r68">WA: WARSAW STOCK EXCHANGE/EQUITIES/MAIN MARKET</option>' +
            '<option value="69" id="r69">HA: Hanover Stock Exchange</option>' +
            '<option value="70" id="r70">SX: DEUTSCHE BOERSE Stoxx</option>' +
            '<option value="71" id="r71">TG: DEUTSCHE BOERSE TradeGate </option>' +
            '<option value="72" id="r72">SC: BOERSE_FRANKFURT_ZERTIFIKATE</option>' +
            '</select>' +
            '</div>' +
            '<button class="create-btn" id="btn4" style="width: 50px; display: inline-block; position: relative; left: 730px; top: 3px;" onclick="removeRule()">-</button>' +
            '</div>' +
            '</div>' +
            '<b style="color: black; position: relative; bottom: 130px; right: 10px;">' + document.getElementById('r4').textContent + '</b>'
    }


    if (document.getElementById('r5').selected == true) {
        counter++;
        rule.innerHTML += '<div class="amount-input-row">' +
            '<div class="card2" id="etfbody" style="width:1125px ; position: relative; bottom: 70px; right: 12px">' +
            '<label for="etf" style=" color: white; position: relative; top: 8px; left: 10px;" id="label2"><b>Rule ' + counter + ':</b></label>' +
            '<div class="custom-select" style="display: inline-block; position: relative; top:5px; left:25px;">' +
            '<input type="text" placeholder="Minimum amount of companies you want to invest in" style=" width:350px; height:25px; font-size: 12px; ">' +
            '<button class="create-btn" id="btn5" style="width: 50px; display: inline-block; position: relative; left: 550px; bottom: 1px;" onclick="removeRule()">-</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<b style="color: black; position: relative; bottom: 130px; right: 10px;">' + document.getElementById('r5').textContent + '</b>'

    }

    if (document.getElementById('r6').selected == true) {
        counter++;
        rule.innerHTML += '<div class="amount-input-row">' +
            '<div class="card2" id="etfbody" style="width:1125px ; position: relative; bottom: 70px; right: 12px">' +
            '<label for="etf" style=" color: white; position: relative; top: 8px; left: 10px;" id="label2"><b>Rule ' + counter + ':</b></label>' +
            '<div class="custom-select" style="display: inline-block; position: relative; top:5px; left:25px;">' +
            '<input type="text" placeholder="Market cap min" style=" width:350px; height:25px; font-size: 12px; ">' +
            '<input type="text" placeholder="Market cap max" style=" width:350px; height:25px; font-size: 12px; ">' +
            '<button class="create-btn" id="btn6" style="width: 50px; display: inline-block; position: relative; left: 205px; bottom: 1px;" onclick="removeRule()">-</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<b style="color: black; position: relative; bottom: 130px; right: 10px;">' + document.getElementById('r6').textContent + '</b>'

    }

    if (document.getElementById('r7').selected == true) {
        counter++;
        rule.innerHTML += '<div class="amount-input-row">' +
            '<div class="card2" id="etfbody" style="width:1125px ; position: relative; bottom: 70px; right: 12px">' +
            '<label for="etf" style=" color: white; position: relative; top: 8px; left: 10px;" id="label2"><b>Rule ' + counter + ':</b></label>' +
            '<div class="custom-select" style="display: inline-block; position: relative; top:5px; left:25px;">' +
            '<input type="text" placeholder="Earnings min" style=" width:350px; height:25px; font-size: 12px; ">' +
            '<input type="text" placeholder="Earnings max" style=" width:350px; height:25px; font-size: 12px; ">' +
            '<button class="create-btn" id="btn7" style="width: 50px; display: inline-block; position: relative; left: 205px; bottom: 1px;" onclick="removeRule()">-</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<b style="color: black; position: relative; bottom: 130px; right: 10px;">' + document.getElementById('r7').textContent + '</b>'

    }

    if (document.getElementById('r8').selected == true) {
        counter++;
        rule.innerHTML += '<div class="amount-input-row">' +
            '<div class="card2" id="etfbody" style="width:1125px ; position: relative; bottom: 70px; right: 12px">' +
            '<label for="etf" style=" color: white; position: relative; top: 8px; left: 10px;" id="label2"><b>Rule ' + counter + ':</b></label>' +
            '<div class="custom-select" style="display: inline-block; position: relative; top:5px; left:25px;">' +
            '<input type="text" placeholder="Min price for shares" style=" width:350px; height:25px; font-size: 12px; ">' +
            '<input type="text" placeholder="Max prices for shares" style=" width:350px; height:25px; font-size: 12px; ">' +
            '<button class="create-btn" id="btn8" style="width: 50px; display: inline-block; position: relative; left: 205px; bottom: 1px;" onclick="removeRule()">-</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<b style="color: black; position: relative; bottom: 130px; right: 10px;">' + document.getElementById('r8').textContent + '</b>'

    }

    if (document.getElementById('r9').selected == true) {
        counter++;
        rule.innerHTML += '<div class="amount-input-row">' +
            '<div class="card2" id="etfbody" style="width:1125px ; position: relative; bottom: 70px; right: 12px">' +
            '<label for="etf" style=" color: white; position: relative; top: 8px; left: 10px;" id="label2"><b>Rule ' + counter + ':</b></label>' +
            '<div class="custom-select" style="display: inline-block; position: relative; top:5px; left:25px;">' +
            '<input type="text" placeholder="Amount to invest" style=" width:350px; height:25px; font-size: 12px; ">' +
            '<button class="create-btn" id="btn9" style="width: 50px; display: inline-block; position: relative; left: 550px; bottom: 1px;" onclick="removeRule()">-</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<b style="color: black; position: relative; bottom: 130px; right: 10px;">' + document.getElementById('r9').textContent + '</b>'

    }


    if (document.getElementById('r10').selected == true) {
        counter++;
        rule.innerHTML += '<div class="amount-input-row">' +
            '<div class="card2" id="etfbody" style="width:1125px ; position: relative; bottom: 70px; right: 12px">' +
            '<label for="etf" style=" color: white; position: relative; top: 8px; left: 10px;" id="label2"><b>Rule ' + counter + ':</b></label>' +
            '<div class="custom-select" style="display: inline-block; position: relative; top:5px; left:25px;">' +
            '<input type="text" placeholder="Ticker name" style=" width:350px; height:25px; font-size: 12px; ">' +
            '<input type="text" placeholder="Percentage amount" style=" width:350px; height:25px; font-size: 12px; ">' +
            '<button class="create-btn" id="btn10" style="width: 50px; display: inline-block; position: relative; left: 205px; bottom: 1px;" onclick="removeRule()">-</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<b style="color: black; position: relative; bottom: 130px; right: 10px;">' + document.getElementById('r10').textContent + '</b>'

    }

    if (document.getElementById('r11').selected == true) {
        counter++;
        rule.innerHTML += '<div class="amount-input-row">' +
            '<div class="card2" id="etfbody" style="width:1125px ; position: relative; bottom: 70px; right: 12px">' +
            '<label for="etf" style=" color: white; position: relative; top: 8px; left: 10px;" id="label2"><b>Rule ' + counter + ':</b></label>' +
            '<div class="custom-select" style="display: inline-block; position: relative; top:5px; left:25px;">' +
            '<select>' +
            '<option value="0">Select sector by name:</option>' +
            '<option value="1" id="r1">Industrials</option>' +
            '<option value="2" id="r2">Technology</option>' +
            '<option value="3" id="r3">Consumer Defensive</option>' +
            '<option value="4" id="r4">Consumer Cyclical</option>' +
            '<option value="5" id="r5">Financial Services</option>' +
            '<option value="6" id="r6">Utilities</option>' +
            '<option value="7" id="r7">Healthcare</option>' +
            '<option value="8" id="r8">Energy</option>' +
            '<option value="9" id="r9">Business Services</option>' +
            '<option value="10" id="r10">Real Estate</option>' +
            '<option value="11" id="r11">Basic Materials</option>' +
            '<option value="12" id="r12">Other</option>' +
            '</select>' +
            '<input type="text" placeholder="Percentage amount" style=" width:350px; height:25px; font-size: 12px; ">' +
            '<input type="text" placeholder="Amount of companies" style=" width:350px; height:25px; font-size: 12px; ">' +
            '<button class="create-btn" id="btn11" style="width: 50px; display: inline-block; position: relative; left: 35px; bottom: 1px;" onclick="removeRule()">-</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<b style="color: black; position: relative; bottom: 130px; right: 10px;">' + document.getElementById('r11').textContent + '</b>'

    }

    if (document.getElementById('r12').selected == true) {
        counter++;
        rule.innerHTML += '<div class="amount-input-row">' +
            '<div class="card2" id="etfbody" style="width:1125px ; position: relative; bottom: 70px; right: 12px">' +
            '<label for="etf" style=" color: white; position: relative; top: 8px; left: 10px;" id="label2"><b>Rule ' + counter + ':</b></label>' +
            '<div class="custom-select" style="display: inline-block; position: relative; top:5px; left:25px;">' +
            '<select>' +
            '<option value="0">Select industry by name:</option>' +
            '<option value="1" id="r1">Industrial Products</option>' +
            '<option value="2" id="r2">Business Services</option>' +
            '<option value="3" id="r3">Engineering & Construction</option>' +
            '<option value="4" id="r4">Waste Management</option>' +
            '<option value="5" id="r5">Industrial Distribution</option>' +
            '<option value="6" id="r6">Airlines</option>' +
            '<option value="7" id="r7">Consulting & Outsourcing</option>' +
            '<option value="8" id="r8">Aerospace & Defense</option>' +
            '<option value="9" id="r9">Farm & Construction Machinery</option>' +
            '<option value="10" id="r10">Transportation & Logistics</option>' +
            '<option value="11" id="r11">Employment Services</option>' +
            '<option value="12" id="r12">Truck Manufacturing</option>' +
            '<option value="13" id="r13">Conglomerates</option>' +
            '<option value="14" id="r14">Computer Hardware</option>' +
            '<option value="15" id="r15">Online Media</option>' +
            '<option value="16" id="r16">Application Software</option>' +
            '<option value="17" id="r17">Semiconductors</option>' +
            '<option value="18" id="r18">Communication Equipment</option>' +
            '<option value="19" id="r19">Retail - Defensive</option>' +
            '<option value="20" id="r20">Consumer Packaged Goods</option>' +
            '<option value="21" id="r21">Tobacco Products</option>' +
            '<option value="22" id="r22">Beverages - Alcoholic</option>' +
            '<option value="23" id="r23">Beverages - Non-Alcoholic</option>' +
            '<option value="24" id="r24">Education</option>' +
            '<option value="25" id="r25">Entertainment</option>' +
            '<option value="26" id="r26">Retail - Apparel & Specialty</option>' +
            '<option value="27" id="r27">Restaurants</option>' +
            '<option value="28" id="r28">Manufacturing - Apparel & Furniture</option>' +
            '<option value="29" id="r29">Autos</option>' +
            '<option value="30" id="r30">Advertising & Marketing Services</option>' +
            '<option value="31" id="r31">Homebuilding & Construction</option>' +
            '<option value="32" id="r32">Travel & Leisure</option>' +
            '<option value="33" id="r33">Packaging & Containers</option>' +
            '<option value="34" id="r34">Personal Services</option>' +
            '<option value="35" id="r35">Publishing</option>' +
            '<option value="36" id="r36">Asset Management</option>' +
            '<option value="37" id="r37">Banks</option>' +
            '<option value="38" id="r38">Brokers+ Exchanges & Other</option>' +
            '<option value="39" id="r39">Insurance - Life</option>' +
            '<option value="40" id="r40">Insurance</option>' +
            '<option value="41" id="r41">Insurance - Property & Casualty</option>' +
            '<option value="42" id="r42">Credit Services</option>' +
            '<option value="43" id="r43">Insurance - Specialty</option>' +
            '<option value="44" id="r44">Utilities - Regulated</option>' +
            '<option value="45" id="r45">Utilities - Independent Power Producers</option>' +
            '<option value="46" id="r46">Medical Diagnostics & Research</option>' +
            '<option value="47" id="r47">Biotechnology</option>' +
            '<option value="48" id="r48">Medical Instruments & Equipment</option>' +
            '<option value="49" id="r49">Medical Devices</option>' +
            '<option value="50" id="r50">Drug Manufacturers</option>' +
            '<option value="51" id="r51">Health Care Plans</option>' +
            '<option value="52" id="r52">Health Care Providers</option>' +
            '<option value="53" id="r53">Medical Distribution</option>' +
            '<option value="54" id="r54">Oil & Gas - Refining & Marketing</option>' +
            '<option value="55" id="r55">Oil & Gas - E&P</option>' +
            '<option value="56" id="r56">Oil & Gas - Midstream</option>' +
            '<option value="57" id="r57">Oil & Gas - Services</option>' +
            '<option value="58" id="r58">Oil & Gas - Integrated</option>' +
            '<option value="59" id="r59">Oil & Gas - Drilling</option>' +
            '<option value="60" id="r60">Alternative Energy Sources & Other</option>' +
            '<option value="61" id="r61">Communication Services</option>' +
            '<option value="62" id="r62">Consulting</option>' +
            '<option value="63" id="r63">HR & Staffing</option>' +
            '<option value="64" id="r64">Other</option>' +
            '<option value="65" id="r65">REITs</option>' +
            '<option value="66" id="r66">Real Estate Services</option>' +
            '<option value="67" id="r67">Chemicals</option>' +
            '<option value="68" id="r68">Forest Products</option>' +
            '<option value="69" id="r69">Agriculture</option>' +
            '<option value="70" id="r70">Metals & Mining</option>' +
            '<option value="71" id="r71">Building Materials</option>' +
            '<option value="72" id="r72">Coal</option>' +
            '<option value="73" id="r73">Steel</option>' +
            '<option value="74" id="r74">Diversified Holdings</option>' +
            '</select>' +
            '<input type="text" placeholder="Percentage amount" style=" width:350px; height:25px; font-size: 12px; ">' +
            '<input type="text" placeholder="Amount of companies" style=" width:350px; height:25px; font-size: 12px; ">' +
            '<button class="create-btn" id="btn12" style="width: 50px; display: inline-block; position: relative; left: 5px; bottom: 1px;" onclick="removeRule()">-</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<b style="color: black; position: relative; bottom: 130px; right: 10px;">' + document.getElementById('r12').textContent + '</b>'
    }

    if (document.getElementById('r13').selected == true) {
        counter++;
        rule.innerHTML += '<div class="amount-input-row">' +
            '<div class="card2" id="etfbody" style="width:1125px ; position: relative; bottom: 70px; right: 12px">' +
            '<label for="etf" style=" color: white; position: relative; top: 8px; left: 10px;" id="label2"><b>Rule ' + counter + ':</b></label>' +
            '<div class="custom-select" style="display: inline-block; position: relative; top:5px; left:25px;">' +
            '<input type="text" placeholder="Percentage" style=" width:350px; height:25px; font-size: 12px; ">' +
            '<input type="text" placeholder="Amount of companies" style=" width:350px; height:25px; font-size: 12px; ">' +
            '<button class="create-btn" id="btn13" style="width: 50px; display: inline-block; position: relative; left: 265px; bottom: 1px;" onclick="removeRule()">-</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<b style="color: black; position: relative; bottom: 130px; right: 10px;">' + document.getElementById('r13').textContent + '</b>'

    }

    if (document.getElementById('r14').selected == true) {
        counter++;
        rule.innerHTML += '<div class="amount-input-row">' +
            '<div class="card2" id="etfbody" style="width:1125px ; position: relative; bottom: 70px; right: 12px">' +
            '<label for="etf" style=" color: white; position: relative; top: 8px; left: 10px;" id="label2"><b>Rule ' + counter + ':</b></label>' +
            '<div class="custom-select" style="display: inline-block; position: relative; top:5px; left:25px;">' +
            '<select>' +
            '<option value="0">Select a country exchange:</option>' +
            '<option value="1" id="r1">AS: NYSE EURONEXT - EURONEXT AMSTERDAM</option>' +
            '<option value="2" id="r2">AT: ATHENS EXCHANGE S.A. CASH MARKET</option>' +
            '<option value="3" id="r3">AX: ASX - ALL MARKETS</option>' +
            '<option value="4" id="r4">BA: BOLSA DE COMERCIO DE BUENOS AIRES</option>' +
            '<option value="5" id="r5">BC: BOLSA DE VALORES DE COLOMBIA</option>' +
            '<option value="6" id="r6">BD: BUDAPEST STOCK EXCHANGE</option>' +
            '<option value="7" id="r7">BE: BOERSE BERLIN</option>' +
            '<option value="8" id="r8">BK: STOCK EXCHANGE OF THAILAND</option>' +
            '<option value="9" id="r9">BO: BSE LTD</option>' +
            '<option value="10" id="r10">BR: NYSE EURONEXT - EURONEXT BRUSSELS</option>' +
            '<option value="11" id="r11">CA: Egyptian Stock Exchange</option>' +
            '<option value="12" id="r12">CN: CANADIAN NATIONAL STOCK EXCHANGE</option>' +
            '<option value="13" id="r13">CO: OMX NORDIC EXCHANGE COPENHAGEN A/S</option>' +
            '<option value="14" id="r14">CR: CARACAS STOCK EXCHANGE</option>' +
            '<option value="15" id="r15">DB: DUBAI FINANCIAL MARKET</option>' +
            '<option value="16" id="r16">DE: XETRA</option>' +
            '<option value="17" id="r17">DU: BOERSE DUESSELDORF</option>' +
            '<option value="18" id="r18">F: DEUTSCHE BOERSE AG</option>' +
            '<option value="19" id="r19">HE: NASDAQ OMX HELSINKI LTD</option>' +
            '<option value="20" id="r20">HK: HONG KONG EXCHANGES AND CLEARING LTD</option>' +
            '<option value="21" id="r21">HM: HANSEATISCHE WERTPAPIERBOERSE HAMBURG</option>' +
            '<option value="22" id="r22">IC: NASDAQ OMX ICELAND</option>' +
            '<option value="23" id="r23">IR: IRISH STOCK EXCHANGE - ALL MARKET</option>' +
            '<option value="24" id="r24">IS: BORSA ISTANBUL</option>' +
            '<option value="25" id="r25">JK: INDONESIA STOCK EXCHANGE</option>' +
            '<option value="26" id="r26">JO: JOHANNESBURG STOCK EXCHANGE</option>' +
            '<option value="27" id="r27">KL: BURSA MALAYSIA</option>' +
            '<option value="28" id="r28">KQ: KOREA EXCHANGE (KOSDAQ)</option>' +
            '<option value="29" id="r29">KS: KOREA EXCHANGE (STOCK MARKET)</option>' +
            '<option value="30" id="r30">L: LONDON STOCK EXCHANGE</option>' +
            '<option value="31" id="r31">LN: Euronext London</option>' +
            '<option value="32" id="r32">LS: NYSE EURONEXT - EURONEXT LISBON</option>' +
            '<option value="33" id="r33">MC: BOLSA DE MADRID</option>' +
            '<option value="34" id="r34">ME: MOSCOW EXCHANGE</option>' +
            '<option value="35" id="r35">MI: Italian Stock Exchange</option>' +
            '<option value="36" id="r36">MU: BOERSE MUENCHEN</option>' +
            '<option value="37" id="r37">MX: BOLSA MEXICANA DE VALORES (MEXICAN STOCK EXCHANGE)</option>' +
            '<option value="38" id="r38">NE: AEQUITAS NEO EXCHANGE</option>' +
            '<option value="39" id="r39">NL: Nigerian Stock Exchange</option>' +
            '<option value="40" id="r40">NS: NATIONAL STOCK EXCHANGE OF INDIA</option>' +
            '<option value="41" id="r41">NZ: NEW ZEALAND EXCHANGE LTD</option>' +
            '<option value="42" id="r42">OL: OSLO BORS ASA</option>' +
            '<option value="43" id="r43">PA: NYSE EURONEXT - MARCHE LIBRE PARIS</option>' +
            '<option value="44" id="r44">PM: Philippine Stock Exchange</option>' +
            '<option value="45" id="r45">PR: PRAGUE STOCK EXCHANGE</option>' +
            '<option value="46" id="r46">QA: QATAR EXCHANGE</option>' +
            '<option value="47" id="r47">RG: NASDAQ OMX RIGA</option>' +
            '<option value="48" id="r48">SA: Brazil Bolsa - Sao Paolo</option>' +
            '<option value="49" id="r49">SG: BOERSE STUTTGART</option>' +
            '<option value="50" id="r50">SI: SINGAPORE EXCHANGE</option>' +
            '<option value="51" id="r51">SN: SANTIAGO STOCK EXCHANGE</option>' +
            '<option value="52" id="r52">SR: SAUDI STOCK EXCHANGE</option>' +
            '<option value="53" id="r53">SS: SHANGHAI STOCK EXCHANGE</option>' +
            '<option value="54" id="r54">ST: NASDAQ OMX NORDIC STOCKHOLM</option>' +
            '<option value="55" id="r55">SW: SWISS EXCHANGE</option>' +
            '<option value="56" id="r56">SZ: SHENZHEN STOCK EXCHANGE</option>' +
            '<option value="57" id="r57">T: TOKYO STOCK EXCHANGE-TOKYO PRO MARKET</option>' +
            '<option value="58" id="r58">TA: TEL AVIV STOCK EXCHANGE</option>' +
            '<option value="59" id="r59">TL: NASDAQ OMX TALLINN</option>' +
            '<option value="60" id="r60">TO: TORONTO STOCK EXCHANGE</option>' +
            '<option value="61" id="r61">TW: TAIWAN STOCK EXCHANGE</option>' +
            '<option value="62" id="r62">TWO: TPEx</option>' +
            '<option value="63" id="r63">US: US exchanges (NYSE, Nasdaq)</option>' +
            '<option value="64" id="r64">V: TSX VENTURE EXCHANGE - NEX</option>' +
            '<option value="65" id="r65">VI: Vienna Stock Exchange</option>' +
            '<option value="66" id="r66">VN: Vietnam exchanges including HOSE, HNX and UPCOM</option>' +
            '<option value="67" id="r67">VS: NASDAQ OMX VILNIUS</option>' +
            '<option value="68" id="r68">WA: WARSAW STOCK EXCHANGE/EQUITIES/MAIN MARKET</option>' +
            '<option value="69" id="r69">HA: Hanover Stock Exchange</option>' +
            '<option value="70" id="r70">SX: DEUTSCHE BOERSE Stoxx</option>' +
            '<option value="71" id="r71">TG: DEUTSCHE BOERSE TradeGate </option>' +
            '<option value="72" id="r72">SC: BOERSE_FRANKFURT_ZERTIFIKATE</option>' +
            '</select>' +
            '<input type="text" placeholder="Percentage amount" style=" width:230px; height:25px; font-size: 12px; ">' +
            '<input type="text" placeholder="Amount of companies" style=" width:250px; height:25px; font-size: 12px; ">' +
            '<button class="create-btn" id="btn14" style="width: 50px; display: inline-block; position: relative; left: 55px; bottom: 1px;" onclick="removeRule()">-</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<b style="color: black; position: relative; bottom: 130px; right: 10px;">' + document.getElementById('r14').textContent + '</b>'
    }

    if (document.getElementById('r15').selected == true) {
        counter++;
        rule.innerHTML += '<div class="amount-input-row">' +
            '<div class="card2" id="etfbody" style="width:1125px ; position: relative; bottom: 70px; right: 12px">' +
            '<label for="etf" style=" color: white; position: relative; top: 8px; left: 10px;" id="label2"><b>Rule ' + counter + ':</b></label>' +
            '<div class="custom-select" style="display: inline-block; position: relative; top:5px; left:25px;">' +
            '<input type="text" placeholder="Percentage" style=" width:350px; height:25px; font-size: 12px; ">' +
            '<input type="text" placeholder="Amount of companies" style=" width:350px; height:25px; font-size: 12px; ">' +
            '<button class="create-btn" id="btn15" style="width: 50px; display: inline-block; position: relative; left: 255px; bottom: 1px;" onclick="removeRule()">-</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<b style="color: black; position: relative; bottom: 130px; right: 10px;">' + document.getElementById('r15').textContent + '</b>'
    }


    if (document.getElementById('r16').selected == true) {
        counter++;
        rule.innerHTML += '<div class="amount-input-row">' +
            '<div class="card2" id="etfbody" style="width:1125px ; position: relative; bottom: 70px; right: 12px">' +
            '<label for="etf" style=" color: white; position: relative; top: 8px; left: 10px;" id="label2"><b>Rule ' + counter + ':</b></label>' +
            '<div class="custom-select" style="display: inline-block; position: relative; top:5px; left:25px;">' +
            '<input type="text" placeholder="Balance period in weeks" style=" width:350px; height:25px; font-size: 12px; ">' +
            '<button class="create-btn" id="btn16" style="width: 50px; display: inline-block; position: relative; left: 550px; bottom: 1px;" onclick="removeRule()">-</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<b style="color: black; position: relative; bottom: 130px; right: 10px;">' + document.getElementById('r16').textContent + '</b>'
    }

    if (document.getElementById('r17').selected == true) {
        counter++;
        rule.innerHTML += '<div class="amount-input-row">' +
            '<div class="card2" id="etfbody" style="width:1125px ; position: relative; bottom: 70px; right: 12px">' +
            '<label for="etf" style=" color: white; position: relative; top: 8px; left: 10px;" id="label2"><b>Rule ' + counter + ':</b></label>' +
            '<div class="custom-select" style="display: inline-block; position: relative; top:5px; left:25px;">' +
            '<input type="text" placeholder="Percentage drops" style=" width:350px; height:25px; font-size: 12px; ">' +
            '<button class="create-btn" id="btn17" style="width: 50px; display: inline-block; position: relative; left: 550px; bottom: 1px;" onclick="removeRule()">-</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<b style="color: black; position: relative; bottom: 130px; right: 10px;">' + document.getElementById('r17').textContent + '</b>'
    }

    if (document.getElementById('r18').selected == true) {
        counter++;
        rule.innerHTML += '<div class="amount-input-row">' +
            '<div class="card2" id="etfbody" style="width:1125px ; position: relative; bottom: 70px; right: 12px">' +
            '<label for="etf" style=" color: white; position: relative; top: 8px; left: 10px;" id="label2"><b>Rule ' + counter + ':</b></label>' +
            '<div class="custom-select" style="display: inline-block; position: relative; top:5px; left:25px;">' +
            '<input type="text" placeholder="Number of weeks until reconsideration" style=" width:350px; height:25px; font-size: 12px; ">' +
            '<button class="create-btn" id="btn18" style="width: 50px; display: inline-block; position: relative; left: 550px; bottom: 1px;" onclick="removeRule()">-</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<b style="color: black; position: relative; bottom: 130px; right: 10px;">' + document.getElementById('r18').textContent + '</b>'
    }

    if (document.getElementById('r0').selected == true) {
        alert("Please select a rule");
    }



}

function removeRule() {


    alert("Rule removed");


}
