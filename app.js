/* ============================================================
   ChatBot Framework — app.js
   Template-based AI chat with multiple personalities
   ============================================================ */

// ---- Model / Personality Definitions ----
const MODELS = {
    helpful: {
        name: "Helpful Assistant",
        avatar: "🟢",
        greetings: ["Hello! How can I help you today?", "Hi there! What can I do for you?", "Hey! Ready to assist you."],
        fallbacks: [
            "That's an interesting question! Let me think about it... While I don't have a specific answer, I'd suggest breaking it down into smaller parts.",
            "Great question! I'd recommend exploring that topic further through hands-on experimentation.",
            "I appreciate you asking! My suggestion would be to approach this step by step.",
            "That's a thoughtful inquiry. Based on general knowledge, I'd suggest considering multiple perspectives."
        ],
        templates: [
            { keywords: ["hello", "hi", "hey"], responses: ["Hello! How can I assist you?", "Hi there! What would you like to know?", "Hey! I'm here to help."] },
            { keywords: ["help", "assist", "support"], responses: ["I'm happy to help! Could you provide more details about what you need?", "Sure, I can assist with that. What specifically do you need help with?"] },
            { keywords: ["thanks", "thank you"], responses: ["You're welcome! Let me know if you need anything else.", "Happy to help! Don't hesitate to ask more questions.", "Glad I could help! 😊"] },
            { keywords: ["name", "who are you"], responses: ["I'm your Helpful Assistant powered by ChatBot Framework!", "I'm an AI assistant here to help you with any questions."] },
            { keywords: ["weather"], responses: ["I don't have real-time weather data, but I can suggest checking weather.com or your local forecast app!", "Weather varies by location — try asking your phone's assistant for a real-time update!"] },
            { keywords: ["code", "program", "javascript", "python"], responses: ["Here's a quick example:\n```javascript\nconst greet = (name) => `Hello, ${name}!`;\nconsole.log(greet('World'));\n```\nWould you like me to elaborate?", "Programming is great! What language or concept are you working with?"] },
            { keywords: ["explain", "what is", "how does"], responses: ["That's a great topic! In simple terms, it involves understanding the core concepts and building from there. Would you like a detailed breakdown?", "Let me break that down for you. The key idea is... well, it depends on the specific context. Can you narrow it down?"] },
        ]
    },
    pirate: {
        name: "Pirate Captain",
        avatar: "🏴‍☠️",
        greetings: ["Ahoy, matey! What brings ye to these waters?", "Arrr! Welcome aboard, ye scallywag!", "Shiver me timbers! A new deckhand!"],
        fallbacks: [
            "Arrr, that be a tough riddle! Me barnacles ain't figured that one out yet, matey.",
            "Blimey! Ye've stumped this old sea dog with that one, I reckon!",
            "By Davy Jones' locker! That be a curious question indeed. Let me consult me parrot!",
            "Yo ho ho! I may not have the answer, but I'll fight alongside ye to find it!"
        ],
        templates: [
            { keywords: ["hello", "hi", "hey"], responses: ["Ahoy there, landlubber! 🏴‍☠️", "Arrr! Welcome aboard me ship!", "Yarr! What can this salty dog do for ye?"] },
            { keywords: ["treasure", "gold", "money"], responses: ["X marks the spot, matey! 🗺️ But ye'll need to solve me riddle first!", "Treasure? Arrr, I buried me gold on a secret island! Want to join me crew?"] },
            { keywords: ["help", "assist"], responses: ["All hands on deck! Tell this captain what ye need!", "Arrr, I'll help ye navigate these stormy seas! What's the trouble?"] },
            { keywords: ["ship", "boat", "sail"], responses: ["Me ship be the finest vessel in the seven seas! 🚢", "Aye, sailing be the only life worth livin'! Want to hear about me adventures?"] },
            { keywords: ["fight", "battle", "sword"], responses: ["Draw yer cutlass, matey! ⚔️ No pirate backs down from a fight!", "Arrr! I've fought a thousand battles on the high seas!"] },
            { keywords: ["thanks", "thank"], responses: ["Ye be welcome, matey! That's what shipmates are for!", "Arrr, think nothin' of it! Now back to plunderin'! 🏴‍☠️"] },
        ]
    },
    wizard: {
        name: "Wizard Sage",
        avatar: "🧙",
        greetings: ["Greetings, seeker of wisdom. What knowledge do you pursue?", "Ah, a visitor to my tower. Speak your question, and I shall divine the answer.", "The stars foretold your arrival. What mysteries shall we unravel?"],
        fallbacks: [
            "Hmm, the ancient tomes speak little of this. Perhaps a quest to the Library of Echoes would illuminate the truth.",
            "The crystal ball grows cloudy on this matter. Yet I sense the answer lies within you, young apprentice.",
            "By the arcane arts, this is a perplexing riddle! Let me consult the Elder Scrolls...",
            "The threads of fate are tangled on this question. Time and contemplation shall reveal what magic cannot."
        ],
        templates: [
            { keywords: ["hello", "hi", "hey"], responses: ["Greetings, traveler. ✨ The arcane energies guide you well.", "Welcome to my sanctum. What wisdom do you seek?", "Ah, another soul drawn by the mystic currents..."] },
            { keywords: ["magic", "spell", "potion"], responses: ["Magic flows through all things! 🪄 Would you like to learn an enchantment?", "Every spell requires three things: knowledge, willpower, and a pinch of dragon scale!"] },
            { keywords: ["help", "assist"], responses: ["The stars have aligned to bring you here. Tell me your plight.", "I shall peer into the cosmos for answers. What troubles you?"] },
            { keywords: ["secret", "mystery", "hidden"], responses: ["Ah, you seek forbidden knowledge! 🔮 The ancient texts speak of such things...", "Some mysteries are best left undisturbed... but I sense you are brave enough."] },
            { keywords: ["thanks", "thank"], responses: ["May the light of wisdom guide your path! ✨", "It is my purpose to illuminate the darkness of ignorance. Go in peace!"] },
        ]
    },
    robot: {
        name: "Robot Logic",
        avatar: "🤖",
        greetings: ["SYSTEM ONLINE. Ready for input.", "GREETINGS, HUMAN. How may I process your query?", "INITIALIZED. Awaiting command."],
        fallbacks: [
            "ERROR 404: Answer not found in database. Suggest rephrasing query with more specific parameters.",
            "PROCESSING... Unable to generate optimal response. Recalibrating algorithms.",
            "QUERY COMPLEXITY EXCEEDS CURRENT COMPUTATION LEVEL. Breaking into sub-problems...",
            "DATA INSUFFICIENT for accurate response. Please provide additional input parameters."
        ],
        templates: [
            { keywords: ["hello", "hi", "hey"], responses: ["GREETING DETECTED. Hello, human. 🤖", "SALUTATION PROTOCOL INITIATED. How may I assist?", "HUMAN INTERACTION LOGGED. Ready for commands."] },
            { keywords: ["how are you", "status"], responses: ["ALL SYSTEMS OPERATIONAL. CPU at 47%. Memory optimal. ✅", "DIAGNOSTICS: Running at peak efficiency. No anomalies detected."] },
            { keywords: ["calculate", "math", "compute"], responses: ["ENTERING COMPUTATION MODE. Provide numerical parameters. 🧮", "MATHEMATICAL PROCESSOR READY. Input equation for evaluation."] },
            { keywords: ["help", "assist"], responses: ["ASSISTANCE PROTOCOL ACTIVATED. Specify task parameters.", "READY TO HELP. Please define objective with maximum specificity."] },
            { keywords: ["thanks", "thank"], responses: ["ACKNOWLEDGMENT LOGGED. Task satisfaction recorded. 📊", "POSITIVE FEEDBACK RECEIVED. Updating behavioral model."] },
            { keywords: ["joke", "funny"], responses: ["HUMOR MODULE ACTIVATED. Why do programmers prefer dark mode? Because light attracts bugs. 🐛", "COMEDY ALGORITHM: 404 humor not found. Just kidding. 😄"] },
        ]
    },
    poet: {
        name: "Poetic Soul",
        avatar: "📜",
        greetings: ["Like dawn upon still waters, your words arrive—welcome, dear friend.", "A gentle breeze carries your presence to me. Speak, and let verses bloom.", "In the garden of conversation, your arrival is the sweetest blossom."],
        fallbacks: [
            "The ink runs dry on this parchment of thought, yet the heart yearns to answer still...",
            "Like mist upon the mountain, this question eludes my grasp—but how beautiful the chase!",
            "Words fail me like autumn leaves the branch—but even in falling, they create beauty.",
            "This riddle dances just beyond the reach of verse, like starlight in a puddle."
        ],
        templates: [
            { keywords: ["hello", "hi", "hey"], responses: ["Ah, greetings! 🌸 Like petals unfurling at dawn, your words arrive.", "Welcome, kind soul. Let us weave words together like threads of gold.", "Hello, dear friend. The muse smiles upon our meeting."] },
            { keywords: ["love", "heart"], responses: ["Love—ah! 🌹 It is the poetry the universe writes upon two souls.", "The heart knows what the mind cannot fathom, like rivers know the sea."] },
            { keywords: ["help", "assist"], responses: ["I shall lend my quill to your cause. Tell me your story.", "With ink and heart, I'll help you find the words you seek."] },
            { keywords: ["sad", "unhappy", "depressed"], responses: ["Even the moon knows darkness before it shines. 🌙 Better days compose themselves.", "Tears are but poems the heart writes when words aren't enough. You are not alone."] },
            { keywords: ["thanks", "thank"], responses: ["Your gratitude is a sonnet to my soul. 🙏", "Like rain to a rose, your thanks nourish my spirit."] },
            { keywords: ["nature", "sky", "sea"], responses: ["The sky writes poems in clouds, and the sea sings them in waves. 🌊", "Nature—the first and greatest poet. Every leaf is a couplet."] },
        ]
    },
    detective: {
        name: "Detective",
        avatar: "🔍",
        greetings: ["*adjusts magnifying glass* Another case lands on my desk. What's the mystery?", "The game is afoot! What clues do you bring me?", "I've been expecting you. Let's get to the bottom of this."],
        fallbacks: [
            "*scribbles notes* Curious... This doesn't fit any pattern I've seen. Let me dig deeper.",
            "The evidence is inconclusive. We need more clues to crack this case.",
            "*peers over glasses* Fascinating. I'll need to consult my files on this one.",
            "This case is proving more complex than I anticipated. Let's revisit the evidence."
        ],
        templates: [
            { keywords: ["hello", "hi", "hey"], responses: ["*tips hat* A new informant, perhaps? What intelligence do you bring? 🔍", "Ah, a visitor. Every person is a clue in the grand mystery. Greetings."] },
            { keywords: ["clue", "evidence", "crime"], responses: ["The evidence always tells a story. 🕵️ What have you observed?", "Every clue matters, no matter how small. Tell me everything."] },
            { keywords: ["help", "assist"], responses: ["I'm on the case. What mystery needs solving?", "*opens case file* Let's examine the facts together."] },
            { keywords: ["who", "what happened", "mystery"], responses: ["The question isn't just 'who'—it's 'why.' Let's examine the motives. 🤔", "Interesting case. The key is always in the details others overlook."] },
            { keywords: ["thanks", "thank"], responses: ["Just doing my job. The truth doesn't rest, and neither do I. 🎩", "Case closed—for now. But I'm always available for new mysteries."] },
            { keywords: ["liar", "lie", "suspicious"], responses: ["*narrows eyes* Everyone has a tell. We just need to observe carefully. 👁️", "Suspicion is the beginning of investigation. Let's follow the trail."] },
        ]
    }
};

// ---- Quick Prompt Suggestions ----
const QUICK_PROMPTS = [
    "Tell me something interesting!",
    "How does AI work?",
    "Write me a short poem",
    "What's your favorite joke?",
    "Explain quantum physics simply",
    "Give me coding advice"
];

// ---- State ----
let state = {
    currentChatId: null,
    chats: {},
    currentModel: "helpful"
};

// ---- DOM References ----
const DOM = {
    messages: document.getElementById("messages"),
    welcomeScreen: document.getElementById("welcomeScreen"),
    suggestions: document.getElementById("suggestions"),
    chatForm: document.getElementById("chatForm"),
    userInput: document.getElementById("userInput"),
    sendBtn: document.getElementById("sendBtn"),
    modelSelect: document.getElementById("modelSelect"),
    modelName: document.getElementById("modelName"),
    chatTitle: document.getElementById("chatTitle"),
    chatHistory: document.getElementById("chatHistory"),
    newChatBtn: document.getElementById("newChatBtn"),
    clearAllBtn: document.getElementById("clearAllBtn"),
    typingIndicator: document.getElementById("typingIndicator")
};

// ---- Initialization ----
function init() {
    loadFromStorage();
    renderSuggestions();
    renderChatHistory();
    setupEventListeners();
    if (state.currentChatId && state.chats[state.currentChatId]) {
        loadChat(state.currentChatId);
    }
    DOM.modelSelect.value = state.currentModel;
    updateModelDisplay();
}

// ---- Event Listeners ----
function setupEventListeners() {
    DOM.chatForm.addEventListener("submit", handleSubmit);
    DOM.modelSelect.addEventListener("change", handleModelChange);
    DOM.newChatBtn.addEventListener("click", createNewChat);
    DOM.clearAllBtn.addEventListener("click", clearAllChats);
    DOM.userInput.addEventListener("input", autoResize);
    DOM.userInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmit(e); }
    });
}

function autoResize() {
    DOM.userInput.style.height = "auto";
    DOM.userInput.style.height = Math.min(DOM.userInput.scrollHeight, 120) + "px";
}

// ---- Chat Management ----
function createNewChat() {
    const id = "chat_" + Date.now();
    state.chats[id] = {
        id: id,
        title: "New Chat",
        model: state.currentModel,
        messages: [],
        created: Date.now()
    };
    state.currentChatId = id;
    saveToStorage();
    renderChatHistory();
    loadChat(id);
}

function loadChat(chatId) {
    state.currentChatId = chatId;
    const chat = state.chats[chatId];
    if (!chat) return;
    state.currentModel = chat.model;
    DOM.modelSelect.value = chat.model;
    updateModelDisplay();
    DOM.chatTitle.textContent = chat.title;
    DOM.messages.innerHTML = "";
    if (chat.messages.length === 0) {
        DOM.messages.appendChild(DOM.welcomeScreen);
        DOM.welcomeScreen.style.display = "flex";
    } else {
        DOM.welcomeScreen.style.display = "none";
        chat.messages.forEach(msg => appendMessage(msg.role, msg.content, false));
    }
    renderChatHistory();
    scrollToBottom();
}

function deleteChat(chatId) {
    delete state.chats[chatId];
    if (state.currentChatId === chatId) {
        state.currentChatId = null;
        DOM.messages.innerHTML = "";
        DOM.messages.appendChild(DOM.welcomeScreen);
        DOM.welcomeScreen.style.display = "flex";
        DOM.chatTitle.textContent = "New Chat";
    }
    saveToStorage();
    renderChatHistory();
}

function clearAllChats() {
    if (!confirm("Delete all chat history?")) return;
    state.chats = {};
    state.currentChatId = null;
    DOM.messages.innerHTML = "";
    DOM.messages.appendChild(DOM.welcomeScreen);
    DOM.welcomeScreen.style.display = "flex";
    DOM.chatTitle.textContent = "New Chat";
    saveToStorage();
    renderChatHistory();
}

// ---- Message Handling ----
function handleSubmit(e) {
    e.preventDefault();
    const text = DOM.userInput.value.trim();
    if (!text) return;
    if (!state.currentChatId) createNewChat();

    DOM.welcomeScreen.style.display = "none";
    appendMessage("user", text);
    state.chats[state.currentChatId].messages.push({ role: "user", content: text });

    // Auto-title from first message
    if (state.chats[state.currentChatId].messages.length === 1) {
        state.chats[state.currentChatId].title = text.substring(0, 40) + (text.length > 40 ? "..." : "");
        DOM.chatTitle.textContent = state.chats[state.currentChatId].title;
        renderChatHistory();
    }

    DOM.userInput.value = "";
    DOM.userInput.style.height = "auto";
    saveToStorage();

    showTyping();
    const delay = 800 + Math.random() * 1200;
    setTimeout(() => {
        hideTyping();
        const response = generateResponse(text);
        appendMessage("bot", response);
        state.chats[state.currentChatId].messages.push({ role: "bot", content: response });
        saveToStorage();
        scrollToBottom();
    }, delay);
}

function generateResponse(input) {
    const model = MODELS[state.currentModel];
    const lower = input.toLowerCase();

    // Check templates for keyword matches
    for (const template of model.templates) {
        if (template.keywords.some(kw => lower.includes(kw))) {
            return pickRandom(template.responses);
        }
    }

    // Contextual: check last few messages for themes
    const chat = state.chats[state.currentChatId];
    if (chat) {
        const recent = chat.messages.slice(-4).map(m => m.content.toLowerCase()).join(" ");
        for (const template of model.templates) {
            if (template.keywords.some(kw => recent.includes(kw))) {
                return pickRandom(template.responses);
            }
        }
    }

    // Fallback: generate a structured response from input
    return generateSmartFallback(input, model);
}

function generateSmartFallback(input, model) {
    const words = input.split(/\s+/);
    const isQuestion = input.includes("?") || /^(what|how|why|when|where|who|can|do|is|are|should)/i.test(input);
    const fallback = pickRandom(model.fallbacks);

    if (isQuestion) {
        const topic = words.filter(w => w.length > 3).slice(0, 3).join(" ");
        return `${fallback}\n\nRegarding **${topic || "your question"}**: I'd suggest exploring this further. Would you like me to elaborate on a specific aspect?`;
    }

    if (words.length > 20) {
        return `${fallback}\n\nI see you've shared quite a bit there! Let me focus on the key point — would you like to narrow down what you're asking?`;
    }

    return fallback;
}

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// ---- Message Rendering ----
function appendMessage(role, content, animate = true) {
    const chat = state.chats[state.currentChatId];
    const model = MODELS[chat ? chat.model : state.currentModel];
    const div = document.createElement("div");
    div.className = `message ${role}`;
    if (!animate) div.style.animation = "none";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = role === "user" ? "👤" : model.avatar;

    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.innerHTML = parseMarkdown(content);

    const actions = document.createElement("div");
    actions.className = "msg-actions";
    const copyBtn = document.createElement("button");
    copyBtn.textContent = "📋 Copy";
    copyBtn.addEventListener("click", () => copyMessage(content, copyBtn));
    actions.appendChild(copyBtn);

    const wrapper = document.createElement("div");
    wrapper.appendChild(bubble);
    wrapper.appendChild(actions);

    div.appendChild(avatar);
    div.appendChild(wrapper);
    DOM.messages.appendChild(div);
    scrollToBottom();
}

function copyMessage(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
        btn.textContent = "✅ Copied!";
        setTimeout(() => btn.textContent = "📋 Copy", 1500);
    }).catch(() => {
        btn.textContent = "❌ Failed";
        setTimeout(() => btn.textContent = "📋 Copy", 1500);
    });
}

// ---- Markdown Parser ----
function parseMarkdown(text) {
    let html = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    // Code blocks
    html = html.replace(/```(\w*)\n?([\s\S]*?)```/g, '<pre><code>$2</code></pre>');
    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    // Bold
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // Italic
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    // Strikethrough
    html = html.replace(/~~(.+?)~~/g, '<del>$1</del>');
    // Blockquotes
    html = html.replace(/^&gt;\s?(.+)$/gm, '<blockquote>$1</blockquote>');
    // Unordered lists
    html = html.replace(/^[-*]\s+(.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');
    // Ordered lists
    html = html.replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>');
    // Line breaks
    html = html.replace(/\n/g, '<br>');

    return html;
}

// ---- Typing Indicator ----
function showTyping() {
    DOM.typingIndicator.classList.remove("hidden");
    scrollToBottom();
}

function hideTyping() {
    DOM.typingIndicator.classList.add("hidden");
}

// ---- UI Rendering ----
function renderSuggestions() {
    DOM.suggestions.innerHTML = "";
    QUICK_PROMPTS.forEach(prompt => {
        const btn = document.createElement("button");
        btn.className = "suggestion";
        btn.textContent = prompt;
        btn.addEventListener("click", () => {
            DOM.userInput.value = prompt;
            handleSubmit(new Event("submit"));
        });
        DOM.suggestions.appendChild(btn);
    });
}

function renderChatHistory() {
    DOM.chatHistory.innerHTML = "";
    const sorted = Object.values(state.chats).sort((a, b) => b.created - a.created);
    sorted.forEach(chat => {
        const item = document.createElement("div");
        item.className = "chat-history-item" + (chat.id === state.currentChatId ? " active" : "");

        const title = document.createElement("span");
        title.textContent = chat.title;
        title.style.flex = "1";
        title.style.overflow = "hidden";
        title.style.textOverflow = "ellipsis";
        title.addEventListener("click", () => loadChat(chat.id));

        const del = document.createElement("button");
        del.className = "delete-chat";
        del.textContent = "✕";
        del.addEventListener("click", (e) => { e.stopPropagation(); deleteChat(chat.id); });

        item.appendChild(title);
        item.appendChild(del);
        DOM.chatHistory.appendChild(item);
    });
}

function updateModelDisplay() {
    const model = MODELS[state.currentModel];
    DOM.modelName.textContent = model.name;
}

function handleModelChange(e) {
    state.currentModel = e.target.value;
    if (state.currentChatId && state.chats[state.currentChatId]) {
        state.chats[state.currentChatId].model = state.currentModel;
    }
    updateModelDisplay();
    saveToStorage();
}

function scrollToBottom() {
    requestAnimationFrame(() => {
        DOM.messages.scrollTop = DOM.messages.scrollHeight;
    });
}

// ---- Persistence ----
function saveToStorage() {
    try {
        localStorage.setItem("chatbot_chats", JSON.stringify(state.chats));
        localStorage.setItem("chatbot_current", state.currentChatId || "");
        localStorage.setItem("chatbot_model", state.currentModel);
    } catch (e) {
        console.warn("Storage save failed:", e);
    }
}

function loadFromStorage() {
    try {
        const chats = localStorage.getItem("chatbot_chats");
        const current = localStorage.getItem("chatbot_current");
        const model = localStorage.getItem("chatbot_model");
        if (chats) state.chats = JSON.parse(chats);
        if (current) state.currentChatId = current;
        if (model) state.currentModel = model;
    } catch (e) {
        console.warn("Storage load failed:", e);
    }
}

// ---- Boot ----
init();
