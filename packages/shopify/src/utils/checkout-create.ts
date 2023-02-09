import {
  AssociateCustomerWithCheckoutMutationVariables,
  AssociateCustomerWithCheckoutMutation,
} from './../../schema.d'
import Cookies from 'js-cookie'

import {
  SHOPIFY_CHECKOUT_ID_COOKIE,
  SHOPIFY_CHECKOUT_URL_COOKIE,
  SHOPIFY_COOKIE_EXPIRE,
} from '../const'

import checkoutCreateMutation from './mutations/checkout-create'
import {
  CheckoutCreatePayload,
  CheckoutLineItemInput,
  Mutation,
  MutationCheckoutCreateArgs,
} from '../../schema'
import { FetcherOptions } from '@vercel/commerce/utils/types'
import associateCustomerWithCheckoutMutation from './mutations/associate-customer-with-checkout'
import { getCustomerToken } from './customer-token'

export const checkoutCreate = async (
  fetch: <T = any, B = Body>(options: FetcherOptions<B>) => Promise<T>,
  lineItems: CheckoutLineItemInput[]
): Promise<CheckoutCreatePayload> => {
  const { checkoutCreate } = await fetch<Mutation, MutationCheckoutCreateArgs>({
    query: checkoutCreateMutation,
    variables: {
      input: { lineItems },
    },
  })

  const customerAccessToken = getCustomerToken()

  await fetch<Mutation, AssociateCustomerWithCheckoutMutationVariables>({
    query: associateCustomerWithCheckoutMutation,
    variables: {
      checkoutId: checkoutCreate?.checkout?.id,
      customerAccessToken,
    },
  })

  const checkout = checkoutCreate?.checkout

  if (checkout) {
    const checkoutId = checkout?.id
    const options = {
      expires: SHOPIFY_COOKIE_EXPIRE,
    }
    Cookies.set(SHOPIFY_CHECKOUT_ID_COOKIE, checkoutId, options)
    if (checkout?.webUrl) {
      Cookies.set(SHOPIFY_CHECKOUT_URL_COOKIE, checkout.webUrl, options)
    }
  }

  return checkoutCreate!
}

export default checkoutCreate
