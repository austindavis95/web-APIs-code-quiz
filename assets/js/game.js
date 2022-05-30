const questionEl = document.querySelector('#question-title');
const choicesEl = document.querySelector('#choices');
const timerEl = document.querySelector('#timeLeft');
const startBtn = document.querySelector('#start-quiz');
const feedbackEl = document.getElementById('feedback');
const initialsEl = document.getElementById('enterInitials')
const submitBtn = document.getElementById('submit');


const scoreText = document.querySelector('#score');



let acceptingAnswers = true;
let Score = 0 
let questionsCounter = 0
let availableQuestions = []

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

]

    var currentQuestionIndex = 0;
    var time = questions.length * 15;
    var timerId; 
    

    function startQuiz (){
        timerId = setInterval(startClock, 1000);
        timerEl.textContent = time;
        setQuestion();
    }

    function startClock(){
        time--;
        timerEl.textContent = time;

    if (time <= 0){
        quizEnd();
    }

    }

    function setQuestion (){
        var currentQuestion = questions[currentQuestionIndex];
        questionEl.textContent = currentQuestion.question;

        choicesEl.innerHTML = "";

        currentQuestion.choices.forEach(function(choice, i) {
            var choiceBtn = document.createElement("button");
            choiceBtn.setAttribute("class", "choice");
            choiceBtn.setAttribute("value", choice);
            choiceBtn.textContent = i + choice;
            choiceBtn.onclick = choiceClick;
            choicesEl.appendChild(choiceBtn);
        })
    }

    function choiceClick (){
        if (this.value !== questions[currentQuestionIndex].answer){
            time -= 10; 

        if (time<0){
            time = 0;

        }
        timerEl.textContent = time;
        feedbackEl.textContent = "wrong";
        }   

        else{
            feedbackEl.textContent = "correct";
        }
            feedbackEl.setAttribute("class", "feedback");
        setTimeout(function(){
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

    function quizEnd(){
        clearInterval(timerId);

        var finalScoreEl = document.getElementById("finalScoreDisplay");
        finalScoreEl.textContent = time;

    }

    startBtn.onclick = startQuiz;
