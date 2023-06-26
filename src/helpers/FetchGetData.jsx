export const FetchGetData = async (path) => {
  const token = localStorage.getItem('token')
  let headers = {}
  const url = process.env.REACT_APP_BASE_URL + path
  console.log({token});

  if (token === null) {
    headers = {
      Origin: process.env.REACT_APP_BASE_URL,
      'X-Requested-With': 'XMLHttpRequest'
    }
  } else {
    console.log("test");
    headers = {
      Origin: process.env.REACT_APP_BASE_URL,
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: `${token}`
    }
  }

  try {
    return await fetch(url, {
      credentials: 'include',
      headers: headers,
      withCredentials: true
    })
  } catch (error) {
    return error
  }
}
