let botMessages = [
	'Привет, все круто',
	'Я устал',
	'Если ты увидел это сообщение, то зная выпала цифра 3',
	'ХАХАХАХАХАхА, как смешно',
	'А может все-таки олдскульный ручной store?',
	'Господи, никто и не знает, что у меня  всего 10 фраз',
	'Реакт! Реакт! Реакт!',
	'Чего? Кого?',
	'Пакедово'
];

export const getBotMessage = (author: string) => {
	let index = Math.round(Math.random() * 8);
	return `${author}, ${botMessages[index]}`;
};