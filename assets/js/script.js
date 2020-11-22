var timerEl = document.querySelector("#time");
var startBtn = document.querySelector("#startButton");
var landingPage = document.querySelector("#title-section");
var questionsPage = document.querySelector("#quiz-section");
var questionEl = document.querySelector("#question-title");
var choicesEl = document.querySelector("#choices");
var feedbackEl = document.querySelector("#feedback");

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

var questionClick = function() {
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

var quizEnd = function() {

}

startBtn.onclick = quizStart;