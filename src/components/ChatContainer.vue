<template>
  <main ref="containerRef" class="chat-container">
    <WelcomeMessage
      v-if="messages.length === 0"
      @ask-question="$emit('askQuestion', $event)"
    />
    <template v-else>
      <ChatMessage
        v-for="msg in messages"
        :key="msg.id"
        :message="msg"
      />
    </template>
    <TypingIndicator v-if="isLoading" />
  </main>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import WelcomeMessage from './WelcomeMessage.vue'
import ChatMessage from './ChatMessage.vue'
import TypingIndicator from './TypingIndicator.vue'

const props = defineProps({
  messages: {
    type: Array,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  isTyping: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['askQuestion'])

const containerRef = ref(null)

function scrollToBottom() {
  if (containerRef.value) {
    containerRef.value.scrollTop = containerRef.value.scrollHeight
  }
}

watch(() => props.messages.length, () => {
  nextTick(scrollToBottom)
})

watch(() => props.isLoading, () => {
  nextTick(scrollToBottom)
})

watch(
  () => props.messages.map(m => m.text),
  () => {
    if (props.isTyping) {
      nextTick(scrollToBottom)
    }
  },
  { deep: true }
)
</script>
