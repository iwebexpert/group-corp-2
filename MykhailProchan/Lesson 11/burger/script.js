const lib = {
  big: ['Большой', 100, 40],
  small: ['Маленький', 50, 20],
  cheese: ['С сыром', 10, 20],
  salad: ['С салатом', 20, 5],
  potato: ['С картофелем', 15, 10],
  flavoring: ['С приправой', 15, 0],
  mayo: ['С майонезом', 20, 5]
}

function formAction() {
  let sum = 0, kcal = 0;

  const data = serialize(form);
  const kcalElement = document.querySelector('#kcal');
  const sumElement = document.querySelector('#sum');
  const checkElement = document.querySelector('#check');

  checkElement.innerHTML = '';

  data.forEach(a => {
    const temp = lib[Object.keys(lib).find(key => a[1] == key)];
    checkElement.appendChild(document.createElement('p')).textContent = temp[0] +
      ' ' + temp[1] + ' руб';
    sum += temp[1];
    kcal += temp[2];
  })

  kcalElement.textContent = 'Калории: ' + kcal + ' ккал';
  sumElement.textContent = 'Стоимость: ' + sum + ' руб';
}

function serialize(form) {
  var i, q = [,];
  for (i = form.elements.length - 1; i >= 0; i = i - 1) {
    if (form.elements[i].name === "") {
      continue;
    }
    if ((form.elements[i].type == 'checkbox' || form.elements[i].type == 'radio')
      && form.elements[i].checked)
      q.push([
        form.elements[i].name, encodeURIComponent(form.elements[i].value)
      ]);
  }
  return q.reverse();
}

