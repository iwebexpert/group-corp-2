let imgFunc = document.getElementsByClassName('productImg');
let carousel = document.getElementsByClassName('carousel-item active')[0];
let carouselInner = document.getElementsByClassName('carousel-inner')[0];
let carousel1 = document.createElement('div');
carousel1.classList.add('carousel-item');

/*Для всех картинок*/
for (let i in imgFunc) {
  if (imgFunc.hasOwnProperty(i) && imgFunc[i].dataset) {
      imgFunc[i].dataset.counter = i;
      imgFunc[i].onclick = function() {
        while(carousel.firstChild) {
          carousel.removeChild(carousel.firstChild);
        }
        let src = imgFunc[i].src;
        let imgInCour = document.createElement("img");
        imgInCour.setAttribute('src', src);
        imgInCour.setAttribute('class', 'imgInCour');
        carousel.appendChild(imgInCour);
        if(i == 0){
          let apple = 'apple';
          addMorePhoto(apple)
        }
        if(i == 1){
          let bread = 'bread';
          addMorePhoto(bread)
        }
        if(i == 2){
          let milk = 'milk';
          addMorePhoto(milk)
        }
        if(i == 3){
          let water = 'water';
          addMorePhoto(water)
        }
      }
  }
}

/*Добавляем еще картинки*/
function addMorePhoto(item){
while(carousel1.firstChild) {
  carousel1.removeChild(carousel1.firstChild);
}
let imgInCour = document.createElement("img");
imgInCour.setAttribute('src', `img/${item}1.jpg`);
imgInCour.setAttribute('class', 'imgInCour');
carouselInner.appendChild(carousel1);
carousel1.appendChild(imgInCour);
}
