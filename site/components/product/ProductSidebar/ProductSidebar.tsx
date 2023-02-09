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


      <div className="mt-6 bg-primary-2 p-4 border rounded-md">

      <h3 className='font-medium text-xl text-slate-700 mb-5'>Stats</h3>

      <MetaData label='Range' value={product.range?.value} unit='KM' />
      <MetaData label='Charge Time' value={product.chargeTime?.value} unit='hours' />
      <MetaData label='Capacity' value={product.capacity?.value} unit='Kg' />
      <MetaData label='Voltage' value={product.voltage?.value} unit='V' />
      <MetaData label='Power' value={product.power?.value} unit='W' />

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
