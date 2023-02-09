import type { MutationHook } from '@vercel/commerce/utils/types';
import type { CheckoutCustomerAssociateHook } from '@vercel/commerce/types/customer';
import type { AssociateCustomerWithCheckoutMutationVariables, Mutation } from '../../schema';
import { getCheckoutId, getCustomerQuery, getCustomerToken } from '../utils'
import useCheckoutCustomerAssociate, {
  type UseCheckoutCustomerAssociate,
} from '@vercel/commerce/customer/use-checkout-customer-associate'
import { useCallback } from 'react';
import associateCustomerWithCheckoutMutation from '../utils/mutations/associate-customer-with-checkout';

export default useCheckoutCustomerAssociate as UseCheckoutCustomerAssociate<typeof handler>

export const handler: MutationHook<CheckoutCustomerAssociateHook> = {
  fetchOptions: {
    query: associateCustomerWithCheckoutMutation,
  },
  async fetcher({ options, fetch }) {
    const customerAccessToken = getCustomerToken()
    const checkoutId = getCheckoutId()

      return await fetch<
        Mutation,
        AssociateCustomerWithCheckoutMutationVariables
      >({
        ...options,
        variables: {
          checkoutId,
          customerAccessToken,
        },
      })
  },
  useHook:
  ({ fetch }) =>
    () => {
      return useCallback(
        async function addItem() {
          const data = await fetch()
          return data
        },
        [fetch]
      )
    },
}
