const API_URL = 'https://chatbot-api.luzyver.dev'

export async function onRequestPost(context) {
  try {
    const body = await context.request.json()
    const headers = {
      'Content-Type': 'application/json',
    }
    const acceptLanguage = context.request.headers.get('Accept-Language')
    const locale = context.request.headers.get('X-Locale')

    if (acceptLanguage) {
      headers['Accept-Language'] = acceptLanguage
    }
    if (locale) {
      headers['X-Locale'] = locale
    }

    const response = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })

    const data = await response.json()

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    return new Response(JSON.stringify({ detail: 'Terjadi kesalahan' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
