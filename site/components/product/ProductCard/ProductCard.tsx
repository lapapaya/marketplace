import { FC } from 'react'
import cn from 'clsx'
import Link from 'next/link'
import type { Product } from '@commerce/types/product'
import s from './ProductCard.module.css'
import Image, { ImageProps } from 'next/image'
import WishlistButton from '@components/wishlist/WishlistButton'
import usePrice from '@framework/product/use-price'
import ProductTag from '../ProductTag'


export interface PapayaProduct extends Product {
  voltage?: {
    value: string | number
  }
  power?: {
    value: string | number
  }
  vehicleType?: {
    value: string
  }
  rangeList?: {
    value: string
  }
  chargeTimeList?: {
    value: string
  }
  cargoCapacityKg?: {
    value: string
  }
  cargoCapacityL?: {
    value: string
  }
  topSpeed?: {
    value: string
  }


  batteryReplaceable: {
    value: string
  }
  numberOfBatteries: {
    value: string
  }
  addons: {
    value: string
  }
  batteryType: {
    value: string
  }
  brakes: {
    value: string
  }
  tyres: {
    value: string
  }
  vehicleWeight: {
    value: string
  }
  torque: {
    value: string
  }
  brandId: {
    value: string
  }

}


interface Props {
  className?: string
  product: PapayaProduct
  noNameTag?: boolean
  imgProps?: Omit<ImageProps, 'src' | 'layout' | 'placeholder' | 'blurDataURL'>
  variant?: 'default' | 'slim' | 'simple' | 'search' | 'related'
}

const placeholderImg = '/product-img-placeholder.svg'

const SingleOrRange = ({ value }: { value: string | number}) => {
  const [min, max] = value.toString().startsWith('[') ? JSON.parse(value as string) : [value, value]
  return <>{(min === max || max === undefined) ? `${min}` : `${min} - ${max}`}</>
}

export const MetaData: FC<{ label: string, value: string | number | undefined, unit?: string }> = ({ label, value, unit }) => {
  return value ? <div className='flex justify-between items-center mb-2'>
    <div className='text-xs inline-flex items-center rounded-full bg-papaya-secondary px-2.5 py-0.5 font-bold text-papaya'>{label}</div>
    <div className='font-medium text-sm'><SingleOrRange value={value} /> {unit}</div>
  </div>: null
}

const ProductCard: FC<Props> = ({
  product,
  imgProps,
  className,
  noNameTag = false,
  variant = 'default',
}) => {
  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  })

  const rootClassName = cn(
    s.root,
    { [s.slim]: variant === 'slim', [s.simple]: variant === 'simple' },
    className
  )

  return (
    <Link
      href={`/product/${product.slug}`}
      className={rootClassName}
      aria-label={product.name}
    >
      {variant === 'slim' && (
        <>
          <div className={s.header}>
            <span>{product.name}</span>
          </div>
          {product?.images && (
            <Image
              quality="85"
              src={product.images[0]?.url || placeholderImg}
              alt={product.name || 'Product Image'}
              height={320}
              width={320}
              {...imgProps}
            />
          )}
        </>
      )}

      {variant === 'simple' && (
        <>
          {process.env.COMMERCE_WISHLIST_ENABLED && (
            <WishlistButton
              className={s.wishlistButton}
              productId={product.id}
              variant={product.variants[0]}
            />
          )}
          {!noNameTag && (
            <div className={s.header}>
              <h3 className={s.name}>
                <span>{product.name}</span>
              </h3>
              <div className={s.price}>
                {`${price} ${product.price?.currencyCode}`}
              </div>
            </div>
          )}
          <div className={s.imageContainer}>
            {product?.images && (
              <Image
                alt={product.name || 'Product Image'}
                className={s.productImage}
                src={product.images[0]?.url || placeholderImg}
                height={540}
                width={540}
                quality="85"
                {...imgProps}
              />
            )}
          </div>
        </>
      )}

      {variant === 'default' && (
        <>
          {process.env.COMMERCE_WISHLIST_ENABLED && (
            <WishlistButton
              className={s.wishlistButton}
              productId={product.id}
              variant={product.variants[0] as any}
            />
          )}
          <ProductTag
            name={product.name}
            price={`${price} ${product.price?.currencyCode}`}
          />
          <div className={s.imageContainer}>
            {product?.images && (
              <Image
                alt={product.name || 'Product Image'}
                className={s.productImage}
                src={product.images[0]?.url || placeholderImg}
                height={540}
                width={540}
                quality="85"
                {...imgProps}
              />
            )}
          </div>
        </>
      )}

      {variant === 'search' && (
        <div className='border rounded-md bg-primary-2 py-3 px-4'>
          <h3 className='text-lg font-medium'>
            {product.name}
          </h3>
          <div className={s.imageContainer}>
            {product?.images && (
              <Image
                alt={product.name || 'Product Image'}
                className={s.productImage}
                src={product.images[0]?.url || placeholderImg}
                height={540}
                width={540}
                quality="85"
                {...imgProps}
              />
            )}
          </div>
          <div className='mt-2 border-t pt-4'>
            <MetaData label='Type' value={product.vehicleType?.value} />
            <MetaData label='Range' value={product.rangeList?.value} unit='Km' />
            <MetaData label='Charge Time' value={product.chargeTimeList?.value} unit='Hours' />
            <MetaData label='Cargo Capacity' value={product.cargoCapacityKg?.value} unit='Kg' />
            <MetaData label='Top Speed' value={product.topSpeed?.value} unit='Km/h' />
          </div>
        </div>
      )}
    </Link>
  )
}

export default ProductCard
