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
        title: "This will be a question at some point.",
        choices: ["pants", "more pants", "a plethora of pants"],
        answer: "a plethora of pants"
    },
    {
        title: "Preston is my brother.",
        choices: ["Yes", "No", "sometimes", "Never"],
        answer: "Yes"
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