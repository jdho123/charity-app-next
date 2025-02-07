export async function submitForm(
    url: string, 
    method: string, 
    data?: Record<string, unknown>
  ) {
    const response = await fetch(url, {
      method: method.toUpperCase(),
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    })
    return response.json()
  }