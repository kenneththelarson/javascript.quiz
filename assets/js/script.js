var timerEl = document.querySelector("#time");
var startBtn = document.querySelector("#startButton");
var landingPage = document.querySelector("#title-section");
var questionsPage = document.querySelector("#quiz-section");
var highScorePage = document.querySelector("#high-score-section");
var viewHighScores = document.querySelector("#view-high-scores");
var questionEl = document.querySelector("#question-title");
var choicesEl = document.querySelector("#choices");
var feedbackEl = document.querySelector("#feedback");
var submitBtn = document.querySelector("#submit-button");
var goBackBtn = document.querySelector("#go-back-button");
var clearBtn = document.querySelector("#clear-high-scores");
var scoreList = document.querySelector("#score-list");
var scores = [];

var currentQuestionIndex = 0;
var timeLeft = 75;

var questions = [
    {
        title: 'What is the correct way to write an array in JavaScript?',
        choices: ['var fruit = 1 = ("apple", "banana", "orange")', 'var fruit("apple", "banana", "orange")', 'var fruit = "apple", "banana", "orange"', 'var fruit = ["apple", "banana", "orange"]'],
        answer: 'var fruit = ["apple", "banana", "orange"]'
    },
    {
        title: 'Which event occurs when the user clicks on an HTML element?',
        choices: ['onMouseClick', 'onClick', 'click', 'mouseClick'],
        answer: 'onClick'
    },
    {
        title: 'How do you write "Hello World" in an alert box?',
        choices: ['alert("Hello World");', 'alertBox("Hello World");', 'window.alert("Hello World");', 'Both 1 and 3'],
        answer: 'Both 1 and 3'
    },
    {
        title: 'How does a FOR loop start?',
        choices: ['for (i = 0; i <= 5)', 'for i = 1 to 5', 'for (i = 0; i <= 5; i++)', 'All of the above'],
        answer: 'for (i = 0; i <= 5; i++)'
    },
    {
        title: 'How do you declare a JavaScript variable?',
        choices: ['var userInput', 'v userInput', 'var = userInput', 'variable userInput'],
        answer: 'var userInput'
    }
]

function quizStart() {
    landingPage.setAttribute("class", "hide");
    questionsPage.setAttribute("class", "show");

    var timeInterval = setInterval(function () {
        if (timeLeft > 0) {
            timerEl.textContent = timeLeft;
            timeLeft--;
        }
        else {
            timerEl.textContent = 'Finished!';
            clearInterval(timeInterval);
            quizEnd();
        }
        if (currentQuestionIndex === questions.length) {
            clearInterval(timeInterval);
        }
    }, 1000);

    questionFunction();
}

var questionFunction = function () {
    var selectedQuestion = questions[currentQuestionIndex];

    questionEl.textContent = selectedQuestion.title;

    choicesEl.innerHTML = "";

    selectedQuestion.choices.forEach(function (choice, i) {
        var choiceButton = document.createElement("button");
        choiceButton.setAttribute("class", "answer-options");
        choiceButton.setAttribute("value", choice);

        choiceButton.textContent = i + 1 + ". " + choice;

        choiceButton.onclick = questionClick;

        questionEl.appendChild(choiceButton);
    });
}

var questionClick = function () {
    if (this.value !== questions[currentQuestionIndex].answer) {
        timeLeft -= 10;

        if (timeLeft < 0) {
            timeLeft = 0;
        }
        feedbackEl.textContent = "Wrong!"
    }
    else {
        feedbackEl.textContent = "Correct!"
    }

    currentQuestionIndex++;

    if (currentQuestionIndex === questions.length) {
        quizEnd();
    }
    else {
        questionFunction();
    }
}

var quizEnd = function () {
    questionsPage.setAttribute("class", "hide");
    highScorePage.setAttribute("class", "show");

    var finalScore = document.querySelector("#final-score", timeLeft);
    finalScore.textContent = timeLeft;
    console.log(finalScore);
}

submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    var userInitials = document.querySelector("input[name='initials-area']").value;

    if (!userInitials) {
        alert("Please enter your initials!");
        return false;
    }
    else {
        alert("Score saved!");
        var scoreData = {
            name: userInitials,
            score: timeLeft
        };

        loadScores();

        scores.push(scoreData);
        localStorage.setItem("scores", JSON.stringify(scores));

        showHighScores();
    }
});

var loadScores = function() {
    var savedScores = localStorage.getItem("scores");
    if (!savedScores) {
        savedScores = [];
    }
    else {
        savedScores = JSON.parse(savedScores);
    }

    scores = savedScores;
}

var showHighScores = function() {
    landingPage.setAttribute("class", "hide");
    questionsPage.setAttribute("class", "hide");
    highScorePage.setAttribute("class", "hide");
    viewHighScores.setAttribute("class", "show");

    loadScores();

    scores.sort(function(a, b) {
        return b.score - a.score;
    });

    
    for (var i = 0; i <scores.length; i++) {
        var scoreLi = document.createElement("li");
        scoreLi.textContent = scores[i].name + " - " + scores[i].score;
        scoreList.appendChild(scoreLi);
    }
}

goBackBtn.addEventListener("click", function(event) {
    viewHighScores.setAttribute("class", "hide");
    landingPage.setAttribute("class", "show");

    currentQuestionIndex = 0;
    timeLeft = 75;
});

clearBtn.addEventListener("click", function(event) {
    event.preventDefault();
    window.localStorage.removeItem("scores");
})

startBtn.onclick = quizStart;