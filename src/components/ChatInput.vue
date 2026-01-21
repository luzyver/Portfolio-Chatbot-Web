<template>
  <footer class="input-area">
    <form @submit.prevent="handleSubmit">
      <div class="input-wrapper">
        <input
          ref="inputRef"
          v-model="message"
          type="text"
          placeholder="ketik pertanyaan..."
          autocomplete="off"
          :disabled="disabled"
        >
        <button type="submit" class="send-button" :disabled="disabled || !message.trim()" title="Kirim">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </div>
    </form>
    <p class="disclaimer">jawaban berdasarkan data portfolio yang tersedia</p>
  </footer>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['send'])

const message = ref('')
const inputRef = ref(null)

function handleSubmit() {
  if (message.value.trim() && !props.disabled) {
    emit('send', message.value.trim())
    message.value = ''
  }
}

watch(() => props.disabled, (newVal, oldVal) => {
  if (oldVal && !newVal) {
    inputRef.value?.focus()
  }
})
</script>
