class Forms {
    constructor(forms) {
        this.forms = [...forms];
    }

    isAnyIncorrectForm() {
        let counter = 0;
        this.forms.forEach((form) => {
            if (form.getAttribute('type') === 'name') {
                if (!this.isMatch(/^[a-zA-Zа-яА-ЯЁё]+$/, form)) {
                    counter += 1;
                }
            }
            if (form.getAttribute('type') === 'phone') {
                if (!this.isMatch(/^\+\d{1}\(\d{3}\)\d{3}-\d{4}$/, form)) {
                    counter += 1;
                }
            }
            if (form.getAttribute('type') === 'email') {
                if (!this.isMatch(/^([a-z0-9_.-]+)@([a-z0-9_.-]+)\.([a-z]{2,6})$/i, form)) {
                    counter += 1;
                }
            }
            if (form.getAttribute('type') === 'text') {
                if (!this.isMatch(/\w+/, form)) {
                    counter += 1;
                }
            }
        });

        return counter > 0 ? false : true;
    }


    isMatch(reg, el) {
        return reg.test(el.value);
    }
    incorrectFormHandler(reg, el) {
        if (!reg.test(el.value)) {
            el.style.border = '2px solid red';
            el.classList.add('incorrect');
        }
    }

    validateForm() {
        for (let i = 0; i < this.forms.length; i++) {
            if (this.forms[i].getAttribute('type') === 'name') {
                this.incorrectFormHandler(/^[a-zA-Zа-яА-ЯЁё]+$/, this.forms[i]);
            }
            if (this.forms[i].getAttribute('type') === 'phone') {
                this.incorrectFormHandler(/^\+\d{1}\(\d{3}\)\d{3}-\d{4}$/, this.forms[i]);
            }
            if (this.forms[i].getAttribute('type') === 'email') {
                this.incorrectFormHandler(/^([a-z0-9_.-]+)@([a-z0-9_.-]+)\.([a-z]{2,6})$/i, this.forms[i]);
            }
            if (this.forms[i].getAttribute('type') === 'text') {
                this.incorrectFormHandler(/\w+/, this.forms[i]);
            }
        }
    }


}