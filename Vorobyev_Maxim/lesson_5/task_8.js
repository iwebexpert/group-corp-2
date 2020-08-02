function power(val, pow) {
  return pow == 1 ? val : val * power(val, pow - 1);
}

console.log(power(5, 3));