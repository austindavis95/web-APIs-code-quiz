// header elements (high score button and time)
const header = document.querySelector('header');
const highScoresButton = document.querySelector('#view-high-scores');
const timerEl = document.querySelector('#timeLeft');

// Initial Quiz Page
const startQuizSection = document.querySelector('#start-quiz-section');
const startQuizMessage = document.querySelector('#startQuizMessage');
const startBtn = document.querySelector('#start-quiz');

// Quiz Questions Section
const quizSection = document.querySelector('#quiz-section');
const questionEl = document.querySelector('#question-title');
const choicesEl = document.querySelector('#choices');
const feedbackEl = document.querySelector('#feedback');

// Save Your Score Prompt
const finalScoreSection = document.querySelector('#final-score-section');
const finalScoreEl = document.querySelector("#finalScoreDisplay");
const initialsEl = document.querySelector('#initials')
const submitBtn = document.querySelector('#submit');

// High Scores Page
const highScoreSection = document.querySelector('#high-score-section');
const highScoreList = document.querySelector('#highscores');
const goBackButton = document.querySelector('#go-back-button');
const clearHighScoresButton = document.querySelector('#clear-high-scores');

// Variables
let acceptingAnswers = true;
let Score = 0;
let questionsCounter = 0;
let availableQuestions = [];
let savedScores = [];

let questions = [
    {
       question:  'Arrays can be used to store the following:',
       choices:   ['Numbers of strings', 'Other arrays', 'Booleans', 'All of the Above'],
       answer:    'All of the Above',
    },
    {
        question:  'The condidtion statement if/else is enclosed with the following:',
        choices:   ['Commas','Curly brackets','Quotes','Parentheses'],
        answer:    'Parentheses',

     },
     {
        question:  'Commonly used datatypes DO NOT include?:',
        choices:   ['Strings', 'Boolean', 'Alerts', 'Numbers'],
        answer:    'Alerts',
     },
     {
        question:  'A very useful tool to debug arrays is:',
        choices:   ['Javascript','Terminal/bash','for loops','Console.log'],
        answer:    'Console.log',
    },
    {
        question:  'Strings must be enclosed within ____ when being assigned to variables.',
        choices:   ['Commas','Curly brackets','Quotes','Paranethesese'],
        answer:    'Quotes',
    },
];

var currentQuestionIndex;
var time;
var timerId; 


function startQuiz() {
    startQuizSection.setAttribute("class", "hide");
    currentQuestionIndex = 0;
    time = questions.length * 15;
    timerId = setInterval(startClock, 1000);
    timerEl.textContent = time;
    setQuestion();
}

function startClock() {
    time--;
    timerEl.textContent = time;

    if (time <= 0){
        quizEnd();
    }
}

// Print question to page during quiz
function setQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;

    choicesEl.innerHTML = "";

    currentQuestion.choices.forEach(function(choice, i) {
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("class", "choice");
        choiceBtn.setAttribute("value", choice);
        choiceBtn.textContent = choice;
        choiceBtn.onclick = choiceClick;
        choicesEl.appendChild(choiceBtn);
    });
}

// When answer is chosen
function choiceClick() {
    if (this.value !== questions[currentQuestionIndex].answer){
        time -= 10; 

        if (time<0){
            time = 0;

        }
        timerEl.textContent = time;
        feedbackEl.textContent = "wrong";
    }   
    else {
        feedbackEl.textContent = "correct";
    }
    
    feedbackEl.setAttribute("class", "feedback");
    
    setTimeout(function() {
        feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);

    currentQuestionIndex++;

    if (currentQuestionIndex===questions.length){
        quizEnd();
    }
    else{
        setQuestion();
    }
}

//When timer runs out or all questions answered
function quizEnd() {
    clearInterval(timerId);
    finalScoreEl.textContent = "Your final score is: " + time;
    questionEl.innerHTML = "";
    choicesEl.innerHTML = "";
    timerEl.innerHTML = "xxx";
    displayFinalScoreSection();
}

// Display final score and prompt to save score
function displayFinalScoreSection() {
    header.setAttribute("class", "hide");
    quizSection.setAttribute("class", "hide");
    finalScoreSection.setAttribute("class", "");
}

// Show list of high scores
function displayHighScores() {
    header.setAttribute("class", "hide");
    quizSection.setAttribute("class", "hide");
    finalScoreSection.setAttribute("class", "hide");
    highScoreSection.setAttribute("class", "");
}

// Save input from final score page
function saveHighScore(score) {
    savedScores.push([initials.value, time]);
    initials.value = "";
    printHighScores();
    displayHighScores();
}

// When score saved, order the scores and print
function printHighScores() {
    highScoreList.innerHTML = "";
    sortedScores = savedScores.sort(function(a, b) { return b[1] - a[1]; });
    savedScores.forEach((score, i) => {
        highScoreList.innerHTML += "<li>" + (++i) + ". " + score[0] + " - " + score[1] + "</li>";
    })
}

// Clear saved scores
function clearHighScores() {
    savedScores = [];
    highscores.innerHTML = "";
}

//When go back button is pressed from high scores page
function goBack() {
    header.setAttribute("class", "");
    if (timerEl.innerHTML == "xxx") {
        startQuizSection.setAttribute("class", "");
    }
    
    quizSection.setAttribute("class", "");
    highScoreSection.setAttribute("class", "hide");
}

// Button event listeners
highScoresButton.onclick = displayHighScores;
submitBtn.onclick = saveHighScore;
goBackButton.onclick = goBack;
clearHighScoresButton.onclick = clearHighScores;
startBtn.onclick = startQuiz;