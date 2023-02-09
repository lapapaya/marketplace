import type { Mutation, MutationCheckoutCompleteFreeArgs } from '../../schema';
import type { HookFetcherContext, HookFetcherFn } from '@vercel/commerce/utils/types';

import {
  getCheckoutId,
} from '../utils'
import { SubmitFreeCheckoutHook } from '@vercel/commerce/types/checkout';
import checkoutCompleteFreeMutation from '../utils/mutations/checkout-complete-free'
import { useMutationHook, useSWRHook } from '@vercel/commerce/utils/use-hook'
import { mutationFetcher } from '@vercel/commerce/utils/default-fetcher';


const useFreeCheckout = useMutationHook({
  fetchOptions: {
    query: checkoutCompleteFreeMutation,
  },
  async fetcher({
    options,
    fetch,
  }: HookFetcherContext<SubmitFreeCheckoutHook>) {

  return await fetch<
      Mutation,
      MutationCheckoutCompleteFreeArgs
    >({
      ...options,
      variables: {
        checkoutId: '1',
      },
    }) as any
  },
  useHook: () => {
    return () => {
      return async () => {
        return true as any
    }
    }
  }}
  )

export default useFreeCheckout
