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
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// variables to reference DOM elements....................................
var timeEl = document.querySelector("#time");
var startBtn = document.querySelector("#startButton");
var submitBtn = document.querySelector("#submit-button");
var titleScreen = document.querySelector("#title-section");
var quizScreen = document.querySelector("#quiz-section");
var highScoreScreen = document.querySelector("#highscore-section");
var highScoreDisplay = document.querySelector("#highscore-display-section");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

var questionsEl = document.querySelector("#question");
var choicesEl = document.querySelector("#choices");

//create a function to start the game
function startQuiz() {
  titleScreen.setAttribute("class", "hide");
  quizScreen.setAttribute("class", "show");
  timerId = setInterval(tick, 1000);
  timeEl.textContent = time;
  getQuestion();
}

//create a second taken off of a clock
function tick() {
  time--;
  timeEl.textContent = time;
  if (time <= 0) {
    quizEnd();
  }
}

function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;
  choicesEl.innerHTML = "";
  currentQuestion.choices.forEach(function (choice, i) {
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);
    choiceNode.textContent = i + 1 + ". " + choice;
    choiceNode.onclick = questionClick;
    choicesEl.appendChild(choiceNode);
  });
}

// click on question answer either generate new question or end quiz if final question, and deduct time for answering wrong
function questionClick() {
  // check if user guessed wrong
  if (this.value !== questions[currentQuestionIndex].answer) {
    // penalize time
    time -= 15;

    if (time < 0) {
      time = 0;
    }

    timeEl.textContent = time;

    feedbackEl.textContent = "Wrong!";
  } else {
    feedbackEl.textContent = "Correct!";
  }

  // flash right/wrong feedback on page for half a second
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function () {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  // move to next question
  currentQuestionIndex++;

  // check if we've run out of questions
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

// end the quiz function
function quizEnd() {
  // stop timer
  clearInterval(timerId);

  // show end screen
  var highscoreSectionEl = document.querySelector("#highscore-section");
  highscoreSectionEl.setAttribute("class", "show");

  // show final score
  var finalScoreEl = document.querySelector("#final-score");
  finalScoreEl.textContent = time;

  // hide questions section
  quizScreen.setAttribute("class", "hide");
}

// function for saving highscore
function saveHighscore() {
  // get value of input box
  var initials = initialsEl.value.trim();

  // make sure value wasn't empty
  if (initials !== "") {
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    var newScore = {
      score: time,
      initials: initials,
    };

    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    window.location.href = "highScore.html";
  }
}

function checkForEnter(event) {
  // "13" represents the enter key
  if (event.key === "Enter") {
    saveHighscore();
  }
}

// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;
