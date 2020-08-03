function task1() {
  // рассмотрите пожалуйста на занятии как сделать в одном цикле
  let i = 2;

  while(i <= 100) {
    let res = 2;
    let j = 2;

    while(i%j) {
      j++;
      res++;
    }

    if (res == i) {
      console.log(res);
    }
    
    i++;
  }
}

function countBasketPrice(items) {
  let sum = 0;
  for(let i = 0; i < items.length; i++) {
    sum += items[i].price*items[i].count;
  }

  return sum;
}

function task23() {
  const shop = [
    {
      name: 'Keyboard',
      price: 1000,
      currency: 'rub',
      count: 2,
    }, {
      name: 'Mouse',
      price: 500,
      currency: 'rub',
      count: 1,
    }    
  ];

  alert(countBasketPrice(shop));
}

function task4() {
  for(let i = 0; i <= 9; console.log(i++)) {
    // пусто
  }
}

function task5() {
  // еще можно через вложенные циклы или с помощью массива
  // по крайней мере в chrome и firefox этот вариант работать будет
  for(let i = 1; i <= 20; i++) {
    console.log('x'.repeat(i));
  }

  // вариант с массивом
  // первый вариант конечно симпатичнее 
  let arr = [];
  let i = 0;
  while (i < 20){
      arr.push('x');
      console.log(arr.join(''));
      i++;
  }

}