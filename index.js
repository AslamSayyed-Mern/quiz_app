let questions=[
    {
        question:"What is the capital of India?",
        options:["Delhi","Hyderabad","Mumbai","Chennai"],
        correct:"Delhi"
    },
    {
        question:"What is the full form of JS?",
        options:["JavaScript Ecma","EcmaScript","JavaScript","Java"],
        correct:"JavaScript"
    },
    {
        question:"What is the capital of Telangana?",
        options:["Delhi","Hyderabad","Mumbai","Chennai"],
        correct:"Hyderabad"
    },
    {
        question:"Which language runs in a web browser?",
        options:["Java","C","Python","JavaScript"],
        correct:"JavaScript"
    },
    {
        question:"What does CSS stand for?",
        options:["Central Style Sheets","Cascading Style Sheets","Cascading Simple Sheets","Cars SUVs Sailboats"],
        correct:"Cascading Style Sheets"
    },
    {
        question:"What year was JavaScript launched?",
        options:["1996","1995","1994","None of the above"],
        correct:"1995"
    },
    {
        question:"Which HTML tag is used to define an internal style sheet?",
        options:["<style>","<css>","<script>","<link>"],
        correct:"<style>"
    },
    {
        question:"Which company developed JavaScript?",
        options:["Netscape","Bell Labs","Sun Microsystems","IBM"],
        correct:"Netscape"
    },
    {
        question:"What does DOM stand for?",
        options:["Document Object Model","Display Object Management","Digital Ordinance Model","Desktop Oriented Mode"],
        correct:"Document Object Model"
    },
    {
        question:"Which symbol is used for comments in JavaScript?",
        options:["//","<!-- -->","#","/* */"],
        correct:"//"
    }
]

let instructionContainer=document.getElementById("instruction-container")
let questionContainer=document.getElementById("question-container")
let quizOverContainer=document.getElementById("quizOver-container")
let startBtn=document.getElementById("btn-start")
let quest=document.getElementById("quest");
let questionNo=-1
let opt=document.getElementsByClassName("opt")
let time=document.getElementById("time")
let marks=document.getElementById("marks");
let points=0

let seconds=0
let minutes=10

let is_time_running=true;

let resultMessage = document.getElementById("result-message");
let resetBtn = document.getElementById("btn-reset");
let timerInterval = null;

instructionContainer.style.display="block";
questionContainer.style.display="none";
quizOverContainer.style.display="none";

time.textContent = `10:00`;

function showResult() {
    let pass = points > 5;
    if (pass) {
        resultMessage.textContent = `Congratulations! You passed. Your score: ${points}`;
    } else {
        resultMessage.textContent = `Try again, better luck next time! Your score: ${points}`;
    }
    resetBtn.style.display = "inline-block";
}

function resetQuiz() {
    questionNo = -1;
    points = 0;
    minutes = 10;
    seconds = 0;
    is_time_running = true;
    marks.textContent = `Marks :${points}`;
    time.textContent = `10:00`;
    resultMessage.textContent = "";
    resetBtn.style.display = "none";
    instructionContainer.style.display = "block";
    questionContainer.style.display = "none";
    quizOverContainer.style.display = "none";
    startBtn.textContent = "Start Quiz";
    // Reset option buttons
    for (let i = 0; i < 4; i++) {
        opt[i].disabled = false;
        opt[i].style.backgroundColor = "#e0e7ff";
        opt[i].style.color = "#3730a3";
    }
}

resetBtn.onclick = resetQuiz;

let timer=()=>{
    timerInterval = setInterval(() => {
        if(seconds===0){
            if(minutes===0){
                clearInterval(timerInterval);
                instructionContainer.style.display="none";
                questionContainer.style.display="none";
                quizOverContainer.style.display="block";
                showResult();
                return;
            } else {
                minutes--;
                seconds=59;
            }
        } else {
            seconds--;
        }
        let minStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
        let secStr = seconds < 10 ? `0${seconds}` : `${seconds}`;
        time.textContent=`${minStr}:${secStr}`
    },1000);
}

startBtn.onclick=()=>{
    if (is_time_running){
        timer();
        is_time_running=false
    }
    questionNo++;

    if (questionNo==questions.length){   
        instructionContainer.style.display="none";
        questionContainer.style.display="none";
        quizOverContainer.style.display="block";
        showResult();
        clearInterval(timerInterval);
        return;
    }
    instructionContainer.style.display="none";
    questionContainer.style.display="block";
    quizOverContainer.style.display="none";
    startBtn.textContent="Next"
    quest.textContent=questions[questionNo].question;
    for (let i=0;i<4;i++){
        opt[i].textContent=questions[questionNo].options[i];
        opt[i].disabled=false
        opt[i].style.backgroundColor="#e0e7ff"
        opt[i].style.color="#3730a3"
    }
}

for(let i=0;i<4;i++){
    opt[i].onclick=()=>{
        if(opt[i].textContent==questions[questionNo].correct){
            opt[i].style.backgroundColor="#22c55e";
            opt[i].style.color="#fff";
            points+=1;
            marks.textContent=`Marks :${points}`;
        }
        else{
            opt[i].style.backgroundColor="#ef4444";
            opt[i].style.color="#fff";
            // No negative marking, no points for wrong answer
            for(let j=0;j<4;j++){
                if(questions[questionNo].options[j]==questions[questionNo].correct){
                    opt[j].style.backgroundColor="#22c55e";
                    opt[j].style.color="#fff";
                }
            }   
        }
        for (let i=0;i<4;i++){
            opt[i].disabled=true
        }
    }
}