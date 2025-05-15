// script.js (أو game_logic.js) - النسخة النهائية

// --- 1. بيانات التحديات ---
const gameChallenges = [
    // --- القسم الأول: تقنيات التلقين الأساسية وتحديد السياق ---
    {
        level: 1, levelName: "أساسيات السياق", id: "challenge_role_prompting_1", title: "خبير التاريخ",
        description: "اطلب من النموذج أن يتصرف كـ'مؤرخ متخصص في تاريخ مصر القديمة وخبير في تبسيط المعلومات لطلاب المرحلة الإعدادية'، وأن يشرح نظام الحكم والإدارة في الدولة المصرية القديمة خلال عصر الدولة الوسطى.",
        technique: "التلقين بالنماذج (Role Prompting)",
        keywordsForEvaluation: ["تصرف كـ", "مؤرخ متخصص", "تاريخ مصر القديمة", "تبسيط المعلومات", "نظام الحكم والإدارة", "الدولة الوسطى"], points: 20,
        hint: "حدد بوضوح دور الخبير والجمهور المستهدف والمهمة المطلوبة.",
        badgeAwarded: { id: "roleExpertBadge", name: "خبير الأدوار", icon: "fas fa-user-tie" }
    },
    {
        level: 1, levelName: "أساسيات السياق", id: "challenge_persona_prompting_1", title: "طالب حالم",
        description: "اطلب من النموذج أن يتقمص شخصية 'طالب في الصف الثاني الإعدادي يشعر بالحنين إلى أيام الطفولة وبراءتها'، وأن يكتب فقرة يعبر فيها عن مشاعره تجاه هذه الفترة ويصف أهم ذكرياته.",
        technique: "التلقين الافتراضي (Persona-based)",
        keywordsForEvaluation: ["أنت طالب", "الصف الثاني الإعدادي", "حنين", "طفولة", "مشاعرك", "ذكريات"], points: 20,
        hint: "صف الشخصية ومشاعرها والمطلوب منها بوضوح.",
        badgeAwarded: { id: "personaCreatorBadge", name: "مبدع الشخصيات", icon: "fas fa-theater-masks" }
    },
    // --- القسم الثاني: تقنيات تعزيز الفهم والاستدلال العميق ---
    {
        level: 2, levelName: "تعميق الفهم", id: "challenge_rereading_1", title: "مصمم الأنشطة الدقيق",
        description: "اطلب من النموذج تصميم نشاط تعليمي لطلاب الصف الخامس الابتدائي حول مفهوم 'المساحة والمحيط للمستطيل' يتضمن: تعريفًا مبسطًا، مثالاً محلولاً، تمرينين، ورسمًا توضيحيًا. ثم اطلب منه 'إعادة قراءة هذه المتطلبات' قبل تقديم تصميم النشاط.",
        technique: "إعادة القراءة (RE2)",
        keywordsForEvaluation: ["تصميم نشاط", "المساحة والمحيط", "تعريف مبسط", "مثال محلول", "تمرينين", "رسم توضيحي", "أعد قراءة"], points: 25,
        hint: "اذكر جميع المتطلبات بوضوح ثم استخدم عبارة 'أعد قراءة هذه المتطلبات'.",
        badgeAwarded: { id: "reReaderBadge", name: "القارئ المتمعن", icon: "fas fa-book-open-reader" }
    },
    {
        level: 2, levelName: "تعميق الفهم", id: "challenge_rar_1", title: "الموضح الخبير",
        description: "لديك طلب غامض: 'اكتب عن تأثير التغير المناخي على الزراعة في مصر لطلاب الإعدادي'. اطلب من النموذج أن 'يعيد صياغة ويوسع هذا الطلب'، موضحًا الجوانب التي يجب التركيز عليها ومستوى التفصيل المناسب لأعمارهم، ثم أن يكتب فقرتين بناءً على إعادة الصياغة.",
        technique: "إعادة الصياغة والاستجابة (RaR)",
        keywordsForEvaluation: ["أعد صياغة وتوسيع", "تأثير التغير المناخي", "الزراعة في مصر", "الجوانب التي يجب التركيز", "مستوى التفصيل"], points: 25,
        hint: "اطلب من النموذج توضيح فهمه للمهمة قبل البدء في تنفيذها.",
        badgeAwarded: { id: "rephraserBadge", name: "المعيد المتمكن", icon: "fas fa-retweet" }
    },
    {
        level: 2, levelName: "تعميق الفهم", id: "challenge_s2a_1", title: "الملخص المركز",
        description: "قدم للنموذج النص التالي (مع معلومات مشتتة): 'لخص النقاش التالي الذي دار بين الطلاب حول أسباب ثورة 1919 في مصر. بدأ النقاش بتعليق من أحمد حول دور سعد زغلول، ثم تحدثت سارة عن الأوضاع الاقتصادية، لكن قاطعها كريم ليتحدث عن فيلم وثائقي شاهده مؤخرًا عن تلك الفترة وكيف كان التصوير رائعًا.' ثم اطلب منه 'استخراج فقط الأجزاء التي تناقش الأسباب المباشرة لثورة 1919 وتجاهل التعليقات الجانبية، ثم تلخيص هذه الأجزاء'.",
        technique: "انتباه النظام 2 (S2A)",
        keywordsForEvaluation: ["استخرج فقط الأجزاء", "الأسباب المباشرة", "ثورة 1919", "تجاهل التعليقات الجانبية", "تلخيص"], points: 25,
        hint: "اطلب من النموذج تنقيح المدخلات والتركيز على المعلومات الجوهرية.",
        badgeAwarded: { id: "s2aFilterBadge", name: "مرشح S2A", icon: "fas fa-filter-circle-dollar" }
    },
    {
        level: 3, levelName: "الاستدلال المتقدم", id: "challenge_simtom_1", title: "محلل الشخصيات",
        description: "قدم السياق التالي: 'كان الأرنب السريع يسخر دائمًا من السلحفاة البطيئة. نام الأرنب في منتصف الطريق ظنًا منه أن السلحفاة لن تسبقه.' اطلب من النموذج: 'أنت الأرنب في القصة. ما هي أفكارك ومعتقداتك في هذه اللحظة؟' ثم اطلب منه: 'بناءً على ما تعرفه وتعتقده (كأرنب)، هل تتوقع أن تفوز السلحفاة بالسباق؟ ولماذا؟'",
        technique: "محاكاة نظرية العقل (SimToM)",
        keywordsForEvaluation: ["أنت الأرنب", "أفكارك ومعتقداتك", "بناءً على ما تعرفه وتعتقده", "هل تتوقع"], points: 30,
        hint: "اجعل النموذج يفكر من منظور شخصية أخرى بمعرفتها المحدودة.",
        badgeAwarded: { id: "simTomBadge", name: "محاكي العقول", icon: "fas fa-users-viewfinder" }
    },
    {
        level: 3, levelName: "الاستدلال المتقدم", id: "challenge_reflection_1", title: "الناقد البناء",
        description: "اطلب من النموذج أولاً 'شرح مفهوم الجاذبية الأرضية لطلاب الصف السادس'. بعد أن يقدم إجابته (افترض أنه قدمها)، اطلب منه: 'راجع الشرح الذي قدمته. هل استخدمت أمثلة كافية؟ هل اللغة بسيطة؟ هل هناك مصطلحات تحتاج تبسيط؟ قدم نسخة منقحة'.",
        technique: "التلقين الانعكاسي",
        keywordsForEvaluation: ["راجع الشرح", "أمثلة كافية", "لغة بسيطة", "تبسيط المصطلحات", "نسخة منقحة"], points: 30,
        hint: "اطلب من النموذج تقييم وتحسين مخرجاته الأولية بناءً على معايير.",
        badgeAwarded: { id: "reflectionPro", name: "المراجع الخبير", icon: "fas fa-rotate-left" }
    },
    {
        level: 3, levelName: "الاستدلال المتقدم", id: "challenge_maieutic_1", title: "المحاور السقراطي",
        description: "اطلب من النموذج شرح ظاهرة 'قوس قزح' لطلاب المرحلة الابتدائية، وذلك من خلال الإجابة على سلسلة من الأسئلة التوجيهية التي تقدمها له خطوة بخطوة، مثل: 1. متى نرى قوس قزح؟ 2. ما مصدر الضوء؟ 3. مم يتكون ضوء الشمس؟ ...إلخ، حتى يصل إلى شرح كامل.",
        technique: "التلقين المايوتيكي",
        keywordsForEvaluation: ["سلسلة من الأسئلة", "خطوة بخطوة", "فرضية:", "تفسير:", "بناءً على هذه الخطوات"], points: 30,
        hint: "قدّم أسئلة متسلسلة تبني الفهم تدريجيًا.",
        badgeAwarded: { id: "maieuticMaster", name: "المحاور السقراطي", icon: "fas fa-sitemap" }
    },
    // --- القسم الثالث: تقنيات التلقين التفاعلية والتكيفية ---
    {
        level: 4, levelName: "التفاعل والتكيف", id: "challenge_active_prompting_1", title: "مكتشف الصعوبات",
        description: "تخيل أنك تريد تحديد المفاهيم الصعبة في وحدة 'الكسور' لطلاب الصف الرابع. صغ تلقينًا يطلب من النموذج (افتراضيًا) تحليل مجموعة من إجاباته السابقة على أسئلة الكسور، وتحديد الأسئلة الثلاثة التي أظهر فيها أكبر قدر من 'عدم اليقين' أو التناقض، ثم يقترح كيف يمكن للمطور شرح هذه المفاهيم الصعبة.",
        technique: "التلقين النشط",
        keywordsForEvaluation: ["تحليل إجابات سابقة", "عدم اليقين", "تناقض", "المفاهيم الصعبة", "شرح هذه المفاهيم"], points: 35,
        hint: "ركز على فكرة استخدام 'عدم يقين' النموذج لتوجيه جهود التحسين.",
        badgeAwarded: { id: "activeLearnerBadge", name: "المتعلم النشط", icon: "fas fa-bolt" }
    },
    {
        level: 4, levelName: "التفاعل والتكيف", id: "challenge_clarification_prompting_1", title: "طالب التوضيح",
        description: "لديك طلب عام للنموذج: 'أريد أفكارًا لمشاريع بحثية عن البيئة لطلاب الإعدادي'. صغ تلقينًا يوجه النموذج (إذا كان مدربًا على ذلك) ليطرح أسئلة توضيحية قبل تقديم الأفكار، مثل سؤاله عن الموضوعات البيئية المحددة، نوع المشاريع المفضلة، أو المدة الزمنية.",
        technique: "التلقين بالتوضيح",
        keywordsForEvaluation: ["هل يمكنك توضيح:", "موضوعات بيئية محددة", "نوع المشاريع", "مدة زمنية"], points: 25,
        hint: "صغ طلبًا أوليًا غامضًا، ثم اطلب من النموذج أن يستوضح قبل الإجابة.",
        badgeAwarded: { id: "clarifierBadge", name: "المستوضح البارع", icon: "fas fa-question" }
    },
    // --- القسم الرابع: تقنيات التلقين المتقدمة والمنهجية ---
    {
        level: 5, levelName: "المنهجيات المتقدمة", id: "challenge_progressive_prompting_1", title: "البناء التدريجي",
        description: "اطلب من النموذج إنشاء شرح مبسط لـ 'الجهاز الهضمي' للصف الخامس. ابدأ بتلقين يطلب المقدمة والأعضاء الرئيسية. ثم، في تلقين ثانٍ (افتراضي)، اطلب منه التركيز على وظيفة الفم والمريء بناءً على الشرح السابق.",
        technique: "التلقين التدريجي",
        keywordsForEvaluation: ["اشرح بأسلوب مبسط", "الأعضاء الرئيسية", "بناءً على الشرح السابق", "ركز الآن على"], points: 30,
        hint: "قسم المهمة إلى خطوات، واجعل كل خطوة لاحقة تبني على سابقتها.",
        badgeAwarded: { id: "progressiveBuilder", name: "البنّاء التدريجي", icon: "fas fa-stairs" }
    },
    {
        level: 5, levelName: "المنهجيات المتقدمة", id: "challenge_contrastive_prompting_1", title: "المقارن الخبير",
        description: "اطلب من النموذج شرح الفرق بين 'التاء المربوطة والتاء المفتوحة'. اطلب منه تقديم مثال صحيح لكل منهما، ثم مثال خاطئ شائع قد يقع فيه الطلاب، مع توضيح سبب صحة الصحيح وخطأ الخاطئ.",
        technique: "التلقين التبايني",
        keywordsForEvaluation: ["اشرح الفرق", "مثالاً صحيحًا", "مثالاً خاطئًا شائعًا", "وضح لماذا", "التمييز بينهما"], points: 30,
        hint: "اطلب أمثلة إيجابية وسلبية مع شرح التباين بينها.",
        badgeAwarded: { id: "contrastiveThinker", name: "المفكر التبايني", icon: "fas fa-code-compare" }
    },
    {
        level: 5, levelName: "المنهجيات المتقدمة", id: "challenge_emotion_prompting_1", title: "الكاتب الملهم",
        description: "اطلب من النموذج كتابة مقدمة لوحدة تعليمية عن 'وطننا الغالي مصر' لطلاب المرحلة الإعدادية. استخدم عبارات مثل 'يا مبدع الكلمات'، 'يجب أن تشعل في قلوبهم نيران الانتماء'، 'أظهر لنا براعتك' لتحفيزه عاطفياً.",
        technique: "التلقين العاطفي",
        keywordsForEvaluation: ["يا مبدع الكلمات", "تفيض حباً وشوقاً", "تشعل في قلوبهم", "براعتك", "أسر القلوب"], points: 25,
        hint: "استخدم لغة مشحونة بالعاطفة لتحفيز النموذج.",
        badgeAwarded: { id: "emotionEvoker", name: "مثير المشاعر", icon: "fas fa-face-grin-hearts" }
    },
    // --- القسم الخامس: تقنيات التلقين المعتمدة على البيانات والأدوات ---
    {
        level: 6, levelName: "أدوات وبيانات", id: "challenge_rag_1", title: "الباحث المطلع",
        description: "اطلب من النموذج إعداد موجز لطلاب الثانوية العامة حول 'أهم ثلاثة مشروعات قومية جديدة في مصر تم إطلاقها خلال الـ 12 شهرًا الماضية'. اذكر في تلقينك أنه يجب عليه (افتراضيًا) 'استخدام قاعدة البيانات المتاحة التي تحتوي على أحدث البيانات الصحفية والتقارير الحكومية'.",
        technique: "التوليد المعزز بالاسترجاع (RAG)",
        keywordsForEvaluation: ["أحدث المشروعات", "خلال الـ 12 شهرًا الماضية", "استخدم قاعدة البيانات المتاحة", "بيانات صحفية", "تقارير حكومية"], points: 35,
        hint: "اطلب معلومات حديثة جدًا واذكر (افتراضيًا) ضرورة استخدام مصدر بيانات خارجي.",
        badgeAwarded: { id: "ragResearcher", name: "باحث RAG", icon: "fas fa-cloud-download-alt" }
    },
    {
        level: 6, levelName: "أدوات وبيانات", id: "challenge_art_ape_1", title: "مهندس التلقين الآلي",
        description: "اطلب من نموذج (لنفترض أنه APE) أن 'يولد 4 تلقينات مختلفة يمكن تقديمها لنموذج لغوي آخر بهدف إنشاء أسئلة مناقشة عميقة ومبتكرة حول الجوانب الإيجابية والسلبية لسياسات محمد علي باشا'.",
        technique: "التلقين التلقائي باستخدام الأدوات (APE)",
        keywordsForEvaluation: ["قم بتوليد 4 تلقينات مختلفة", "نموذج لغوي آخر", "أسئلة مناقشة عميقة", "تحليل نقدي"], points: 30,
        hint: "اطلب من النموذج إنشاء تلقينات بدلاً من إنشاء المحتوى مباشرة.",
        badgeAwarded: { id: "autoPrompter", name: "مهندس التلقين الآلي", icon: "fas fa-tools" }
    },
    {
        level: 6, levelName: "أدوات وبيانات", id: "challenge_soft_prompting_1", title: "المخصص الدقيق",
        description: "تخيل أن لديك 'تلقين ناعم' تم تدريبه مسبقًا اسمه 'تلقين_شرح_رياض_أطفال'. صغ تلقينًا (للنظام/المطور) يطلب من النموذج 'باستخدام تلقين_شرح_رياض_أطفال، اشرح مفهوم دورة الماء في الطبيعة' بأسلوب قصصي ومبسط جدًا يناسب أطفال مرحلة رياض الأطفال.",
        technique: "التلقين الناعم (Soft Prompting)",
        keywordsForEvaluation: ["باستخدام 'تلقين_شرح_رياض_أطفال'", "اشرح مفهوم", "دورة الماء في الطبيعة", "أسلوب قصصي ومبسط"], points: 25,
        hint: "صغ الطلب كما لو كنت تستدعي تخصصًا دقيقًا للنموذج عبر تلقين ناعم محدد مسبقًا.",
        badgeAwarded: { id: "softTuner", name: "موالف التلقين الناعم", icon: "fas fa-wave-square" }
    }
];

// --- 2. منطق اللعبة والتحكم في الواجهة ---
document.addEventListener('DOMContentLoaded', () => {
    // --- عناصر DOM ---
    const loginPage = document.getElementById('loginPage');
    const gamePage = document.getElementById('gamePage');
    const gameSidebar = document.getElementById('gameSidebar');
    const leaderboardPage = document.getElementById('leaderboardPage');
    
    const startGameBtn = document.getElementById('startGameBtn');
    const usernameInput = document.getElementById('username');
    const howToPlayBtn = document.getElementById('howToPlayBtn');
    const leaderboardLinkBtn = document.getElementById('leaderboardLinkBtn');
    const howToPlayModal = document.getElementById('howToPlayModal');
    const closeHowToPlayModal = document.getElementById('closeHowToPlayModal');
    const backToMainFromLeaderboard = document.getElementById('backToMainFromLeaderboard');

    const playerNameDisplay = document.getElementById('playerNameDisplay')?.querySelector('.value');
    const playerScoreDisplay = document.getElementById('playerScoreDisplay')?.querySelector('.value');
    const currentLevelDisplayEl = document.getElementById('currentLevelDisplay');
    const levelNameDisplayEl = document.getElementById('levelNameDisplay');
    const exitGameBtn = document.getElementById('exitGameBtn');

    const challengeDisplayArea = document.getElementById('challengeDisplay');
    const mentorTextEl = document.getElementById('mentorText');
    const mentorSpeechBubble = document.querySelector('.mentor-speech');
    const challengeTitleEl = document.getElementById('challengeTitle');
    const challengeDescriptionEl = document.getElementById('challengeDescription');
    const promptInputEl = document.getElementById('promptInput');
    const submitPromptBtn = document.getElementById('submitPromptBtn');
    const hintBtn = document.getElementById('hintBtn');
    const hintsRemainingEl = document.getElementById('hintsRemaining');
    const feedbackAreaEl = document.getElementById('feedbackArea');
    const feedbackTextEl = document.getElementById('feedbackText');
    const pointsAwardedEl = document.getElementById('pointsAwarded');

    const badgesEarnedEl = document.getElementById('badgesEarned');
    const currentTechniqueDisplayEl = document.getElementById('currentTechniqueDisplay');

    const nextChallengeBtn = document.getElementById('nextChallengeBtn');
    const prevChallengeBtn = document.getElementById('prevChallengeBtn');
    const progressBar = document.querySelector('.side-controls .progress-bar');

    // --- حالة اللاعب ---
    let currentPlayer = {
        name: localStorage.getItem('promptMasterUsername') || "زائر",
        score: parseInt(localStorage.getItem('promptMasterUserScore')) || 0,
        badges: JSON.parse(localStorage.getItem('promptMasterUserBadges')) || [],
        hints: 3,
        currentChallengeIndex: parseInt(localStorage.getItem('promptMasterChallengeIndex')) || 0
    };

    // --- دوال اللعبة ---
    function saveGameState() {
        localStorage.setItem('promptMasterUsername', currentPlayer.name);
        localStorage.setItem('promptMasterUserScore', currentPlayer.score);
        localStorage.setItem('promptMasterUserBadges', JSON.stringify(currentPlayer.badges));
        localStorage.setItem('promptMasterChallengeIndex', currentPlayer.currentChallengeIndex);
        localStorage.setItem('promptMasterUserHints', currentPlayer.hints);
    }

    function updatePlayerStatsDisplay() {
        if (playerNameDisplay) playerNameDisplay.textContent = currentPlayer.name;
        if (playerScoreDisplay) playerScoreDisplay.textContent = currentPlayer.score;
        if (hintsRemainingEl) hintsRemainingEl.textContent = currentPlayer.hints;
        updateBadgesDisplay();
        saveGameState();
    }

    function updateBadgesDisplay() {
        if (!badgesEarnedEl) return;
        badgesEarnedEl.innerHTML = "";
        const uniqueBadges = currentPlayer.badges.filter((badge, index, self) =>
            badge && badge.id && index === self.findIndex((b) => b && b.id === badge.id)
        );

        uniqueBadges.forEach(badge => {
            const badgeEl = document.createElement('div');
            badgeEl.className = 'badge';
            badgeEl.title = badge.name;
            badgeEl.innerHTML = `<i class="${badge.icon || 'fas fa-medal'}"></i>`;
            badgesEarnedEl.appendChild(badgeEl);
        });
    }

    function showMentorMessage(message, duration = 4000) {
        if (mentorTextEl && mentorSpeechBubble) {
            mentorTextEl.textContent = message;
            mentorSpeechBubble.classList.remove('hidden');
            mentorSpeechBubble.style.display = 'block';
            setTimeout(() => {
                mentorSpeechBubble.classList.add('hidden');
                mentorSpeechBubble.style.display = 'none';
            }, duration);
        }
    }
    
    function updateProgressBar() {
        if (progressBar && gameChallenges.length > 0) {
            const progressPercentage = ((currentPlayer.currentChallengeIndex + 1) / gameChallenges.length) * 100;
            progressBar.style.width = `${progressPercentage}%`;
        }
    }

    function loadChallenge(challengeIndex) {
        if (challengeIndex >= gameChallenges.length) {
            challengeTitleEl.innerHTML = `<i class="fas fa-trophy"></i> أحسنت! لقد أكملت كل التحديات!`;
            challengeDescriptionEl.innerHTML = `مجموع نقاطك النهائية: <strong>${currentPlayer.score}</strong>.`;
            promptInputEl.style.display = 'none';
            submitPromptBtn.style.display = 'none';
            hintBtn.style.display = 'none';
            document.querySelector('.prompt-input-area label').style.display = 'none';

            nextChallengeBtn.disabled = true; 
            prevChallengeBtn.disabled = challengeIndex === 0; // قد يكون آخر تحدي هو الأول
            showMentorMessage("لقد وصلت إلى نهاية الرحلة يا بطل التلقين! تفقد لوحة الصدارة لترى ترتيبك.", 8000);
            if (currentTechniqueDisplayEl) currentTechniqueDisplayEl.textContent = "لا يوجد";
            updateProgressBar(); // يجب أن يكون 100% هنا
            return;
        }
        if (challengeIndex < 0) {
            currentPlayer.currentChallengeIndex = 0;
            loadChallenge(0);
            return;
        }

        const challenge = gameChallenges[challengeIndex];
        currentPlayer.currentChallengeIndex = challengeIndex;

        if (currentLevelDisplayEl) currentLevelDisplayEl.textContent = challenge.level;
        if (levelNameDisplayEl) levelNameDisplayEl.textContent = challenge.levelName;
        if (challengeTitleEl) challengeTitleEl.innerHTML = `<i class="fas fa-tasks"></i> ${challenge.title}`;
        if (challengeDescriptionEl) challengeDescriptionEl.innerHTML = challenge.description;
        if (currentTechniqueDisplayEl) {
             currentTechniqueDisplayEl.textContent = challenge.technique;
             currentTechniqueDisplayEl.classList.add('active-technique');
        }

        promptInputEl.value = "";
        promptInputEl.disabled = false;
        promptInputEl.style.display = 'block';
        submitPromptBtn.disabled = false;
        submitPromptBtn.style.display = 'inline-flex';
        hintBtn.disabled = currentPlayer.hints <= 0;
        hintBtn.style.display = 'inline-flex';
         document.querySelector('.prompt-input-area label').style.display = 'block';


        feedbackAreaEl.classList.add('hidden');
        feedbackAreaEl.className = 'feedback hidden';
        pointsAwardedEl.textContent = "";

        if (prevChallengeBtn) prevChallengeBtn.disabled = challengeIndex === 0;
        if (nextChallengeBtn) nextChallengeBtn.disabled = challengeIndex >= gameChallenges.length - 1 && challengeIndex !== gameChallenges.length; // تعطيل فقط إذا كان الأخير وليس النهاية
        
        updateProgressBar();
        saveGameState();
    }

    function evaluatePrompt() {
        const userInput = promptInputEl.value.trim();
        if (!userInput) {
            showMentorMessage("لا تنسَ كتابة تلقينك أولاً!");
            return;
        }

        const challenge = gameChallenges[currentPlayer.currentChallengeIndex];
        let scoreForPrompt = 0;
        let feedback = "";
        
        let keywordsFound = 0;
        if (challenge.keywordsForEvaluation && challenge.keywordsForEvaluation.length > 0) {
            challenge.keywordsForEvaluation.forEach(keyword => {
                if (userInput.toLowerCase().includes(keyword.toLowerCase())) {
                    keywordsFound++;
                }
            });
        } else {
            keywordsFound = 1; 
        }

        const techniqueMentionedName = challenge.technique.split('(')[0].trim().toLowerCase();
        const userMentionedTechnique = userInput.toLowerCase().includes(techniqueMentionedName);

        if (keywordsFound >= Math.min(2, challenge.keywordsForEvaluation?.length || 1) || userMentionedTechnique) {
            scoreForPrompt = challenge.points;
            feedback = "تلقين ممتاز! يبدو أنك تطبق التقنية بشكل صحيح.";
            feedbackAreaEl.className = 'feedback show success';

            if (challenge.badgeAwarded && !currentPlayer.badges.find(b => b && b.id === challenge.badgeAwarded.id)) {
                currentPlayer.badges.push(challenge.badgeAwarded);
                feedback += ` <i class="fas fa-medal"></i> لقد حصلت على شارة: ${challenge.badgeAwarded.name}!`;
                updateBadgesDisplay();
            }
             submitPromptBtn.disabled = true;
        } else if (keywordsFound > 0) {
            scoreForPrompt = Math.floor(challenge.points / 3);
            feedback = "محاولة جيدة، لكن حاول التركيز أكثر على متطلبات التحدي وتطبيق التقنية المحددة بشكل أوضح.";
            feedbackAreaEl.className = 'feedback show warning';
        } else {
            scoreForPrompt = 0;
            feedback = "هممم، هذا التلقين لا يبدو أنه يلبي المطلوب. راجع وصف التحدي والتلميح إذا احتجت.";
            feedbackAreaEl.className = 'feedback show error';
        }

        currentPlayer.score += scoreForPrompt;
        updatePlayerStatsDisplay();
        feedbackTextEl.innerHTML = feedback;
        pointsAwardedEl.textContent = scoreForPrompt !== 0 ? `${scoreForPrompt > 0 ? '+' : ''}${scoreForPrompt} نقطة!` : "لا نقاط هذه المرة.";
        feedbackAreaEl.classList.remove('hidden');
    }

    function showHint() {
        if (currentPlayer.currentChallengeIndex >= gameChallenges.length) return;
        if (currentPlayer.hints > 0) {
            const challenge = gameChallenges[currentPlayer.currentChallengeIndex];
            showMentorMessage(`تلميح: ${challenge.hint}`, 7000);
            currentPlayer.hints--;
            updatePlayerStatsDisplay();
            if (currentPlayer.hints <= 0) {
                hintBtn.disabled = true;
            }
        } else {
            showMentorMessage("لقد استنفدت كل تلميحاتك!");
        }
    }

    function initializeGamePage() {
        currentPlayer.name = localStorage.getItem('promptMasterUsername') || "زائر";
        currentPlayer.score = parseInt(localStorage.getItem('promptMasterUserScore')) || 0;
        currentPlayer.badges = JSON.parse(localStorage.getItem('promptMasterUserBadges')) || [];
        currentPlayer.currentChallengeIndex = parseInt(localStorage.getItem('promptMasterChallengeIndex')) || 0;
        currentPlayer.hints = parseInt(localStorage.getItem('promptMasterUserHints')) || 3;

        updatePlayerStatsDisplay();
        loadChallenge(currentPlayer.currentChallengeIndex);

        if(submitPromptBtn) submitPromptBtn.addEventListener('click', evaluatePrompt);
        if(hintBtn) hintBtn.addEventListener('click', showHint);
        
        if(exitGameBtn) {
            exitGameBtn.addEventListener('click', () => {
                saveGameState();
                showLoginPage();
            });
        }

        if(nextChallengeBtn) {
            nextChallengeBtn.addEventListener('click', () => {
                // الانتقال للتحدي التالي حتى لو لم ينجح في الحالي
                // أو يمكنك إضافة شرط هنا لعدم الانتقال إلا بعد النجاح
                if (currentPlayer.currentChallengeIndex < gameChallenges.length) { 
                     loadChallenge(currentPlayer.currentChallengeIndex + 1);
                }
            });
        }
        if(prevChallengeBtn) {
            prevChallengeBtn.addEventListener('click', () => {
                if (currentPlayer.currentChallengeIndex > 0) {
                     loadChallenge(currentPlayer.currentChallengeIndex - 1);
                }
            });
        }
    }

    function showLoginPage() {
        if(loginPage) loginPage.style.display = 'block';
        if(gamePage) gamePage.style.display = 'none';
        if(gameSidebar) gameSidebar.style.display = 'none';
        if (leaderboardPage) leaderboardPage.style.display = 'none';
    }

    function showGamePage() {
        if(loginPage) loginPage.style.display = 'none';
        if(gamePage) gamePage.style.display = 'flex';
        if(gameSidebar) gameSidebar.style.display = 'block';
        if (leaderboardPage) leaderboardPage.style.display = 'none';
        initializeGamePage();
    }

    function showLeaderboardPage() {
        if(loginPage) loginPage.style.display = 'none';
        if(gamePage) gamePage.style.display = 'none';
        if(gameSidebar) gameSidebar.style.display = 'none';
        if (leaderboardPage) leaderboardPage.style.display = 'block';
        populateLeaderboard();
    }

    if (startGameBtn) {
        startGameBtn.addEventListener('click', () => {
            const username = usernameInput.value.trim();
            if (username) {
                currentPlayer.name = username;
                currentPlayer.score = 0;
                currentPlayer.badges = [];
                currentPlayer.currentChallengeIndex = 0;
                currentPlayer.hints = 3;
                saveGameState();
                showGamePage();
            } else {
                alert("الرجاء إدخال اسم المستخدم!");
            }
        });
    }

    if (leaderboardLinkBtn) leaderboardLinkBtn.addEventListener('click', showLeaderboardPage);
    if (backToMainFromLeaderboard) backToMainFromLeaderboard.addEventListener('click', showLoginPage);
    if (howToPlayBtn) howToPlayBtn.addEventListener('click', () => { if (howToPlayModal) howToPlayModal.style.display = 'flex'; });
    if (closeHowToPlayModal) closeHowToPlayModal.addEventListener('click', () => { if (howToPlayModal) howToPlayModal.style.display = 'none'; });
    if (howToPlayModal) {
        window.addEventListener('click', (event) => {
            if (event.target == howToPlayModal) {
                howToPlayModal.style.display = 'none';
            }
        });
    }

    function populateLeaderboard() {
        const leaderboardTableBody = document.getElementById('leaderboardTable')?.querySelector('tbody');
        if (!leaderboardTableBody) return;

        let allPlayersData = JSON.parse(localStorage.getItem('promptMasterAllPlayers')) || [];
        const existingPlayerIndex = allPlayersData.findIndex(p => p.name === currentPlayer.name);

        if (existingPlayerIndex > -1) {
            if (currentPlayer.score >= allPlayersData[existingPlayerIndex].score) {
                allPlayersData[existingPlayerIndex].score = currentPlayer.score;
                allPlayersData[existingPlayerIndex].badgesCount = currentPlayer.badges.length;
            }
        } else if (currentPlayer.name !== "زائر" && currentPlayer.score > 0) {
             allPlayersData.push({ name: currentPlayer.name, score: currentPlayer.score, badgesCount: currentPlayer.badges.length });
        }
        
        localStorage.setItem('promptMasterAllPlayers', JSON.stringify(allPlayersData));

        allPlayersData.sort((a, b) => {
            if (b.score === a.score) return b.badgesCount - a.badgesCount;
            return b.score - a.score;
        });

        leaderboardTableBody.innerHTML = '';
        allPlayersData.slice(0, 10).forEach((player, index) => {
            const row = leaderboardTableBody.insertRow();
            row.insertCell().textContent = index + 1;
            row.insertCell().textContent = player.name;
            row.insertCell().textContent = player.score;
            row.insertCell().textContent = player.badgesCount || 0;
        });
    }
    
    showLoginPage(); // ابدأ دائمًا بصفحة تسجيل الدخول
});
