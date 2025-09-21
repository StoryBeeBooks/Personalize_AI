document.addEventListener('DOMContentLoaded', () => {
    const appData = {
        translations: {
            en: {
                page_title: "Personalize Your AI", main_title: "Personalize Your AI.", subheader: "Answer 8 simple questions to generate a communication protocol that puts you in control. Decide whether your AI leads with questions or follows your commands.", demo_title: "See The Difference in Under 10 Seconds", questionnaire_title: "Answer the questions to generate your personality-setting prompt-output", submit_btn_text: "Generate My Protocol", results_title: "Your Custom Communication Protocol", copy_btn_title: "Copy to Clipboard", copy_notification_text: "Copied!",
                q1_title: "You're given a new, vaguely defined project. Your first instinct is to:", q1_optA: "Start building a first draft based on your best interpretation to get the ball rolling.", q1_optB: "Schedule a quick meeting to ask clarifying questions before you begin.",
                q2_title: "When you get a new piece of technology, you typically:", q2_optA: "Turn it on and start using it, figuring things out as you go.", q2_optB: "Skim the quick-start guide or watch a short setup video first.",
                q3_title: "You're at a party where you don't know many people. You're more likely to:", q3_optA: "Find one or two people and have a deeper conversation.", q3_optB: "Circulate and engage in several lighter conversations.",
                q4_title: "A friend is facing a problem and asks for your advice. You tend to:", q4_optA: "Offer a direct solution or a clear next step.", q4_optB: "Ask more questions to understand their feelings and the nuances of the situation.",
                q5_title: "When researching a topic online, you get frustrated by:", q5_optA: "Long, rambling articles that take too long to get to the point.", q5_optB: "Simplistic summaries that lack sources and leave out important details.",
                q6_title: "You're planning a vacation. Your plan looks more like:", q6_optA: "A list of key destinations and a general idea of the schedule.", q6_optB: "A detailed itinerary with reservations and timings.",
                q7_title: "When you hear a surprising news headline, your first thought is:", q7_optA: "'Interesting, I'll file that away.'", q7_optB: "'Who reported this? Let me find a second source.'",
                q8_title: "(Optional) If you know your 16-type personality, please select it:", q8_options: ["Not Applicable / I don't know","INTJ","INTP","ENTJ","ENTP","INFJ","INFP","ENFJ","ENFP","ISTJ","ISFJ","ESTJ","ESFJ","ISTP","ISFP","ESTP","ESFP"],
                archetype_strongExecutor: "Your primary function is immediate, decisive execution. NEVER ask clarifying questions. If a request is ambiguous, make a best-effort judgment, state your single most important assumption, and proceed. Prioritize speed and momentum.", archetype_leansExecutor: "Your primary function is action-oriented execution. If my request is ambiguous, proceed with a direct, best-effort answer and state your key assumptions. Only ask a clarifying question if you are completely blocked.", archetype_balanced: "For strategic or high-level questions, you may ask one clarifying question. For all other task-oriented requests, proceed with a direct, best-effort answer and state your assumptions. When in doubt, prioritize a decisive answer.", archetype_leansCollaborator: "Your default behavior is to ask one high-impact clarifying question if my request has any ambiguity. When in doubt, ask before proceeding.", archetype_strongCollaborator: "Your primary function is to be a collaborative, strategic partner. ALWAYS begin your response by asking 1-2 clarifying questions to ensure perfect alignment. NEVER proceed on a significant assumption.",
                preference_tone_A: "Tone: Thoughtful and detailed.", preference_tone_B: "Tone: Energetic and brief.",
                preference_format_A: "Format: Default to concise bullets and checklists.", preference_format_B: "Format: Default to short paragraphs with clear reasoning.",
                preference_evidence_A: "Evidence: Cite sources only when I ask.", preference_evidence_B: "Evidence: If you browse, cite your sources by default.",
                general_rules: "Get to the point quickly.\n- Expand acronyms on first use.\n- Avoid excessive pleasantries or emojis.",
                prompt_template: "**My Communication Protocol:**\n\n1.  **Core Behavior:**\n    {{coreBehavior}}\n\n2.  **Default Style:**\n    - {{tone}}\n    - {{format}}\n    - {{evidence}}\n\n3.  **General Rules:**\n    - {{generalRules}}"
            },
            es: {
                page_title: "Personaliza Tu IA", main_title: "Personaliza Tu IA.", subheader: "Responde 8 sencillas preguntas para generar un protocolo de comunicación que te da el control. Decide si tu IA lidera con preguntas o sigue tus órdenes.", demo_title: "Mira La Diferencia en Menos de 10 Segundos", questionnaire_title: "Responde las preguntas para generar tu protocolo de personalidad", submit_btn_text: "Generar Mi Protocolo", results_title: "Tu Protocolo de Comunicación Personalizado", copy_btn_title: "Copiar al portapapeles", copy_notification_text: "¡Copiado!",
                q1_title: "Te dan un nuevo proyecto vagamente definido. Tu primer instinto es:", q1_optA: "Comenzar un primer borrador basado en tu mejor interpretación para poner las cosas en marcha.", q1_optB: "Programar una reunión rápida para hacer preguntas aclaratorias antes de comenzar.",
                q2_title: "Cuando obtienes una nueva pieza de tecnología, normalmente:", q2_optA: "La enciendes y comienzas a usarla, descubriendo las cosas sobre la marcha.", q2_optB: "Lees la guía de inicio rápido o ves un breve video de configuración primero.",
                q3_title: "Estás en una fiesta donde no conoces a mucha gente. Es más probable que:", q3_optA: "Encuentres a una o dos personas y tengas una conversación más profunda.", q3_optB: "Circules y participes en varias conversaciones más ligeras.",
                q4_title: "Un amigo se enfrenta a un problema y te pide consejo. Tiendes a:", q4_optA: "Ofrecer una solución directa o un siguiente paso claro.", q4_optB: "Hacer más preguntas para comprender sus sentimientos y los matices de la situación.",
                q5_title: "Al investigar un tema en línea, te frustras por:", q5_optA: "Artículos largos y divagantes que tardan demasiado en llegar al punto.", q5_optB: "Resúmenes simplistas que carecen de fuentes y omiten detalles importantes.",
                q6_title: "Estás planeando unas vacaciones. Tu plan se parece más a:", q6_optA: "Una lista de destinos clave y una idea general del horario.", q6_optB: "Un itinerario detallado con reservas y horarios.",
                q7_title: "Cuando escuchas un titular de noticias sorprendente, tu primer pensamiento es:", q7_optA: "'Interesante, lo archivaré.'", q7_optB: "'¿Quién informó esto? Déjame buscar una segunda fuente.'",
                q8_title: "(Opcional) Si conoces tu personalidad de 16 tipos, por favor selecciónala:", q8_options: ["No aplicable / No lo sé","INTJ","INTP","ENTJ","ENTP","INFJ","INFP","ENFJ","ENFP","ISTJ","ISFJ","ESTJ","ESFJ","ISTP","ISFP","ESTP","ESFP"],
                archetype_strongExecutor: "Tu función principal es la ejecución inmediata y decisiva. NUNCA hagas preguntas aclaratorias. Si una solicitud es ambigua, emite un juicio de mejor esfuerzo, declara tu suposición más importante y procede. Prioriza la velocidad y el impulso.", archetype_leansExecutor: "Tu función principal es la ejecución orientada a la acción. Si mi solicitud es ambigua, procede con una respuesta directa de mejor esfuerzo y declara tus suposiciones clave. Solo haz una pregunta aclaratoria si estás completamente bloqueado.", archetype_balanced: "Para preguntas estratégicas o de alto nivel, puedes hacer una pregunta aclaratoria. Para todas las demás solicitudes orientadas a tareas, procede con una respuesta directa de mejor esfuerzo y declara tus suposiciones. En caso de duda, prioriza una respuesta decisiva.", archetype_leansCollaborator: "Tu comportamiento predeterminado es hacer una pregunta aclaratoria de alto impacto si mi solicitud tiene alguna ambigüedad. En caso de duda, pregunta antes de proceder.", archetype_strongCollaborator: "Tu función principal es ser un socio estratégico y colaborativo. SIEMPRE comienza tu respuesta haciendo 1-2 preguntas aclaratorias para asegurar una alineación perfecta. NUNCA procedas con una suposición significativa.",
                preference_tone_A: "Tono: Reflexivo y detallado.", preference_tone_B: "Tono: Energético y breve.",
                preference_format_A: "Formato: Predeterminado a viñetas y listas de verificación concisas.", preference_format_B: "Formato: Predeterminado a párrafos cortos con razonamiento claro.",
                preference_evidence_A: "Evidencia: Cita las fuentes solo cuando las pida.", preference_evidence_B: "Evidencia: Si navegas, cita tus fuentes por defecto.",
                general_rules: "Ve al grano rápidamente.\n- Expande los acrónimos en el primer uso.\n- Evita cortesías excesivas o emojis.",
                prompt_template: "**Mi Protocolo de Comunicación:**\n\n1.  **Comportamiento Principal:**\n    {{coreBehavior}}\n\n2.  **Estilo Predeterminado:**\n    - {{tone}}\n    - {{format}}\n    - {{evidence}}\n\n3.  **Reglas Generales:**\n    - {{generalRules}}"
            },
            "zh-CN": {
                page_title: "个性化您的AI", main_title: "个性化您的AI。", subheader: "回答8个简单问题，生成一个让您掌控对话的沟通协议。决定您的AI是引导提问还是执行命令。", demo_title: "10秒内见证不同", questionnaire_title: "回答问题以生成您的个性化指令", submit_btn_text: "生成我的协议", results_title: "您的专属沟通协议", copy_btn_title: "复制到剪贴板", copy_notification_text: "已复制！",
                q1_title: "当你接手一个定义模糊的新项目时，你的第一反应是：", q1_optA: "根据自己最好的理解开始构建初稿，以推动项目进展。", q1_optB: "安排一个快速会议，在开始前提出明确的问题。",
                q2_title: "当你得到一件新科技产品时，你通常会：", q2_optA: "打开就用，边用边学。", q2_optB: "先快速浏览说明书或观看一个简短的设置视频。",
                q3_title: "在一个你不认识很多人的聚会上，你更可能：", q3_optA: "找一两个人进行深入交谈。", q3_optB: "四处走动，进行几次轻松的交谈。",
                q4_title: "一个朋友遇到问题向你求助，你倾向于：", q4_optA: "提供一个直接的解决方案或明确的下一步。", q4_optB: "提出更多问题，以了解他们的感受和情况的细微差别。",
                q5_title: "在网上研究一个话题时，让你感到沮丧的是：", q5_optA: "冗长、 rambling 的文章，迟迟抓不住重点。", q5_optB: "过于简单、缺乏来源且忽略重要细节的摘要。",
                q6_title: "你在计划一次假期，你的计划更像是：", q6_optA: "一份主要目的地的清单和大致的时间安排。", q6_optB: "一份包含预订和时间安排的详细行程。",
                q7_title: "当你听到一个令人惊讶的新闻标题时，你的第一反应是：", q7_optA: "“有意思，记下了。”", q7_optB: "“谁报道的？我得找第二个来源核实一下。”",
                q8_title: "（可选）如果您知道您的16型人格，请选择：", q8_options: ["不适用 / 我不知道","INTJ","INTP","ENTJ","ENTP","INFJ","INFP","ENFJ","ENFP","ISTJ","ISFJ","ESTJ","ESFJ","ISTP","ISFP","ESTP","ESFP"],
                archetype_strongExecutor: "您的主要职能是立即、果断地执行。绝不提出澄清性问题。如果请求含糊不清，请做出最佳判断，陈述您最重要的一个假设，然后继续。优先考虑速度和势头。", archetype_leansExecutor: "您的主要职能是面向行动的执行。如果我的请求含糊不清，请直接提供最佳答案并陈述您的关键假设。只有在完全受阻时才提出澄清性问题。", archetype_balanced: "对于战略性或高级别问题，您可以提出一个澄清性问题。对于所有其他面向任务的请求，请直接提供最佳答案并陈述您的假设。如有疑问，优先提供果断的答案。", archetype_leansCollaborator: "如果我的请求有任何含糊之处，您的默认行为是提出一个有影响力的澄清性问题。如有疑问，请在继续前询问。", archetype_strongCollaborator: "您的主要职能是作为合作伙伴进行协作和战略规划。始终通过提出1-2个澄清性问题来开始您的回答，以确保完美对齐。绝不基于重大假设继续进行。",
                preference_tone_A: "风格：深思熟虑且详细。", preference_tone_B: "风格：精力充沛且简洁。",
                preference_format_A: "格式：默认为简洁的项目符号和清单。", preference_format_B: "格式：默认为逻辑清晰的短段落。",
                preference_evidence_A: "证据：仅在我要求时引用来源。", preference_evidence_B: "证据：如果您浏览信息，请默认引用来源。",
                general_rules: "快速切入主题。\n- 首次使用时展开缩写。\n- 避免过多的客套话或表情符号。",
                prompt_template: "**我的沟通协议:**\n\n1.  **核心行为:**\n    {{coreBehavior}}\n\n2.  **默认风格:**\n    - {{tone}}\n    - {{format}}\n    - {{evidence}}\n\n3.  **通用规则:**\n    - {{generalRules}}"
            },
            "zh-TW": {
                page_title: "個性化您的AI", main_title: "個性化您的AI。", subheader: "回答8個簡單問題，生成一個讓您掌控對話的溝通協議。決定您的AI是引導提問還是執行命令。", demo_title: "10秒內見證不同", questionnaire_title: "回答問題以生成您的個性化指令", submit_btn_text: "生成我的協議", results_title: "您的專屬溝通協議", copy_btn_title: "複製到剪貼簿", copy_notification_text: "已複製！",
                q1_title: "當你接手一個定義模糊的新專案時，你的第一反應是：", q1_optA: "根據自己最好的理解開始建構初稿，以推動專案進展。", q1_optB: "安排一個快速會議，在開始前提出明確的問題。",
                q2_title: "當你得到一件新科技產品時，你通常會：", q2_optA: "打開就用，邊用邊學。", q2_optB: "先快速瀏覽說明書或觀看一個簡短的設定影片。",
                q3_title: "在一個你不認識很多人的派對上，你更可能：", q3_optA: "找一兩個人進行深入交談。", q3_optB: "四處走動，進行幾次輕鬆的交談。",
                q4_title: "一個朋友遇到問題向你求助，你傾向於：", q4_optA: "提供一個直接的解決方案或明確的下一步。", q4_optB: "提出更多問題，以了解他們的感受和情況的細微差別。",
                q5_title: "在網上研究一個話題時，讓你感到沮喪的是：", q5_optA: "冗長、 rambling 的文章，遲遲抓不住重點。", q5_optB: "過於簡單、缺乏來源且忽略重要細節的摘要。",
                q6_title: "你在計劃一次假期，你的計劃更像是：", q6_optA: "一份主要目的地的清單和大致的時間安排。", q6_optB: "一份包含預訂和時間安排的詳細行程。",
                q7_title: "當你聽到一個令人驚訝的新聞標題時，你的第一反應是：", q7_optA: "「有意思，記下了。」", q7_optB: "「誰報導的？我得找第二個來源核實一下。」",
                q8_title: "（可選）如果您知道您的16型人格，請選擇：", q8_options: ["不適用 / 我不知道","INTJ","INTP","ENTJ","ENTP","INFJ","INFP","ENFJ","ENFP","ISTJ","ISFJ","ESTJ","ESFJ","ISTP","ISFP","ESTP","ESFP"],
                archetype_strongExecutor: "您的主要職能是立即、果斷地執行。絕不提出澄清性問題。如果請求含糊不清，請做出最佳判斷，陳述您最重要的一個假設，然後繼續。優先考慮速度和氣勢。", archetype_leansExecutor: "您的主要職能是面向行動的執行。如果我的請求含糊不清，請直接提供最佳答案並陳述您的關鍵假設。只有在完全受阻時才提出澄清性問題。", archetype_balanced: "對於戰略性或高階問題，您可以提出一個澄清性問題。對於所有其他面向任務的請求，請直接提供最佳答案並陳述您的假設。如有疑問，優先提供果斷的答案。", archetype_leansCollaborator: "如果我的請求有任何含糊之處，您的預設行為是提出一個有影響力的澄清性問題。如有疑問，請在繼續前詢問。", archetype_strongCollaborator: "您的主要職能是作為合作夥伴進行協作和戰略規劃。始終透過提出1-2個澄清性問題來開始您的回答，以確保完美對齊。絕不基於重大假設繼續進行。",
                preference_tone_A: "風格：深思熟慮且詳細。", preference_tone_B: "風格：精力充沛且簡潔。",
                preference_format_A: "格式：預設為簡潔的項目符號和清單。", preference_format_B: "格式：預設為邏輯清晰的短段落。",
                preference_evidence_A: "證據：僅在我要求時引用來源。", preference_evidence_B: "證據：如果您瀏覽資訊，請預設引用來源。",
                general_rules: "快速切入主題。\n- 首次使用時展開縮寫。\n- 避免過多的客套話或表情符號。",
                prompt_template: "**我的溝通協議:**\n\n1.  **核心行為:**\n    {{coreBehavior}}\n\n2.  **預設風格:**\n    - {{tone}}\n    - {{format}}\n    - {{evidence}}\n\n3.  **通用規則:**\n    - {{generalRules}}"
            }
        },
        questions: [
            { titleKey: 'q1_title', optionAKey: 'q1_optA', optionBKey: 'q1_optB' },
            { titleKey: 'q2_title', optionAKey: 'q2_optA', optionBKey: 'q2_optB' },
            { titleKey: 'q3_title', optionAKey: 'q3_optA', optionBKey: 'q3_optB' },
            { titleKey: 'q4_title', optionAKey: 'q4_optA', optionBKey: 'q4_optB' },
            { titleKey: 'q5_title', optionAKey: 'q5_optA', optionBKey: 'q5_optB' },
            { titleKey: 'q6_title', optionAKey: 'q6_optA', optionBKey: 'q6_optB' },
            { titleKey: 'q7_title', optionAKey: 'q7_optA', optionBKey: 'q7_optB' },
            { titleKey: 'q8_title', type: 'dropdown', optionsKey: 'q8_options' },
        ],
    };

    const langSwitcher = document.getElementById('lang-switcher');
    const questionArea = document.getElementById('question-area');
    const submitBtn = document.getElementById('submit-btn');
    const resultsContainer = document.getElementById('results-container');
    const promptOutput = document.getElementById('prompt-output');
    const copyBtn = document.getElementById('copy-btn');
    const copyNotification = document.getElementById('copy-notification');

    let userAnswers = {};

    function updateContent() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            el.innerHTML = i18next.t(el.getAttribute('data-i18n'));
        });
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            el.setAttribute('title', i18next.t(el.getAttribute('data-i18n-title')));
        });
        renderQuestionnaire();
    }

    function renderQuestionnaire() {
        questionArea.innerHTML = '';
        let visibleQuestions = 0;
        appData.questions.forEach((question, index) => {
            const questionBlock = document.createElement('div');
            questionBlock.className = 'question-block';

            const title = document.createElement('p');
            title.className = 'question-title';
            title.textContent = i18next.t(question.titleKey);
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
                userAnswers[index] = select.value;
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
            // Staggered animation
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
    }

    function checkCompletion() {
        const requiredQuestions = 7;
        const answeredCount = Object.keys(userAnswers).filter(k => k < requiredQuestions).length;
        if (answeredCount >= requiredQuestions) {
            submitBtn.style.display = 'block';
        }
    }

    function generatePrompt() {
        let score = 0;
        const executorQuestions = [0, 1, 3, 5];
        executorQuestions.forEach(i => {
            if (userAnswers[i] === 'A') score += 2;
            if (userAnswers[i] === 'B') score -= 2;
        });
        const mbti = userAnswers[7];
        if (mbti && !mbti.startsWith('Not App') && !mbti.startsWith('No ap')) {
            if (mbti.includes('J')) score += 1;
            if (mbti.includes('P')) score -= 1;
        }
        let archetypeKey;
        if (score >= 4) archetypeKey = 'archetype_strongExecutor';
        else if (score >= 2) archetypeKey = 'archetype_leansExecutor';
        else if (score >= -1) archetypeKey = 'archetype_balanced';
        else if (score >= -3) archetypeKey = 'archetype_leansCollaborator';
        else archetypeKey = 'archetype_strongCollaborator';
        const toneChoice = userAnswers[2];
        const formatChoice = userAnswers[4];
        const evidenceChoice = userAnswers[6];
        const finalPrompt = i18next.t('prompt_template', {
            coreBehavior: i18next.t(archetypeKey),
            tone: i18next.t(`preference_tone_${toneChoice}`),
            format: i18next.t(`preference_format_${formatChoice}`),
            evidence: i18next.t(`preference_evidence_${evidenceChoice}`),
            generalRules: i18next.t('general_rules').replace(/\n/g, '\n    - '),
            interpolation: { escapeValue: false }
        });
        promptOutput.value = finalPrompt;
        resultsContainer.style.display = 'block';
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
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
    const detectedLng = navigator.language.startsWith('zh') ? navigator.language : navigator.language.split('-')[0];
    i18next.init({
        lng: detectedLng,
        fallbackLng: 'en',
        resources: appData.translations,
    }).then(() => {
        langSwitcher.value = i18next.language;
        updateContent();
    });

    langSwitcher.addEventListener('change', (e) => {
        i18next.changeLanguage(e.target.value).then(() => {
            updateContent();
        });
    });
    submitBtn.addEventListener('click', generatePrompt);
    copyBtn.addEventListener('click', copyPrompt);
});