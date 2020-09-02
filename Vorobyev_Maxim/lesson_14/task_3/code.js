document.getElementsByClassName("b")[0].addEventListener("click", correct);
for (let i = 0; i < document.getElementsByClassName("form-control").length; i++) {
  document.getElementsByClassName("form-control")[i].style.border = '1px solid lightgrey';
}

function correct () {
  let errorStr = "";
  let name = document.getElementsByClassName("name")[0].value;
  if (/^[A-Za-z]*$/.test(name) == false || name.length == 0){
    errorStr += "Invalid name\n";
    document.getElementsByClassName("name")[0].style.border = '2px solid red';
  } else {
    document.getElementsByClassName("name")[0].style.border = '1px solid lightgrey';
  }

  let phone = document.getElementsByClassName("phone")[0].value;
  if (/^[+]{1}7{1}[(]{1}[0-9]{3}[)]{1}[0-9]{3}[-]{1}[0-9]{4}$/.test(phone) == false || phone.length == 0){
    errorStr += "Invalid phone\n";
    document.getElementsByClassName("phone")[0].style.border = '2px solid red';
  } else {
    document.getElementsByClassName("phone")[0].style.border = '1px solid lightgrey';
  }

  let email = document.getElementsByClassName("email")[0].value;
  if (/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(email) == false || email.length == 0){
    errorStr += "Invalid email\n";
    document.getElementsByClassName("email")[0].style.border = '2px solid red';
  } else {
    document.getElementsByClassName("email")[0].style.border = '1px solid lightgrey';
  }

  if (errorStr.length) {
    alert(errorStr);
  }
}