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
      vehicleType: metafield(namespace: "papaya", key: "vehicle_type") {
        value
      }
      rangeList: metafield(namespace: "papaya", key: "range-list") {
        value
      }
      chargeTimeList: metafield(namespace: "papaya", key: "charge_tim_range") {
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
      batteryReplaceable: metafield(
        namespace: "papaya"
        key: "battery_replaceable"
      ) {
        value
      }
      numberOfBatteries: metafield(
        namespace: "papaya"
        key: "number_of_batteries"
      ) {
        value
      }
      addons: metafield(namespace: "papaya", key: "addons") {
        value
      }
      batteryType: metafield(namespace: "papaya", key: "battery_type") {
        value
      }
      brakes: metafield(namespace: "papaya", key: "brakes") {
        value
      }
      tyres: metafield(namespace: "papaya", key: "tyres") {
        value
      }
      vehicleWeight: metafield(namespace: "papaya", key: "vehicle_weight") {
        value
      }
      torque: metafield(namespace: "papaya", key: "torque") {
        value
      }
      brandId: metafield(namespace: "papaya", key: "brand_id") {
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
