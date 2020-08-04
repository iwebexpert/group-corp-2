//task_2_3
let bin = [{
  "productName": "computer",
  "price": 75000 
  },
  {
  "productName": "PS4",
  "price": 30000
  },
  {
  "productName": "XBOX",
  "price": 13000
  },
  {
  "productName": "nothing",
  "price": 0
  }
];

function countBasketPrice(bin) {
  let sum = 0;
  for (let i = 0; i < bin.length; i++) {
    sum += bin[i].price;
  }
  return sum;
}

console.log(countBasketPrice(bin));