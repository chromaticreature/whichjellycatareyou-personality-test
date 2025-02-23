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
    image: "ImagesFolder/q1.png",
    answers: [
      { type: "E", text: "Excitedly wander in while calling out to the creatures, hoping to make a friendly connection.", scores: { E: 1, I: 0 } },
      { type: "I", text: "Strategically observe from a distance, analysing the best way to approach the unfamiliar area.", scores: { E: 0, I: 1 } }
    ]
  },
  {
    question: "Q2/12: You wander around the woods till you encounter a fork in the road. Which path do you choose?",
    image: "ImagesFolder/q2.png",
    answers: [
      { type: "S", text: "The path on the left. You examine the physical details of the path and conclude it looks frequently travelled.", scores: { S: 1, N: 0 } },
      { type: "N", text: "The path on the right. You sense a hum of energy and imagine the adventures this path might lead to.", scores: { S: 0, N: 1 } }
    ]
  },
  {
    question: "Q3/12: You get lost and frustration creeps in, when a very cute squirrel suddenly scurries into your path. Its tiny eyes glimmer with curiosity. You...",
    image: "ImagesFolder/q3.png",
    answers: [
      { type: "T", text: "Assess the situation. A squirrel showing up when you're lost? Tad bit sus...", scores: { T: 1, F: 0 } },
      { type: "F", text: "Carefully offer a nut, hoping the little creature knows the way better than you do.", scores: { T: 0, F: 1 } }
    ]
  },
  {
    question: "Q4/12: After following the helpful squirrel, you suddenly find yourself before a mysterious, glowing portal. You...",
    image: "ImagesFolder/q4.png",
    answers: [
      { type: "J", text: "Take a moment to survey the portal. *What's on the other side? What if there's something dangerous?*", scores: { J: 1, P: 0 } },
      { type: "P", text: "Leap through the portal on impulse, excited to see what's in store. *Hopefully the magical creatures are there!*", scores: { J: 0, P: 1 } }
    ]
  },
  {
    question: "Q5/12: Stepping through the magical portal, you find yourself in a quaint village filled with adorable little creatures. You...",
    image: "ImagesFolder/q5.png",
    answers: [
      { type: "E", text: "Enthusiastically mingle with the villagers, excited to join in their festivities.", scores: { E: 1, I: 0 } },
      { type: "I", text: "Quietly absorb the village’s charm, preferring to observe before joining them.", scores: { E: 0, I: 1 } }
    ]
  },
  {
    question: "Q6/12: Around the campfire with the villagers, the warm glow inspires conversation and wonder. You find yourself focusing on...",
    image: "ImagesFolder/q6.png",
    answers: [
      { type: "S", text: "The crackle of the fire, the scent of woodsmoke, and the excitement of the villagers.", scores: { S: 1, N: 0 } },
      { type: "N", text: "Their voices, letting your imagination wander through the magical tales they shared.", scores: { S: 0, N: 1 } }
    ]
  },
  {
    question: "Q7/12: The village elder confides with you that unless the enchanted relic is recovered, all the villagers will soon be transformed into soft, cuddly plushies. You...",
    image: "ImagesFolder/q7.png",
    answers: [
      { type: "T", text: "Immediately start crafting a plan to recover the enchanted relic and rescue the villagers. *Chop chop curry pok*", scores: { T: 1, F: 0 } },
      { type: "F", text: "Feel sad at the thought of your friends turning into plushies, you decide to set off in the morning. *Who knows what lurks in these woods*", scores: { T: 0, F: 1 } }
    ]
  },
  {
    question: "Q8/12: You prepare to embark on your quest deeper into the mysterious woods",
    image: "ImagesFolder/q8.png",
    answers: [
      { type: "J", text: "Under the soft glow of twilight, you unfurl a treasure map ready to set forth on your carefully planned route.", scores: { J: 1, P: 0 } },
      { type: "P", text: "Brimming full of excitement, you embrace the unknown and allow each unexpected turn to guide your journey.", scores: { J: 0, P: 1 } }
    ]
  },
  {
    question: "Q9/12: You follow a trail of shimmering leaves that leads you to a secluded glen. Here, a small group of fairies huddles together, softly whispering secrets that hint at the lost relic’s hidden location. You...",
    image: "ImagesFolder/q9.png",
    answers: [
      { type: "E", text: "Join the circle, wanting to uncover every detail about the relic’s whereabouts.", scores: { E: 1, I: 0 } },
      { type: "I", text: "Hide behind a tree, listening intently to their murmurs and piecing together the clues on your own.", scores: { E: 0, I: 1 } }
    ]
  },
  {
    question: "Q10/12: At last, you’ve discovered the lost relic. With the treasure safely in hand, you now begin your journey back to the village.",
    image: "ImagesFolder/q10.gif",
    answers: [
      { type: "S", text: "The unmistakable scent of pine is a reminder that your friends in the village eagerly await your return.", scores: { S: 1, N: 0 } },
      { type: "N", text: "A soothing warmth radiates from the relic, as if it's saying that the villagers are missing you.", scores: { S: 0, N: 1 } }
    ]
  },
  {
    question: "Q11/12: With the relic safely returned, the village elder leans in and reveals a wondrous secret: The relic bestows upon you an extraordinary gift to transform into a Jellycat villager at will",
    image: "ImagesFolder/q11.gif",
    answers: [
      { type: "T", text: "That's incredible! You're already looking forward to experiment with this ability and have fun with your new friends.", scores: { T: 1, F: 0 } },
      { type: "F", text: "Your heart fills with delight at the thought of such playful magic and you imagine the joy it will bring", scores: { T: 0, F: 1 } }
    ]
  },
  {
    question: "Q12/12: As you retrace your steps back home, the memory of the villagers lingers in your mind. A gentle question arises: Will you return to visit them again?",
    image: "ImagesFolder/q12.gif",
    answers: [
      { type: "J", text: "You make a promise that on the next full moon, you will journey back to the village.", scores: { J: 1, P: 0 } },
      { type: "P", text: "You let fate decide your return, trusting that the winds of adventure will whisper in your ear.", scores: { J: 0, P: 1 } }
    ]
  }
];

console.log("Total questions loaded:", questions.length);

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

  if (currentQuestion.image) {
    const imageElement = document.createElement("img");
    imageElement.src = currentQuestion.image;
    imageElement.alt = "Quiz Image";
    imageElement.classList.add("quiz-image");
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

const personalityImages = {
  "ESTJ": "ImagesFolder/placeholderart.png",
  "ENTJ": "ImagesFolder/placeholderart.png",
  "ENFP": "ImagesFolder/placeholderart.png",
  "INFJ": "ImagesFolder/placeholderart.png",
  "INTP": "ImagesFolder/placeholderart.png",
  "INTJ": "ImagesFolder/placeholderart.png",
  "INFP": "ImagesFolder/placeholderart.png",
  "ENTP": "ImagesFolder/placeholderart.png",
  "ENFJ": "ImagesFolder/placeholderart.png",
  "ESFP": "ImagesFolder/placeholderart.png",
  "ESTP": "ImagesFolder/placeholderart.png",
  "ESFJ": "ImagesFolder/placeholderart.png",
  "ISFJ": "ImagesFolder/placeholderart.png",
  "ISFP": "ImagesFolder/placeholderart.png",
  "ISTJ": "ImagesFolder/placeholderart.png",
  "ISTP": "ImagesFolder/placeholderart.png",
};

function showResult() {
  // Calculate the final personality type by comparing the paired scores
  let personalityType = "";
  personalityType += scores.E >= scores.I ? "E" : "I";
  personalityType += scores.S >= scores.N ? "S" : "N";
  personalityType += scores.T >= scores.F ? "T" : "F";
  personalityType += scores.J >= scores.P ? "J" : "P";

  // Get the corresponding image from the personalityImages mapping
  const resultImage = personalityImages[personalityType] || "ImagesFolder/default.png";

  // Hide the quiz container and display the result
  document.getElementById("quiz-page").style.display = "none";
  const resultContainer = document.getElementById("result");
  resultContainer.style.display = "block";
  resultContainer.innerHTML = `<h2>Your Jellycat Plushsona is:</h2>
                               <img src="${resultImage}" alt="Your personality image" class="result-image" />
                               <div class="result-buttons">
                                  <button id="share-btn">Share</button>
                                  <button id="download-btn">Download</button>
                                  <button id="restart-btn">Restart</button>
                               </div>`;
  // Add event listener for the Restart button
  document.getElementById("restart-btn").addEventListener("click", function() {
    // Optionally, reset scores and the question index if restarting
    currentQuestionIndex = 0;
    scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

    // Hide the result container and show the landing page container
    resultContainer.style.display = "none";
    document.getElementById("start").style.display = "block";
  });
  
  // Add event listener for the Share button
  document.getElementById("share-btn").addEventListener("click", function() {
    if (navigator.share) {
      navigator.share({
        title: 'Check out my Jellycat Plushsona!',
        text: `I got ${personalityType} on the Jellycat Personality Quiz!`,
        url: window.location.href,
      })
      .then(() => console.log('Shared successfully'))
      .catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      alert('Sharing is not supported in your browser. Copy the link: ' + window.location.href);
    }
  });

  // Add event listener for the Download button
  document.getElementById("download-btn").addEventListener("click", function() {
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = resultImage;            
    link.download = 'YourJellycatPlushsona_Chromaticreature.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}
