function formAction() {
  const data = serialize(form)

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

