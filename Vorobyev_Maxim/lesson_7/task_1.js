function NumberToObject(number) {
  let obj = {};

  if (number > 999 || number < 0) {
    obj = null;
    return obj;
  }

  obj.units = number % 10;
  number = Math.floor(number / 10);
  obj.decades = number % 10;
  number = Math.floor(number / 10);
  obj.hundreds = number % 10;
  return obj;
}

console.log(NumberToObject(245));