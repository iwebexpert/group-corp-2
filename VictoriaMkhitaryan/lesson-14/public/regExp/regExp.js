function replaceQuotation() {
  // 1-2 задание
  const text = document.getElementById('textQuotation');
  const newText = text.textContent.replace(/'\B|\B'/g, '"');
  text.innerHTML = newText;
}