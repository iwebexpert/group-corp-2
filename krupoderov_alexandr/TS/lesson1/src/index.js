var money;
var mainList = {
    budget: 0,
    shopName: name,
    shopGoods: [],
    employers: [],
    open: false,
    discount: false,
    shopItems: []
};
var openBtn = document.querySelector('#open-btn'); //Open button
var name_value = document.querySelectorAll('.name-value')[0]; // Name of
var budget_value = document.querySelectorAll('.budget-value')[0]; //Value of budget
var goods_value = document.querySelectorAll('.goods-value')[0]; //Goods
// categories
var items_value = document.querySelector('.items-value'); //Items values
var employers_value = document.querySelectorAll('.employers-value')[0];
var isopen_value = document.querySelector('.isopen-value');
var goodsItems = document.querySelectorAll('.goods-item');
var btnGoods = document.querySelectorAll('button')[1];
var btnBudget = document.querySelectorAll('button')[2];
var btnEmployers = document.querySelectorAll('button')[3];
var chooseItem = document.querySelector('.choose-item');
var timeValue = document.querySelector('.time-value');
var countBudgetValue = document.querySelector('.count-budget-value');
var nameEmployers = document.querySelectorAll('.hire-employers-item');
if (openBtn) {
    openBtn.addEventListener('click', function () {
        setTimeout(Start, 2000);
    });
}
function Start() {
    if (money && budget_value && name_value) {
        // @ts-ignore
        //Как переводить prompt?
        money = +prompt("Ваш бюджет?", '');
        while (isNaN(money) || money == null) {
            // @ts-ignore
            money = +prompt("Ваш бюджет?", '');
        }
        budget_value.textContent = money.toString();
        name_value.textContent = prompt("Название Вашего магазига?", '');
    }
}
btnGoods.addEventListener('click', function () {
    if (mainList && goods_value && goodsItems) {
        for (var i = 0; i < goodsItems.length; i++) {
            var a = goodsItems[i].textContent;
            if (a) {
                if ((typeof (a)) != null && a.toString().length < 50) {
                    console.log('Все верно');
                    mainList.shopGoods[i] = a;
                    goods_value.textContent = mainList.shopGoods[i];
                }
            }
        }
    }
});
if (chooseItem && items_value) {
    chooseItem.addEventListener('change', function () {
        if (chooseItem && items_value) {
            var items = chooseItem.value;
            mainList.shopItems = items.split(",");
            mainList.shopItems.sort();
            items_value.textContent = mainList.shopItems[0];
        }
    });
}
if (timeValue && mainList && isopen_value) {
    timeValue.addEventListener('change', function () {
        if (timeValue && isopen_value) {
            var time = timeValue.value;
            if (time < 0) {
                console.log('такого не может быть');
                mainList.open = false;
            }
            else if (time > 8 && time < 20) {
                console.log('Время работать');
                mainList.open = true;
            }
            else if (time < 24) {
                console.log('Уже слишком поздно!');
                mainList.open = false;
            }
            else {
                console.log('В сутках только 24 часа!');
                mainList.open = false;
            }
            if (mainList.open == true) {
                isopen_value.style.backgroundColor = 'green';
            }
            else {
                isopen_value.style.backgroundColor = 'red';
            }
        }
    });
}
btnBudget.addEventListener('click', function () {
    if (countBudgetValue) {
        countBudgetValue.value = (money / 30).toString();
    }
});
btnEmployers.addEventListener('click', function () {
    if (nameEmployers) {
        for (var i = 0; i < nameEmployers.length; i++) {
            mainList.employers[i] = nameEmployers[i].value;
        }
        for (var i = 0; i < nameEmployers.length; i++) {
            if (employers_value)
                employers_value.textContent += mainList.employers[i] + ', ';
        }
    }
});
