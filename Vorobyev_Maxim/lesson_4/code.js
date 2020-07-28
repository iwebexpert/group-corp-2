//first task
document.getElementById("convert_button").addEventListener("click", function() {
  alert((9/5) * document.getElementById("input_temperature").value + 32);
});

//second task
document.getElementById("result_button").addEventListener("click", function() {
  let admin;
  let name = "Василий";
  admin = name;
  alert(admin);
});

//1000 + "108";
//У нас второй операнд сдесь строка, 
//значит и первый будет преобразован в строку
//выведет 1000108


//async, defer - атрибуты.
//async - скрипт выполняется асинхронно. 
//Браузер не будет останавливать обработку страницы,
//а когда скрипт загрузится, то он выполнится.
//defer - ждет готовности всего документа и порядок скриптов с 
//defer сохраняется.