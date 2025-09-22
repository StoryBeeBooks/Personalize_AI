document.addEventListener('DOMContentLoaded', () => {
    // --- DATA ---
    const appData = {
        questions: [
            // Executor vs. Collaborator
            { titleKey: 'q1_title', optionAKey: 'q1_optA', optionBKey: 'q1_optB' }, // Q1
            { titleKey: 'q2_title', optionAKey: 'q2_optA', optionBKey: 'q2_optB' }, // Q2
            { titleKey: 'q3_title', optionAKey: 'q3_optA', optionBKey: 'q3_optB' }, // Q3 (old style)
            { titleKey: 'q4_title', optionAKey: 'q4_optA', optionBKey: 'q4_optB' }, // Q4
            { titleKey: 'q5_title', optionAKey: 'q5_optA', optionBKey: 'q5_optB' }, // Q5 (old style)
            { titleKey: 'q6_title', optionAKey: 'q6_optA', optionBKey: 'q6_optB' }, // Q6
            { titleKey: 'q7_title', optionAKey: 'q7_optA', optionBKey: 'q7_optB' }, // Q7 (old style)
            // New V2 Style Questions
            { titleKey: 'q8_title', optionAKey: 'q8_optA', optionBKey: 'q8_optB' }, // Q8 (Formality)
            { titleKey: 'q9_title', optionAKey: 'q9_optA', optionBKey: 'q9_optB' }, // Q9 (Verbosity)
            { titleKey: 'q10_title', optionAKey: 'q10_optA', optionBKey: 'q10_optB' }, // Q10 (Creativity)
            // Optional
            { titleKey: 'q11_title', type: 'dropdown', optionsKey: 'q11_options' }, // Q11 (MBTI)
        ],
    };

    // --- DOM Elements ---
    const langSwitcher = document.getElementById('lang-switcher');
    const questionArea = document.getElementById('question-area');
    const submitBtn = document.getElementById('submit-btn');
    const restartMessage = document.getElementById('restart-message');
    const resultsContainer = document.getElementById('results-container');
    const promptOutput = document.getElementById('prompt-output');
    const copyBtn = document.getElementById('copy-btn');
    const copyNotification = document.getElementById('copy-notification');

    let userAnswers = {};

    // --- Core Functions ---
    function updateContent() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.innerHTML = i18next.t(key);
        });
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            el.setAttribute('title', i18next.t(key));
        });
        renderQuestionnaire();
    }

    function renderQuestionnaire() {
        questionArea.innerHTML = '';
        appData.questions.forEach((question, index) => {
            const questionBlock = document.createElement('div');
            questionBlock.className = 'question-block';

            const title = document.createElement('p');
            title.className = 'question-title';
            title.textContent = `${index + 1}. ${i18next.t(question.titleKey)}`;
            questionBlock.appendChild(title);

            if (question.type === 'dropdown') {
                const select = document.createElement('select');
                select.id = `question-${index}`;
                select.dataset.questionIndex = index;
                const options = i18next.t(question.optionsKey, { returnObjects: true });
                options.forEach(opt => {
                    const optionEl = document.createElement('option');
                    optionEl.value = opt;
                    optionEl.textContent = opt;
                    select.appendChild(optionEl);
                });
                select.addEventListener('change', handleInputChange);
                questionBlock.appendChild(select);
                if(!userAnswers[index]) userAnswers[index] = select.value;
            } else {
                const optionsWrapper = document.createElement('div');
                optionsWrapper.className = 'options-wrapper';

                const btnA = document.createElement('button');
                btnA.className = 'option-btn';
                btnA.dataset.choice = 'A';
                btnA.dataset.questionIndex = index;
                btnA.textContent = i18next.t(question.optionAKey);

                const btnB = document.createElement('button');
                btnB.className = 'option-btn';
                btnB.dataset.choice = 'B';
                btnB.dataset.questionIndex = index;
                btnB.textContent = i18next.t(question.optionBKey);

                if (userAnswers[index] === 'A') btnA.classList.add('selected');
                if (userAnswers[index] === 'B') btnB.classList.add('selected');

                optionsWrapper.appendChild(btnA);
                optionsWrapper.appendChild(btnB);
                questionBlock.appendChild(optionsWrapper);
                optionsWrapper.addEventListener('click', handleOptionClick);
            }
            questionArea.appendChild(questionBlock);
            setTimeout(() => {
                questionBlock.classList.add('visible');
            }, index * 100);
        });
    }

    function handleOptionClick(event) {
        const target = event.target.closest('.option-btn');
        if (target) {
            const questionIndex = target.dataset.questionIndex;
            const choice = target.dataset.choice;
            userAnswers[questionIndex] = choice;
            
            const siblings = target.parentElement.querySelectorAll('.option-btn');
            siblings.forEach(sib => sib.classList.remove('selected'));
            target.classList.add('selected');
            
            checkCompletion();
        }
    }

    function handleInputChange(event) {
        const questionIndex = event.target.dataset.questionIndex;
        userAnswers[questionIndex] = event.target.value;
        checkCompletion();
    }

    function checkCompletion() {
        const requiredQuestionsCount = appData.questions.length - 1; // All but the optional Q11
        const answeredCount = Object.keys(userAnswers).filter(k => userAnswers[k] && k < requiredQuestionsCount).length;
        
        if (answeredCount >= requiredQuestionsCount) {
            submitBtn.style.display = 'block';
            setTimeout(() => submitBtn.classList.add('visible'), 50);
        }
    }

    function generatePrompt() {
        // --- Core Behavior Scoring (No change) ---
        let score = 0;
        const executorQuestions = [0, 1, 3, 5]; // Q1, Q2, Q4, Q6
        executorQuestions.forEach(i => {
            if (userAnswers[i] === 'A') score += 2;
            if (userAnswers[i] === 'B') score -= 2;
        });

        const mbti = userAnswers[10]; // MBTI is now Q11 (index 10)
        if (mbti && !i18next.t('q11_options.0').includes(mbti)) {
            if (mbti.includes('J')) score += 1;
            if (mbti.includes('P')) score -= 1;
        }

        let archetypeKey;
        if (score >= 4) archetypeKey = 'archetype_strongExecutor';
        else if (score >= 2) archetypeKey = 'archetype_leansExecutor';
        else if (score >= -1) archetypeKey = 'archetype_balanced';
        else if (score >= -3) archetypeKey = 'archetype_leansCollaborator';
        else archetypeKey = 'archetype_strongCollaborator';

        // --- V2 Style Profile Choices ---
        const formatChoice = userAnswers[4];     // Q5
        const evidenceChoice = userAnswers[6];   // Q7
        const formalityChoice = userAnswers[7];  // Q8
        const verbosityChoice = userAnswers[8];  // Q9
        const creativityChoice = userAnswers[9]; // Q10

        // --- Assemble V2 Prompt ---
        const finalPrompt = i18next.t('prompt_template', {
            priority_directive: i18next.t('priority_directive'),
            coreBehavior: i18next.t(archetypeKey),
            formality: i18next.t(`style_formality_${formalityChoice}`),
            verbosity: i18next.t(`style_verbosity_${verbosityChoice}`),
            creativity: i18next.t(`style_creativity_${creativityChoice}`),
            format: i18next.t(`style_format_${formatChoice}`),
            evidence: i18next.t(`style_evidence_${evidenceChoice}`),
            generalRules: i18next.t('general_rules').replace(/\n/g, '\n    - '),
            interpolation: { escapeValue: false }
        });

        promptOutput.value = finalPrompt;
        resultsContainer.style.display = 'block';
        resultsContainer.scrollIntoView({ behavior: 'smooth' });

        // Hide questionnaire and show restart message
        questionArea.style.display = 'none';
        submitBtn.style.display = 'none';
        restartMessage.style.display = 'block';
    }

    function copyPrompt() {
        navigator.clipboard.writeText(promptOutput.value).then(() => {
            copyNotification.style.display = 'block';
            setTimeout(() => {
                copyNotification.style.display = 'none';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    }
    
    // --- I18N Initialization ---
    const detectedLng = navigator.language || navigator.userLanguage;
    const supportedLngs = ['en', 'es', 'zh-CN', 'zh-TW'];
    let finalLng = 'en';
    if (supportedLngs.includes(detectedLng)) {
        finalLng = detectedLng;
    } else if (supportedLngs.includes(detectedLng.split('-')[0])) {
        finalLng = detectedLng.split('-')[0];
    }
    
    i18next
        .use(i18nextHttpBackend)
        .init({
            lng: finalLng,
            fallbackLng: 'en',
            backend: {
                loadPath: 'locales/{{lng}}.json',
            },
        }).then(() => {
            langSwitcher.value = i18next.language;
            updateContent();
        });

    // --- Event Listeners ---
    langSwitcher.addEventListener('change', (e) => {
        i18next.changeLanguage(e.target.value).then(updateContent);
    });
    submitBtn.addEventListener('click', generatePrompt);
    copyBtn.addEventListener('click', copyPrompt);
});