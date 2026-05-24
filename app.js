// ChatBot Framework — app.js

const aiResponses = {
    'mimo-v2.5': {
        name: 'MiMo V2.5',
        responses: [
            "That's a great question! As MiMo V2.5, I can help with that. Let me break it down for you step by step.\n\nFirst, let's consider the core concepts involved, then I'll provide a practical example you can use right away.",
            "Excellent topic! Here's my analysis:\n\n**Key Points:**\n1. The foundation matters most — build on solid principles\n2. Iterate quickly and test thoroughly\n3. Scale thoughtfully, not prematurely\n\nWould you like me to dive deeper into any of these areas?",
            "I'd be happy to help with that. Based on my training data and reasoning capabilities as MiMo V2.5, here's what I recommend:\n\n```python\n# Here's a practical example\nresult = process_data(input)\nreturn optimize(result)\n```\n\nThis approach is efficient and follows best practices.",
        ]
    },
    'default': {
        name: 'Assistant',
        responses: [
            "That's an interesting question. Let me provide a comprehensive answer.\n\nThe key factors to consider are:\n1. **Performance** — Optimize for speed where it matters\n2. **Reliability** — Handle edge cases gracefully\n3. **Maintainability** — Write clean, documented code\n\nFeel free to ask if you need more details on any point!",
            "Great question! Here's my take:\n\nThe most important thing is to start with a clear understanding of the problem space. Once you have that, the solution often becomes apparent.\n\nWould you like me to elaborate on any specific aspect?",
            "Let me help you with that. Based on my analysis, here are the key takeaways:\n\n- Start simple, then add complexity as needed\n- Test early and often\n- Document your decisions\n\nLet me know if you'd like a more detailed explanation!",
        ]
    }
};

let messages = [];
let isTyping = false;

function getResponse(model) {
    const modelData = aiResponses[model] || aiResponses['default'];
    const responses = modelData.responses;
    return responses[Math.floor(Math.random() * responses.length)];
}

function getModelName() {
    const select = document.getElementById('modelSelect');
    return select.options[select.selectedIndex].text;
}

function getModelKey() {
    return document.getElementById('modelSelect').value;
}

function addMessage(role, content, model) {
    const isUser = role === 'user';
    const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    messages.push({ role, content, model, time });
    renderMessages();
}

function renderMessages() {
    const body = document.getElementById('chatBody');
    const welcome = document.getElementById('welcomeScreen');
    if (welcome && messages.length > 0) welcome.remove();

    body.innerHTML = messages.map(m => {
        const isUser = m.role === 'user';
        const avatar = isUser ? '👤' : '🤖';
        const modelTag = !isUser ? `<span class="model-tag">${m.model}</span>` : '';
        return `
            <div class="message ${m.role}">
                <div class="message-avatar">${avatar}</div>
                <div>
                    <div class="message-content">${formatText(m.content)}</div>
                    <div class="message-meta">${modelTag}<span>${m.time}</span></div>
                </div>
            </div>
        `;
    }).join('');

    // Add typing indicator when typing
    if (isTyping) {
        const model = getModelName();
        body.innerHTML += `
            <div class="message assistant">
                <div class="message-avatar">🤖</div>
                <div>
                    <div class="message-content">
                        <div class="typing-indicator">
                            <div class="typing-dot"></div>
                            <div class="typing-dot"></div>
                            <div class="typing-dot"></div>
                        </div>
                    </div>
                    <div class="message-meta"><span class="model-tag">${model}</span></div>
                </div>
            </div>
        `;
    }

    body.scrollTop = body.scrollHeight;
}

function formatText(text) {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre style="background:#0f0f1a;padding:10px;border-radius:6px;margin:8px 0;font-size:12px;overflow-x:auto"><code>$2</code></pre>')
        .replace(/`([^`]+)`/g, '<code style="background:rgba(124,106,240,0.15);padding:1px 5px;border-radius:3px;font-size:12px">$1</code>')
        .replace(/\n/g, '<br>');
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    if (!text || isTyping) return;

    const model = getModelName();
    const modelKey = getModelKey();

    addMessage('user', text, null);
    input.value = '';
    updateCharCount();
    autoResize(input);

    // Show typing
    isTyping = true;
    renderMessages();
    document.getElementById('sendBtn').disabled = true;

    const delay = 1000 + Math.random() * 2000;
    setTimeout(() => {
        const response = getResponse(modelKey);
        isTyping = false;
        addMessage('assistant', response, model);
        document.getElementById('sendBtn').disabled = false;
    }, delay);
}

function updateCharCount() {
    const input = document.getElementById('chatInput');
    document.getElementById('charCount').textContent = input.value.length + ' chars';
}

function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
}

function newChat() {
    messages = [];
    isTyping = false;
    document.getElementById('chatBody').innerHTML = `
        <div class="welcome-screen" id="welcomeScreen">
            <div class="welcome-icon">🤖</div>
            <h2>How can I help you today?</h2>
            <p>Select a model and start chatting. Powered by MiMo V2.5 and other leading LLMs.</p>
            <div class="quick-prompts">
                <button class="quick-btn" data-prompt="Explain quantum computing in simple terms">Explain quantum computing</button>
                <button class="quick-btn" data-prompt="Write a Python function to sort a list">Write a sort function</button>
                <button class="quick-btn" data-prompt="What are the best practices for API design?">API design tips</button>
                <button class="quick-btn" data-prompt="Summarize the key ideas of machine learning">ML summary</button>
            </div>
        </div>
    `;
    bindQuickPrompts();
}

function bindQuickPrompts() {
    document.querySelectorAll('.quick-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById('chatInput').value = btn.dataset.prompt;
            updateCharCount();
            sendMessage();
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');

    sendBtn.addEventListener('click', sendMessage);

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    input.addEventListener('input', () => {
        updateCharCount();
        autoResize(input);
    });

    document.getElementById('newChatBtn').addEventListener('click', newChat);

    document.getElementById('modelSelect').addEventListener('change', function() {
        document.getElementById('modelBadge').textContent = this.options[this.selectedIndex].text;
    });

    bindQuickPrompts();
});
