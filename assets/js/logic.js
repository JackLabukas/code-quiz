//write my questions down, put them into objects in the array
var questions = [
  {
    title: "Which language is responsible for 'looks' on webpage?",
    choices: ["JS", "CSS", "C++"],
    answer: "CSS",
  },
  {
    title: "What HTML element is responsible for showing pictures?",
    choices: ["<a>", "<img>", "<ul>"],
    answer: "<img>",
  },
  {
    title: "What symbols are required to establish an array?",
    choices: ["{}", "[]", "<>"],
    answer: "[]",
  },
  {
    title: "What number represents third element in array?",
    choices: ["2", "3", "4"],
    answer: "2",
  },
  {
    title: "What method used to establish how long array is?",
    choices: [".indexOf", ".length", ".findLast"],
    answer: ".length",
  },
];
// declare variables
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEle = document.querySelector("#initials");
var feedBackEle = document.querySelector("#feedback");
var questionTitle = document.querySelector("#question-title");
var startScreen = document.querySelector("#start-screen");
var questionsEle = document.querySelector("#questions");
var choicesDiv = document.querySelector("#choices");
var timeEle = document.querySelector("#time");
var time = 60;
var score = 0;
var questionIndex = 0;
var answerNum = 0;
timeEle.textContent = time;

function startTimer() {
  var timerInterval = setInterval(function () {
    time--;
    timeEle.textContent = time;

    if (time === 0) {
      clearInterval(timerInterval);
    }
  }, 1000);
}
function startQuiz() {
  startTimer();
  startScreen.classList.add("hide");
  questionsEle.classList.remove("hide");
  getQuestion();
}

startBtn.addEventListener("click", startQuiz);

function getQuestion() {
  // get current question object from array

  var currentQuestion = questions[questionIndex];

  // update title with current question

  var titleEl = document.getElementById("question-title");

  titleEl.textContent = currentQuestion.title;

  // clear out any old question choices

  choicesDiv.innerHTML = "";

  // loop over choices

  currentQuestion.choices.forEach(function (choice, i) {
    // create new button for each choice

    var choiceNode = document.createElement("button");

    choiceNode.setAttribute("class", "choice");

    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    // attach click event listener to each choice

    choiceNode.onclick = questionClick;

    // display on the page

    choicesDiv.appendChild(choiceNode);
  });
}

function questionClick() {
  // check if user guessed wrong

  if (this.value !== questions[currentQuestionIndex].answer) {
    // penalize time

    time -= 15;

    if (time < 0) {
      time = 0;
    }

    // display new time on page

    timeEle.textContent = time;

    feedBackEle.textContent = "Wrong!";
  } else {
    feedBackEle.textContent = "Correct!";
  }
}
