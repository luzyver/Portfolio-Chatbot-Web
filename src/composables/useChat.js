import { ref, onMounted, onUnmounted } from 'vue'
import { checkHealth as apiCheckHealth, sendMessage as apiSendMessage } from '../api/chatbot'

export function useChat() {
  const messages = ref([])
  const isLoading = ref(false)
  const isTyping = ref(false)
  const status = ref('warning')
  const statusText = ref('MENGECEK...')

  let healthCheckInterval = null
  let typingInterval = null

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

  async function checkHealth() {
    try {
      const data = await apiCheckHealth()

      if (data.status === 'healthy') {
        status.value = 'online'
        statusText.value = 'TERHUBUNG'
      } else if (data.status === 'degraded') {
        status.value = 'warning'
        statusText.value = `TERGANGGU - API: ${data.groq_status.toUpperCase()}`
      } else {
        status.value = 'offline'
        statusText.value = 'TERPUTUS'
      }
    } catch (error) {
      status.value = 'offline'
      statusText.value = 'GAGAL TERHUBUNG'
    }
  }

  function typeText(messageId, fullText) {
    return new Promise((resolve) => {
      let charIndex = 0
      const typingSpeed = 50

      isTyping.value = true

      typingInterval = setInterval(() => {
        if (charIndex < fullText.length) {
          const msg = messages.value.find(m => m.id === messageId)
          if (msg) {
            msg.text = fullText.slice(0, charIndex + 1)
            msg.isTyping = true
          }
          charIndex++
        } else {
          clearInterval(typingInterval)
          typingInterval = null

          const msg = messages.value.find(m => m.id === messageId)
          if (msg) {
            msg.isTyping = false
          }

          isTyping.value = false
          resolve()
        }
      }, typingSpeed)
    })
  }

  function getHistoryForAPI() {
    const validMessages = messages.value.filter(msg => msg.type === 'user' || msg.type === 'bot')
    if (validMessages.length < 2) return null

    const lastTwo = validMessages.slice(-2)
    return lastTwo.map(msg => ({
      role: msg.type === 'user' ? 'user' : 'assistant',
      content: msg.text
    }))
  }

  async function sendMessage(message) {
    if (!message.trim() || isLoading.value || isTyping.value) return

    const history = getHistoryForAPI()

    messages.value.push({
      id: Date.now(),
      text: message,
      type: 'user',
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    })

    isLoading.value = true

    try {
      const data = await apiSendMessage(message, history)

      await delay(3000)

      isLoading.value = false

      const botMessageId = Date.now() + 1
      messages.value.push({
        id: botMessageId,
        text: '',
        type: 'bot',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        isTyping: true,
      })

      await typeText(botMessageId, data.response)

    } catch (error) {
      isLoading.value = false

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

  onMounted(() => {
    checkHealth()
    healthCheckInterval = setInterval(checkHealth, 300000)
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
    sendMessage,
    askQuestion,
    checkHealth,
  }
}
