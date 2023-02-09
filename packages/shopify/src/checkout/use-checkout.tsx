import useSubmitFreeCheckout, { type UseSubmitFreeCheckout } from '@vercel/commerce/checkout/use-submit-free-checkout'
import { getCheckoutQuery } from '../utils/queries'
import { UseSubmitCheckout } from '@vercel/commerce/checkout/use-submit-checkout'
import { MutationHook } from '@vercel/commerce/utils/types'
import { SubmitFreeCheckoutHook } from '@vercel/commerce/types/checkout'
import checkoutCompleteFreeMutation from 'utils/mutations/checkout-complete-free'
import { getCheckoutId } from 'utils'
import { Mutation, MutationCheckoutCompleteFreeArgs } from '../../schema'
import { useCallback } from 'react'

export default useSubmitFreeCheckout as UseSubmitFreeCheckout<typeof handler>

export const handler: MutationHook<SubmitFreeCheckoutHook> = {
  fetchOptions: {
    query: checkoutCompleteFreeMutation,
  },
  async fetcher({ input: item, options, fetch }) {

    let checkoutId = getCheckoutId()

     return await fetch<
        Mutation,
        MutationCheckoutCompleteFreeArgs
      >({
        ...options,
        variables: {
          checkoutId,
        },
      })
  },
  useHook:
    ({ fetch }) =>
    () => {
      return useCallback(
        async function addItem(input) {
          const data = await fetch({ input })
          return data
        },
        [fetch]
      )
    },
}
