export const productConnectionFragment = /* GraphQL */ `
  fragment productConnection on ProductConnection {
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
    edges {
      node {
        id
        title
        vendor
        handle
        priceRange {
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
        vehicleType: metafield(namespace: "papaya", key: "vehicle_type") {
          value
        }
        rangeList: metafield(namespace: "papaya", key: "range-list") {
          value
        }
        chargeTimeList: metafield(
          namespace: "papaya"
          key: "charge_tim_range"
        ) {
          value
        }
        cargoCapacityKg: metafield(namespace: "papaya", key: "cargo_capacity") {
          value
        }
        cargoCapacityL: metafield(
          namespace: "papaya"
          key: "cargo_capacity_liters"
        ) {
          value
        }
        topSpeed: metafield(namespace: "papaya", key: "top_speed_km") {
          value
        }

        images(first: 1) {
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
  }
`

const getAllProductsQuery = /* GraphQL */ `
  query getAllProducts(
    $first: Int = 250
    $query: String = ""
    $sortKey: ProductSortKeys = RELEVANCE
    $reverse: Boolean = false
  ) {
    products(
      first: $first
      sortKey: $sortKey
      reverse: $reverse
      query: $query
    ) {
      ...productConnection
    }
  }

  ${productConnectionFragment}
`
export default getAllProductsQuery
