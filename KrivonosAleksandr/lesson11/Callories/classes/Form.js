class Form {
    constructor() {
        this.form = document.querySelector('form');
        this.sizesDiv = this.form.querySelector('.sizes-container');        //div-блок с размерами
        this.fillingsDiv = this.form.querySelector('.filling-types');       //div-блок с наяинками
        this.additionalsDiv = this.form.querySelector('.additional-types'); //div-блок с дополнительными ингридиентами

        //чекбоксы из соответствующих блоков
        this.sizes = this.sizesDiv.querySelectorAll('.checkbox');
        this.fillings = this.fillingsDiv.querySelectorAll('.checkbox');
        this.additionals = this.additionalsDiv.querySelectorAll('.checkbox');
    }

    bindActionToCheckboxes (elem) {
        elem.forEach((item, i) => {
            item.addEventListener('input', () => {
                if (item.getAttribute('type') === 'checkbox' && item.getAttribute('name') === 'size')   {
                    elem.forEach((box, j) => {
                        //один из размеров автоматически выбирается
                        box.checked = false;
                        if (i === j) {
                            box.checked = true;
                        }
                    });
                }
                if (item.getAttribute('type') === 'checkbox' && item.getAttribute('name') === 'filling'){
                    let checked = false;

                    for(let j = 0; j < elem.length; j++) {
                        if (elem[j].checked === true) {
                            checked = true;
                            break;
                        } else {
                            checked = false;
                        }
                    }
                    //если ни один не выбран, то автоматически выбирается первая начинка
                    if(!checked){
                        elem[0].checked = true;
                    }
                }
            });
        });
    }

    init(){
        this.bindActionToCheckboxes(this.sizes);
        this.bindActionToCheckboxes(this.fillings);
        this.bindActionToCheckboxes(this.additionals);
    }
}