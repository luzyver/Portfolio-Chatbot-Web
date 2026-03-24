<template>
  <div v-if="message.type === 'error'" class="error-message">
    {{ message.text }}
  </div>
  <div v-else :class="['message', message.type]">
    <div class="message-avatar">
      <svg v-if="message.type === 'bot'" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
      </svg>
      <svg v-else viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
      </svg>
    </div>
    <div class="message-content">
      <div class="message-text">
        <template v-if="message.type === 'bot'">
          <template v-for="(block, index) in formattedBlocks" :key="index">
            <p v-if="block.type === 'paragraph'" class="message-paragraph">
              {{ block.content }}
            </p>
            <ul v-else-if="block.type === 'list'" class="message-list">
              <li v-for="(item, itemIndex) in block.items" :key="itemIndex">
                {{ item }}
              </li>
            </ul>
          </template>
        </template>
        <template v-else>
          {{ message.text }}
        </template>
        <span v-if="message.isTyping" class="typing-cursor"></span>
      </div>
      <div v-if="!message.isTyping" class="message-meta">
        <span>{{ message.timestamp }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
})

const formattedBlocks = computed(() => {
  const text = props.message?.text ?? ''
  if (!text) return []

  const lines = text.split('\n')
  const blocks = []
  let paragraphBuffer = []
  let listBuffer = []

  function flushParagraph() {
    if (paragraphBuffer.length > 0) {
      blocks.push({
        type: 'paragraph',
        content: paragraphBuffer.join(' ').trim(),
      })
      paragraphBuffer = []
    }
  }

  function flushList() {
    if (listBuffer.length > 0) {
      blocks.push({
        type: 'list',
        items: [...listBuffer],
      })
      listBuffer = []
    }
  }

  for (const line of lines) {
    const trimmed = line.trim()

    if (!trimmed) {
      flushList()
      flushParagraph()
      continue
    }

    if (trimmed.startsWith('- ')) {
      flushParagraph()
      listBuffer.push(trimmed.slice(2).trim())
      continue
    }

    flushList()
    paragraphBuffer.push(trimmed)
  }

  flushList()
  flushParagraph()

  return blocks
})
</script>
