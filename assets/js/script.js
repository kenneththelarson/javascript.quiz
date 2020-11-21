var timerEl = document.querySelector("#time");
var startBtn = document.querySelector("#startButton");
var landingPage = document.querySelector("#title-section");
var questionsPage = document.querySelector("#quiz-section");
var questionEl = document.querySelector("#question-title");

var questions = [
    {
        title: "This will be a question at some point.",
        choices: ["pants", "more pants", "a plethora of pants"],
        answer: "a plethora of pants"
    },
]

function quizStart() {
    landingPage.setAttribute("class", "hide");
    questionsPage.setAttribute("class", "show");

    var timeLeft = 75;

    var timeInterval = setInterval(function() {
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

var questionFunction = function() {
    for (var i = 0; i < questions.length; i++) {
        var selectedQuestion = questions[i];

        questionEl.textContent = selectedQuestion.title;
        
    }
}

startBtn.onclick = quizStart;