import { useSWRHook } from '@vercel/commerce/utils/use-hook'
import { getCheckoutQuery } from '../utils/queries'

const useCheckout = (input?: any) => {
  return useSWRHook({
    fetcher: () => {},
    useHook: () => {
      return () => {}
    },
    fetchOptions: {
      query: getCheckoutQuery,
    },
  })(input)
}

export default useCheckout
