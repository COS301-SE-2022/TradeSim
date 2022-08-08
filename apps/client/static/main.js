// Tabs
var el = document.querySelector('.tabs');
var instance = M.Tabs.init(el, {});

//after tabs are loaded
function initializeComponents() {
    //Accordion setup
    var elem = document.querySelector('.collapsible.expandable');
    var instances = M.Collapsible.init(elem, {
        accordion: false
    });

    //Select
    var select = document.querySelectorAll('select');
    var instances = M.FormSelect.init(select, '');
    
}

function selectRule(eventObject) {
    var allRules = document.querySelectorAll('.rule');
    allRules.forEach(function(rule) {
        rule.style.display = 'none';
    })

    switch (eventObject.value) {
        case 'excl_id': document.getElementById('rule1').style.display = 'block';
            break;
        case 'incl_price': document.getElementById('rule2').style.display = 'block';
            break;
        case 'incl_market': document.getElementById('rule2').style.display = 'block';
            break;
    }

    document.getElementById('addRuleButton').style.display = 'block'
}

// Load a whole page in the tab div
async function fetchHtmlAsText(url) {
    return await (await fetch(url)).text();
}

// this is your `load_home() function`
async function loadTabsContent() {
    //home
    let contentDiv = document.getElementById('homeTab');
    contentDiv.innerHTML = await fetchHtmlAsText('home');

    //manage
    contentDiv = document.getElementById('manageTab');
    contentDiv.innerHTML = await fetchHtmlAsText('addETF');

    //compare
    contentDiv = document.getElementById('compareTab');
    contentDiv.innerHTML = await fetchHtmlAsText('compare-date');

    //Accordion setup
    var elem = document.querySelector('.collapsible.expandable');
    var instances = M.Collapsible.init(elem, {
        accordion: false
    });

    //Select
    var select = document.querySelectorAll('select');
    var instances = M.FormSelect.init(select, '');
    
}
loadTabsContent();