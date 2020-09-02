/* 1. Дан большой текст, в котором для оформления прямой речи используются одинарные кавычки. Придумать шаблон, который заменяет одинарные кавычки на двойные.*/

str1 = 'Здесь идет повествование - \'А здесь прямая речь\', затем снова повествование.'
console.log(str1.replace(/'/g, '"') )


/* 2. Улучшить шаблон так, чтобы в конструкциях типа aren't одинарная кавычка не заменялась на двойную.*/

str2 = 'This is a little concerning because we use our phones for work. \'Since the messages don\'t show on our end, we aren\'t sure who else may have been texted.\' Help!'
console.log(str2.replace(/'/g, '"').replace(/\b"\b/g, "'"))
