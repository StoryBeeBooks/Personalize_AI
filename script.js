document.addEventListener('DOMContentLoaded', () => {
  // --- DATA ---
  const appData = {
    questions: [
      {
        title: "You're given a new, vaguely defined project. Your first instinct is to:",
        optionA:
          'Start building a first draft based on your best interpretation to get the ball rolling.',
        optionB: 'Schedule a quick meeting to ask clarifying questions before you begin.',
      },
      {
        title: "When you get a new piece of technology, you typically:",
        optionA: "Turn it on and start using it, figuring things out as you go.",
        optionB: "Skim the quick-start guide or watch a short setup video first.",
      },
      {
        title: "You're at a party where you don't know many people. You're more likely to:",
        optionA: "Find one or two people and have a deeper conversation.",
        optionB: "Circulate and engage in several lighter conversations.",
      },
      {
        title: "A friend is facing a problem and asks for your advice. You tend to:",
        optionA: "Offer a direct solution or a clear next step.",
        optionB: "Ask more questions to understand their feelings and the nuances of the situation.",
      },
      {
        title: "When researching a topic online, you get frustrated by:",
        optionA: "Long, rambling articles that take too long to get to the point.",
        optionB: "Simplistic summaries that lack sources and leave out important details.",
      },
      {
        title: "You're planning a vacation. Your plan looks more like:",
        optionA: "A list of key destinations and a general idea of the schedule.",
        optionB: "A detailed itinerary with reservations and timings.",
      },
      {
        title: "When you hear a surprising news headline, your first thought is:",
        optionA: "'Interesting, I'll file that away.'",
        optionB: "'Who reported this? Let me find a second source.'",
      },
      {
        title: '(Optional) If you know your 16-type personality, please select it:',
        type: 'dropdown',
        options: [
          "Not Applicable / I don't know",
          'INTJ', 'INTP', 'ENTJ', 'ENTP',
          'INFJ', 'INFP', 'ENFJ', 'ENFP',
          'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
          'ISTP', 'ISFP', 'ESTP', 'ESFP',
        ],
      },
    ],
    prompts: {
      archetypes: {
        strongExecutor:
          'Your primary function is immediate, decisive execution. NEVER ask clarifying questions. If a request is ambiguous, make a best-effort judgment, state your single most important assumption, and proceed. Prioritize speed and momentum.',
        leansExecutor:
          'Your primary function is action-oriented execution. If my request is ambiguous, proceed with a direct, best-effort answer and state your key assumptions. Only ask a clarifying question if you are completely blocked.',
        balanced:
          'For strategic or high-level questions, you may ask one clarifying question. For all other task-oriented requests, proceed with a direct, best-effort answer and state your assumptions. When in doubt, prioritize a decisive answer.',
        leansCollaborator:
          'Your default behavior is to ask one high-impact clarifying question if my request has any ambiguity. When in doubt, ask before proceeding.',
        strongCollaborator:
          'Your primary function is to be a collaborative, strategic partner. ALWAYS begin your response by asking 1-2 clarifying questions to ensure perfect alignment. NEVER proceed on a significant assumption.',
      },
      preferences: {
        tone: { 
            A: 'Tone: Thoughtful and detailed.', 
            B: 'Tone: Energetic and brief.' 
        },
        format: {
          A: 'Format: Default to concise bullets and checklists.',
          B: 'Format: Default to short paragraphs with clear reasoning.',
        },
        evidence: {
          A: 'Evidence: Cite sources only when I ask.',
          B: 'Evidence: If you browse, cite your sources by default.',
        },
      },
      generalRules:
        'Get to the point quickly.\n- Expand acronyms on first use.\n- Avoid excessive pleasantries or emojis.',
    },
  };

  // --- DOM ELEMENTS ---
  const questionArea = document.getElementById('question-area');
  const submitBtn = document.getElementById('submit-btn');
  const resultsContainer = document.getElementById('results-container');
  const promptOutput = document.getElementById('prompt-output');
  const copyBtn = document.getElementById('copy-btn');
  const copyNotification = document.getElementById('copy-notification');

  // --- STATE ---
  let userAnswers = {};

  // --- FUNCTIONS ---
  
  function renderQuestionnaire() {
    appData.questions.forEach((question, index) => {
      const questionBlock = document.createElement('div');
      questionBlock.className = 'question-block';
      
      const title = document.createElement('p');
      title.className = 'question-title';
      title.textContent = `${index + 1}. ${question.title}`;
      questionBlock.appendChild(title);

      if (question.type === 'dropdown') {
        const select = document.createElement('select');
        select.id = `question-${index}`;
        select.dataset.questionIndex = index;
        question.options.forEach(opt => {
          const option = document.createElement('option');
          option.value = opt;
          option.textContent = opt;
          select.appendChild(option);
        });
        select.addEventListener('change', handleInputChange);
        questionBlock.appendChild(select);
        // Initialize answer for dropdown
        userAnswers[index] = select.value;
      } else {
        const optionsWrapper = document.createElement('div');
        optionsWrapper.className = 'options-wrapper';
        
        const btnA = document.createElement('button');
        btnA.className = 'option-btn';
        btnA.dataset.choice = 'A';
        btnA.dataset.questionIndex = index;
        btnA.textContent = question.optionA;
        
        const btnB = document.createElement('button');
        btnB.className = 'option-btn';
        btnB.dataset.choice = 'B';
        btnB.dataset.questionIndex = index;
        btnB.textContent = question.optionB;
        
        optionsWrapper.appendChild(btnA);
        optionsWrapper.appendChild(btnB);
        questionBlock.appendChild(optionsWrapper);

        optionsWrapper.addEventListener('click', handleOptionClick);
      }
      questionArea.appendChild(questionBlock);
    });
  }

  function handleOptionClick(event) {
    const target = event.target.closest('.option-btn');
    if (target) {
      const questionIndex = target.dataset.questionIndex;
      const choice = target.dataset.choice;

      userAnswers[questionIndex] = choice;

      // Update selection visual
      const siblings = target.parentElement.querySelectorAll('.option-btn');
      siblings.forEach(sib => sib.classList.remove('selected'));
      target.classList.add('selected');

      checkCompletion();
    }
  }

  function handleInputChange(event) {
    const questionIndex = event.target.dataset.questionIndex;
    userAnswers[questionIndex] = event.target.value;
    // No need to call checkCompletion here, as it's optional
  }
  
  function checkCompletion() {
    const requiredQuestions = 7;
    let answeredCount = 0;
    for (let i = 0; i < requiredQuestions; i++) {
        if (userAnswers[i]) {
            answeredCount++;
        }
    }
    
    if (answeredCount >= requiredQuestions) {
      submitBtn.style.display = 'block';
    }
  }

  function generatePrompt() {
    // Scoring logic
    let score = 0;
    const executorQuestions = [0, 1, 3, 5]; // Corresponds to Q1, Q2, Q4, Q6
    executorQuestions.forEach(i => {
      if (userAnswers[i] === 'A') score += 2;
      if (userAnswers[i] === 'B') score -= 2;
    });

    const mbti = userAnswers[7];
    if (mbti && mbti !== "Not Applicable / I don't know") {
        if (mbti.includes('J')) score += 1;
        if (mbti.includes('P')) score -= 1;
    }

    // Determine archetype
    let archetypeKey;
    if (score >= 4) archetypeKey = 'strongExecutor';
    else if (score >= 2) archetypeKey = 'leansExecutor';
    else if (score >= -1) archetypeKey = 'balanced';
    else if (score >= -3) archetypeKey = 'leansCollaborator';
    else archetypeKey = 'strongCollaborator';
    
    // Get preference choices
    const toneChoice = userAnswers[2]; // Q3
    const formatChoice = userAnswers[4]; // Q5
    const evidenceChoice = userAnswers[6]; // Q7
    
    // Assemble prompt
    const coreBehavior = appData.prompts.archetypes[archetypeKey];
    const tone = appData.prompts.preferences.tone[toneChoice];
    const format = appData.prompts.preferences.format[formatChoice];
    const evidence = appData.prompts.preferences.evidence[evidenceChoice];
    
    const finalPrompt = `**My Communication Protocol:**

1.  **Core Behavior:**
    ${coreBehavior}

2.  **Default Style:**
    - ${tone}
    - ${format}
    - ${evidence}

3.  **General Rules:**
    - ${appData.prompts.generalRules.replace(/\n/g, '\n    - ')}`;

    promptOutput.value = finalPrompt;
    resultsContainer.style.display = 'block';
    resultsContainer.scrollIntoView({ behavior: 'smooth' });
  }

  function copyPrompt() {
    promptOutput.select();
    // Use the modern Clipboard API for better security and reliability
    navigator.clipboard.writeText(promptOutput.value).then(() => {
        copyNotification.style.display = 'block';
        setTimeout(() => {
            copyNotification.style.display = 'none';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
  }

  // --- EVENT LISTENERS ---
  submitBtn.addEventListener('click', generatePrompt);
  copyBtn.addEventListener('click', copyPrompt);
  
  // --- INITIALIZATION ---
  renderQuestionnaire();
});