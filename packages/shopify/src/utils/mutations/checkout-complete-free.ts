import { checkoutDetailsFragment } from '../queries/get-checkout-query'

const checkoutCompleteFreeMutation = /* GraphQL */ `
  mutation checkoutCompleteFree($checkoutId: ID!) {
    checkoutCompleteFree(checkoutId: $checkoutId) {
      checkoutUserErrors {
        code
        field
        message
      }
      checkout {
        ...checkoutDetails
      }
    }
  }

  ${checkoutDetailsFragment}
`
export default checkoutCompleteFreeMutation
