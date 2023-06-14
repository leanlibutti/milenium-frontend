export const FetchPostData = async ({ path, data }) => {
  const token = localStorage.getItem('token')
  let headers = {}
  const url = process.env.REACT_APP_BASE_URL + path

  if (
    path === process.env.REACT_APP_SIGN_UP ||
    path === process.env.REACT_APP_LOGIN
  ) {
    headers = {
      'Content-Type': 'application/json',
      Origin: process.env.REACT_APP_BASE_URL,
      'X-Requested-With': 'XMLHttpRequest',
      credentials: 'include'
    }
  } else {
    if (path === process.env.REACT_APP_RECOVER) {
      headers = {
        'Content-Type': 'application/json',
        Origin: process.env.REACT_APP_BASE_URL,
        'X-Requested-With': 'XMLHttpRequest',
        credentials: 'include',
        Authorization: `${data.user.reset_password_token}`
      }
    } else {
      headers = {
        'Content-Type': 'application/json',
        Origin: process.env.REACT_APP_BASE_URL,
        'X-Requested-With': 'XMLHttpRequest',
        credentials: 'include',
        Authorization: `${token}`
      }
    }
  }

  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
      withCredentials: true
    })

    if (!resp.ok) {
      if (resp.status === 422) {
        throw new Error(`El email ingresado no existe en la base de datos.`)
      }

      if (resp.status === 401) {
        throw new Error(`Usuario y/o contraseña incorrectas.`)
      }

      throw new Error('Error en la respuesta del servidor')
    }

    if (
      path === process.env.REACT_APP_LOGIN ||
      path === process.env.REACT_APP_SIGN_UP
    ) {
      localStorage.setItem('token', resp.headers.get('Authorization'))
    }

    const dataRes = await resp.json()
    return dataRes
  } catch (error) {
    return error
  }
}
