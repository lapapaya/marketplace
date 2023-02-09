import { useHook, useMutationHook, useSWRHook } from '../utils/use-hook'
import { SWRFetcher, mutationFetcher } from '../utils/default-fetcher'
import type { CheckoutCustomerAssociateHook, CustomerHook } from '../types/customer'
import type { HookFetcherFn, MutationHook, SWRHook } from '../utils/types'
import type { Provider } from '..'

export type UseCheckoutCustomerAssociate<
  H extends MutationHook<CheckoutCustomerAssociateHook> = MutationHook<CheckoutCustomerAssociateHook>
> = ReturnType<H['useHook']>

export const fetcher: HookFetcherFn<CheckoutCustomerAssociateHook> = mutationFetcher

const fn = (provider: Provider) => provider.customer?.useCheckoutCustomerAssociate!

const useCheckoutCustomerAssociate: UseCheckoutCustomerAssociate = (...args) => {
  const hook = useHook(fn)
  return useMutationHook({ fetcher, ...hook })(...args)
}

export default useCheckoutCustomerAssociate
