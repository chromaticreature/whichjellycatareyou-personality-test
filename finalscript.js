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

// Function to play the sound effect
function playSound() {
  const sound = new Audio("Audio/audioforjc.mp4");
  sound.play();
}

const questions = [
  {
    question: "Q1/12: You approach Juniper Grove, where you have heard magical creatures live. Curious, you...",
    image: "images/1.gif",
    answers: [
      { type: "E", text: "Excitedly wander in while calling out to the creatures, hoping to make a friendly connection.", scores: { E: 1, I: 0 } },
      { type: "I", text: "Strategically observe from a distance, analysing the best way to approach the unfamiliar area.", scores: { E: 0, I: 1 } },
    ]
  },
  {
    question: "Q2/12: You wander around the woods till you encounter a fork in the road. Which path do you choose?",
    image: "images/2.gif",
    answers: [
      { type: "S", text: "The path on the left. You examine the physical details of the path and conclude it looks frequently travelled.", scores: { S: 1, N: 0 } },
      { type: "N", text: "The path on the right. You sense a hum of energy and imagine the adventures this path might lead to.", scores: { S: 0, N: 1 } },
    ]
  },
  {
    question: "Q3/12: You get lost and frustration creeps in, when a very cute squirrel suddenly scurries into your path. Its tiny eyes glimmer with curiosity. You...",
    image: "images/3.gif",
    answers: [
      { type: "T", text: "Assess the situation. A squirrel showing up when you're lost? Tad bit sus...", scores: { T: 1, F: 0 } },
      { type: "F", text: "Carefully offer a nut, hoping the little creature knows the way better than you do.", scores: { T: 0, F: 1 } },
    ]
  },
  {
    question: "Q4/12: After following the helpful squirrel, you suddenly find yourself before a mysterious, glowing portal. You...",
    image: "images/3.gif",
    answers: [
      { type: "J", text: "Take a moment to survey the portal. *What's on the other side? What if there's something dangerous?*", scores: { J: 1, P: 0 } },
      { type: "P", text: "Leap through the portal on impulse, excited to see what's in store. *Hopefully the magical creatures are there!*", scores: { J: 0, P: 1 } },
    ]
  },
  {
    question: "Q5/12: Stepping through the magical portal, you find yourself in a quaint village filled with adorable little creatures. You...",
    image: "images/1.gif",
    answers: [
      { type: "E", text: "Enthusiastically mingle with the villagers, excited to join in their festivities.", scores: { E: 1, I: 0 } },
      { type: "I", text: "Quietly absorb the village’s charm, preferring to observe before joining them.", scores: { E: 0, I: 1 } },
    ]
  },
  {
    question: "Q6/12: Around the campfire with the villagers, the warm glow inspires conversation and wonder. You find yourself focusing on...",
    image: "images/2.gif",
    answers: [
      { type: "S", text: "The crackle of the fire, the scent of woodsmoke, and the excitement of the villagers.", scores: { S: 1, N: 0 } },
      { type: "N", text: "Their voices, letting your imagination wander through the magical tales they shared.", scores: { S: 0, N: 1 } },
    ]
  },
];

// Listen for the "Start adventure" button click (assumes your button is the first one on the page)
document.querySelector("button").addEventListener("click", function() {
  playSound();
  startQuiz();
});

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
      playSound();  // Play sound on answer click
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
