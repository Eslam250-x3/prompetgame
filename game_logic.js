// game_logic.js

// بيانات اللاعب (يمكن حفظها في localStorage)
let currentPlayer = {
    name: localStorage.getItem('promptMasterUsername') || "زائر",
    score: parseInt(localStorage.getItem('promptMasterUserScore')) || 0,
    badges: JSON.parse(localStorage.getItem('promptMasterUserBadges')) || [],
    hints: 3, // يمكن جعلها تتجدد أو تُشترى
    currentChallengeIndex: parseInt(localStorage.getItem('promptMasterChallengeIndex')) || 0
};

// عناصر DOM الرئيسية من gamePage
const gamePage = document.getElementById('gamePage');
const gameSidebar = document.getElementById('gameSidebar');

const playerNameDisplay = document.getElementById('playerNameDisplay')?.querySelector('.value');
const playerScoreDisplay = document.getElementById('playerScoreDisplay')?.querySelector('.value');
const currentLevelDisplay = document.getElementById('currentLevelDisplay');
const levelNameDisplay = document.getElementById('levelNameDisplay');
const exitGameBtn = document.getElementById('exitGameBtn');

const challengeDisplayArea = document.getElementById('challengeDisplay'); // الحاوية الرئيسية للتحدي
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

// أزرار التنقل بين التحديات (من side-controls)
const nextChallengeBtn = document.getElementById('nextChallengeBtn');
const prevChallengeBtn = document.getElementById('prevChallengeBtn');

// (يفترض أن gameChallenges موجودة هنا أو يتم تحميلها)
// const gameChallenges = [...] // من الرد السابق

function saveGameState() {
    localStorage.setItem('promptMasterUsername', currentPlayer.name);
    localStorage.setItem('promptMasterUserScore', currentPlayer.score);
    localStorage.setItem('promptMasterUserBadges', JSON.stringify(currentPlayer.badges));
    localStorage.setItem('promptMasterChallengeIndex', currentPlayer.currentChallengeIndex);
    // يمكن حفظ عدد التلميحات المتبقية أيضًا
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
    badgesEarnedEl.innerHTML = ""; // مسح الشارات القديمة
    const uniqueBadges = currentPlayer.badges.filter((badge, index, self) =>
        index === self.findIndex((b) => b.id === badge.id)
    ); // ضمان عدم تكرار الشارات

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
        setTimeout(() => {
            mentorSpeechBubble.classList.add('hidden');
        }, duration);
    }
}

function loadChallenge(challengeIndex) {
    if (challengeIndex >= gameChallenges.length) {
        challengeTitleEl.innerHTML = `<i class="fas fa-trophy"></i> أحسنت! لقد أكملت كل التحديات!`;
        challengeDescriptionEl.innerHTML = `مجموع نقاطك النهائية: <strong>${currentPlayer.score}</strong>. يمكنك مراجعة لوحة الصدارة أو بدء اللعبة من جديد (سيتم مسح التقدم الحالي).`;
        promptInputEl.disabled = true;
        submitPromptBtn.disabled = true;
        hintBtn.disabled = true;
        nextChallengeBtn.disabled = true; 
        prevChallengeBtn.disabled = challengeIndex === 0; // قد يكون آخر تحدي هو الأول
        showMentorMessage("لقد وصلت إلى نهاية الرحلة يا بطل التلقين! تفقد لوحة الصدارة لترى ترتيبك.");
        if (currentTechniqueDisplayEl) currentTechniqueDisplayEl.textContent = "لا يوجد";
        return;
    }
    if (challengeIndex < 0) { // لمنع الذهاب قبل التحدي الأول
        currentPlayer.currentChallengeIndex = 0;
        loadChallenge(0);
        return;
    }

    const challenge = gameChallenges[challengeIndex];
    currentPlayer.currentChallengeIndex = challengeIndex; // تحديث الفهرس الحالي

    if (currentLevelDisplay) currentLevelDisplay.textContent = challenge.level;
    if (levelNameDisplay) levelNameDisplay.textContent = challenge.levelName;
    if (challengeTitleEl) challengeTitleEl.innerHTML = `<i class="fas fa-tasks"></i> ${challenge.title}`;
    if (challengeDescriptionEl) challengeDescriptionEl.innerHTML = challenge.description; // استخدم innerHTML للسماح بتنسيقات بسيطة إذا وجدت
    if (currentTechniqueDisplayEl) currentTechniqueDisplayEl.textContent = challenge.technique;


    promptInputEl.value = "";
    promptInputEl.disabled = false;
    submitPromptBtn.disabled = false;
    hintBtn.disabled = currentPlayer.hints <= 0;

    feedbackAreaEl.classList.add('hidden');
    feedbackAreaEl.className = 'feedback hidden'; // إعادة تعيين الكلاسات
    pointsAwardedEl.textContent = "";

    // تحديث حالة أزرار التنقل بين التحديات
    if (prevChallengeBtn) prevChallengeBtn.disabled = challengeIndex === 0;
    if (nextChallengeBtn) nextChallengeBtn.disabled = challengeIndex >= gameChallenges.length - 1;
    
    updateProgressBar(); // تحديث شريط التقدم العام للعبة
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
    
    // --- منطق تقييم مبدئي جداً ---
    // يمكنك لاحقًا استبدال هذا بمنطق أكثر تعقيدًا أو استدعاء API
    let keywordsFound = 0;
    if (challenge.keywordsForEvaluation && challenge.keywordsForEvaluation.length > 0) {
        challenge.keywordsForEvaluation.forEach(keyword => {
            if (userInput.toLowerCase().includes(keyword.toLowerCase())) {
                keywordsFound++;
            }
        });
    } else { // إذا لم تكن هناك كلمات مفتاحية، اعتبرها محاولة جيدة
        keywordsFound = 1; 
    }

    const techniqueMentioned = challenge.technique.split('(')[0].trim(); // الحصول على اسم التقنية الرئيسي
    const userMentionedTechnique = userInput.toLowerCase().includes(techniqueMentioned.toLowerCase());

    if (keywordsFound >= Math.min(2, challenge.keywordsForEvaluation?.length || 1) && userMentionedTechnique) { // يجب أن يجد كلمتين مفتاحيتين على الأقل أو يذكر التقنية
        scoreForPrompt = challenge.points;
        feedback = "تلقين ممتاز! يبدو أنك تطبق التقنية بشكل صحيح.";
        feedbackAreaEl.className = 'feedback show success';

        if (challenge.badgeAwarded && !currentPlayer.badges.find(b => b.id === challenge.badgeAwarded.id)) {
            currentPlayer.badges.push(challenge.badgeAwarded);
            feedback += ` <i class="fas fa-medal"></i> لقد حصلت على شارة: ${challenge.badgeAwarded.name}!`;
            updateBadgesDisplay();
        }
        // الانتقال التلقائي بعد فترة للتحدي التالي عند النجاح
        setTimeout(() => {
            loadChallenge(currentPlayer.currentChallengeIndex + 1);
        }, 3500);

    } else if (keywordsFound > 0 || userMentionedTechnique) {
        scoreForPrompt = Math.floor(challenge.points / 3);
        feedback = "محاولة جيدة، لكن حاول التركيز أكثر على متطلبات التحدي وتطبيق التقنية المحددة بشكل أوضح.";
        feedbackAreaEl.className = 'feedback show warning';
    } else {
        scoreForPrompt = 0; // قد تقرر خصم نقاط هنا
        feedback = "هممم، هذا التلقين لا يبدو أنه يلبي المطلوب. راجع وصف التحدي والتلميح إذا احتجت.";
        feedbackAreaEl.className = 'feedback show error';
    }
    // --- نهاية منطق التقييم المبدئي ---

    currentPlayer.score += scoreForPrompt;
    updatePlayerStatsDisplay(); // يشمل saveGameState
    feedbackTextEl.innerHTML = feedback; // استخدم innerHTML للسماح بأيقونة الشارة
    pointsAwardedEl.textContent = scoreForPrompt !== 0 ? `${scoreForPrompt > 0 ? '+' : ''}${scoreForPrompt} نقطة!` : "لا نقاط هذه المرة.";
    feedbackAreaEl.classList.remove('hidden');
}

function showHint() {
    if (currentPlayer.hints > 0) {
        const challenge = gameChallenges[currentPlayer.currentChallengeIndex];
        showMentorMessage(`تلميح: ${challenge.hint}`, 6000);
        currentPlayer.hints--;
        updatePlayerStatsDisplay(); // لتحديث عدد التلميحات وحفظ الحالة
        if (currentPlayer.hints <= 0) {
            hintBtn.disabled = true;
        }
    } else {
        showMentorMessage("لقد استنفدت كل تلميحاتك لهذا المستوى!");
    }
}

function updateProgressBar() {
    const progressBar = document.querySelector('.side-controls .progress-bar'); // استهداف شريط التقدم الصحيح
    if (progressBar && gameChallenges.length > 0) {
        const progressPercentage = ((currentPlayer.currentChallengeIndex + 1) / gameChallenges.length) * 100;
        progressBar.style.width = `${progressPercentage}%`;
    }
}


// --- تهيئة اللعبة عند تحميل الصفحة ---
function initializeGamePage() {
    // استرجاع بيانات اللاعب إذا وجدت
    currentPlayer.name = localStorage.getItem('promptMasterUsername') || "زائر";
    currentPlayer.score = parseInt(localStorage.getItem('promptMasterUserScore')) || 0;
    currentPlayer.badges = JSON.parse(localStorage.getItem('promptMasterUserBadges')) || [];
    currentPlayer.currentChallengeIndex = parseInt(localStorage.getItem('promptMasterChallengeIndex')) || 0;
    // يمكنك أيضًا استعادة عدد التلميحات إذا كنت تحفظها

    updatePlayerStatsDisplay();
    loadChallenge(currentPlayer.currentChallengeIndex);

    if(submitPromptBtn) submitPromptBtn.addEventListener('click', evaluatePrompt);
    if(hintBtn) hintBtn.addEventListener('click', showHint);
    
    if(exitGameBtn) {
        exitGameBtn.addEventListener('click', () => {
            // حفظ الحالة قبل الخروج
            saveGameState();
            // العودة إلى صفحة تسجيل الدخول أو الصفحة الرئيسية
            showLoginPage();
        });
    }

    if(nextChallengeBtn) {
        nextChallengeBtn.addEventListener('click', () => {
            if (currentPlayer.currentChallengeIndex < gameChallenges.length -1) {
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

// --- منطق التنقل بين الصفحات (في نفس الملف لتبسيط المثال) ---
const loginPage = document.getElementById('loginPage');
// gamePage, gameSidebar, leaderboardPage معرفة بالفعل

const startGameBtn = document.getElementById('startGameBtn');
const usernameInput = document.getElementById('username');
const howToPlayBtn = document.getElementById('howToPlayBtn');
const leaderboardLinkBtn = document.getElementById('leaderboardLinkBtn');
const howToPlayModal = document.getElementById('howToPlayModal');
const closeHowToPlayModal = document.getElementById('closeHowToPlayModal');
const backToMainFromLeaderboard = document.getElementById('backToMainFromLeaderboard');


function showLoginPage() {
    loginPage.style.display = 'block'; // أو 'flex' حسب تنسيقك
    gamePage.style.display = 'none';
    gameSidebar.style.display = 'none';
    if (leaderboardPage) leaderboardPage.style.display = 'none';
}

function showGamePage() {
    loginPage.style.display = 'none';
    gamePage.style.display = 'block'; // أو 'flex'
    gameSidebar.style.display = 'block'; // أو 'flex'
    if (leaderboardPage) leaderboardPage.style.display = 'none';
    initializeGamePage(); // نهيئ اللعبة عند عرض صفحتها
}

function showLeaderboardPage() {
    loginPage.style.display = 'none';
    gamePage.style.display = 'none';
    gameSidebar.style.display = 'none';
    if (leaderboardPage) leaderboardPage.style.display = 'block'; // أو 'flex'
    // هنا يمكنك إضافة منطق تحميل بيانات لوحة الصدارة
    populateLeaderboard(); // دالة افتراضية
}

if (startGameBtn) {
    startGameBtn.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        if (username) {
            currentPlayer.name = username;
            // إعادة تعيين التقدم إذا بدأ لاعب جديد أو نفس اللاعب من جديد
            currentPlayer.score = 0;
            currentPlayer.badges = [];
            currentPlayer.currentChallengeIndex = 0;
            currentPlayer.hints = 3; // إعادة تعيين التلميحات
            saveGameState(); // حفظ اسم المستخدم الجديد والتقدم المصفّر
            showGamePage();
        } else {
            alert("الرجاء إدخال اسم المستخدم!");
        }
    });
}

if (leaderboardLinkBtn) {
    leaderboardLinkBtn.addEventListener('click', showLeaderboardPage);
}
if (backToMainFromLeaderboard) {
    backToMainFromLeaderboard.addEventListener('click', showLoginPage);
}

if (howToPlayBtn) {
    howToPlayBtn.addEventListener('click', () => {
        if (howToPlayModal) howToPlayModal.style.display = 'flex';
    });
}
if (closeHowToPlayModal) {
    closeHowToPlayModal.addEventListener('click', () => {
        if (howToPlayModal) howToPlayModal.style.display = 'none';
    });
}
// إغلاق المودال عند النقر خارجه
if (howToPlayModal) {
    window.addEventListener('click', (event) => {
        if (event.target == howToPlayModal) {
            howToPlayModal.style.display = 'none';
        }
    });
}


// --- لوحة الصدارة (مثال بسيط لـ leaderboard_logic.js مدمج) ---
function populateLeaderboard() {
    const leaderboardTableBody = document.getElementById('leaderboardTable')?.querySelector('tbody');
    if (!leaderboardTableBody) return;

    // مثال لبيانات (في لعبة حقيقية، ستأتي هذه من localStorage مجمع أو backend)
    let allPlayersData = JSON.parse(localStorage.getItem('promptMasterAllPlayers')) || [];

    // إضافة اللاعب الحالي إذا لم يكن موجودًا أو تحديث بياناته
    const existingPlayerIndex = allPlayersData.findIndex(p => p.name === currentPlayer.name);
    if (existingPlayerIndex > -1) {
        // تحديث نقاط وشارات اللاعب الحالي إذا كانت أعلى
        if (currentPlayer.score > allPlayersData[existingPlayerIndex].score) {
            allPlayersData[existingPlayerIndex].score = currentPlayer.score;
            allPlayersData[existingPlayerIndex].badgesCount = currentPlayer.badges.length;
        }
    } else if (currentPlayer.name !== "زائر") { // لا تضف الزائر الافتراضي
         allPlayersData.push({ name: currentPlayer.name, score: currentPlayer.score, badgesCount: currentPlayer.badges.length });
    }
    
    // حفظ البيانات المحدثة (إذا كنت تريد قائمة مستمرة)
    localStorage.setItem('promptMasterAllPlayers', JSON.stringify(allPlayersData));


    // ترتيب اللاعبين حسب النقاط ثم عدد الشارات
    allPlayersData.sort((a, b) => {
        if (b.score === a.score) {
            return b.badgesCount - a.badgesCount;
        }
        return b.score - a.score;
    });

    leaderboardTableBody.innerHTML = ''; // مسح الجدول القديم

    allPlayersData.slice(0, 10).forEach((player, index) => { // عرض أفضل 10 مثلاً
        const row = leaderboardTableBody.insertRow();
        row.insertCell().textContent = index + 1;
        row.insertCell().textContent = player.name;
        row.insertCell().textContent = player.score;
        row.insertCell().textContent = player.badgesCount || 0;
    });
}

// --- بداية تشغيل اللعبة ---
// التأكد من أن الصفحة الرئيسية هي التي تظهر أولاً
document.addEventListener('DOMContentLoaded', () => {
    showLoginPage(); // ابدأ دائمًا بصفحة تسجيل الدخول
});
