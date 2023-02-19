import s from './ProductSidebar.module.css'
import { useAddItem } from '@framework/cart'
import { FC, useEffect, useState } from 'react'
import { ProductOptions } from '@components/product'
import { Button, Text, useUI } from '@components/ui';
import {
  getProductVariant,
  selectDefaultOptionFromProduct,
  SelectedOptions,
} from '../helpers'
import ErrorMessage from '@components/ui/ErrorMessage'
import { MetaData, PapayaProduct } from '../ProductCard/ProductCard'

interface ProductSidebarProps {
  product: PapayaProduct
  className?: string
}

const ProductSidebar: FC<ProductSidebarProps> = ({ product, className }) => {
  const addItem = useAddItem()
  const { openSidebar, setSidebarView } = useUI()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | Error>(null)
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})

  useEffect(() => {
    selectDefaultOptionFromProduct(product, setSelectedOptions)
  }, [product])

  const variant = getProductVariant(product, selectedOptions)
  const addToCart = async () => {
    setLoading(true)
    setError(null)
    try {
      await addItem({
        productId: String(product.id),
        variantId: String(variant ? variant.id : product.variants[0]?.id),
      })
      setSidebarView('CART_VIEW')
      openSidebar()
      setLoading(false)
    } catch (err) {
      setLoading(false)
      if (err instanceof Error) {
        console.error(err)
        setError({
          ...err,
          message: 'Could not add item to cart. Please try again.',
        })
      }
    }
  }

  return (
    <div className={className}>
      <ProductOptions
        options={product.options}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
      <div>
        {error && <ErrorMessage error={error} className="my-5" />}
        {process.env.COMMERCE_CART_ENABLED && (
          <Button
            aria-label="Add to Cart"
            type="button"
            className={s.button}
            onClick={addToCart}
            loading={loading}
          >
            Add to Quote builder
          </Button>
        )}
      </div>
      {product.descriptionHtml &&

      <div className='mt-6 bg-primary-2 p-4 border rounded-md'>
        <h3 className='font-medium text-xl text-slate-700 mb-5'>Description</h3>
        <Text
            className="pb-4 break-words w-full max-w-xl"
            html={product.descriptionHtml}
          />
        </div>
      }


      <div className="mt-6 bg-primary-2 p-8 border rounded-md">

      <h3 className='font-bold text-2xl text-slate-700 mb-5'>Technical Specifications</h3>


      <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">

              <div className="pt-4">
                <dt className="font-medium text-gray-900 border-b pb-4 border-gray-200 ">Cargo Capability</dt>
                <dd className="mt-4 text-sm text-gray-500">
                  <MetaData label='Capacity' value={product.cargoCapacityKg?.value} unit='Kg' />
                  <MetaData label='Volume' value={product.cargoCapacityL?.value} unit='L' />
                </dd>
              </div>

              <div className="pt-4">
                <dt className="font-medium text-gray-900 border-b pb-4 border-gray-200">Engine & Range</dt>
                <dd className="mt-4 text-sm text-gray-500">

                  <MetaData label='Range' value={product.rangeList?.value} unit='Km' />
                  <MetaData label='Voltage' value={product.voltage?.value} unit='V' />
                  <MetaData label='Power' value={product.power?.value} unit='W' />
                  <MetaData label='Torque' value={product.torque?.value} unit='Nm' />
                  <MetaData label='Top Speed' value={product.topSpeed?.value} unit='Km/h' />


                </dd>
              </div>

              <div className="pt-4">
                <dt className="font-medium text-gray-900 border-b pb-4 border-gray-200">Battery</dt>
                <dd className="mt-4 text-sm text-gray-500">
                  <MetaData label='Type' value={product.batteryType?.value} />
                  <MetaData label='Charge Time' value={product.chargeTimeList?.value} unit='hours' />
                  <MetaData label='Number' value={product.numberOfBatteries?.value} />
                  <MetaData label='Replaceable' value={product.batteryReplaceable?.value} />
                </dd>
              </div>

              <div className="pt-4">
                <dt className="font-medium text-gray-900 border-b pb-4 border-gray-200">Vehicle</dt>
                <dd className="mt-4 text-sm text-gray-500">
                  <MetaData label='Unloaded Weight' value={product.vehicleWeight?.value} unit='Kg' />
                  <MetaData label='Brand' value={product.brandId?.value} />
                  <MetaData label='Tyres' value={product.tyres?.value} />
                  <MetaData label='Brakes' value={product.brakes?.value} />
                </dd>
              </div>

              <div className="pt-4">
                <dt className="font-medium text-gray-900 border-b pb-4 border-gray-200">Addons</dt>
                <dd className="mt-4 text-sm text-gray-500">
                  <p>{product.addons?.value}</p>
                </dd>
              </div>

          </dl>

      </div>

      {product.descriptionHtml && <div className='mt-8'>
      {process.env.COMMERCE_CART_ENABLED && (
          <Button
            aria-label="Add to Cart"
            type="button"
            className={s.button}
            onClick={addToCart}
            loading={loading}
          >
            Add to Quote builder
          </Button>
        )}

      </div>}

    </div>
  )
}

export default ProductSidebar
