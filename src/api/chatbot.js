export async function checkHealth() {
  const response = await fetch('/api/health')
  return response.json()
}

export async function sendMessage(message, history = null) {
  const body = { message }
  if (history && history.length > 0) {
    body.history = history
  }

  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.detail || 'Terjadi kesalahan')
  }

  return response.json()
}
