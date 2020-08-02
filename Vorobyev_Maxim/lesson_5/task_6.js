//task 6
function sum(a, b) {
  return a + b;
}

function difference(a, b) {
  return a - b;
}

function composition(a, b) {
  return a * b; 
}

function division(a, b) {
  if (b == 0) {
    return;
  } else {
    return a / b; 
  }
}


function mathOperation(arg1, arg2, operation) {
  switch (operation) {
    case "sum": 
      sum(arg1, arg2);
      break;
    case "difference": 
      difference(arg1, arg2);
      break;
    case "composition": 
      composition(arg1, arg2);
      break;
    case "division": 
      division(arg1, arg2);
      break;
  }
}