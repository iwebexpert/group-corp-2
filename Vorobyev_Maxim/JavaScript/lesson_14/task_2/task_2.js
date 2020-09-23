const fs = require("fs");
fs.readFile("textFile.txt", "utf8", function(error, data) {
  if (error) throw error;
  console.log(`Исходный текст:\n${data}`);  
  console.log(data.replace(/('(?!\w))|((?<!\w)')/g, '"'));
});