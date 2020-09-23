//task_1
let prime = 2;
while (prime <= 100) {
    let result = 2;
    let i = 2;
    while (prime % i !== 0) {
      i += 1;
      result += 1;
    }
    if (result == prime) {
      console.log(result);
    }
  prime += 1;
}