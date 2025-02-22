// finalscript.js

// Track user answers
let userAnswers = {};
let currentQuestion = 0;

// Array of Quiz Questions
const questions = [
    {
        question: "Q1/10: You approach Juniper Grove, where you have heard magical creatures live. Curious, you...",
        image: "images/1.gif",
        answers: [
            { type: "T", text: "Strategically observe from a distance, analysing the best way to approach.", scores: { T: 1, F: 0, J: 0, P: 0 } },
            { type: "F", text: "Gently call out, hoping to make a friendly connection with the creatures.", scores: { T: 0, F: 1, J: 0, P: 0 } },
            { type: "J", text: "Carefully plan your approach to not disrupt the grove’s harmony.", scores: { T: 0, F: 0, J: 1, P: 0 } },
            { type: "P", text: "Excitedly wander in without a plan, ready to embrace whatever happens.", scores: { T: 0, F: 0, J: 0, P: 1 } }
        ]
    },
    {
        question: "Q2/10: You wander aimlessly around the woods till you hit a crossroad. Which path do you choose?",
        image: "images/2.gif",
        answers: [
            { type: "T", text: "The path in front of you. It looks frequently travelled, while the others seem untouched.", scores: { T: 1, F: 0, J: 0, P: 0 } },
            { type: "F", text: "The path on the left. You hear a soft hum and your heart is guided by the warmth of life.", scores: { T: 0, F: 1, J: 0, P: 0 } },
            { type: "J", text: "The path on the right. You feel it is the perfect spot for a break after spotting cute flowers along the path.", scores: { T: 0, F: 0, J: 1, P: 0 } },
            { type: "P", text: "Nah... this ain't worth it. You head back the way you came.", scores: { T: 0, F: 0, J: 0, P: 1 } }
        ]
    },
    {
        question: "Q3/10: You get lost in the woods, frustration creeping in, when a very cute squirrel suddenly scurries into your path. Its tiny eyes glimmer with curiosity. You…",
        image: "images/3.gif",
        answers: [
            { type: "E", text: "Crouch down and excitedly start talking to the squirrel. It’s not like you’ve seen anyone else for hours, and even a furry friend counts as company.", scores: { E: 1, S: 0, I: 0, N: 0 } },
            { type: "S", text: "Dig into your pocket and find some trail mix. You carefully offer a nut, hoping the little creature knows the way better than you do.", scores: { E: 0, S: 1, I: 0, N: 0 } },
            { type: "I", text: "Keep walking, pretending you didn’t see it. It’s just a squirrel, after all — best to stay focused on finding your way.", scores: { E: 0, S: 0, I: 1, N: 0 } },
            { type: "N", text: "Narrow your eyes. A squirrel showing up right when you're lost? Tad bit sus...", scores: { E: 0, S: 0, I: 0, N: 1 } }
        ]
    }
];

// Personality Result Options
const resultOptions = {
    "ISTJ": { image: "images/ISTJ.png" },
    "ISFJ": { image: "images/ISFJ.png" },
    "INFJ": { image: "images/INFJ.png" },
    "INTJ": { image: "images/INTJ.png" },
    "ISTP": { image: "images/ISTP.png" },
    "ISFP": { image: "images/ISFP.png" },
    "INFP": { image: "images/INFP.png" },
    "INTP": { image: "images/INTP.png" },
    "ESTP": { image: "images/ESTP.png" },
    "ESFP": { image: "images/ESFP.png" },
    "ENFP": { image: "images/ENFP.png" },
    "ENTP": { image: "images/ENTP.png" },
    "ESTJ": { image: "images/ESTJ.png" },
    "ESFJ": { image: "images/ESFJ.png" },
    "ENFJ": { image: "images/ENFJ.png" },
    "ENTJ": { image: "images/ENTJ.png" }
};

// Start the Quiz
function startQuiz() {
    document.getElementById('landing-header').style.display = 'none';
    document.getElementById('start').style.display = 'none';
    document.getElementById('quiz-page').style.display = 'block';
    currentQuestion = 0;
    userAnswers = {};
    displayQuestion();
}

// Display Current Question
function displayQuestion() {
    const quizElement = document.getElementById('quiz');
    quizElement.innerHTML = "";  // Clear previous content to prevent overlap

    const question = questions[currentQuestion];

    if (question) {
        let html = `
        <div class="container">
            <h2>${question.question}</h2>
            ${question.image ? `<img src="${question.image}" alt="Question ${currentQuestion + 1}" style="max-width:100%; border-radius:10px; margin:10px 0;">` : ""}
            <div class="answers">
                ${question.answers.map((answer, index) => `
                    <button class="large-rectangular" onclick="handleAnswer(${index})">${answer.text}</button>
                `).join("")}
            </div>
        </div>
        `;

        quizElement.innerHTML = html;
    } else {
        showResult();
    }
}

// Handle Answer Selection
function handleAnswer(answerIndex) {
    const question = questions[currentQuestion];
    const answer = question.answers[answerIndex];

    // Update scores based on the selected answer
    for (const dimension in answer.scores) {
        userAnswers[dimension] = (userAnswers[dimension] || 0) + answer.scores[dimension];
    }

    // Move to the next question
    currentQuestion++;
    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        showResult();
    }
}

// Show Quiz Result
function showResult() {
    const resultElement = document.getElementById('result');
    const resultTextContainer = document.querySelector('.result-text');
    const resultImage = document.getElementById('result-image');
    const topLetters = {};

    const pairs = ["IE", "NS", "TF", "PJ"];
    pairs.forEach(pair => {
        const options = pair.split('');
        const scores = options.map(option => userAnswers[option] || 0);
        const topOption = scores[0] >= scores[1] ? options[0] : options[1];
        topLetters[pair] = topOption;
    });

    const result = pairs.map(pair => topLetters[pair]).join('');
    const personalityData = resultOptions[result];

    if (personalityData) {
        resultTextContainer.innerHTML = `Your Jellycat Plushsona is: <strong>${result}</strong>!`;
        resultImage.src = personalityData.image;
        resultImage.alt = `${result} Image`;
    } else {
        resultTextContainer.innerHTML = "Oops! Something went wrong. Please try again.";
    }

    document.getElementById('quiz').style.display = 'none';
    resultElement.style.display = 'block';
    document.getElementById('restart-button').style.display = 'block';
}

// Restart the Quiz
function restartQuiz() {
    document.getElementById('landing-header').style.display = 'block';
    document.getElementById('result').style.display = 'none';
    document.getElementById('quiz-page').style.display = 'none';
    document.getElementById('start').style.display = 'block';
    currentQuestion = 0;
    userAnswers = {};
}

// Initialize the Quiz
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('quiz-page').style.display = 'none';
    document.getElementById('result').style.display = 'none';
    displayQuestion();
});


// Global variables to track the current question and scores
let currentQuestionIndex = 0;
let scores = {
  E: 0,
  I: 0,
  S: 0,
  N: 0,
  T: 0,
  F: 0,
  J: 0,
  P: 0
};

// Your questions array (add more questions as needed)
const questions = [
  {
    question: "Q1/10: You approach Juniper Grove, where you have heard magical creatures live. Curious, you...",
    image: "images/1.gif",
    answers: [
        { type: "T", text: "Strategically observe from a distance, analysing the best way to approach.", scores: { T: 1, F: 0, J: 0, P: 0 } },
        { type: "F", text: "Gently call out, hoping to make a friendly connection with the creatures.", scores: { T: 0, F: 1, J: 0, P: 0 } },
        { type: "J", text: "Carefully plan your approach to not disrupt the grove’s harmony.", scores: { T: 0, F: 0, J: 1, P: 0 } },
        { type: "P", text: "Excitedly wander in without a plan, ready to embrace whatever happens.", scores: { T: 0, F: 0, J: 0, P: 1 } }
        ]
},
{
    question: "Q2/10: You wander aimlessly around the woods till you hit a crossroad. Which path do you choose?",
    image: "images/2.gif",
    answers: [
        { type: "T", text: "The path in front of you. It looks frequently travelled, while the others seem untouched.", scores: { T: 1, F: 0, J: 0, P: 0 } },
        { type: "F", text: "The path on the left. You hear a soft hum and your heart is guided by the warmth of life.", scores: { T: 0, F: 1, J: 0, P: 0 } },
        { type: "J", text: "The path on the right. You feel it is the perfect spot for a break after spotting cute flowers along the path.", scores: { T: 0, F: 0, J: 1, P: 0 } },            
        { type: "P", text: "Nah... this ain't worth it. You head back the way you came.", scores: { T: 0, F: 0, J: 0, P: 1 } }
        ]
},
{
    question: "Q3/10: You get lost in the woods, frustration creeping in, when a very cute squirrel suddenly scurries into your path. Its tiny eyes glimmer with curiosity. You…",
    image: "images/3.gif",
    answers: [
        { type: "E", text: "Crouch down and excitedly start talking to the squirrel. It’s not like you’ve seen anyone else for hours, and even a furry friend counts as company.", scores: { E: 1, S: 0, I: 0, N: 0 } },
        { type: "S", text: "Dig into your pocket and find some trail mix. You carefully offer a nut, hoping the little creature knows the way better than you do.", scores: { E: 0, S: 1, I: 0, N: 0 } },
        { type: "I", text: "Keep walking, pretending you didn’t see it. It’s just a squirrel, after all — best to stay focused on finding your way.", scores: { E: 0, S: 0, I: 1, N: 0 } },
        { type: "N", text: "Narrow your eyes. A squirrel showing up right when you're lost? Tad bit sus...", scores: { E: 0, S: 0, I: 0, N: 1 } }
        ]
}
];

// Listen for the "Start adventure" button click (assumes your button is the first one on the page)
document.querySelector("button").addEventListener("click", startQuiz);

function startQuiz() {
  // Hide the landing page container (assumes it has an id="start")
  document.getElementById("start").style.display = "none";
  // Show the quiz page container (assumes it has an id="quiz-page")
  document.getElementById("quiz-page").style.display = "block";
  // Reset the question index and scores (in case of a restart)
  currentQuestionIndex = 0;
  scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  // Load the first question
  showQuestion();
}

function showQuestion() {
  const quizContainer = document.getElementById("quiz");
  quizContainer.innerHTML = ""; // Clear any previous question content

  // If we've gone through all questions, show the result
  if (currentQuestionIndex >= questions.length) {
    showResult();
    return;
  }

  // Get the current question object
  const currentQuestion = questions[currentQuestionIndex];

  // Create and display the question text
  const questionElement = document.createElement("h2");
  questionElement.innerText = currentQuestion.question;
  quizContainer.appendChild(questionElement);

  // If there is an image for the question, display it
  if (currentQuestion.image) {
    const imageElement = document.createElement("img");
    imageElement.src = currentQuestion.image;
    imageElement.alt = "Quiz Image";
    quizContainer.appendChild(imageElement);
  }

  // Create a container for the answer buttons
  const answersContainer = document.createElement("div");

  // Loop through each answer option and create a button for it
  currentQuestion.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.innerText = answer.text;
    btn.addEventListener("click", function() {
      // Update the scores based on the selected answer's score object
      for (const key in answer.scores) {
        scores[key] += answer.scores[key];
      }
      // Move on to the next question
      currentQuestionIndex++;
      showQuestion();
    });
    answersContainer.appendChild(btn);
  });

  quizContainer.appendChild(answersContainer);
}

function showResult() {
  // Calculate the final personality type by comparing the paired scores
  let personalityType = "";
  personalityType += scores.E >= scores.I ? "E" : "I";
  personalityType += scores.S >= scores.N ? "S" : "N";
  personalityType += scores.T >= scores.F ? "T" : "F";
  personalityType += scores.J >= scores.P ? "J" : "P";

  // Hide the quiz container and display the result
  document.getElementById("quiz-page").style.display = "none";
  const resultContainer = document.getElementById("result");
  resultContainer.style.display = "block";
  resultContainer.innerHTML = `<h2>Your personality type is: ${personalityType}</h2>`;
}
