function validateform() {
    var flag = true;
    var name = document.myform.name.value;
    var password = document.myform.password.value;

    if (name == null || name == "") {
        alert("Name can't be blank");
        flag = false;
    }
    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        flag = false;
    }


    var firstpassword = document.myform.password.value;
    var secondpassword = document.myform.cpsw.value;

    if (firstpassword != secondpassword) {
        alert("password must be same!");
        flag = false;
    }

    if (flag == true) {
        return true;
    } else {
        return false;
    }

}

function checkETF() {
    var etfname = document.myform.etfName.value;
    if (etfname == null || etfname == "") {
        alert("Please name your ETF");
        flag = false;
    }
    return true;
}
