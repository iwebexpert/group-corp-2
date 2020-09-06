document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  const form = document.querySelector('form');
  
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    for(let elem in form.elements) {
      if(!elem.classList.contains('check-input') && elem.tagName !== 'BUTTON') {
        console.log(elem)
      }
    }
  })
})