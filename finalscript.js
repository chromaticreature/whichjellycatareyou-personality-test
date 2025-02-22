const questions = [
    {
        question: "Q1/10: You approach Juniper Grove, where you have heard magical creatures live. Curious, you...",
        image: "images/Q1.gif",
        answers: [
            {
                type: "T",
                text: "Strategically observe from a distance, analysing the best way to approach.",
                scores: { T: 1, F: 0, J: 0, P: 0 }
            },
            {
                type: "F",
                text: "Gently call out, hoping to make a friendly connection with the creatures.",
                scores: { T: 0, F: 1, J: 0, P: 0 }
            },
            {
                type: "J",
                text: "Carefully plan your approach to not disrupt the grove’s harmony.",
                scores: { T: 0, F: 0, J: 1, P: 0 }
            },
            {
                type: "P",
                text: "Excitedly wander in without a plan, ready to embrace whatever happens.",
                scores: { T: 0, F: 0, J: 0, P: 1 }
            }
        ]
    }
];
