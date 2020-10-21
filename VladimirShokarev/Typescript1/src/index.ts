import './main.css';

let addBtnApple:HTMLElement | null = document.getElementById('addBtnApple');//HTMLElement | null
let addBtnMilk:HTMLElement | null = document.getElementById('addBtnMilk');
let addBtnBread:HTMLElement | null = document.getElementById('addBtnBread');
let addBtnWater:HTMLElement | null = document.getElementById('addBtnWater');

let delBtnApple:HTMLElement | null = document.getElementById('delBtnApple');
let delBtnMilk:HTMLElement | null = document.getElementById('delBtnMilk');
let delBtnBread:HTMLElement | null = document.getElementById('delBtnBread');
let delBtnWater:HTMLElement | null = document.getElementById('delBtnWater');

let info:HTMLElement | null = document.getElementById('info');

interface Items {
  name: string,
  price: number,
  amount: number
};

const Apple:Items = {
  name: 'Apple',
  price: 10,
  amount: 0
};
const Milk:Items = {
  name: 'Milk',
  price: 100,
  amount: 0
};
const Bread:Items = {
  name: 'Bread',
  price: 50,
  amount: 0
};
const Water:Items = {
  name: 'Water',
  price: 70,
  amount: 0
}

let arrProd: Array<Items> = [];
const constProd: Array<Items> = [Apple, Milk, Bread, Water];
const constBtn: Array<any> = [addBtnApple, addBtnMilk, addBtnBread, addBtnWater];
const constBtnDel: Array<any> = [delBtnApple, delBtnMilk, delBtnBread, delBtnWater];

if(addBtnApple && addBtnMilk && addBtnBread && addBtnWater){
  for(let i = 0; i < constBtn.length; i++){
    constBtn[i].onclick = function(){
      let amount: number = +(<HTMLInputElement>document.getElementsByClassName('inputProducts')[i]).value;
      constProd[i].amount = amount;
      arrProd.push(constProd[i]);         

      if(arrProd.length > 1){
        for (let j = 0; j < arrProd.length-1; j++){
          if(arrProd[j].name === constProd[i].name){
            arrProd.splice(j, 1);
          }
        }
      }

      sumAll(arrProd, info);
    }
  }
}

if(delBtnApple && delBtnMilk && delBtnBread && delBtnWater){
  for(let i = 0; i < constBtnDel.length; i++){
    constBtnDel[i].onclick = function(){
      if(arrProd.length > 0){
        for (let j = 0; j < arrProd.length; j++){
          if(arrProd[j].name === constProd[i].name){
            arrProd.splice(j, 1);
          }
        }
      }

      sumAll(arrProd, info);
    }
  }
}

function sumAll(arrProd: Array<Items>, info: HTMLElement | null):void{
  let sum: number = 0;
  if(info){
    info.innerHTML=``;
    for(let i = 0; i < arrProd.length; i++){
      sum += arrProd[i].amount * arrProd[i].price;
      info.innerHTML+=`${arrProd[i].name} Кол-во: ${arrProd[i].amount} Сумма: ${arrProd[i].amount*arrProd[i].price} <br>`;
    }
      info.innerHTML+=`Всего: ${sum}`;
  }
}
