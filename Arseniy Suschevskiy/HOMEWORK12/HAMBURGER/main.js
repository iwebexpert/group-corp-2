const output = document.querySelector('.output');
const form = document.getElementById('form');
const smallHamburger = document.getElementById('small');
const bigHamburger = document.getElementById('big');
const cheese = document.getElementById('cheese');
const salad = document.getElementById('salad');
const potato = document.getElementById('potato');
const flavor = document.getElementById('flavor');
const mayo = document.getElementById('mayo');


form.addEventListener('submit', (event) => {
	event.preventDefault();
	const checkboxVerification = (smallHamburger.checked || bigHamburger.checked) && (cheese.checked || salad.checked || potato.checked);
	if (checkboxVerification) {
		let burger;
		if (bigHamburger.checked) {
			burger = new BigHamburger(new Fillings(), new Extra());
		} else {
			burger = new SmallHamburger(new Fillings(), new Extra());
		}
		burger.createHamburger();
		burger.showOutput();
	} else {
		alert('You must select at least one burger filling!');
		output.textContent = '';
	}
});

