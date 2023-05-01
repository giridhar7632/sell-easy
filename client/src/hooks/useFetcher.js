import qs from 'qs'
import { useMemo } from 'react'

export default function useFetcher() {
  const fetcher = useMemo(() => {
    return async function fetcher(endpoint, { method, body, token, query, ...customConfig } = {}) {
      const headers = { 'content-type': 'application/json' }
      const queryString = qs.stringify(query)
      const url = queryString
        ? `${process.env.NEXT_PUBLIC_API_URL}${endpoint}?${queryString}`
        : `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`
      if (token) {
        headers.Authorization = `Bearer ${token}`
      }
      const config = {
        method: method ? method : body ? 'POST' : 'GET',
        credentials: 'include',
        mode: 'cors',
        ...customConfig,
        headers: {
          ...headers,
          ...customConfig.headers,
        },
      }
      if (body) {
        config.body = JSON.stringify(body)
      }

      const res = await window.fetch(url, config)
      if (res.status === 401) {
        logout()
        window.location.assign(window.location)
        return
      }
      const data = await res.json()
      if (res.ok) {
        return data
      } else {
        const errorMessage = data.message
        return Promise.reject(new Error(errorMessage))
      }
    }
  }, [])

  return fetcher
}

function logout() {
  window.localStorage.removeItem('accessToken')
}

// Usage in component:
// const data = await fetcher('/api/protected-endpoint', { token: 'my-access-token' });
