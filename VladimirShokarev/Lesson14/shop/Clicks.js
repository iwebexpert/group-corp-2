document.querySelector('#mainBtr').onclick = function(){
  document.querySelector('#cards').style = 'display: flex';
  document.querySelector('#catalog').style = 'display: none';
  document.querySelector('#nextProducts').style = 'display: none';
  document.querySelector('#form').style = 'display: none';
}

let basketPts = document.getElementById('basketPts');
basketPts.onclick = function(){
  document.querySelector('#cards').style = 'display: none';
  document.querySelector('#catalog').style = 'display: block';
  document.querySelector('#nextProducts').style = 'display: block';
  document.querySelector('#form').style = 'display: none';
}

document.querySelector('#nextProducts').onclick = function(){
    document.querySelector('#form').style = 'display: block';
    document.querySelector('#catalog').style = 'display: none';
    document.querySelector('#nextProducts').style = 'display: none';
}

document.querySelector('#buyAll').onclick = function(){
  let getEmail = document.querySelector('#inputEmail4').value;
  let getPhone = document.querySelector('#inputPassword4').value;
  let getAddress= document.querySelector('#inputAddress').value;
  let getCity= document.querySelector('#inputCity').value;
  let getZip= document.querySelector('#inputZip').value;

  let getEmailtf = myForm.getEmailFunc(getEmail);
  let getPhonetf = myForm.getPhoneFunc(getPhone);
  let getAddresstf = myForm.getAddressFunc(getAddress);
  let getCitytf = myForm.getCityFunc(getCity);
  let getZiptf = myForm.getZipFunc(getZip);

  if(getEmailtf==false||getPhonetf==false||getAddresstf==false||getCitytf==false||getZiptf==false){
    document.querySelector('.ErrForm').innerHTML = 'Вы допустили ошибку или что-то не заполнили! Проверьте все поля еще раз!';
    document.querySelector('.ErrForm').style = 'color: red'
    return;
  }

  alert('Спасибо за покупу');
  location.reload()
}

document.querySelector('#backBtr').onclick = function(){
  document.querySelector('#cards').style = 'display: none';
  document.querySelector('#catalog').style = 'display: block';
  document.querySelector('#nextProducts').style = 'display: block';
  document.querySelector('#form').style = 'display: none';
}
