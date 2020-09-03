var form = document.forms.regform;
var btnNextEx = document.getElementById('next-ex');
var boxNextEx = document.getElementsByClassName('box-next-ex');

var textBefore = document.getElementById('text-box__before-text'); 
var textAfter = document.getElementById('text-box__after-text'); 

var openNextEx = () => {
    form.style.display = 'none';
    boxNextEx[0].style.display = 'block';

};

var changeText = () => {
    let str = textBefore.textContent;
    console.log(str);

    textAfter.innerText = str.replace(/^'|(\s)'|'(\s)|'$/g, '$1"$2');
    
    
    //вариант учителя
    //textAfter.innerText = str.replace(/\B'|'\B/g, '"');
};