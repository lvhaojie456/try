// ============================================================
// ARCANE QUEST — Roguelike Deckbuilder Engine
// ============================================================

// --- DOM ---
const gameContainer = document.getElementById('game-container');
const playerHealthBar = document.getElementById('player-health-bar');
const playerHealthText = document.getElementById('player-health-text');
const playerStatus = document.getElementById('player-status');
const playerSprite = document.getElementById('player-sprite');
const enemyHealthBar = document.getElementById('enemy-health-bar');
const enemyHealthText = document.getElementById('enemy-health-text');
const enemyStatus = document.getElementById('enemy-status');
const enemySprite = document.getElementById('enemy-sprite');
const enemyIntentBox = document.getElementById('enemy-intent');
const enemyNameEl = document.getElementById('enemy-name');
const currentEnergyEl = document.getElementById('current-energy');
const maxEnergyEl = document.getElementById('max-energy');
const goldCountEl = document.getElementById('gold-count');
const deckPile = document.getElementById('deck-pile');
const deckCountEl = document.getElementById('deck-count');
const discardCountEl = document.getElementById('discard-count');
const handContainer = document.getElementById('hand-container');
const endTurnBtn = document.getElementById('end-turn-btn');
const dmgContainer = document.getElementById('damage-numbers-container');
const rewardScreen = document.getElementById('reward-screen');
const rewardCardsContainer = document.getElementById('reward-cards');
const skipRewardBtn = document.getElementById('skip-reward-btn');
const gameOverScreen = document.getElementById('game-over-screen');
const gameOverTitle = document.getElementById('game-over-title');
const restartBtn = document.getElementById('restart-btn');
const loadDeathSaveBtn = document.getElementById('load-death-save-btn');
const floorBanner = document.getElementById('floor-banner');
const floorTitle = document.getElementById('floor-title');
const finalFloor = document.getElementById('final-floor');
const tutorialScreen = document.getElementById('tutorial-screen');
const closeTutorialBtn = document.getElementById('close-tutorial-btn');
const upgradeScreen = document.getElementById('upgrade-screen');
const upgradeCardsContainer = document.getElementById('upgrade-cards');
const skipUpgradeBtn = document.getElementById('skip-upgrade-btn');
const mainMenu = document.getElementById('main-menu');
const newGameBtn = document.getElementById('new-game-btn');
const loadGameBtn = document.getElementById('load-game-btn');
const cardGuideBtn = document.getElementById('card-guide-btn');
const cardGuideScreen = document.getElementById('card-guide-screen');
const guideBody = document.getElementById('guide-body');
const closeGuideBtn = document.getElementById('close-guide-btn');
const pileViewScreen = document.getElementById('pile-view-screen');
const pileViewTitle = document.getElementById('pile-view-title');
const pileViewSubtitle = document.getElementById('pile-view-subtitle');
const pileViewBody = document.getElementById('pile-view-body');
const closePileViewBtn = document.getElementById('close-pile-view-btn');
const saveGameBtn = document.getElementById('save-game-btn');
const saveQuitBtn = document.getElementById('save-quit-btn');
const saveToast = document.getElementById('save-toast');
const currentUsernameEl = document.getElementById('current-username');
const currentUserBestEl = document.getElementById('current-user-best');
const registerOpenBtn = document.getElementById('register-open-btn');
const changePasswordOpenBtn = document.getElementById('change-password-open-btn');
const registerScreen = document.getElementById('register-screen');
const registerForm = document.getElementById('register-form');
const usernameInput = document.getElementById('username-input');
const passwordInput = document.getElementById('password-input');
const registerMessage = document.getElementById('register-message');
const loginSubmitBtn = document.getElementById('login-submit-btn');
const registerSubmitBtn = document.getElementById('register-submit-btn');
const cancelRegisterBtn = document.getElementById('cancel-register-btn');
const changePasswordScreen = document.getElementById('change-password-screen');
const changePasswordForm = document.getElementById('change-password-form');
const currentPasswordInput = document.getElementById('current-password-input');
const newPasswordInput = document.getElementById('new-password-input');
const changePasswordMessage = document.getElementById('change-password-message');
const changePasswordSubmitBtn = document.getElementById('change-password-submit-btn');
const cancelChangePasswordBtn = document.getElementById('cancel-change-password-btn');
const leaderboardBtn = document.getElementById('leaderboard-btn');
const leaderboardScreen = document.getElementById('leaderboard-screen');
const leaderboardList = document.getElementById('leaderboard-list');
const leaderboardMessage = document.getElementById('leaderboard-message');
const refreshLeaderboardBtn = document.getElementById('refresh-leaderboard-btn');
const closeLeaderboardBtn = document.getElementById('close-leaderboard-btn');
const modeChoiceButtons = Array.from(document.querySelectorAll('[data-mode-choice]'));
const leaderboardModeButtons = Array.from(document.querySelectorAll('[data-leaderboard-mode]'));
const soundToggleBtn = document.getElementById('sound-toggle-btn');
const bossChoiceScreen = document.getElementById('boss-choice-screen');
const bossAddCardBtn = document.getElementById('boss-add-card-btn');
const bossRemoveCardBtn = document.getElementById('boss-remove-card-btn');
const removeCardScreen = document.getElementById('remove-card-screen');
const removeCardsContainer = document.getElementById('remove-cards');
const skipRemoveBtn = document.getElementById('skip-remove-btn');

// ============================================================
// CARD DATABASE
// ============================================================
const CARDS = {
    strike:        { id:'strike',        name:'打击',         cost:1, type:'attack', dmg:6,  desc:'造成 6 点伤害。' },
    defend:        { id:'defend',        name:'防御',         cost:1, type:'skill',  block:6, desc:'获得 6 点格挡。' },
    fireball:      { id:'fireball',      name:'火球术',       cost:2, type:'attack', dmg:16, desc:'造成 16 点伤害。' },
    poison_dagger: { id:'poison_dagger', name:'中毒匕首',     cost:1, type:'attack', dmg:5,  poison:4, desc:'造成 5 点伤害。施加 4 层中毒。' },
    thunder:       { id:'thunder',       name:'雷鸣击',       cost:2, type:'attack', dmg:9,  hits:2, desc:'造成 9 点伤害 ×2。' },
    vampire:       { id:'vampire',       name:'吸血斩',       cost:2, type:'attack', dmg:12, lifesteal:0.5, desc:'造成 12 点伤害。吸取 50% 的生命值。' },
    backstab:      { id:'backstab',      name:'背刺',         cost:0, type:'attack', dmg:12, firstOnly:true, desc:'造成 12 点伤害。仅作为第一张牌出时生效。' },
    weaken:        { id:'weaken',        name:'虚弱术',       cost:1, type:'skill',  applyWeak:2, block:3, desc:'施加 2 层虚弱并获得 3 点格挡。' },
    heal:          { id:'heal',          name:'治疗术',       cost:1, type:'skill',  healAmt:10, desc:'回复 10 点生命值。' },
    dodge:         { id:'dodge',         name:'翻滚躲避',     cost:1, type:'skill',  block:5, draw:1, desc:'获得 5 点格挡。抽 1 张牌。' },
    battlecry:     { id:'battlecry',     name:'战斗呐喊',     cost:1, type:'power',  strGain:3, desc:'力量 +3。（能力卡）' },
    flamaura:      { id:'flamaura',      name:'火焰光环',     cost:2, type:'power',  aura:4, desc:'每回合造成 4 点伤害。（能力卡）' },
    arcane_missile:{ id:'arcane_missile',name:'奥术飞弹',     cost:1, type:'attack', dmg:5,  hits:3, unlockPrice:90, desc:'造成 5 点伤害 3 次。' },
    frost_seal:    { id:'frost_seal',    name:'霜纹封印',     cost:1, type:'skill',  block:10, applyWeak:2, unlockPrice:85, desc:'获得 10 点格挡。施加 2 层虚弱。' },
    phoenix_feather:{id:'phoenix_feather',name:'凤凰羽',       cost:1, type:'skill',  healAmt:12, draw:2, unlockPrice:100, desc:'回复 12 点生命。抽 2 张牌。' },
    golden_slash:  { id:'golden_slash',  name:'鎏金斩',       cost:0, type:'attack', dmg:8,  unlockPrice:110, desc:'造成 8 点伤害。' },
    dragon_spark:  { id:'dragon_spark',  name:'龙息火花',     cost:2, type:'attack', dmg:16, poison:5, unlockPrice:130, desc:'造成 16 点伤害。施加 5 层中毒。' },
    guardian_oath: { id:'guardian_oath', name:'守护誓约',     cost:2, type:'power',  strGain:2, aura:4, unlockPrice:140, desc:'力量 +2。每回合造成 4 点伤害。' },
    wound:         { id:'wound',         name:'受伤',         cost:99,type:'curse',  desc:'无法打出。占用手牌。' },
};

// Reward pool (excludes starter cards and curses)
const REWARD_POOL = ['fireball','poison_dagger','thunder','vampire','weaken','heal','dodge','battlecry','flamaura'];
const SPECIAL_CARD_POOL = ['arcane_missile','frost_seal','phoenix_feather','golden_slash','dragon_spark','guardian_oath'];
const BASIC_UNLOCKED_CARDS = ['strike','defend','backstab'];
const UNLOCKABLE_CARD_POOL = [...REWARD_POOL, ...SPECIAL_CARD_POOL];
const CARD_UNLOCK_PRICES = {
    fireball: 45,
    poison_dagger: 45,
    thunder: 55,
    vampire: 70,
    weaken: 40,
    heal: 40,
    dodge: 45,
    battlecry: 75,
    flamaura: 80
};
const STARTER_BUNDLE_CARDS = REWARD_POOL.filter(id => !SPECIAL_CARD_POOL.includes(id));

// ============================================================
// CARD UPGRADES — Stats applied when a card is upgraded
// ============================================================
const CARD_UPGRADES = {
    strike:        { name:'打击+',       dmg:9,             desc:'造成 9 点伤害。' },
    defend:        { name:'防御+',       block:9,           desc:'获得 9 点格挡。' },
    fireball:      { name:'火球术+',     dmg:22,            desc:'造成 22 点伤害。' },
    poison_dagger: { name:'中毒匕首+',   dmg:7, poison:6,    desc:'造成 7 点伤害。施加 6 层中毒。' },
    thunder:       { name:'雷鸣击+',     dmg:12,            desc:'造成 12 点伤害 ×2。' },
    vampire:       { name:'吸血斩+',     dmg:16,            desc:'造成 16 点伤害。吸取 50% 的生命值。' },
    backstab:      { name:'背刺+',       dmg:17,            desc:'造成 17 点伤害。仅作为第一张牌出时生效。' },
    weaken:        { name:'虚弱术+',     applyWeak:3, block:6, desc:'施加 3 层虚弱并获得 6 点格挡。' },
    heal:          { name:'治疗术+',     healAmt:15,        desc:'回复 15 点生命值。' },
    dodge:         { name:'翻滚躲避+',   block:8, draw:2,   desc:'获得 8 点格挡。抽 2 张牌。' },
    battlecry:     { name:'战斗呐喊+',   strGain:5,         desc:'力量 +5。（能力卡）' },
    flamaura:      { name:'火焰光环+',   aura:7,            desc:'每回合造成 7 点伤害。（能力卡）' },
    arcane_missile:{ name:'奥术飞弹+',   dmg:7,             desc:'造成 7 点伤害 3 次。' },
    frost_seal:    { name:'霜纹封印+',   block:14, applyWeak:3, desc:'获得 14 点格挡。施加 3 层虚弱。' },
    phoenix_feather:{name:'凤凰羽+',     healAmt:16, draw:2, desc:'回复 16 点生命。抽 2 张牌。' },
    golden_slash:  { name:'鎏金斩+',     dmg:12,            desc:'造成 12 点伤害。' },
    dragon_spark:  { name:'龙息火花+',   dmg:22, poison:7,  desc:'造成 22 点伤害。施加 7 层中毒。' },
    guardian_oath: { name:'守护誓约+',   strGain:3, aura:5, desc:'力量 +3。每回合造成 5 点伤害。' },
};

// ============================================================
// ENEMY TEMPLATES
// ============================================================
const ENEMIES = [
    { name:'哥布林侦察兵',     hp:28,  patterns:['atk:5','atk:7','def:4','atk:6'] },
    { name:'骷髅战士',         hp:36,  patterns:['atk:7','def:5','atk:9','buff','atk:8'] },
    { name:'暗影法师',         hp:34,  patterns:['buff','atk:8','debuff','atk:10','def:6'] },
    { name:'兽人狂战士',       hp:48,  patterns:['buff','atk:6','atk:8','atk:10','def:6'] },
    { name:'远古巨龙',         hp:72,  patterns:['buff','atk:11','atk:10','def:8','debuff','atk:13'] },
];

// ============================================================
// GAME STATE
// ============================================================
let G = null; // global game state
let recentlyDrawnUids = [];

const GAME_MODE_KEY = 'arcane_quest_game_mode';
const GAME_MODE_IDS = ['easy', 'hard'];
const DEFAULT_GAME_MODE = 'easy';
const LEGACY_GAME_MODE = 'hard';
const GAME_MODES = {
    easy: {
        id: 'easy',
        label: '简单模式',
        shortLabel: '简单',
        playerMaxHp: 90,
        enemyHpMultiplier: 0.82,
        enemyPowerMultiplier: 0.8,
        floorHeal: 16,
        bossHeal: 32,
        goldDrop: [10, 16],
        bossGoldDrop: [32, 48]
    },
    hard: {
        id: 'hard',
        label: '困难模式',
        shortLabel: '困难',
        playerMaxHp: 80,
        enemyHpMultiplier: 1,
        enemyPowerMultiplier: 1,
        floorHeal: 12,
        bossHeal: 25,
        goldDrop: [16, 24],
        bossGoldDrop: [55, 80]
    }
};
let selectedMode = normalizeGameMode(localStorage.getItem(GAME_MODE_KEY) || DEFAULT_GAME_MODE);
let leaderboardMode = selectedMode;

function normalizeGameMode(mode, fallback = DEFAULT_GAME_MODE) {
    const value = String(mode || '').trim().toLowerCase();
    return GAME_MODE_IDS.includes(value) ? value : fallback;
}

function getGameModeConfig(mode = selectedMode) {
    return GAME_MODES[normalizeGameMode(mode)] || GAME_MODES[DEFAULT_GAME_MODE];
}

function getActiveGameMode() {
    return normalizeGameMode(G?.mode || selectedMode);
}

function setSelectedMode(mode, persist = true) {
    selectedMode = normalizeGameMode(mode);
    leaderboardMode = normalizeGameMode(leaderboardMode || selectedMode);
    if (persist) localStorage.setItem(GAME_MODE_KEY, selectedMode);
    updateModeButtons();
    updateUserPanel();
}

function updateModeButtons() {
    modeChoiceButtons.forEach(button => {
        const mode = normalizeGameMode(button.dataset.modeChoice);
        button.classList.toggle('active', mode === selectedMode);
        button.setAttribute('aria-pressed', mode === selectedMode ? 'true' : 'false');
    });
    leaderboardModeButtons.forEach(button => {
        const mode = normalizeGameMode(button.dataset.leaderboardMode);
        button.classList.toggle('active', mode === leaderboardMode);
        button.setAttribute('aria-pressed', mode === leaderboardMode ? 'true' : 'false');
    });
}

// ============================================================
// AUDIO
// ============================================================
const SOUND_KEY = 'arcane_quest_sound_enabled';
const SOUND_FILES = {
    click: 'assets/sfx/ui_click.wav',
    draw: 'assets/sfx/card_draw.wav',
    play: 'assets/sfx/card_play.wav',
    hit: 'assets/sfx/hit.wav',
    spawn: 'assets/sfx/enemy_spawn.wav',
    victory: 'assets/sfx/victory.wav',
    defeat: 'assets/sfx/defeat.wav'
};
let soundEnabled = localStorage.getItem(SOUND_KEY) !== 'off';
let sounds = {};
let audioUnlocked = false;

function initSounds() {
    if (Object.keys(sounds).length) return;
    sounds = Object.fromEntries(Object.entries(SOUND_FILES).map(([key, src]) => {
        const audio = new Audio(src);
        audio.preload = 'auto';
        audio.volume = key === 'victory' || key === 'defeat' ? 0.42 : 0.32;
        return [key, audio];
    }));
}

function unlockAudio() {
    if (audioUnlocked || !soundEnabled) return;
    initSounds();
    const audio = sounds.click;
    if (!audio) return;
    audio.volume = 0;
    audio.play().then(() => {
        audio.pause();
        audio.currentTime = 0;
        audio.volume = 0.32;
        audioUnlocked = true;
    }).catch(() => {});
}

function playSound(name, volume = 1) {
    if (!soundEnabled) return;
    initSounds();
    const src = sounds[name];
    if (!src) return;
    const audio = src.cloneNode();
    audio.volume = Math.min(0.6, src.volume * volume);
    audio.play().catch(() => {});
}

function updateSoundButton() {
    if (!soundToggleBtn) return;
    soundToggleBtn.textContent = soundEnabled ? '🔊 音效：开' : '🔇 音效：关';
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    localStorage.setItem(SOUND_KEY, soundEnabled ? 'on' : 'off');
    updateSoundButton();
    if (soundEnabled) {
        unlockAudio();
        playSound('click', 0.75);
    }
}

document.addEventListener('pointerdown', unlockAudio, { once: true });

function newGame(mode = selectedMode) {
    const normalizedMode = normalizeGameMode(mode);
    const modeConfig = getGameModeConfig(normalizedMode);
    setSelectedMode(normalizedMode);
    G = {
        mode: normalizedMode,
        floor: 1,
        played: 0,       // cards played this turn
        acting: false,    // lock during animations
        player: {
            hp: modeConfig.playerMaxHp, maxHp: modeConfig.playerMaxHp,
            block: 0, energy: 3, maxEnergy: 3,
            str: 0, flameAura: 0,
            deck: [], hand: [], discard: [], exhaust: []
        },
        enemy: {
            name: '', hp: 0, maxHp: 0,
            block: 0, str: 0,
            poison: 0, weak: 0,
            pi: 0, template: null, templateIndex: null,
            intent: null
        }
    };
    // Starting deck: 4 Strike, 4 Defend, 1 Backstab
    const ids = [...Array(4).fill('strike'), ...Array(4).fill('defend'), 'backstab'];
    G.player.deck = ids.map(id => makeCard(id));
    startFloor();
}

function makeCard(id) {
    return { ...CARDS[id], uid: Math.random() };
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function awardGold(wasBoss) {
    if (!G) return 0;
    const modeConfig = getGameModeConfig(G.mode);
    const [min, max] = wasBoss ? modeConfig.bossGoldDrop : modeConfig.goldDrop;
    const amount = randomInt(min, max);
    addGoldBalance(amount);
    floatText(`+${amount} 金币`, playerSprite, 'gold-text');
    updateUI();
    return amount;
}

// ============================================================
// FLOOR & TURN MANAGEMENT
// ============================================================
function startFloor() {
    // Pick enemy
    let ei;
    if (G.floor % 5 === 0) ei = 4;           // Boss every 5 floors
    else if (G.floor <= 2) ei = 0;
    else if (G.floor <= 4) ei = Math.floor(Math.random() * 2) + 1;
    else ei = Math.floor(Math.random() * 2) + 2;

    const templateIndex = Math.min(ei, ENEMIES.length - 1);
    const tmpl = ENEMIES[templateIndex];
    G.mode = normalizeGameMode(G.mode, LEGACY_GAME_MODE);
    const modeConfig = getGameModeConfig(G.mode);
    const scale = (1 + (G.floor - 1) * 0.1) * modeConfig.enemyHpMultiplier;

    G.enemy.template = tmpl;
    G.enemy.templateIndex = templateIndex;
    G.enemy.name = tmpl.name;
    G.enemy.maxHp = Math.max(1, Math.floor(tmpl.hp * scale));
    G.enemy.hp = G.enemy.maxHp;
    G.enemy.block = 0;
    G.enemy.str = Math.floor((G.floor - 1) / 4);
    G.enemy.poison = 0;
    G.enemy.weak = 0;
    G.enemy.pi = 0;
    G.enemy.intent = null;
    G.enemy.isDead = false;

    // Reset player per-combat
    G.player.block = 0;
    G.player.str = 0;
    G.player.flameAura = 0;
    G.played = 0;

    // Gather all cards back to deck
    G.player.deck = [...G.player.deck, ...G.player.hand, ...G.player.discard, ...G.player.exhaust];
    G.player.hand = [];
    G.player.discard = [];
    G.player.exhaust = [];
    shuffle(G.player.deck);

    // Auto-save at the start of each floor
    if (typeof saveGame === 'function') saveGame();
    recordFloorProgress(G.floor);

    // UI
    gameOverScreen.classList.add('hidden');
    rewardScreen.classList.add('hidden');
    if (enemyNameEl) enemyNameEl.textContent = tmpl.name;
    playTransientAnimation(enemySprite, 'enemy-spawn', 700);
    playTransientAnimation(enemyNameEl, 'enemy-name-spawn', 700);
    playSound('spawn', 0.8);

    // Floor banner
    const isBoss = G.floor % 5 === 0;
    floorTitle.textContent = isBoss ? `⚔️ BOSS：第 ${G.floor} 层 ⚔️` : `第 ${G.floor} 层`;
    floorBanner.classList.remove('hidden');
    floorBanner.style.animation = 'none';
    void floorBanner.offsetHeight;
    floorBanner.style.animation = null;

    setTimeout(() => {
        floorBanner.classList.add('hidden');
        if (G.floor === 1) {
            tutorialScreen.classList.remove('hidden');
        } else {
            beginCombatTurn();
        }
    }, 2000);

    updateUI();
}

closeTutorialBtn.onclick = () => {
    tutorialScreen.classList.add('hidden');
    beginCombatTurn();
};

function beginCombatTurn() {
    decideIntent();
    startPlayerTurn();
}

function startPlayerTurn() {
    G.acting = true;
    G.player.energy = G.player.maxEnergy;
    G.player.block = 0;
    G.played = 0;

    // Discard previous hand
    G.player.discard.push(...G.player.hand);
    G.player.hand = [];

    let delay = 0;

    // Flame Aura trigger
    if (G.player.flameAura > 0) {
        delay += 500;
        setTimeout(() => {
            if (G.enemy.isDead) return;
            hurtEnemy(G.player.flameAura, true);
            floatText(`🔥 ${G.player.flameAura}`, enemySprite, 'fire-text');
            checkEnemyDeath();
        }, delay - 300);
    }

    // Poison tick on enemy
    if (G.enemy.poison > 0) {
        delay += 500;
        setTimeout(() => {
            if (G.enemy.isDead) return;
            const pd = G.enemy.poison;
            G.enemy.hp = Math.max(0, G.enemy.hp - pd);
            G.enemy.poison = Math.max(0, G.enemy.poison - 1);
            floatText(`☠️ ${pd}`, enemySprite, 'poison-text');
            updateUI();
            checkEnemyDeath();
        }, delay - 300);
    }

    setTimeout(() => {
        if (!G.enemy.isDead) {
            drawCards(5);
            endTurnBtn.disabled = false;
            updateUI();
            G.acting = false;
        }
    }, delay + 100);
}

// ============================================================
// CARD PLAY
// ============================================================
function playCard(uid) {
    if (G.acting) return;
    const index = G.player.hand.findIndex(c => c.uid === uid);
    if (index === -1) return;
    const card = G.player.hand[index];

    // Curse check
    if (card.type === 'curse') {
        shakeCard(index);
        floatText('无法打出！', playerSprite, 'curse-text');
        return;
    }
    // Energy check
    if (G.player.energy < card.cost) {
        shakeCard(index);
        floatText('能量不足！', playerSprite, 'block-text');
        return;
    }
    // Backstab first-card check
    if (card.firstOnly && G.played > 0) {
        shakeCard(index);
        floatText('仅限首张牌！', playerSprite, 'curse-text');
        return;
    }

    animateCardCast(handContainer.children[index], card.type === 'attack' ? enemySprite : playerSprite);
    playSound('play');

    // Pay cost
    G.player.energy -= card.cost;
    G.played++;

    // --- ATTACK ---
    if (card.type === 'attack') {
        playerSprite.classList.add('attack-anim');
        setTimeout(() => playerSprite.classList.remove('attack-anim'), 300);

        const hits = card.hits || 1;
        let totalDealt = 0;
        for (let h = 0; h < hits; h++) {
            if (G.enemy.isDead) break;
            totalDealt += hurtEnemy(card.dmg + G.player.str);
            checkEnemyDeath();
        }
        if (!G.enemy.isDead && card.poison) {
            G.enemy.poison += card.poison;
            floatText(`+${card.poison} Poison`, enemySprite, 'poison-text');
        }
        if (card.lifesteal && totalDealt > 0) {
            const hl = Math.floor(totalDealt * card.lifesteal);
            if (hl > 0) {
                G.player.hp = Math.min(G.player.maxHp, G.player.hp + hl);
                floatText(`+${hl} 生命`, playerSprite, 'heal-text');
            }
        }
    }

    // --- SKILL ---
    if (card.type === 'skill') {
        if (card.block) {
            G.player.block += card.block;
            floatText(`+${card.block} 格挡`, playerSprite, 'block-text');
        }
        if (card.applyWeak) {
            G.enemy.weak += card.applyWeak;
            floatText(`+${card.applyWeak} 虚弱`, enemySprite, 'debuff-text');
        }
        if (card.healAmt) {
            const amt = Math.min(card.healAmt, G.player.maxHp - G.player.hp);
            G.player.hp += amt;
            floatText(`+${amt} 生命`, playerSprite, 'heal-text');
        }
        if (card.draw) {
            setTimeout(() => drawCards(card.draw), 100);
        }
    }

    // --- POWER ---
    if (card.type === 'power') {
        if (card.strGain) {
            G.player.str += card.strGain;
            floatText(`+${card.strGain} 力量`, playerSprite, 'strength-text');
        }
        if (card.aura) {
            G.player.flameAura += card.aura;
            floatText(`🔥 光环！`, playerSprite, 'fire-text');
        }
    }

    // Move card
    G.player.hand.splice(index, 1);
    if (card.type === 'power') {
        G.player.exhaust.push(card);
    } else {
        G.player.discard.push(card);
    }

    renderHand();
    updateUI();
    checkEnemyDeath();
}

// ============================================================
// ENEMY TURN
// ============================================================
endTurnBtn.addEventListener('click', () => {
    if (G.acting) return;
    G.acting = true;
    endTurnBtn.disabled = true;

    G.enemy.block = 0;
    enemyIntentBox.classList.remove('visible');

    setTimeout(() => {
        executeEnemyIntent();
        
        // Weak tick after attack
        if (G.enemy.weak > 0) G.enemy.weak--;
        
        updateUI();

        if (G.player.hp <= 0) {
            loseGame();
        } else {
            setTimeout(() => {
                beginCombatTurn();
            }, 700);
        }
    }, 400);
});

function executeEnemyIntent() {
    const intent = G.enemy.intent;
    if (!intent) return;

    switch (intent.action) {
        case 'attack': {
            enemySprite.classList.add('attack-anim-enemy');
            setTimeout(() => enemySprite.classList.remove('attack-anim-enemy'), 300);
            let dmg = intent.value + G.enemy.str;
            if (G.enemy.weak > 0) dmg = Math.floor(dmg * 0.75);
            hurtPlayer(dmg);
            break;
        }
        case 'defend': {
            G.enemy.block += intent.value;
            floatText(`+${intent.value} 格挡`, enemySprite, 'block-text');
            // Small chance to add wound
            if (Math.random() < 0.15) {
                G.player.discard.push(makeCard('wound'));
                floatText('加入受伤卡！', playerSprite, 'curse-text');
            }
            break;
        }
        case 'buff': {
            G.enemy.str += 2;
            floatText('+2 力量', enemySprite, 'strength-text');
            break;
        }
        case 'debuff': {
            G.player.discard.push(makeCard('wound'));
            G.player.discard.push(makeCard('wound'));
            floatText('2 张受伤卡！', playerSprite, 'curse-text');
            break;
        }
    }
}

// ============================================================
// ENEMY AI — Intent
// ============================================================
function decideIntent() {
    const tmpl = G.enemy.template;
    const raw = tmpl.patterns[G.enemy.pi % tmpl.patterns.length];
    G.enemy.pi++;

    const modeConfig = getGameModeConfig(G.mode);
    const scale = (1 + (G.floor - 1) * 0.07) * modeConfig.enemyPowerMultiplier;
    let action, value;

    if (raw.startsWith('atk:')) {
        action = 'attack';
        value = Math.max(1, Math.floor(parseInt(raw.split(':')[1]) * scale));
    } else if (raw.startsWith('def:')) {
        action = 'defend';
        value = Math.max(1, Math.floor(parseInt(raw.split(':')[1]) * scale));
    } else if (raw === 'buff') {
        action = 'buff'; value = 2;
    } else if (raw === 'debuff') {
        action = 'debuff'; value = 0;
    }

    G.enemy.intent = { action, value };
    renderEnemyIntent(true);
}

// ============================================================
// COMBAT MATH
// ============================================================
function hurtEnemy(amount, skipAnim) {
    let dmg = amount;
    if (G.enemy.block > 0) {
        if (G.enemy.block >= dmg) {
            G.enemy.block -= dmg;
            floatText('已格挡！', enemySprite, 'block-text');
            updateUI();
            return 0;
        }
        dmg -= G.enemy.block;
        G.enemy.block = 0;
    }
    G.enemy.hp = Math.max(0, G.enemy.hp - dmg);
    if (!skipAnim) {
        enemySprite.classList.add('shake');
        playTransientAnimation(enemySprite, 'hit-flash', 360);
        playSound('hit', 0.9);
        setTimeout(() => enemySprite.classList.remove('shake'), 400);
    }
    floatText(`-${dmg}`, enemySprite);
    updateUI();
    return dmg;
}

function hurtPlayer(amount) {
    let dmg = amount;
    if (G.player.block > 0) {
        if (G.player.block >= dmg) {
            G.player.block -= dmg;
            floatText('已格挡！', playerSprite, 'block-text');
            updateUI();
            return;
        }
        dmg -= G.player.block;
        G.player.block = 0;
    }
    G.player.hp = Math.max(0, G.player.hp - dmg);
    playerSprite.classList.add('shake');
    playTransientAnimation(playerSprite, 'hit-flash', 360);
    playSound('hit', 1);
    setTimeout(() => playerSprite.classList.remove('shake'), 400);
    floatText(`-${dmg}`, playerSprite);
    updateUI();
}

function checkEnemyDeath() {
    if (G.enemy.hp <= 0 && !G.enemy.isDead) {
        G.enemy.isDead = true;
        winFloor();
    }
}

// ============================================================
// FLOW — Win / Lose
// ============================================================
function winFloor() {
    G.acting = true;
    battleFlash('victory');
    playTransientAnimation(enemySprite, 'enemy-defeat', 720);
    playSound('victory');

    // Boss kill bonus: +5 max HP and purge all wounds
    const wasBoss = G.floor % 5 === 0;
    awardGold(wasBoss);
    G.pendingUpgrade = wasBoss;
    G.floor++;
    recordFloorProgress(G.floor);

    // Heal between floors (more after boss)
    const modeConfig = getGameModeConfig(G.mode);
    const healAmt = wasBoss ? modeConfig.bossHeal : modeConfig.floorHeal;
    G.player.hp = Math.min(G.player.maxHp, G.player.hp + healAmt);

    if (wasBoss) {
        G.player.maxHp += 5;
        G.player.hp = Math.min(G.player.maxHp, G.player.hp + 5);
        // Purge all wound cards from all piles
        const removeWounds = arr => arr.filter(c => c.id !== 'wound');
        G.player.deck = removeWounds(G.player.deck);
        G.player.hand = removeWounds(G.player.hand);
        G.player.discard = removeWounds(G.player.discard);
        G.player.exhaust = removeWounds(G.player.exhaust);
    }

    setTimeout(() => {
        if (wasBoss) {
            showBossChoiceScreen();
        } else {
            showRewardScreen(afterReward);
        }
    }, 800);
}

function showRewardScreen(onDone = afterReward) {
    rewardCardsContainer.innerHTML = '';
    const pool = getUnlockedRewardPool();
    shuffle(pool);
    const picks = pool.slice(0, 3);

    if (!picks.length) {
        rewardCardsContainer.innerHTML = '<div class="leaderboard-empty">暂无可加入的已解锁卡牌，先去卡牌图鉴解锁新卡。</div>';
    }

    picks.forEach(id => {
        const card = makeCard(id);
        const el = buildCardEl(card, false);
        el.onclick = () => {
            G.player.deck.push(card);
            rewardScreen.classList.add('hidden');
            onDone();
        };
        rewardCardsContainer.appendChild(el);
    });

    skipRewardBtn.onclick = () => {
        rewardScreen.classList.add('hidden');
        onDone();
    };

    rewardScreen.classList.remove('hidden');
}

skipRewardBtn.onclick = () => {
    rewardScreen.classList.add('hidden');
    afterReward();
};

function afterReward() {
    startFloor();
}

function showBossChoiceScreen() {
    bossChoiceScreen.classList.remove('hidden');
}

function afterBossDeckChoice() {
    if (G.pendingUpgrade) {
        G.pendingUpgrade = false;
        showUpgradeScreen();
        return;
    }
    startFloor();
}

function getAllPlayerCardsWithPiles() {
    const piles = ['deck', 'hand', 'discard', 'exhaust'];
    return piles.flatMap(pile => G.player[pile].map((card, index) => ({ pile, index, card })));
}

function showRemoveCardScreen() {
    removeCardsContainer.innerHTML = '';
    removeCardScreen.classList.remove('hidden');

    const cards = getAllPlayerCardsWithPiles()
        .filter(item => item.card.type !== 'curse');

    if (cards.length === 0) {
        removeCardsContainer.innerHTML = '<div class="leaderboard-empty">没有可删除的卡牌</div>';
        return;
    }

    const grid = document.createElement('div');
    grid.className = 'guide-card-grid remove-card-grid';

    cards.forEach(item => {
        const el = buildCardEl(item.card, false);
        el.classList.add('remove-preview');
        el.onclick = () => {
            const pile = G.player[item.pile];
            const index = pile.findIndex(card => card.uid === item.card.uid);
            if (index !== -1) pile.splice(index, 1);
            removeCardScreen.classList.add('hidden');
            afterBossDeckChoice();
        };
        grid.appendChild(el);
    });

    removeCardsContainer.appendChild(grid);
}

// ============================================================
// CARD UPGRADE SCREEN
// ============================================================
function showUpgradeScreen() {
    upgradeCardsContainer.innerHTML = '';

    // Gather all player cards
    const allCards = [...G.player.deck, ...G.player.hand, ...G.player.discard, ...G.player.exhaust];

    // Filter: non-upgraded, non-curse, has upgrade data
    const upgradeable = allCards.filter(c => !c.upgraded && c.type !== 'curse' && CARD_UPGRADES[c.id]);

    if (upgradeable.length === 0) {
        afterPostCombatRewards();
        return;
    }

    // Shuffle and pick up to 5
    shuffle(upgradeable);
    const picks = upgradeable.slice(0, 5);

    picks.forEach(card => {
        // Build a preview showing the UPGRADED version
        const previewData = { ...card, ...CARD_UPGRADES[card.id], upgraded: true };
        const el = buildCardEl(previewData, false);
        el.classList.add('upgrade-preview');
        el.onclick = () => {
            // Apply upgrade to the actual card instance
            Object.assign(card, CARD_UPGRADES[card.id]);
            card.upgraded = true;
            upgradeScreen.classList.add('hidden');
            afterPostCombatRewards();
        };
        upgradeCardsContainer.appendChild(el);
    });

    upgradeScreen.classList.remove('hidden');
}

skipUpgradeBtn.onclick = () => {
    upgradeScreen.classList.add('hidden');
    afterPostCombatRewards();
};

function loseGame() {
    finalFloor.textContent = G.floor;
    recordFloorProgress(G.floor);
    battleFlash('defeat');
    playTransientAnimation(playerSprite, 'player-defeat', 720);
    playSound('defeat');
    if (loadDeathSaveBtn) loadDeathSaveBtn.disabled = !hasSaveData();
    gameOverScreen.classList.remove('hidden');
}

restartBtn.onclick = () => showMainMenu();
loadDeathSaveBtn.onclick = () => {
    const loadType = loadGame();
    if (!loadType) return;
    gameOverScreen.classList.add('hidden');
    if (loadType === 'snapshot') {
        resumeSavedGame();
    } else {
        startFloor();
    }
};

// ============================================================
// SAVE / LOAD SYSTEM
// ============================================================
const SAVE_KEY = 'arcane_quest_save';

function cardToSave(card) {
    return {
        id: card.id,
        upgraded: !!card.upgraded,
        uid: card.uid
    };
}

function cardFromSave(data) {
    if (!data || !CARDS[data.id]) return null;
    const card = makeCard(data.id);
    if (data.upgraded && CARD_UPGRADES[data.id]) {
        Object.assign(card, CARD_UPGRADES[data.id]);
        card.upgraded = true;
    }
    if (data.uid !== undefined) card.uid = data.uid;
    return card;
}

function cardsFromSave(list) {
    if (!Array.isArray(list)) return [];
    return list.map(cardFromSave).filter(Boolean);
}

function createSaveData() {
    const p = G.player;
    const e = G.enemy;
    return {
        version: 2,
        mode: getActiveGameMode(),
        savedAt: new Date().toISOString(),
        floor: G.floor,
        played: G.played || 0,
        pendingUpgrade: !!G.pendingUpgrade,
        player: {
            hp: p.hp,
            maxHp: p.maxHp,
            block: p.block,
            energy: p.energy,
            maxEnergy: p.maxEnergy,
            str: p.str,
            flameAura: p.flameAura,
            deck: p.deck.map(cardToSave),
            hand: p.hand.map(cardToSave),
            discard: p.discard.map(cardToSave),
            exhaust: p.exhaust.map(cardToSave)
        },
        enemy: {
            name: e.name,
            hp: e.hp,
            maxHp: e.maxHp,
            block: e.block,
            str: e.str,
            poison: e.poison,
            weak: e.weak,
            pi: e.pi,
            templateIndex: e.templateIndex,
            intent: e.intent ? { ...e.intent } : null,
            isDead: !!e.isDead
        }
    };
}

function saveGame() {
    if (!G) return false;
    const saveData = createSaveData();
    localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
    return true;
}

function loadSnapshotSave(save) {
    const rawTemplateIndex = Number.isInteger(save.enemy?.templateIndex) ? save.enemy.templateIndex : 0;
    const templateIndex = Math.max(0, Math.min(rawTemplateIndex, ENEMIES.length - 1));
    const tmpl = ENEMIES[templateIndex];
    G = {
        mode: normalizeGameMode(save.mode, LEGACY_GAME_MODE),
        floor: toFloorNumber(save.floor, 1),
        played: Math.max(0, Number(save.played || 0)),
        acting: false,
        pendingUpgrade: !!save.pendingUpgrade,
        player: {
            hp: toFloorNumber(save.player?.hp, 80),
            maxHp: toFloorNumber(save.player?.maxHp, 80),
            block: Math.max(0, Number(save.player?.block || 0)),
            energy: Math.max(0, Number(save.player?.energy || 0)),
            maxEnergy: toFloorNumber(save.player?.maxEnergy, 3),
            str: Math.max(0, Number(save.player?.str || 0)),
            flameAura: Math.max(0, Number(save.player?.flameAura || 0)),
            deck: cardsFromSave(save.player?.deck),
            hand: cardsFromSave(save.player?.hand),
            discard: cardsFromSave(save.player?.discard),
            exhaust: cardsFromSave(save.player?.exhaust)
        },
        enemy: {
            name: save.enemy?.name || tmpl.name,
            hp: Math.max(0, Number(save.enemy?.hp || tmpl.hp)),
            maxHp: toFloorNumber(save.enemy?.maxHp, tmpl.hp),
            block: Math.max(0, Number(save.enemy?.block || 0)),
            str: Math.max(0, Number(save.enemy?.str || 0)),
            poison: Math.max(0, Number(save.enemy?.poison || 0)),
            weak: Math.max(0, Number(save.enemy?.weak || 0)),
            pi: Math.max(0, Number(save.enemy?.pi || 0)),
            template: tmpl,
            templateIndex,
            intent: save.enemy?.intent ? { ...save.enemy.intent } : null,
            isDead: !!save.enemy?.isDead
        }
    };
    setSelectedMode(G.mode);
    return 'snapshot';
}

function loadLegacySave(save) {
    G = {
        mode: LEGACY_GAME_MODE,
        floor: toFloorNumber(save.floor, 1),
        played: 0,
        acting: false,
        player: {
            hp: toFloorNumber(save.hp, 80), maxHp: toFloorNumber(save.maxHp, 80),
            block: 0, energy: 3, maxEnergy: save.maxEnergy || 3,
            str: 0, flameAura: 0,
            deck: [], hand: [], discard: [], exhaust: []
        },
        enemy: {
            name: '', hp: 0, maxHp: 0,
            block: 0, str: 0,
            poison: 0, weak: 0,
            pi: 0, template: null, templateIndex: null,
            intent: null
        }
    };
    G.player.deck = cardsFromSave(save.cards);
    setSelectedMode(G.mode);
    return 'legacy';
}

function loadGame() {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return false;
    try {
        const save = JSON.parse(raw);
        if (save.version === 2 && save.player && save.enemy) return loadSnapshotSave(save);
        return loadLegacySave(save);
    } catch(e) {
        return false;
    }
}

function renderEnemyIntent(animate = false) {
    if (!G?.enemy?.intent) {
        enemyIntentBox.classList.remove('visible');
        return;
    }

    const intent = G.enemy.intent;
    let icon = '⚔️';
    let label = intent.value;

    if (intent.action === 'attack') {
        label = intent.value + G.enemy.str;
        if (G.enemy.weak > 0) label = Math.floor(label * 0.75);
    } else if (intent.action === 'defend') {
        icon = '🛡️';
    } else if (intent.action === 'buff') {
        icon = '💪';
        label = '增益';
    } else if (intent.action === 'debuff') {
        icon = '💀';
        label = '诅咒';
    }

    enemyIntentBox.innerHTML = `<span class="intent-icon">${icon}</span><span class="intent-value">${label}</span>`;
    enemyIntentBox.classList.add('visible');
    if (animate) playTransientAnimation(enemyIntentBox, 'intent-pop', 380);
}

function resumeSavedGame() {
    gameOverScreen.classList.add('hidden');
    rewardScreen.classList.add('hidden');
    upgradeScreen.classList.add('hidden');
    bossChoiceScreen.classList.add('hidden');
    removeCardScreen.classList.add('hidden');
    pileViewScreen.classList.add('hidden');
    changePasswordScreen.classList.add('hidden');
    tutorialScreen.classList.add('hidden');
    floorBanner.classList.add('hidden');
    mainMenu.classList.add('hidden');

    if (enemyNameEl) enemyNameEl.textContent = G.enemy.name || '敌人';

    if (!G.enemy.intent && G.player.hand.length === 0 && G.player.deck.length > 0) {
        beginCombatTurn();
        return;
    }

    renderEnemyIntent(false);
    renderHand();
    updateUI();
    endTurnBtn.disabled = false;
    G.acting = false;
}

function showSaveToast(message, type = 'success') {
    if (!saveToast) return;
    saveToast.textContent = message;
    saveToast.className = `save-toast ${type}`;
    clearTimeout(showSaveToast.timer);
    showSaveToast.timer = setTimeout(() => saveToast.classList.add('hidden'), 1500);
}

function hasSaveData() {
    return !!localStorage.getItem(SAVE_KEY);
}

function deleteSave() {
    localStorage.removeItem(SAVE_KEY);
}

function showPileView() {
    pileViewTitle.textContent = '📚 抽牌堆';
    pileViewSubtitle.textContent = '当前还未抽到的卡牌';
    pileViewBody.innerHTML = '';

    if (!G || !G.player.deck.length) {
        pileViewBody.innerHTML = '<div class="leaderboard-empty">抽牌堆为空</div>';
    } else {
        const grid = document.createElement('div');
        grid.className = 'guide-card-grid pile-card-grid';
        G.player.deck.slice().reverse().forEach(card => {
            grid.appendChild(buildCardEl(card, false));
        });
        pileViewBody.appendChild(grid);
    }

    pileViewScreen.classList.remove('hidden');
}

// ============================================================
// USER PROFILE & LEADERBOARD
// ============================================================
const USER_KEY = 'arcane_quest_user';
const LOCAL_USERS_KEY = 'arcane_quest_local_users';
const LOCAL_LEADERBOARD_KEY = 'arcane_quest_local_leaderboard';
const PROGRESSION_KEY_PREFIX = 'arcane_quest_progress_';
let currentUser = loadUserProfile();
let playerProgress = null;

function readJson(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch(e) {
        return fallback;
    }
}

function writeJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function cleanUsername(value) {
    return (value || '').trim().replace(/\s+/g, ' ');
}

function validateUsername(username) {
    const len = Array.from(username).length;
    if (len < 2 || len > 16) return '账号需要 2-16 个字符。';
    if (!/^[\p{L}\p{N}_ -]+$/u.test(username)) return '账号只能包含文字、数字、空格、下划线或短横线。';
    return '';
}

function validatePassword(password) {
    if (!password || password.length < 6 || password.length > 32) return '密码需要 6-32 位。';
    return '';
}

function makeLocalUserId() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) return `local-${crypto.randomUUID()}`;
    return `local-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function toFloorNumber(value, fallback = 1) {
    const floor = Math.floor(Number(value));
    return Number.isFinite(floor) && floor > 0 ? floor : fallback;
}

function normalizeBestFloors(data = {}) {
    const nested = data.bestFloors || data.best_floors || {};
    const legacyBest = toFloorNumber(data.bestFloor || data.best_floor, 1);
    return {
        easy: toFloorNumber(data.bestFloorEasy || data.best_floor_easy || nested.easy, 1),
        hard: toFloorNumber(data.bestFloorHard || data.best_floor_hard || nested.hard, legacyBest)
    };
}

function getUserBestFloor(user, mode = selectedMode) {
    if (!user) return 1;
    const normalizedMode = normalizeGameMode(mode);
    if (user.bestFloors) return toFloorNumber(user.bestFloors[normalizedMode], 1);
    return toFloorNumber(user.bestFloor || user.best_floor, 1);
}

function normalizeUser(user) {
    if (!user || !user.id || !user.username) return null;
    const bestFloors = normalizeBestFloors(user);
    return {
        id: String(user.id),
        username: String(user.username),
        bestFloor: bestFloors[selectedMode],
        bestFloors,
        source: user.source || 'cloud'
    };
}

function loadUserProfile() {
    return normalizeUser(readJson(USER_KEY, null));
}

function saveUserProfile(user) {
    currentUser = normalizeUser(user);
    if (currentUser) writeJson(USER_KEY, currentUser);
    playerProgress = loadProgressProfile();
    updateUserPanel();
}

function getProgressKey() {
    return `${PROGRESSION_KEY_PREFIX}${currentUser ? currentUser.id : 'guest'}`;
}

function getUnlockPrice(cardId) {
    return CARDS[cardId]?.unlockPrice || CARD_UNLOCK_PRICES[cardId] || 60;
}

function normalizeProgress(progress) {
    const rawUnlocked = Array.isArray(progress?.unlockedCards) ? progress.unlockedCards : [];
    const unlocked = new Set([...BASIC_UNLOCKED_CARDS, ...rawUnlocked].filter(id => CARDS[id] && id !== 'wound'));
    return {
        goldBalance: Math.max(0, Math.floor(Number(progress?.goldBalance || progress?.gold || 0))),
        unlockedCards: Array.from(unlocked),
        starterBundleClaimed: !!progress?.starterBundleClaimed
    };
}

function loadProgressProfile() {
    return normalizeProgress(readJson(getProgressKey(), null));
}

function getPlayerProgress() {
    if (!playerProgress) playerProgress = loadProgressProfile();
    return playerProgress;
}

function saveProgressProfile() {
    const progress = normalizeProgress(getPlayerProgress());
    playerProgress = progress;
    writeJson(getProgressKey(), progress);
    updateUserPanel();
    if (goldCountEl) goldCountEl.textContent = progress.goldBalance;
}

function getGoldBalance() {
    return getPlayerProgress().goldBalance;
}

function addGoldBalance(amount) {
    const progress = getPlayerProgress();
    progress.goldBalance = Math.max(0, progress.goldBalance + Math.max(0, Math.floor(Number(amount || 0))));
    saveProgressProfile();
}

function isCardUnlocked(cardId) {
    if (!CARDS[cardId] || cardId === 'wound') return false;
    return getPlayerProgress().unlockedCards.includes(cardId);
}

function unlockCard(cardId) {
    if (!CARDS[cardId] || isCardUnlocked(cardId)) return false;
    const price = getUnlockPrice(cardId);
    const progress = getPlayerProgress();
    if (progress.goldBalance < price) return false;
    progress.goldBalance -= price;
    progress.unlockedCards = Array.from(new Set([...progress.unlockedCards, cardId]));
    saveProgressProfile();
    return true;
}

function claimStarterBundle() {
    const progress = getPlayerProgress();
    if (progress.starterBundleClaimed) return false;
    progress.unlockedCards = Array.from(new Set([...progress.unlockedCards, ...STARTER_BUNDLE_CARDS]));
    progress.starterBundleClaimed = true;
    saveProgressProfile();
    return true;
}

function getUnlockedRewardPool() {
    const unlocked = getPlayerProgress().unlockedCards;
    const candidates = [...UNLOCKABLE_CARD_POOL, ...BASIC_UNLOCKED_CARDS];
    return candidates.filter((id, index) =>
        candidates.indexOf(id) === index &&
        unlocked.includes(id) &&
        CARDS[id] &&
        id !== 'wound'
    );
}

function isSpecialCard(cardId) {
    return SPECIAL_CARD_POOL.includes(cardId);
}

async function sha256Hex(text) {
    const data = new TextEncoder().encode(text);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function getLocalUsers() {
    const users = readJson(LOCAL_USERS_KEY, {});
    return users && typeof users === 'object' ? users : {};
}

function saveLocalUsers(users) {
    writeJson(LOCAL_USERS_KEY, users);
}

async function makeLocalPasswordRecord(password) {
    const salt = makeLocalUserId();
    return {
        passwordSalt: salt,
        passwordHash: await sha256Hex(`${salt}:${password}`)
    };
}

async function verifyLocalPassword(user, password) {
    if (!user.passwordHash || !user.passwordSalt) return password === '123456';
    return await sha256Hex(`${user.passwordSalt}:${password}`) === user.passwordHash;
}

async function registerLocalUser(username, password, reachedFloor) {
    const users = getLocalUsers();
    if (users[username]) throw apiError('这个账号已被占用。', 409);
    const passwordRecord = await makeLocalPasswordRecord(password);
    const mode = getActiveGameMode();
    const bestFloors = { easy: 1, hard: 1, [mode]: reachedFloor };
    const user = {
        id: makeLocalUserId(),
        username,
        bestFloor: reachedFloor,
        bestFloors,
        source: 'local',
        ...passwordRecord
    };
    users[username] = user;
    saveLocalUsers(users);
    updateLocalLeaderboard(user, reachedFloor, mode);
    return normalizeUser(user);
}

async function loginLocalUser(username, password) {
    const users = getLocalUsers();
    const user = users[username];
    if (!user || !(await verifyLocalPassword(user, password))) throw apiError('账号或密码错误。', 401);
    return normalizeUser(user);
}

async function changeLocalPassword(user, currentPassword, newPassword) {
    const users = getLocalUsers();
    const local = users[user.username];
    if (!local || !(await verifyLocalPassword(local, currentPassword))) throw apiError('当前密码错误。', 401);
    Object.assign(local, await makeLocalPasswordRecord(newPassword));
    users[user.username] = local;
    saveLocalUsers(users);
}

function apiError(message, status) {
    const err = new Error(message || '请求失败');
    err.status = status || 0;
    return err;
}

async function apiRequest(path, options = {}) {
    const res = await fetch(path, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {})
        }
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw apiError(data.error, res.status);
    return data;
}

function normalizeLeaderboardEntry(entry) {
    if (!entry) return null;
    const id = entry.id || entry.userId || entry.user_id || '';
    const username = entry.username || entry.name || '';
    const bestFloor = toFloorNumber(entry.bestFloor || entry.best_floor || entry.floor, 0);
    const mode = normalizeGameMode(entry.mode, LEGACY_GAME_MODE);
    if (!username || bestFloor < 1) return null;
    return {
        id: String(id),
        username: String(username),
        bestFloor,
        mode,
        updatedAt: entry.updatedAt || entry.updated_at || ''
    };
}

function getLocalLeaderboard(mode = leaderboardMode) {
    const normalizedMode = normalizeGameMode(mode);
    const entries = readJson(LOCAL_LEADERBOARD_KEY, []);
    if (!Array.isArray(entries)) return [];
    return entries
        .map(normalizeLeaderboardEntry)
        .filter(entry => entry && entry.mode === normalizedMode);
}

function saveLocalLeaderboard(entries) {
    writeJson(LOCAL_LEADERBOARD_KEY, entries.slice(0, 40));
}

function updateLocalLeaderboard(user, floor, mode = getActiveGameMode()) {
    if (!user) return;
    const bestFloor = toFloorNumber(floor, 1);
    const normalizedMode = normalizeGameMode(mode);
    const now = new Date().toISOString();
    const rawEntries = readJson(LOCAL_LEADERBOARD_KEY, []);
    const entries = Array.isArray(rawEntries) ? rawEntries.map(normalizeLeaderboardEntry).filter(Boolean) : [];
    const existing = entries.find(entry =>
        entry.mode === normalizedMode && (entry.id === user.id || entry.username === user.username)
    );
    if (existing) {
        existing.id = user.id;
        existing.username = user.username;
        existing.mode = normalizedMode;
        existing.bestFloor = Math.max(existing.bestFloor, bestFloor);
        existing.updatedAt = now;
    } else {
        entries.push({ id: user.id, username: user.username, mode: normalizedMode, bestFloor, updatedAt: now });
    }
    entries.sort((a, b) =>
        a.mode.localeCompare(b.mode) ||
        b.bestFloor - a.bestFloor ||
        a.username.localeCompare(b.username, 'zh-Hans-CN')
    );
    saveLocalLeaderboard(entries);
}

function saveLocalUserProgress(user) {
    if (!user || user.source !== 'local') return;
    const users = getLocalUsers();
    const local = users[user.username];
    if (!local) return;
    local.bestFloors = normalizeBestFloors(user);
    local.bestFloor = Math.max(local.bestFloors.easy, local.bestFloors.hard);
    users[user.username] = local;
    saveLocalUsers(users);
}

function updateUserPanel() {
    const user = currentUser;
    if (!currentUsernameEl || !currentUserBestEl || !registerOpenBtn) return;
    const modeConfig = getGameModeConfig(selectedMode);
    const bestFloor = user ? getUserBestFloor(user, selectedMode) : 1;
    const gold = getGoldBalance();
    currentUsernameEl.textContent = user ? user.username : '游客';
    currentUserBestEl.textContent = user ? `${modeConfig.shortLabel}最高第 ${bestFloor} 层 · 金币 ${gold}` : `金币 ${gold}`;
    registerOpenBtn.textContent = user ? '切换账号' : '登录/注册';
    if (changePasswordOpenBtn) changePasswordOpenBtn.classList.toggle('hidden', !user);
}

function setRegisterMessage(text, type = '') {
    registerMessage.textContent = text;
    registerMessage.className = `form-message ${type}`.trim();
}

function showRegisterScreen() {
    registerScreen.classList.remove('hidden');
    usernameInput.value = currentUser ? currentUser.username : '';
    passwordInput.value = '';
    setRegisterMessage('');
    setTimeout(() => (currentUser ? passwordInput : usernameInput).focus(), 0);
}

function closeRegisterScreen() {
    registerScreen.classList.add('hidden');
}

function setChangePasswordMessage(text, type = '') {
    changePasswordMessage.textContent = text;
    changePasswordMessage.className = `form-message ${type}`.trim();
}

function showChangePasswordScreen() {
    if (!currentUser) {
        showRegisterScreen();
        return;
    }
    changePasswordScreen.classList.remove('hidden');
    currentPasswordInput.value = '';
    newPasswordInput.value = '';
    setChangePasswordMessage('');
    setTimeout(() => currentPasswordInput.focus(), 0);
}

function closeChangePasswordScreen() {
    changePasswordScreen.classList.add('hidden');
}

async function handleRegisterSubmit(event) {
    if (event) event.preventDefault();
    const username = cleanUsername(usernameInput.value);
    const password = passwordInput.value;
    const validationError = validateUsername(username);
    if (validationError) {
        setRegisterMessage(validationError, 'error');
        return;
    }
    const passwordError = validatePassword(password);
    if (passwordError) {
        setRegisterMessage(passwordError, 'error');
        return;
    }

    registerSubmitBtn.disabled = true;
    setRegisterMessage('正在创建玩家...');

    const reachedFloor = G ? toFloorNumber(G.floor, 1) : 1;

    try {
        const data = await apiRequest('/api/register', {
            method: 'POST',
            body: JSON.stringify({ username, password })
        });
        const user = normalizeUser({
            id: data.user.id,
            username: data.user.username,
            bestFloor: Math.max(reachedFloor, data.user.bestFloor || data.user.best_floor || 1),
            bestFloorEasy: data.user.bestFloorEasy || data.user.best_floor_easy,
            bestFloorHard: data.user.bestFloorHard || data.user.best_floor_hard,
            source: 'cloud'
        });
        saveUserProfile(user);
        recordFloorProgress(Math.max(reachedFloor, getUserBestFloor(user, getActiveGameMode())));
        setRegisterMessage('注册成功。', 'success');
        setTimeout(closeRegisterScreen, 500);
    } catch(e) {
        if (e.status === 409) {
            setRegisterMessage('这个账号已被占用。', 'error');
        } else if (e.status === 400) {
            setRegisterMessage(e.message || '账号或密码不符合要求。', 'error');
        } else {
            try {
                const user = await registerLocalUser(username, password, reachedFloor);
                saveUserProfile(user);
                setRegisterMessage('已创建本地账号，连接 Cloudflare 后会使用云端账号。', 'success');
                setTimeout(closeRegisterScreen, 900);
            } catch(localError) {
                setRegisterMessage(localError.message || '本地注册失败。', 'error');
            }
        }
    } finally {
        registerSubmitBtn.disabled = false;
    }
}

async function handleLoginSubmit() {
    const username = cleanUsername(usernameInput.value);
    const password = passwordInput.value;
    const validationError = validateUsername(username);
    const passwordError = validatePassword(password);
    if (validationError || passwordError) {
        setRegisterMessage(validationError || passwordError, 'error');
        return;
    }

    loginSubmitBtn.disabled = true;
    setRegisterMessage('正在登录...');

    try {
        const data = await apiRequest('/api/login', {
            method: 'POST',
            body: JSON.stringify({ username, password })
        });
        saveUserProfile(normalizeUser({
            id: data.user.id,
            username: data.user.username,
            bestFloor: data.user.bestFloor || data.user.best_floor || 1,
            bestFloorEasy: data.user.bestFloorEasy || data.user.best_floor_easy,
            bestFloorHard: data.user.bestFloorHard || data.user.best_floor_hard,
            source: 'cloud'
        }));
        setRegisterMessage('登录成功。', 'success');
        setTimeout(closeRegisterScreen, 500);
    } catch(e) {
        if (e.status === 401 || e.status === 404) {
            setRegisterMessage('账号或密码错误。', 'error');
        } else {
            try {
                saveUserProfile(await loginLocalUser(username, password));
                setRegisterMessage('已登录本地账号。', 'success');
                setTimeout(closeRegisterScreen, 500);
            } catch(localError) {
                setRegisterMessage('云端暂不可用，且本地没有这个账号。', 'error');
            }
        }
    } finally {
        loginSubmitBtn.disabled = false;
    }
}

async function handleChangePasswordSubmit(event) {
    event.preventDefault();
    if (!currentUser) return;

    const currentPassword = currentPasswordInput.value;
    const newPassword = newPasswordInput.value;
    const passwordError = validatePassword(newPassword);
    if (passwordError) {
        setChangePasswordMessage(passwordError, 'error');
        return;
    }

    changePasswordSubmitBtn.disabled = true;
    setChangePasswordMessage('正在保存...');

    try {
        if (currentUser.source === 'cloud') {
            await apiRequest('/api/password', {
                method: 'POST',
                body: JSON.stringify({
                    userId: currentUser.id,
                    currentPassword,
                    newPassword
                })
            });
        } else {
            await changeLocalPassword(currentUser, currentPassword, newPassword);
        }
        setChangePasswordMessage('密码已修改。', 'success');
        setTimeout(closeChangePasswordScreen, 700);
    } catch(e) {
        setChangePasswordMessage(e.message || '修改密码失败。', 'error');
    } finally {
        changePasswordSubmitBtn.disabled = false;
    }
}

function renderLeaderboard(entries, source) {
    leaderboardList.innerHTML = '';
    const modeConfig = getGameModeConfig(leaderboardMode);
    if (!entries.length) {
        const empty = document.createElement('div');
        empty.className = 'leaderboard-empty';
        empty.textContent = `${modeConfig.label}暂无排行记录`;
        leaderboardList.appendChild(empty);
        leaderboardMessage.textContent = '';
        return;
    }

    entries.slice(0, 10).forEach((entry, index) => {
        const row = document.createElement('div');
        row.className = 'leaderboard-row';
        if (currentUser && entry.id === currentUser.id) row.classList.add('me');

        const rank = document.createElement('span');
        rank.className = 'leaderboard-rank';
        rank.textContent = `#${index + 1}`;

        const name = document.createElement('span');
        name.className = 'leaderboard-name';
        name.textContent = entry.username;

        const floor = document.createElement('span');
        floor.className = 'leaderboard-floor';
        floor.textContent = `第 ${entry.bestFloor} 层`;

        row.append(rank, name, floor);
        leaderboardList.appendChild(row);
    });

    leaderboardMessage.textContent = `${modeConfig.label} · ${source === 'local' ? '本地榜单' : '云端榜单'}`;
}

async function refreshLeaderboard() {
    leaderboardList.innerHTML = '<div class="leaderboard-empty">读取中...</div>';
    leaderboardMessage.textContent = '';
    try {
        const data = await apiRequest(`/api/leaderboard?mode=${encodeURIComponent(leaderboardMode)}`);
        const entries = (data.entries || []).map(normalizeLeaderboardEntry).filter(Boolean);
        renderLeaderboard(entries, 'cloud');
    } catch(e) {
        renderLeaderboard(getLocalLeaderboard(leaderboardMode), 'local');
    }
}

function showLeaderboardScreen() {
    mainMenu.classList.add('hidden');
    leaderboardMode = selectedMode;
    updateModeButtons();
    leaderboardScreen.classList.remove('hidden');
    refreshLeaderboard();
}

function closeLeaderboardScreen() {
    leaderboardScreen.classList.add('hidden');
    mainMenu.classList.remove('hidden');
}

function recordFloorProgress(floor) {
    if (!currentUser) return;
    const mode = getActiveGameMode();
    const bestFloor = Math.max(getUserBestFloor(currentUser, mode), toFloorNumber(floor, 1));
    currentUser.bestFloors = normalizeBestFloors(currentUser);
    if (bestFloor > getUserBestFloor(currentUser, mode)) {
        currentUser.bestFloors[mode] = bestFloor;
        currentUser.bestFloor = getUserBestFloor(currentUser, selectedMode);
        saveUserProfile(currentUser);
    } else {
        updateUserPanel();
    }
    saveLocalUserProgress(currentUser);

    updateLocalLeaderboard(currentUser, bestFloor, mode);

    if (currentUser.source !== 'cloud') return;
    apiRequest('/api/score', {
        method: 'POST',
        body: JSON.stringify({ userId: currentUser.id, floor: bestFloor, mode })
    }).catch(() => {});
}

// ============================================================
// MAIN MENU
// ============================================================
function showMainMenu() {
    // Hide all game screens
    gameOverScreen.classList.add('hidden');
    rewardScreen.classList.add('hidden');
    upgradeScreen.classList.add('hidden');
    bossChoiceScreen.classList.add('hidden');
    removeCardScreen.classList.add('hidden');
    pileViewScreen.classList.add('hidden');
    tutorialScreen.classList.add('hidden');
    registerScreen.classList.add('hidden');
    changePasswordScreen.classList.add('hidden');
    leaderboardScreen.classList.add('hidden');
    floorBanner.classList.add('hidden');
    saveToast.classList.add('hidden');
    handContainer.innerHTML = '';
    updateUserPanel();

    // Check for save data
    if (hasSaveData()) {
        loadGameBtn.disabled = false;
    } else {
        loadGameBtn.disabled = true;
    }

    mainMenu.classList.remove('hidden');
}

newGameBtn.onclick = () => {
    mainMenu.classList.add('hidden');
    deleteSave();
    newGame(selectedMode);
};

loadGameBtn.onclick = () => {
    const loadType = loadGame();
    if (loadType) {
        mainMenu.classList.add('hidden');
        if (loadType === 'snapshot') {
            resumeSavedGame();
        } else {
            startFloor();
        }
    }
};

cardGuideBtn.onclick = () => {
    mainMenu.classList.add('hidden');
    showCardGuide(true);
};

registerOpenBtn.onclick = () => showRegisterScreen();
cancelRegisterBtn.onclick = () => closeRegisterScreen();
registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    handleLoginSubmit();
});
registerSubmitBtn.onclick = () => handleRegisterSubmit();
changePasswordOpenBtn.onclick = () => showChangePasswordScreen();
cancelChangePasswordBtn.onclick = () => closeChangePasswordScreen();
changePasswordForm.addEventListener('submit', handleChangePasswordSubmit);
leaderboardBtn.onclick = () => showLeaderboardScreen();
refreshLeaderboardBtn.onclick = () => refreshLeaderboard();
closeLeaderboardBtn.onclick = () => closeLeaderboardScreen();
modeChoiceButtons.forEach(button => {
    button.onclick = () => setSelectedMode(button.dataset.modeChoice);
});
leaderboardModeButtons.forEach(button => {
    button.onclick = () => {
        leaderboardMode = normalizeGameMode(button.dataset.leaderboardMode);
        updateModeButtons();
        refreshLeaderboard();
    };
});
if (soundToggleBtn) soundToggleBtn.onclick = () => toggleSound();
deckPile.onclick = () => showPileView();
closePileViewBtn.onclick = () => pileViewScreen.classList.add('hidden');
bossAddCardBtn.onclick = () => {
    bossChoiceScreen.classList.add('hidden');
    showRewardScreen(afterBossDeckChoice);
};
bossRemoveCardBtn.onclick = () => {
    bossChoiceScreen.classList.add('hidden');
    showRemoveCardScreen();
};
skipRemoveBtn.onclick = () => {
    removeCardScreen.classList.add('hidden');
    afterBossDeckChoice();
};

document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    if (event.target.closest('#sound-toggle-btn')) return;
    if (event.target.closest('button')) playSound('click', 0.55);
});

saveGameBtn.onclick = () => {
    if (!G) return;
    if (G.acting) {
        showSaveToast('动作结算中，稍后再保存', 'error');
        return;
    }
    if (saveGame()) {
        showSaveToast('已覆盖当前存档');
    }
};

// Save & Quit button during gameplay
saveQuitBtn.onclick = () => {
    if (!G) return;
    if (G.acting) {
        showSaveToast('动作结算中，稍后再保存', 'error');
        return;
    }
    saveGame();
    showMainMenu();
};

// ============================================================
// CARD GUIDE
// ============================================================
function showCardGuide(fromMenu) {
    cardGuideScreen.classList.remove('hidden');
    populateGuideTab('cards');

    document.querySelectorAll('.guide-tab').forEach(tab => {
        tab.onclick = () => {
            document.querySelectorAll('.guide-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            populateGuideTab(tab.dataset.tab);
        };
    });

    closeGuideBtn.onclick = () => {
        cardGuideScreen.classList.add('hidden');
        if (fromMenu) mainMenu.classList.remove('hidden');
    };
}

function populateGuideTab(tab) {
    if (tab === 'cards') {
        const progress = getPlayerProgress();
        const bundleRemaining = STARTER_BUNDLE_CARDS.filter(id => !isCardUnlocked(id)).length;
        guideBody.innerHTML = `
            <div class="guide-wallet">金币余额：<strong>${getGoldBalance()}</strong></div>
            <div class="starter-bundle-panel ${progress.starterBundleClaimed ? 'claimed' : ''}">
                <div>
                    <strong>新手礼包</strong>
                    <span>${progress.starterBundleClaimed ? '已领取' : `可解锁 ${bundleRemaining} 张普通卡`}</span>
                </div>
                <button id="claim-starter-bundle-btn" class="btn-gold starter-bundle-btn" ${progress.starterBundleClaimed ? 'disabled' : ''}>
                    ${progress.starterBundleClaimed ? '已领取' : '领取礼包'}
                </button>
            </div>
            <div class="guide-card-grid unlock-card-grid"></div>
        `;
        const starterBundleBtn = document.getElementById('claim-starter-bundle-btn');
        if (starterBundleBtn) {
            starterBundleBtn.onclick = () => {
                if (claimStarterBundle()) populateGuideTab('cards');
            };
        }
        const grid = guideBody.querySelector('.guide-card-grid');
        const cardIds = [...BASIC_UNLOCKED_CARDS, ...REWARD_POOL, ...SPECIAL_CARD_POOL];
        cardIds.forEach(id => {
            const card = { ...CARDS[id] };
            const unlocked = isCardUnlocked(id);
            const unlockable = UNLOCKABLE_CARD_POOL.includes(id);
            const price = getUnlockPrice(id);
            const entry = document.createElement('div');
            entry.className = 'guide-card-entry';
            if (!unlocked) entry.classList.add('locked-entry');
            if (isSpecialCard(id)) entry.classList.add('special-entry');

            const el = buildCardEl(card, false);
            if (!unlocked) el.classList.add('locked-card');
            entry.appendChild(el);

            const status = document.createElement('div');
            status.className = 'card-unlock-status';
            if (unlocked && BASIC_UNLOCKED_CARDS.includes(id)) {
                status.textContent = '初始拥有';
            } else if (unlocked) {
                status.textContent = '已解锁';
            } else if (unlockable) {
                const button = document.createElement('button');
                button.className = 'btn-gold unlock-card-btn';
                button.disabled = getGoldBalance() < price;
                button.textContent = getGoldBalance() >= price ? `解锁 ${price}` : `金币不足 ${price}`;
                button.onclick = () => {
                    if (unlockCard(id)) populateGuideTab('cards');
                };
                status.appendChild(button);
            }

            entry.appendChild(status);
            grid.appendChild(entry);

            // Show upgraded version too
            if (unlocked && CARD_UPGRADES[id]) {
                const upCard = { ...CARDS[id], ...CARD_UPGRADES[id], upgraded: true };
                const upEl = buildCardEl(upCard, false);
                const upEntry = document.createElement('div');
                upEntry.className = 'guide-card-entry upgraded-entry';
                if (isSpecialCard(id)) upEntry.classList.add('special-entry');
                upEntry.appendChild(upEl);
                const upStatus = document.createElement('div');
                upStatus.className = 'card-unlock-status';
                upStatus.textContent = '升级预览';
                upEntry.appendChild(upStatus);
                grid.appendChild(upEntry);
            }
        });
    } else if (tab === 'status') {
        guideBody.innerHTML = `
            <div class="guide-status-list">
                <div class="guide-status-item">
                    <span class="guide-status-icon">🛡️</span>
                    <div><b>格挡</b><br>在本回合内减少受到的伤害。回合开始时清零。</div>
                </div>
                <div class="guide-status-item">
                    <span class="guide-status-icon">💪</span>
                    <div><b>力量</b><br>每点力量增加攻击卡造成的伤害。战斗内永久生效。</div>
                </div>
                <div class="guide-status-item">
                    <span class="guide-status-icon">☠️</span>
                    <div><b>中毒</b><br>回合开始时受到等于中毒层数的伤害，然后层数减 1。</div>
                </div>
                <div class="guide-status-item">
                    <span class="guide-status-icon">😵</span>
                    <div><b>虚弱</b><br>攻击伤害降低 25%。每回合减少 1 层。</div>
                </div>
                <div class="guide-status-item">
                    <span class="guide-status-icon">🔥</span>
                    <div><b>火焰光环</b><br>每回合开始时自动对敌人造成伤害。战斗内永久生效。</div>
                </div>
                <div class="guide-status-item">
                    <span class="guide-status-icon">⚡</span>
                    <div><b>能量</b><br>每回合恢复。出牌消耗能量，初始每回合 3 点。</div>
                </div>
                <div class="guide-status-item">
                    <span class="guide-status-icon">⚔️</span>
                    <div><b>攻击卡</b><br>红色边框。对敌人造成伤害，受力量加成。</div>
                </div>
                <div class="guide-status-item">
                    <span class="guide-status-icon">🛡️</span>
                    <div><b>技能卡</b><br>蓝色边框。提供格挡、治疗、增益等辅助效果。</div>
                </div>
                <div class="guide-status-item">
                    <span class="guide-status-icon">👑</span>
                    <div><b>能力卡</b><br>金色边框。打出后永久生效，从本场战斗牌组中移除。</div>
                </div>
                <div class="guide-status-item">
                    <span class="guide-status-icon">💀</span>
                    <div><b>诅咒卡</b><br>紫色边框。无法打出，占用手牌空间。击败 Boss 可清除。</div>
                </div>
            </div>
        `;
    }
}

// ============================================================
// UTILITIES
// ============================================================
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
}

function drawCards(n) {
    const drawn = [];
    for (let i = 0; i < n; i++) {
        if (G.player.deck.length === 0) {
            if (G.player.discard.length === 0) break;
            G.player.deck = [...G.player.discard];
            G.player.discard = [];
            shuffle(G.player.deck);
        }
        const card = G.player.deck.pop();
        G.player.hand.push(card);
        drawn.push(card.uid);
    }
    recentlyDrawnUids = drawn;
    renderHand();
    recentlyDrawnUids = [];
    if (drawn.length) playSound('draw', Math.min(1.2, 0.65 + drawn.length * 0.08));
    updateUI();
}

function shakeCard(index) {
    const el = handContainer.children[index];
    if (el) {
        el.classList.add('shake');
        setTimeout(() => el.classList.remove('shake'), 400);
    }
}

function floatText(text, target, cls = '') {
    const r = target.getBoundingClientRect();
    const el = document.createElement('div');
    el.className = `dmg-text ${cls}`;
    el.textContent = text;
    el.style.left = (r.left + r.width / 2 - 20 + (Math.random() - 0.5) * 40) + 'px';
    el.style.top = (r.top + r.height / 3) + 'px';
    dmgContainer.appendChild(el);
    setTimeout(() => el.remove(), 1200);
}

function playTransientAnimation(el, cls, duration = 500) {
    if (!el) return;
    el.classList.remove(cls);
    void el.offsetWidth;
    el.classList.add(cls);
    setTimeout(() => el.classList.remove(cls), duration);
}

function battleFlash(type) {
    if (!gameContainer) return;
    const flash = document.createElement('div');
    flash.className = `battle-flash ${type}`;
    gameContainer.appendChild(flash);
    setTimeout(() => flash.remove(), 900);
}

function animateCardCast(sourceEl, targetEl) {
    if (!sourceEl || !targetEl) return;

    const source = sourceEl.getBoundingClientRect();
    const target = targetEl.getBoundingClientRect();
    const clone = sourceEl.cloneNode(true);
    const x = target.left + target.width / 2 - (source.left + source.width / 2);
    const y = target.top + target.height / 2 - (source.top + source.height / 2);

    clone.classList.remove('unplayable', 'draw-enter', 'shake');
    clone.classList.add('card-cast-clone');
    clone.style.left = `${source.left}px`;
    clone.style.top = `${source.top}px`;
    clone.style.width = `${source.width}px`;
    clone.style.height = `${source.height}px`;
    clone.style.setProperty('--cast-x', `${x}px`);
    clone.style.setProperty('--cast-y', `${y}px`);
    clone.style.setProperty('--cast-tilt', targetEl === enemySprite ? '8deg' : '-8deg');

    document.body.appendChild(clone);
    sourceEl.style.visibility = 'hidden';
    setTimeout(() => clone.remove(), 560);
}

// ============================================================
// UI RENDERING
// ============================================================
function buildCardEl(card, interactive = true) {
    const el = document.createElement('div');
    const canPlay = interactive && G.player.energy >= card.cost && card.type !== 'curse' &&
                    !(card.firstOnly && G.played > 0);
    let classes = `card card-type-${card.type}`;
    if (!canPlay && interactive) classes += ' unplayable';
    if (card.upgraded) classes += ' upgraded';
    if (isSpecialCard(card.id)) classes += ' special-card';
    el.className = classes;

    const costDisplay = card.type === 'curse' ? '✕' : card.cost;

    el.innerHTML = `
        <div class="card-cost">${costDisplay}</div>
        <span class="card-type-badge">${card.type}</span>
        <div class="card-title">${card.name}</div>
        <div class="card-art art-${card.id}"></div>
        <div class="card-desc">${card.desc}</div>
    `;
    return el;
}

function renderHand() {
    handContainer.innerHTML = '';
    G.player.hand.forEach((card) => {
        const el = buildCardEl(card, true);
        const drawIndex = recentlyDrawnUids.indexOf(card.uid);
        if (drawIndex !== -1) {
            el.classList.add('draw-enter');
            el.style.setProperty('--card-delay', `${drawIndex * 45}ms`);
        }
        el.onclick = () => playCard(card.uid);
        handContainer.appendChild(el);
    });
}

function updateUI() {
    if (!G) return;
    const p = G.player, e = G.enemy;

    // Player health
    playerHealthText.textContent = `${Math.max(0, p.hp)}/${p.maxHp}`;
    playerHealthBar.style.width = `${Math.max(0, (p.hp / p.maxHp) * 100)}%`;

    // Player statuses
    playerStatus.innerHTML = '';
    if (p.block > 0) playerStatus.innerHTML += `<div class="status-badge block">🛡️${p.block}</div>`;
    if (p.str > 0) playerStatus.innerHTML += `<div class="status-badge strength">💪${p.str}</div>`;
    if (p.flameAura > 0) playerStatus.innerHTML += `<div class="status-badge flame">🔥${p.flameAura}</div>`;

    // Enemy health
    enemyHealthText.textContent = `${Math.max(0, e.hp)}/${e.maxHp}`;
    enemyHealthBar.style.width = `${Math.max(0, (e.hp / e.maxHp) * 100)}%`;

    // Enemy statuses
    enemyStatus.innerHTML = '';
    if (e.block > 0) enemyStatus.innerHTML += `<div class="status-badge block">🛡️${e.block}</div>`;
    if (e.str > 0) enemyStatus.innerHTML += `<div class="status-badge strength">💪${e.str}</div>`;
    if (e.poison > 0) enemyStatus.innerHTML += `<div class="status-badge poison">☠️${e.poison}</div>`;
    if (e.weak > 0) enemyStatus.innerHTML += `<div class="status-badge weak">😵${e.weak}</div>`;

    // Energy & piles
    currentEnergyEl.textContent = p.energy;
    maxEnergyEl.textContent = p.maxEnergy;
    if (goldCountEl) goldCountEl.textContent = getGoldBalance();
    deckCountEl.textContent = p.deck.length;
    discardCountEl.textContent = p.discard.length;

    // Update dynamic intent
    if (e.intent) {
        renderEnemyIntent(false);
    } else {
        enemyIntentBox.classList.remove('visible');
    }

    // Update playable states on hand cards
    Array.from(handContainer.children).forEach((el, i) => {
        const c = p.hand[i];
        if (!c) return;
        const canPlay = p.energy >= c.cost && c.type !== 'curse' && !(c.firstOnly && G.played > 0);
        el.classList.toggle('unplayable', !canPlay);
    });
}

// ============================================================
// START — Show main menu instead of auto-starting
// ============================================================
updateSoundButton();
updateModeButtons();
showMainMenu();
