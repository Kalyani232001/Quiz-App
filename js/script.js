const questions=[
    {
        question: "HTML stands for?",
        answers: [
            {text:"HighText Machine Language",correct:false},
            {text:"HyperText and links Markup Language",correct:false},
            {text:"HyperText Markup Language",correct:true},
            {text:"None of the above",correct:false},
        ]
    },
    {
        question: "The property in CSS used to change the text color of an element is?",
        answers: [
            {text:"bgcolor",correct:false},
            {text:"color",correct:true},
            {text:"background-color",correct:false},
            {text:"All of the above",correct:false},
        ]
    },
    {
        question: "The HTML attribute used to define the inline styles is?",
        answers: [
            {text:"style",correct:true},
            {text:"styles",correct:false},
            {text:"class",correct:false},
            {text:"none of the above",correct:false},
        ] 
    },
    {
        question: "How to chnage the text size in CSS?",
        answers: [
            {text:"font:20px",correct:false},
            {text:"size:20px",correct:false},
            {text:"text:20px",correct:false},
            {text:"font-size:10px",correct:true},
        ]
    },
    {
        question: "Which type of Javascript Language is?",
        answers: [
            {text:"object-oriented",correct:false},
            {text:"object-based",correct:true},
            {text:"assembly-language",correct:false},
            {text:"high level",correct:false},
        ]
    },
    {
        question: "The 'function' and 'var'are know as:?",
        answers: [
            {text:"keywords",correct:false},
            {text:"datatypes",correct:false},
            {text:"declaration statements",correct:true},
            {text:"prototypes",correct:false},
        ]
    }
];
const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex= 0;
let score= 0;

function startQuiz(){
    currentQuestionIndex= 0;
    score= 0;
    nextButton.innerHTML= "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    // let currentQuestion = questions[currentQuestionIndex];
    // let questionNo = currentQuestionIndex + 1;
    // questionElement.innerHTML=questionNo + ". " + currentQuestion. 
    // question;
    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const iscorrect = selectedBtn.dataset.correct === "true";
    if(iscorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
