import { QueryClient, QueryFunction } from '@tanstack/react-query'

export * from './user'

export const API_ENDPOINT =
  process.env.NEXT_PUBLIC_API_ENDPOINT ?? 'https://staging.papaya.bike'

export const defaultQueryFn: QueryFunction<any, any> = async ({ queryKey }) => {
  let endpoint = `${API_ENDPOINT}${
    queryKey[0].startsWith('/') ? queryKey[0] : `/${queryKey[0]}`
  }`
  const accessToken = localStorage.getItem('accessToken')

  const res = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (res.ok) {
    return await res.json()
  }

  return Promise.reject(await res.body)
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 180000,
      cacheTime: Infinity,
      queryFn: defaultQueryFn,
    },
  },
})

export const stringHashToColour = function (str) {
  if (!str) {
    return ''
  }
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  let colour = ''
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff
    colour += value.toString(16)
  }
  return colour
}
