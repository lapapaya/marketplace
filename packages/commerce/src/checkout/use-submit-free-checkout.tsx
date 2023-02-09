import type { HookFetcherFn, MutationHook } from '../utils/types'
import type { SubmitCheckoutHook, SubmitFreeCheckoutHook } from '../types/checkout'
import type { Provider } from '..'

import { useHook, useMutationHook } from '../utils/use-hook'
import { mutationFetcher } from '../utils/default-fetcher'

export type UseSubmitFreeCheckout<
  H extends MutationHook<SubmitFreeCheckoutHook> = MutationHook<SubmitFreeCheckoutHook>
> = ReturnType<H['useHook']>

export const fetcher: HookFetcherFn<SubmitFreeCheckoutHook> = mutationFetcher

const fn = (provider: Provider) => provider.checkout?.useSubmitFreeCheckout!

const useSubmitFreeCheckout: UseSubmitFreeCheckout = (...args) => {
  const hook = useHook(fn)
  return useMutationHook({ fetcher, ...hook })(...args)
}

export default useSubmitFreeCheckout
