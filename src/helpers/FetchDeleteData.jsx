export const FetchDeleteData = async ({ path }) => {
  const token = localStorage.getItem('token')
  const url = process.env.REACT_APP_BASE_URL + path

  try {
    const resp = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Origin: process.env.REACT_APP_BASE_URL,
        'X-Requested-With': 'XMLHttpRequest',
        credentials: 'include',
        Authorization: `${token}`
      },
      withCredentials: true
    })

    if (!resp.ok) {
      throw new Error('Error en la respuesta del servidor')
    }

    if (path === process.env.REACT_APP_LOGOUT) {
      localStorage.removeItem('token')
    }

    const dataRes = await resp.json()
    return dataRes
  } catch (error) {
    return error
  }
}
