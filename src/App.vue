<template>
  <div class="container">
    <ChatHeader :status="status" :status-text="statusText" />
    <ChatContainer
      :messages="messages"
      :is-loading="isLoading"
      :is-typing="isTyping"
      @ask-question="askQuestion"
      @show-sources="showSources"
    />
    <ChatInput :disabled="isLoading || isTyping" @send="sendMessage" />
    <SourceModal
      :show="showModal"
      :sources="modalSources"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { useChat } from './composables/useChat'
import ChatHeader from './components/ChatHeader.vue'
import ChatContainer from './components/ChatContainer.vue'
import ChatInput from './components/ChatInput.vue'
import SourceModal from './components/SourceModal.vue'

const {
  messages,
  isLoading,
  isTyping,
  status,
  statusText,
  showModal,
  modalSources,
  sendMessage,
  askQuestion,
  showSources,
  closeModal,
} = useChat()
</script>
