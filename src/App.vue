<template>
  <div class="container">
    <ChatHeader :status="status" :status-text="statusText" />
    <ChatContainer
      :messages="messages"
      :is-loading="isLoading"
      :is-typing="isTyping"
      :locale="activeLocale"
      @ask-question="askQuestion"
    />
    <ChatInput :disabled="isLoading || isTyping" @send="sendMessage" />
  </div>
</template>

<script setup>
import { useChat } from './composables/useChat'
import ChatHeader from './components/ChatHeader.vue'
import ChatContainer from './components/ChatContainer.vue'
import ChatInput from './components/ChatInput.vue'

const {
  activeLocale,
  messages,
  isLoading,
  isTyping,
  status,
  statusText,
  sendMessage,
  askQuestion,
} = useChat()
</script>
