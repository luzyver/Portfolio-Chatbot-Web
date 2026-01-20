import { ref, onMounted, onUnmounted } from 'vue'
import { checkHealth as apiCheckHealth, sendMessage as apiSendMessage } from '../api/chatbot'

export function useChat() {
  const messages = ref([])
  const isLoading = ref(false)
  const isTyping = ref(false)
  const status = ref('warning')
  const statusText = ref('Mengecek koneksi...')
  const currentSources = ref([])
  const showModal = ref(false)
  const modalSources = ref([])

  let healthCheckInterval = null
  let typingInterval = null

  async function checkHealth() {
    try {
      const data = await apiCheckHealth()

      if (data.status === 'healthy') {
        status.value = 'online'
        statusText.value = 'Online'
      } else if (data.status === 'degraded') {
        status.value = 'warning'
        statusText.value = `Degraded - Groq: ${data.groq_status}`
      } else {
        status.value = 'offline'
        statusText.value = 'Offline'
      }
    } catch (error) {
      status.value = 'offline'
      statusText.value = 'Tidak dapat terhubung ke server'
    }
  }

  function typeText(messageId, fullText, sources, sourceIndex) {
    return new Promise((resolve) => {
      let charIndex = 0
      const typingSpeed = 15 // ms per character

      isTyping.value = true

      typingInterval = setInterval(() => {
        if (charIndex < fullText.length) {
          // Find the message and update its text
          const msg = messages.value.find(m => m.id === messageId)
          if (msg) {
            msg.text = fullText.slice(0, charIndex + 1)
            msg.isTyping = true
          }
          charIndex++
        } else {
          // Typing complete
          clearInterval(typingInterval)
          typingInterval = null

          const msg = messages.value.find(m => m.id === messageId)
          if (msg) {
            msg.isTyping = false
            msg.sourceIndex = sourceIndex
            msg.sourceCount = sources?.length || 0
          }

          isTyping.value = false
          resolve()
        }
      }, typingSpeed)
    })
  }

  async function sendMessage(message) {
    if (!message.trim() || isLoading.value || isTyping.value) return

    // Add user message
    messages.value.push({
      id: Date.now(),
      text: message,
      type: 'user',
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    })

    isLoading.value = true

    try {
      const data = await apiSendMessage(message)

      // Store sources if any
      let sourceIndex = null
      if (data.sources && data.sources.length > 0) {
        sourceIndex = currentSources.value.length
        currentSources.value.push(data.sources)
      }

      isLoading.value = false

      // Add bot message with empty text (will be typed)
      const botMessageId = Date.now() + 1
      messages.value.push({
        id: botMessageId,
        text: '',
        type: 'bot',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        isTyping: true,
        sourceIndex: null,
        sourceCount: 0,
      })

      // Type the response character by character
      await typeText(botMessageId, data.response, data.sources, sourceIndex)

    } catch (error) {
      isLoading.value = false

      // Add error message
      messages.value.push({
        id: Date.now() + 1,
        text: error.message || 'Gagal menghubungi server. Pastikan backend sudah berjalan.',
        type: 'error',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      })
    }
  }

  function askQuestion(question) {
    sendMessage(question)
  }

  function showSources(index) {
    if (index !== null && currentSources.value[index]) {
      modalSources.value = currentSources.value[index]
      showModal.value = true
    }
  }

  function closeModal() {
    showModal.value = false
    modalSources.value = []
  }

  onMounted(() => {
    checkHealth()
    healthCheckInterval = setInterval(checkHealth, 30000)
  })

  onUnmounted(() => {
    if (healthCheckInterval) {
      clearInterval(healthCheckInterval)
    }
    if (typingInterval) {
      clearInterval(typingInterval)
    }
  })

  return {
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
    checkHealth,
  }
}
