# 💬 ChatBot Framework

> Multi-LLM chatbot router that picks the right model for every conversation — powered by MiMo V2.5

## Why This Exists

The AI landscape has fragmented into dozens of capable language models — each with different strengths, pricing tiers, latency profiles, and context windows. Teams building conversational AI face an impossible choice: commit to a single model and accept its limitations, or build custom routing logic that selects models per-request based on task type. Most end up with a single-model integration that's brilliant at code generation but terrible at creative writing, or vice versa.

ChatBot Framework solves this with an intelligent router powered by MiMo V2.5 that classifies user intent in real time and dynamically dispatches to the optimal model. A simple factual question might route to a fast, lightweight model for low latency and cost. A complex multi-step reasoning task gets escalated to a larger model with higher capability. A creative writing prompt goes to a model fine-tuned for prose. The user sees none of this — they just get the best possible answer every time.

Beyond smart routing, the framework provides a production-ready chat interface with streaming responses, conversation history, model switching, and usage analytics. It's the infrastructure layer that lets you build sophisticated multi-model AI products without reinventing the plumbing every time you add a new model to your stack.

## Architecture

```
┌─────────────────┐
│  User Input      │   Text, voice transcription, or
│  (Chat Message)  │   structured query from frontend
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│     Router       │   MiMo V2.5 — intent classification,
│  (MiMo V2.5)    │   task type detection, complexity scoring
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Model Selector   │   Matches task requirements to optimal model
│ (Router Logic)   │   based on capability, cost, latency, context
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Response Gen     │   Selected model generates response with
│ (Chosen Model)   │   streaming, formatting, and tool integration
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Output        │   Formatted response with metadata,
│   (Response)     │   model badge, token count, latency stats
└─────────────────┘
```

## Token Consumption Model

| Agent | Tokens/Op | Frequency | Daily/User (est.) |
|-------|-----------|-----------|-------------------|
| Router (MiMo V2.5) | 50K | ~30 messages/day | 1.5M |
| Model A (MiMo V2.5) | 600K | ~18 messages/day | 10.8M |
| Model B (MiMo-V2) | 400K | ~12 messages/day | 4.8M |
| **Total** | **1.05M** | — | **~17.1M** |

> Token estimates based on average user sending 30 messages/day with mixed complexity tasks. Router cost stays fixed regardless of model selection.

## Features

- 🧠 **Intelligent routing** — MiMo V2.5 classifies intent and routes to the optimal model per message
- 🔄 **Multi-model support** — Works with MiMo V2.5, MiMo-V2, Claude, GPT-4, Llama, and custom models
- 💬 **Modern chat UI** — Clean message bubbles with avatars, timestamps, and markdown rendering
- ⚡ **Streaming responses** — Token-by-token output display with smooth typing animation
- 📊 **Usage analytics** — Per-message token counts, model selection logs, and latency tracking
- 🔀 **Manual model override** — Users can pin a specific model when they want consistent behavior
- 📝 **Conversation memory** — Full chat history with context window management
- 🎛️ **Admin dashboard** — Configure routing rules, model weights, and fallback chains
- 🔌 **API-first design** — Drop the UI and use the routing engine as a library or service

## Tech Stack

- **Frontend:** Vanilla HTML5, CSS3, JavaScript (ES6+)
- **AI Engine:** MiMo V2.5 by Nous Research (router + primary model)
- **Architecture:** Zero-dependency — no build tools, no frameworks, no node_modules
- **Routing:** Custom intent classifier with configurable model mapping
- **Streaming:** Server-Sent Events (SSE) for real-time response delivery

## Quick Start

```bash
# Clone the repository
git clone https://github.com/your-org/ChatBot-Framework.git
cd ChatBot-Framework

# Open the chatbot
open index.html

# Or serve locally
python3 -m http.server 8080
```

1. Open `index.html` in your browser
2. Select a model from the dropdown (or leave it on Auto-Route for smart selection)
3. Type a message — the router classifies your intent and picks the best model
4. Watch the streaming response with typing indicators
5. Switch models mid-conversation to compare outputs
6. Click the analytics icon to see token usage and routing decisions

## Project Structure

```
ChatBot-Framework/
├── index.html                 # Chatbot interface entry point
├── css/
│   ├── main.css               # Core theme and layout
│   ├── chat.css               # Message bubbles and chat stream
│   └── dashboard.css          # Admin and analytics panels
├── js/
│   ├── app.js                 # Main application controller
│   ├── router.js              # MiMo V2.5 intent classification
│   ├── model-selector.js      # Model selection and fallback logic
│   ├── response-gen.js        # Response streaming and formatting
│   ├── conversation.js        # Chat history and context management
│   ├── analytics.js           # Usage tracking and reporting
│   └── config.js              # Model endpoints and routing rules
├── data/
│   ├── models/                # Model configuration and metadata
│   └── routing-rules/         # Customizable routing rule sets
├── assets/
│   └── icons/                 # Model and status icons
└── README.md
```

---

> Built with MiMo V2.5 — [Nous Research](https://nousresearch.com)
