export async function checkHealth() {
  const response = await fetch('/api/health')
  return response.json()
}

export async function sendMessage(message, history = null, locale = 'id') {
  const normalizedLocale = locale?.toLowerCase().startsWith('en') ? 'en' : 'id'
  const body = {
    message,
    locale: normalizedLocale,
  }
  if (history && history.length > 0) {
    body.history = history
  }

  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': normalizedLocale === 'en' ? 'en-US,en;q=0.9' : 'id-ID,id;q=0.9,en;q=0.8',
      'X-Locale': normalizedLocale,
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.detail || 'Terjadi kesalahan')
  }

  return response.json()
}
