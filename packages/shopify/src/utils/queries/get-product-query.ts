const getProductQuery = /* GraphQL */ `
  query getProductBySlug($slug: String!) {
    productByHandle(handle: $slug) {
      id
      handle
      availableForSale
      title
      productType
      vendor
      description
      descriptionHtml
      options {
        id
        name
        values
      }
      priceRange {
        maxVariantPrice {
          amount
          currencyCode
        }
        minVariantPrice {
          amount
          currencyCode
        }
      }
      voltage: metafield(namespace: "papaya", key: "voltage_v") {
        value
      }
      capacity: metafield(namespace: "papaya", key: "cargo_capacity") {
        value
      }
      range: metafield(namespace: "papaya", key: "range") {
        value
      }
      chargeTime: metafield(namespace: "papaya", key: "charging_time_h") {
        value
      }
      power: metafield(namespace: "papaya", key: "power_w") {
        value
      }
      variants(first: 250) {
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        edges {
          node {
            id
            title
            sku
            availableForSale
            requiresShipping
            selectedOptions {
              name
              value
            }
            priceV2 {
              amount
              currencyCode
            }
            compareAtPriceV2 {
              amount
              currencyCode
            }
          }
        }
      }
      images(first: 250) {
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        edges {
          node {
            url
            altText
            width
            height
          }
        }
      }
    }
  }
`

export default getProductQuery
