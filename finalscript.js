const questions = [
    {
        question: "Q1/10: You approach Juniper Grove, where you have heard magical creatures live. Curious, you...",
        image: "images/1.gif",
        answers: [
            {
                type: "T",
                text: "Strategically observe from a distance, analysing the best way to approach.",
                scores: { T: +1, F: 0, J: 0, P: 0 }
            },
            {
                type: "F",
                text: "Gently call out, hoping to make a friendly connection with the creatures.",
                scores: { T: 0, F: +1, J: 0, P: 0 }
            },
            {
                type: "J",
                text: "Carefully plan your approach to not disrupt the grove’s harmony.",
                scores: { T: 0, F: 0, J: +1, P: 0 }
            },
            {
                type: "P",
                text: "Excitedly wander in without a plan, ready to embrace whatever happens.",
                scores: { T: 0, F: 0, J: 0, P: +1 }
            }
        ]
    }
];
{
        question: "Q2/10: You wander aimlessly around the woods till you hit a crossroad. Which path do you choose?",
        image: "images/2.gif",
        answers: [
            {
                type: "T",
                text: "The path in front of you. It looks frequently travelled, while the others seems untouched.",
                scores: { T: +1, F: 0, J: 0, P: 0 }
            },
            {
                type: "F",
                text: "The path on the left. You hear a soft hum and your heart is guided by the warmth of life.",
                scores: { T: 0, F: +1, J: 0, P: 0 }
            },
            {
                type: "J",
                text: "The path on the right. You feel it is the perfect spot for a break after spotting cute flowers along the path.",
                scores: { T: 0, F: 0, J: +1, P: 0 }
            },
            {
                type: "P",
                text: "Nah... this ain't worth it. You head back the way you came.",
                scores: { T: 0, F: 0, J: 0, P: +1 }
            }
        ]
    }
];
{
        question: "Q3/10: You get lost in the woods, frustration creeping in, when a very cute squirrel suddenly scurries into your path. Its tiny eyes glimmer with curiosity. You…",
        image: "images/3.gif",
        answers: [
            {
                type: "E",
                text: "Crouch down and excitedly start talking to the squirrel. It’s not like you’ve seen anyone else for hours, and even a furry friend counts as company.",
                scores: { E: +1, S: 0, I: 0, N: 0 }
            },
            {
                type: "S",
                text: "Dig into your pocket and find some trail mix. You carefully offer a nut, hoping the little creature knows the way better than you do.",
                scores: { E: 0, S: +1, I: 0, N: 0 }
            },
            {
                type: "I",
                text: "Keep walking, pretending you didn’t see it. It’s just a squirrel, after all —- best to stay focused on finding your way.",
                scores: { E: 0, S: 0, I: +1, N: 0 }
            },
            {
                type: "N",
                text: "Narrow your eyes. A squirrel showing up right when you're lost? Tad bit sus...",
                scores: { E: 0, S: 0, I: 0, N: +1 }
            }
        ]
    }
];


const resultOptions = {
    "ISTJ": {
        image: "1DE.png",
    },
    "ISFJ": {
        image: "2light.png"
    },
    "INFJ": {
        image: "3UFO.png"
    },
    "INTJ": {
        image: "4nebula.png"
    },
    "ISTP": {
        image: "5comet.png"
    },
    "ISFP": {
        image: "6ST.png"
    },
    "INFP": {
        image: "7DM.png"
    },
    "INTP": {
        image: "8met.png"
    },
    "ESTP": {
        image: "9BH.png"
    },
    "ESFP": {
        image: "10Sn.png"
    },
    "ENFP": {
        image: "11Grav.png"
    },
    "ENTP": {
        image: "12hand.png"
    },
    "ESTJ": {
        image: "13sat.png"
    },
    "ESFJ": {
        image: "14sun.png"
    },
    "ENFJ": {
        image: "15gal.png"
    },
    "ENTJ": {
        image: "16rocket.png"
    },

};

let currentQuestion = 0;
// let userAnswers = {};


function displayQuestion() {
    const quizElement = document.getElementById('quiz');
    const question = questions[currentQuestion];
    if (question) {
        let html = `<p>${question.question}</p>`;
        if (question.image) {
            html += `<img src="${question.image}" alt="Question ${currentQuestion + 1}">`;
        }
        for (const option in question.answers) {
            html += `<button class="large-rectangular" value="${option}" id="${option}">${question.answers[option].text}</button>`;
        }
        quizElement.innerHTML = html;
        attachButtonClickHandlers();
    } else {
    
    }
}


document.getElementById('start-button').addEventListener('click', function() {
    document.getElementById('start-page').style.display = 'none';
    document.getElementById('quiz-page').style.display = 'block';
    currentQuestion = 0;
    userAnswers = {};
    displayQuestion(); 
    // userAnswers.userName = userName;
});


//click
function attachButtonClickHandlers() {
    const choiceButtons = document.querySelectorAll('.large-rectangular');
    choiceButtons.forEach((button) => {
        button.addEventListener('click', handleAnswer);
    });
}



//answers
function handleAnswer(event) {
    const selectedOption = event.target;
    const answerKey = selectedOption.value;
    const question = questions[currentQuestion];
    const answer = question.answers[answerKey];

    for (const dimension in answer.scores) {
        userAnswers[dimension] = (userAnswers[dimension] || 0) + answer.scores[dimension];
    }

    // remove this when done debugging
    // Display the scores for each letter
    
    //const scoresContainer = document.querySelector('.scores-container');
    //scoresContainer.innerHTML = `
    //    <p>E Score: ${userAnswers['E'] || 0}, S Score: ${userAnswers['S'] || 0}, T Score: ${userAnswers['T'] || 0}, P Score: ${userAnswers['P'] || 0}</p>
    //    <p>I Score: ${userAnswers['I'] || 0}, N Score: ${userAnswers['N'] || 0}, F Score: ${userAnswers['F'] || 0}, J Score: ${userAnswers['J'] || 0}</p>
    //
    //`;
    // to here

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        displayQuestion();
    } else {
        showResult();
    }
}

// ...


function showResult() {
    const resultElement = document.getElementById('result');
    const resultTextContainer = document.querySelector('.result-text');
    const resultImage = document.getElementById('result-image');
    const topLetters = {};

    const pairs = ["IE", "NS", "TF", "PJ"];
    pairs.forEach(pair => {
        const options = pair.split('');
        const scores = options.map(option => userAnswers[option] || 0);
        const topOptionIndex = scores.indexOf(Math.max(...scores));
        const topOption = options[topOptionIndex];
        topLetters[pair] = topOption;
    });

    //each pair
    const result = pairs.map(pair => topLetters[pair]).join('');

    //show result
    const personalityData = resultOptions[result];
    if (personalityData) {
        resultTextContainer.innerHTML = `
        `;

        resultImage.src = "images/"+personalityData.image;
        resultImage.alt = `${personalityData.image} Image`;
    } else {

    }

    document.getElementById('quiz').style.display = 'none'; // Hide the quiz
    document.getElementById('result').style.display = 'block'; // Show the result
    document.getElementById('restart-button').style.display = 'block'; // Show the restart button
}



//Function to restart the quiz
function restartQuiz() {
    currentQuestion = 0;
    userAnswers = {};
    document.getElementById('result').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    displayQuestion(); // Start the quiz from the beginning
}

document.getElementById('restart-button').addEventListener('click', restartQuiz);

displayQuestion();
