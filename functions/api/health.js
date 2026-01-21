const API_URL = 'https://chatbot-api.luzyver.dev'

export async function onRequestGet() {
  try {
    const response = await fetch(`${API_URL}/health`)
    const data = await response.json()

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    return new Response(JSON.stringify({
      status: 'unhealthy',
      groq_status: 'unknown',
      vector_store_status: 'unknown'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
