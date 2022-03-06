/*All answer option*/
const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');

/*All our options*/
const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question'),
      numberOfQuestion = document.getElementById('number-of-question'),
      numberOfAllQuestion = document.getElementById('number-of-all-questions');

let indexOfQuestion, //Индекс текущего вопроса
    indexOfPage = 0; //Индекс текущей страницы

const answersTracker = document.getElementById('answers-tracker');
const btnNext = document.getElementById('btn-next');

let score = 0; // Итоговый результат викторины

const correctAnswer = document.getElementById('correct-answer'),
      numberOfAllQuestion2 = document.getElementById('number-of-all-questions-2'),
      btnTryAgain = document.getElementById('btn-try-again');

const questions = [
    {
        question: 'Как в Java Script вычислить процент от числа?',
        options: [
            'Так в Java Script нельзя делать',
            'Оператор : %',
            'Умножить на кол-во процентов и разделать на 100',
            'Вызвать метод findPrecent()',
        ],
        rightAnswer: 2
    },
    {
        question: 'Результат выражения: "13" + 7',
        options: [
            '20',
            '137',
            'undefined',
            'error',
        ],
        rightAnswer: 1
    },
    {
        question: 'На Java Script нельзя писать: ',
        options: [
            'Игры',
            'Скрипты для сайтов',
            'Десктопные приложения',
            'На другом языке программирования',
        ],
        rightAnswer: 3
    },
    {
        question: 'Чем метод отличается от функции',
        options: [
            'Методов в программировании нет',
            'Функция является методом',
            'Функций в программировании нет',
            'Метод является функцией',
        ],
        rightAnswer: 3
    },
];

numberOfAllQuestion.innerHTML = questions.length;//Выводи мкол-во всех вопросов

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question;//сам вопрос

    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1; // установка намера текущей страницы
    indexOfPage++;//увеличение индекса страницы
};

let completedAnswers = [];

const randomQuestion = () => {
  let randomNumber = Math.floor(Math.random() * questions.length);
  let hitDuplicate = false;
  if(indexOfPage == questions.length){
      quizOver();
  } else{
      if (completedAnswers.length > 0){
          completedAnswers.forEach(item => {
              if (item == randomNumber){
                  hitDuplicate = true;
              }
          });
          if (hitDuplicate){
              randomQuestion();
          }else {
              indexOfQuestion = randomNumber;
              load();
          }
      };
      if (completedAnswers == 0){
          indexOfQuestion = randomNumber;
          load();
      }
  }
  completedAnswers.push(indexOfQuestion);
};

const checkAnswer = el => {
    if (el.target.dataset.id == questions[indexOfQuestion].rightAnswer){
        el.target.classList.add('correct');
        upDateAnswerTracker('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        upDateAnswerTracker('wrong');
    }
    disabledOptions();
}

const disabledOptions = () => {
  optionElements.forEach(item => {
      item.classList.add('disabled');
      if (item.dataset.id == questions[indexOfQuestion].rightAnswer){
          item.classList.add('correct');
      }
  })
}

const enabledOption = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    })
}

const answerTracker = () => {
    questions.forEach(item => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
}

const upDateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}

const validate = () => {
    if (!optionElements[0].classList.contains('disabled')){
        alert('Вам нужно выбрать один из вариантов ответа');
    }else {
        randomQuestion();
        enabledOption();
    }
}

btnNext.addEventListener('click', validate);

for (option of optionElements){
    option.addEventListener('click', e => checkAnswer(e));
}

const quizOver = () => {
    console.log('Игра окончена');
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestion2.innerHTML = questions.length;
}

const TryAgain = () => {
    window.location.reload();
}

btnTryAgain.addEventListener('click', TryAgain);

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
})


