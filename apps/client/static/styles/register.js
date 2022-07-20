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

    // if (document.getElementById("name").value != document.getElementById("cpsw").value) {
    //     alert("Passwords do not match");
    // } else {
    //     return true;
    // }


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
