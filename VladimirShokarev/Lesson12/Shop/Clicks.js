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
  alert('Спасибо за покупу');
  location.reload()
}

document.querySelector('#backBtr').onclick = function(){
  document.querySelector('#cards').style = 'display: none';
  document.querySelector('#catalog').style = 'display: block';
  document.querySelector('#nextProducts').style = 'display: block';
  document.querySelector('#form').style = 'display: none';
}
