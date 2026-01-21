# Portfolio Chatbot Frontend

Frontend untuk portfolio chatbot dengan tampilan terminal-style yang modern.

## Tech Stack

- **Vue 3** - Framework JavaScript
- **Vite** - Build tool
- **Cloudflare Pages** - Hosting & serverless functions

## Struktur Proyek

```
Frontend/
├── functions/
│   └── api/
│       ├── chat.js         # Proxy endpoint /api/chat
│       └── health.js       # Proxy endpoint /api/health
├── src/
│   ├── api/
│   │   └── chatbot.js      # API client
│   ├── components/
│   │   ├── ChatContainer.vue
│   │   ├── ChatHeader.vue
│   │   ├── ChatInput.vue
│   │   ├── ChatMessage.vue
│   │   ├── SourceModal.vue
│   │   ├── TypingIndicator.vue
│   │   └── WelcomeMessage.vue
│   ├── composables/
│   │   └── useChat.js      # Chat logic & state
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── index.html
├── package.json
└── vite.config.js
```

## Fitur

- Dark terminal aesthetic dengan grid background
- Typing animation untuk response bot
- Conversation history support
- Status indicator (online/offline)
- Responsive design
- Serverless functions sebagai API proxy

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build untuk production
npm run build

# Preview production build
npm run preview
```

## Deployment (Cloudflare Pages)

1. Connect repository ke Cloudflare Pages
2. Build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
3. Functions di folder `functions/` otomatis aktif

## Environment

Tidak ada environment variables yang diperlukan di frontend. API URL di-handle melalui serverless functions.

## Design System

| Element | Value |
|---------|-------|
| Background | `#0a0a0a` - `#1a1a1a` |
| Accent | `#00ff41` (terminal green) |
| Font Heading | JetBrains Mono |
| Font Body | Inter |
| Border Radius | 4px max |
| Shadows | Hard shadows (4px offset) |

## API Endpoints

| Endpoint | Method | Deskripsi |
|----------|--------|-----------|
| `/api/chat` | POST | Kirim pesan ke chatbot |
| `/api/health` | GET | Cek status backend |
