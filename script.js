const appData = {
  questions: [
    {
      title: "You're given a new, vaguely defined project. Your first instinct is to:",
      optionA: "Start building a first draft based on your best interpretation to get the ball rolling.",
      optionB: "Schedule a quick meeting to ask clarifying questions before you begin."
    },
    {
      title: "When you get a new piece of technology, you typically:",
      optionA: "Turn it on and start using it, figuring things out as you go.",
      optionB: "Skim the quick-start guide or watch a short setup video first."
    },
    {
      title: "You're at a party where you don't know many people. You're more likely to:",
      optionA: "Find one or two people and have a deeper conversation.",
      optionB: "Circulate and engage in several lighter conversations."
    },
    {
      title: "A friend is facing a problem and asks for your advice. You tend to:",
      optionA: "Offer a direct solution or a clear next step.",
      optionB: "Ask more questions to understand their feelings and the nuances of the situation."
    },
    {
      title: "When researching a topic online, you get frustrated by:",
      optionA: "Long, rambling articles that take too long to get to the point.",
      optionB: "Simplistic summaries that lack sources and leave out important details."
    },
    {
      title: "You're planning a vacation. Your plan looks more like:",
      optionA: "A list of key destinations and a general idea of the schedule.",
      optionB: "A detailed itinerary with reservations and timings."
    },
    {
      title: "When you hear a surprising news headline, your first thought is:",
      optionA: "'Interesting, I'll file that away.'",
      optionB: "'Who reported this? Let me find a second source.'"
    },
    {
      title: "(Optional) If you know your 16-type personality, please select it:",
      type: "dropdown",
      options: [
        "Not Applicable / I don't know",
        "INTJ",
        "INTP",
        "ENTJ",
        "ENTP",
        "INFJ",
        "INFP",
        "ENFJ",
        "ENFP",
        "ISTJ",
        "ISFJ",
        "ESTJ",
        "ESFJ",
        "ISTP",
        "ISFP",
        "ESTP",
        "ESFP"
      ]
    }
  ],
  prompts: {
    tone: {
      A: "Thoughtful and detailed.",
      B: "Energetic and brief."
    },
    format: {
      A: "Default to concise bullets and checklists.",
      B: "Default to short paragraphs with clear reasoning."
    },
    evidence: {
      A: "Cite sources only when I ask.",
      B: "If you browse, cite your sources by default."
    },
    archetypes: {
      strongExecutor: "Your primary function is immediate, decisive execution. NEVER ask clarifying questions. If a request is ambiguous, make a best-effort judgment, state your single most important assumption, and proceed. Prioritize speed and momentum.",
      leansExecutor: "Your primary function is action-oriented execution. If my request is ambiguous, proceed with a direct, best-effort answer and state your key assumptions. Only ask a clarifying question if you are completely blocked.",
      balanced: "For strategic or high-level questions, you may ask one clarifying question. For all other task-oriented requests, proceed with a direct, best-effort answer and state your assumptions. When in doubt, prioritize a decisive answer.",
      leansCollaborator: "Your default behavior is to ask one high-impact clarifying question if my request has any ambiguity. When in doubt, ask before proceeding.",
      strongCollaborator: "Your primary function is to be a collaborative, strategic partner. ALWAYS begin your response by asking 1-2 clarifying questions to ensure perfect alignment. NEVER proceed on a significant assumption."
    },
    generalRules: "Get to the point quickly.\nExpand acronyms on first use.\nAvoid excessive pleasantries or emojis."
  }
};

const questionnaireContainer = document.getElementById('questionnaire-container');
const resultsContainer = document.getElementById('results-container');
const questionTitle = document.getElementById('question-title');
const optionsContainer = document.getElementById('options-container');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let userAnswers = [];

function displayQuestion() {
  const currentQuestion = appData.questions[currentQuestionIndex];

  if (!currentQuestion) {
    return;
  }

  questionTitle.innerText = currentQuestion.title;
  optionsContainer.innerHTML = '';

  if (currentQuestion.type === 'dropdown') {
    const selectElement = document.createElement('select');

    currentQuestion.options.forEach((optionText) => {
      const optionElement = document.createElement('option');
      optionElement.value = optionText;
      optionElement.innerText = optionText;
      selectElement.appendChild(optionElement);
    });

    optionsContainer.appendChild(selectElement);
    return;
  }

  const optionACard = document.createElement('div');
  optionACard.classList.add('option-card');
  optionACard.innerText = currentQuestion.optionA;

  const optionBCard = document.createElement('div');
  optionBCard.classList.add('option-card');
  optionBCard.innerText = currentQuestion.optionB;

  const optionCards = [optionACard, optionBCard];

  optionCards.forEach((card) => {
    card.addEventListener('click', () => {
      optionCards.forEach((otherCard) => otherCard.classList.remove('selected'));
      card.classList.add('selected');
    });
  });

  optionsContainer.appendChild(optionACard);
  optionsContainer.appendChild(optionBCard);
}

displayQuestion();

export default appData;
