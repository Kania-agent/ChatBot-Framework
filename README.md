# ChatBot Framework

A fully functional, browser-based chat interface with multiple AI personalities — no backend or API required.

## Features

- **6 Unique Personalities**: Helpful Assistant, Pirate Captain, Wizard Sage, Robot Logic, Poetic Soul, and Detective
- **Template-Based AI**: Keyword matching and contextual response generation — works fully offline
- **Chat History**: All conversations saved to `localStorage` and persist across sessions
- **Quick Prompts**: Pre-built suggestion chips for common conversation starters
- **Markdown Rendering**: Bold, italic, code blocks, inline code, lists, blockquotes, and strikethrough
- **Copy Messages**: One-click copy button on each message
- **Typing Indicator**: Animated dots while the bot "thinks"
- **Responsive Design**: Mobile-friendly with collapsible sidebar
- **Multiple Conversations**: Create, switch, and delete chats freely

## Getting Started

1. Open `index.html` in any modern browser
2. Select a personality from the sidebar dropdown
3. Type a message or click a suggestion to start chatting
4. Create new chats with the `+` button

No build step, no dependencies, no server needed.

## File Structure

```
ChatBot-Framework/
├── index.html    — Page structure and layout
├── style.css     — Dark-themed responsive styles
├── app.js        — Chat engine, personalities, and state management
└── README.md     — This file
```

## Personalities

| Name | Style |
|------|-------|
| 🟢 Helpful Assistant | Friendly, informative, practical |
| 🏴‍☠️ Pirate Captain | Nautical slang, adventurous |
| 🧙 Wizard Sage | Mystical, wise, fantasy-themed |
| 🤖 Robot Logic | Systematic, data-driven, technical |
| 📜 Poetic Soul | Lyrical, emotional, artistic |
| 🔍 Detective | Analytical, observant, noir-style |

## Customization

Edit the `MODELS` object in `app.js` to add new personalities or modify responses. Each model has:
- `name` / `avatar` — Display info
- `greetings` — Initial welcome messages
- `templates` — Keyword-triggered response arrays
- `fallbacks` — Default responses when no keywords match

## License

MIT
