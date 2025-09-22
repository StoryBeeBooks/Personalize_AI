document.addEventListener('DOMContentLoaded', () => {
    // --- DATA ---
    const appData = {
        questions: [
            { titleKey: 'q1_title', optionAKey: 'q1_optA', optionBKey: 'q1_optB' }, { titleKey: 'q2_title', optionAKey: 'q2_optA', optionBKey: 'q2_optB' }, { titleKey: 'q3_title', optionAKey: 'q3_optA', optionBKey: 'q3_optB' }, { titleKey: 'q4_title', optionAKey: 'q4_optA', optionBKey: 'q4_optB' }, { titleKey: 'q5_title', optionAKey: 'q5_optA', optionBKey: 'q5_optB' }, { titleKey: 'q6_title', optionAKey: 'q6_optA', optionBKey: 'q6_optB' }, { titleKey: 'q7_title', optionAKey: 'q7_optA', optionBKey: 'q7_optB' }, { titleKey: 'q8_title', optionAKey: 'q8_optA', optionBKey: 'q8_optB' }, { titleKey: 'q9_title', optionAKey: 'q9_optA', optionBKey: 'q9_optB' }, { titleKey: 'q10_title', optionAKey: 'q10_optA', optionBKey: 'q10_optB' }, { titleKey: 'q11_title', type: 'dropdown', optionsKey: 'q11_options' },
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
    const statsSection = document.getElementById('stats-section');
    const statsChartContainer = document.getElementById('stats-chart-container');
    const statsSubheader = document.querySelector('.stats-subheader');
    const questionnaireContainer = document.getElementById('questionnaire-container');

    let userAnswers = {};
    let isSubmitted = false;

    // --- Stats & Chart Functions ---
    async function fetchAndDisplayStats() {
        const statsUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQJorjITawUB0lSy-242NGMs5rH1nF3x_3SCZBPJn7-HLjW6OpzTGw4rq7hJfh3b7FPV7W1o1G0bwmF/pub?output=csv';
        try {
            const response = await fetch(statsUrl);
            if (!response.ok) return;
            const csvData = await response.text();
            const stats = parseCsvData(csvData);
            if (!stats.totalGenerations) return;
            
            const prefix = i18next.t('stats_subheader_prefix');
            const suffix = i18next.t('stats_subheader_suffix');
            const count = Number(stats.totalGenerations).toLocaleString();
            statsSubheader.textContent = `${prefix} ${count} ${suffix}`;
            
            renderChart(stats);
            statsSection.style.display = 'block';
        } catch (error) {
            console.error('Could not fetch stats:', error);
            statsSection.style.display = 'none';
        }
    }

    function parseCsvData(csv) {
        const lines = csv.split(/\r\n|\n/).slice(1);
        const data = {};
        lines.forEach(line => {
            const [key, value] = line.split(',');
            if (key && value) {
                data[key.trim()] = value.trim();
            }
        });
        return data;
    }

    function renderChart(stats) {
        statsChartContainer.innerHTML = '<canvas id="stats-chart"></canvas>';
        const ctx = document.getElementById('stats-chart').getContext('2d');
        const archetypes = ['archetype_strongExecutor', 'archetype_leansExecutor', 'archetype_balanced', 'archetype_leansCollaborator', 'archetype_strongCollaborator'];
        const labels = archetypes.map(key => i18next.t(key.replace('archetype_', 'archetype_label_')));
        const dataPoints = archetypes.map(key => stats[key] || 0);

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: i18next.t('stats_chart_label'),
                    data: dataPoints,
                    backgroundColor: 'rgba(0, 113, 227, 0.6)',
                    borderColor: 'rgba(0, 113, 227, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                scales: {
                    x: { beginAtZero: true, ticks: { callback: value => value + '%' } }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.raw}%`;
                            }
                        }
                    }
                }
            }
        });
    }

    // --- Core Functions ---
    function updateContent() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            el.innerHTML = i18next.t(el.getAttribute('data-i18n'));
        });
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            el.setAttribute('title', i18next.t(el.getAttribute('data-i18n-title')));
        });
        renderQuestionnaire();
        if (statsSection.style.display === 'block') {
            fetchAndDisplayStats(); // Re-render stats for language change
        }
    }

    function renderQuestionnaire() {
        if (isSubmitted) return;
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
                btnA.className = 'option-btn'; btnA.dataset.choice = 'A'; btnA.dataset.questionIndex = index; btnA.textContent = i18next.t(question.optionAKey);
                const btnB = document.createElement('button');
                btnB.className = 'option-btn'; btnB.dataset.choice = 'B'; btnB.dataset.questionIndex = index; btnB.textContent = i18next.t(question.optionBKey);
                if (userAnswers[index] === 'A') btnA.classList.add('selected');
                if (userAnswers[index] === 'B') btnB.classList.add('selected');
                optionsWrapper.appendChild(btnA); optionsWrapper.appendChild(btnB);
                questionBlock.appendChild(optionsWrapper);
                optionsWrapper.addEventListener('click', handleOptionClick);
            }
            questionArea.appendChild(questionBlock);
        });
    }

    function handleOptionClick(event) {
        if (isSubmitted) return;
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
        if (isSubmitted) return;
        const questionIndex = event.target.dataset.questionIndex;
        userAnswers[questionIndex] = event.target.value;
        checkCompletion();
    }

    function checkCompletion() {
        const requiredQuestionsCount = appData.questions.length - 1;
        const answeredCount = Object.keys(userAnswers).filter(k => userAnswers[k] && k < requiredQuestionsCount).length;
        if (answeredCount >= requiredQuestionsCount) {
            submitBtn.style.display = 'block';
        }
    }

    function generatePrompt() {
        if (isSubmitted) return;
        isSubmitted = true;

        let score = 0;
        const executorQuestions = [0, 1, 3, 5];
        executorQuestions.forEach(i => {
            if (userAnswers[i] === 'A') score += 2;
            if (userAnswers[i] === 'B') score -= 2;
        });

        const mbti = userAnswers[10];
        const mbtiDefault = i18next.t('q11_options', { returnObjects: true })[0];
        if (mbti && mbti !== mbtiDefault) {
            if (mbti.includes('J')) score += 1;
            if (mbti.includes('P')) score -= 1;
        }

        let archetypeKey;
        if (score >= 4) archetypeKey = 'archetype_strongExecutor';
        else if (score >= 2) archetypeKey = 'archetype_leansExecutor';
        else if (score >= -1) archetypeKey = 'archetype_balanced';
        else if (score >= -3) archetypeKey = 'archetype_leansCollaborator';
        else archetypeKey = 'archetype_strongCollaborator';

        const formatChoice = userAnswers[4]; const evidenceChoice = userAnswers[6]; const formalityChoice = userAnswers[7]; const verbosityChoice = userAnswers[8]; const creativityChoice = userAnswers[9];

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

        questionnaireContainer.style.display = 'none';

        if (typeof gtag !== 'undefined') {
            gtag('event', 'protocol_generated', {
                'archetype': archetypeKey.replace('archetype_', ''),
                'formality': formalityChoice, 'verbosity': verbosityChoice, 'creativity': creativityChoice, 'format': formatChoice, 'evidence': evidenceChoice
            });
        }
    }

    function copyPrompt() {
        navigator.clipboard.writeText(promptOutput.value).then(() => {
            copyNotification.style.display = 'block';
            setTimeout(() => { copyNotification.style.display = 'none'; }, 2000);
        }).catch(err => console.error('Failed to copy text: ', err));
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
            fetchAndDisplayStats();
        });

    // --- Event Listeners ---
    langSwitcher.addEventListener('change', (e) => {
        i18next.changeLanguage(e.target.value).then(updateContent);
    });
    submitBtn.addEventListener('click', generatePrompt);
    copyBtn.addEventListener('click', copyPrompt);
});