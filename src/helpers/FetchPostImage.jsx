export const FetchPostImage = async ({ path, data }) => {
  const token = localStorage.getItem('token')
  const url = process.env.REACT_APP_BASE_URL + path

  // console.log({data})

  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `${token}`
      },
      body: data
    })

    if (!resp.ok) {
      throw new Error('Error en la respuesta del servidor')
    }

    const dataRes = await resp.json()
    return dataRes
  } catch (error) {
    return error
  }
}
