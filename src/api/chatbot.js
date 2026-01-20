export const API_BASE_URL = 'https://chatbot-api.luzyver.dev'

export async function checkHealth() {
  const response = await fetch(`${API_BASE_URL}/health`)
  return response.json()
}

export async function sendMessage(message) {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.detail || 'Terjadi kesalahan')
  }

  return response.json()
}
