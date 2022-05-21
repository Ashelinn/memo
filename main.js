const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let click = 0;
let score = document.querySelector('#score');

//переворачиваем карточку (добавляем стиль flip) 
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    
    //подсчитываем количество кликов
    click++;

    let btn_styles = document.querySelectorAll('.option-button');
    btn_styles.forEach((item) => {
      item.setAttribute('disabled', true);
    });
    
    score.textContent = click;
    return;
  }

  secondCard = this;
  checkForMatch();
}

//Функция проверки на совпадение
function checkForMatch() {
  let isMatch = firstCard.dataset.img === secondCard.dataset.img;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

//генерация чисел для перемешивания карточек
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));


//замена картинок
let Landscape = ['img/natura/fiord.jpg','img/natura/fiord.jpg',
              'img/natura/front.jpg','img/natura/front.jpg',
              'img/natura/lake.jpg','img/natura/lake.jpg',
              'img/natura/lavanda.jpg','img/natura/lavanda.jpg',
              'img/natura/water.jpg','img/natura/water.jpg',
              'img/natura/mountain.jpg','img/natura/mountain.jpg'];

let Animals = ['img/animals/elephant.jpg','img/animals/elephant.jpg',
              'img/animals/fox.jpg','img/animals/fox.jpg',
              'img/animals/girafe.jpg','img/animals/girafe.jpg',
              'img/animals/lion.jpg','img/animals/lion.jpg',
              'img/animals/squirel.jpg','img/animals/squirel.jpg',
              'img/animals/wolf.jpg','img/animals/wolf.jpg'
            ];

let Cars = ['img/cars/astonmartin.jpg','img/cars/astonmartin.jpg',
            'img/cars/bmw.jpg','img/cars/bmw.jpg',
            'img/cars/chevrole.jpg','img/cars/chevrole.jpg',
            'img/cars/ferrari.jpg','img/cars/ferrari.jpg',
            'img/cars/ferrarigold.jpg','img/cars/ferrarigold.jpg',
            'img/cars/mazeratti.jpg','img/cars/mazeratti.jpg'
];

let Flowers = ['img/flowers/flower.jpg','img/flowers/flower.jpg',
              'img/flowers/magnoly.jpg','img/flowers/magnoly.jpg',
              'img/flowers/narciss.jpg','img/flowers/narciss.jpg',
              'img/flowers/roma.jpg','img/flowers/roma.jpg',
              'img/flowers/rose.jpg','img/flowers/rose.jpg',
              'img/flowers/tulip.jpg','img/flowers/tulip.jpg'
];

//функция замены картинок
function imgChange(arr) {
  let images = document.querySelectorAll('.memory-card > .front-face');
    images.forEach((item,i)=>{
      item.src = arr[i];
    }) 
};

//Активная ссылка b pfvtyf rfhnbyjr
let btns = document.querySelectorAll('.option-button');
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";

    //выбираем набор картинок в соответствии с вбранной темой
    let name = this.textContent;
    switch(name) {
      case 'Flowers': 
        arr = Flowers;
        break;
    
      case 'Landscape':  
        arr = Landscape;
        break;
    
      case 'Animals': 
        arr = Animals;
        break;
    
      case 'Cars':  
        arr = Cars;
        break;
    }

    //заменяем картинки на игровом поле
    let cards = document.querySelectorAll('.front-face');
    for (let j = 0; j < cards.length; j++){
      cards[j].src = arr[j];
    }   
  });
}

//новая игра
let newgame = document.querySelector('.option-button_start');
newgame.addEventListener('click', () => {
  window.location.reload();
})


