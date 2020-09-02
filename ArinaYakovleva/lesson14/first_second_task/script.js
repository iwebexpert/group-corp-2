const replaceBtn = document.querySelector('.replace-btn'),
    phrases = document.querySelectorAll('.text_content');

replaceBtn.addEventListener('click', () => {
    phrases.forEach((text) => {
        let regExp = /\B[']/g;

        text.textContent = text.textContent.replace((regExp), '"');
    });

});


