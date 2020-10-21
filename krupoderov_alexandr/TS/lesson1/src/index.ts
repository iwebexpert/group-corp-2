let money:number

type myObj = {
    budget:number,
    shopName: string,
    shopGoods: string[],
    employers: string[],
    open: boolean,
    discount: boolean,
    shopItems: string[]
};

let mainList:myObj = {
    budget: 0,
    shopName: name,
    shopGoods: [],
    employers: [],
    open: false,
    discount: false,
    shopItems: [],
};

let openBtn: HTMLElement | null = document.querySelector('#open-btn');//Open button

let name_value:Element | null = document.querySelectorAll('.name-value')[0];// Name of

let budget_value: Element | null= document.querySelectorAll('.budget-value')[0];//Value of budget
let goods_value: Element | null = document.querySelectorAll('.goods-value')[0];//Goods
// categories
let items_value: HTMLDivElement | null = document.querySelector('.items-value');//Items values
let employers_value: Element | null= document.querySelectorAll('.employers-value')[0];
let isopen_value:HTMLElement | null = document.querySelector('.isopen-value');

let goodsItems:NodeListOf<Element> | null = document.querySelectorAll('.goods-item');
let btnGoods:HTMLButtonElement | null = document.querySelectorAll('button')[1];
let btnBudget:HTMLButtonElement | null = document.querySelectorAll('button')[2];
let btnEmployers:HTMLButtonElement | null = document.querySelectorAll('button')[3];

let chooseItem:HTMLInputElement | null = document.querySelector('.choose-item');
let timeValue:HTMLInputElement | null = document.querySelector('.time-value');
let countBudgetValue:HTMLInputElement | null = document.querySelector('.count-budget-value');

let nameEmployers:NodeListOf<HTMLInputElement> = document.querySelectorAll('.hire-employers-item');

if (openBtn) {
    openBtn.addEventListener('click', ():void => {
        setTimeout(Start, 2000);
    });
}


function Start():void {
    if (money && budget_value && name_value) {
        // @ts-ignore
        //Как переводить prompt?
        money = +prompt( "Ваш бюджет?",'' );

        while (isNaN(money) || money == null){
            // @ts-ignore
            money = +prompt( "Ваш бюджет?",'' );
        }
        budget_value.textContent = money.toString();
        name_value.textContent = prompt ( "Название Вашего магазига?",'' );
    }
}


btnGoods.addEventListener('click', () => {
    if ( mainList && goods_value && goodsItems){
        for ( let i=0; i < goodsItems.length; i++ ){
            let a:string|null = goodsItems[i].textContent;
            if (a){
                if ((typeof(a)) != null && a.toString().length<50 ) {
                    console.log('Все верно');
                    mainList.shopGoods[i] = a;
                    goods_value.textContent = mainList.shopGoods[i];
                }
            }
        }
    }

});

if (chooseItem && items_value){
    chooseItem.addEventListener('change', () => {
        if (chooseItem && items_value) {
            let items = chooseItem.value;

            mainList.shopItems = items.split(",");
            mainList.shopItems.sort();
            items_value.textContent = mainList.shopItems[0];
        }
    });
}


if (timeValue && mainList && isopen_value) {
    timeValue.addEventListener('change', () => {
        if (timeValue && isopen_value){
            let time = (timeValue.value as unknown as number);

            if (time < 0){
                console.log('такого не может быть');
                mainList.open = false;
            }else if (time > 8 && time < 20) {
                console.log('Время работать');
                mainList.open = true;
            }else if (time < 24) {
                console.log('Уже слишком поздно!');
                mainList.open = false;
            }else {
                console.log('В сутках только 24 часа!');
                mainList.open = false;
            }
            if(mainList.open == true){
                isopen_value.style.backgroundColor = 'green';
            }else{
                isopen_value.style.backgroundColor = 'red';
            }

        }
    });
}

btnBudget.addEventListener('click', () =>{
    if (countBudgetValue) {
        countBudgetValue.value = (money / 30).toString();
    }
});

btnEmployers.addEventListener('click', ():void => {
    if (nameEmployers) {
        for (let i = 0; i < nameEmployers.length; i++){
            mainList.employers[i] = nameEmployers[i].value;
        }
        for (let i = 0; i < nameEmployers.length; i++){
            if (employers_value)
            employers_value.textContent += mainList.employers[i] + ', ';
        }
    }
});



