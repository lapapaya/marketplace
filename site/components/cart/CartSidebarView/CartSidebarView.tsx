import cn from 'clsx'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import s from './CartSidebarView.module.css'
import CartItem from '../CartItem'
import { Button, Text } from '@components/ui'
import { useUI } from '@components/ui/context'
import { Bag, Cross, Check } from '@components/icons'
import useCart from '@framework/cart/use-cart'
import usePrice from '@framework/product/use-price'
import SidebarLayout from '@components/common/SidebarLayout'
import { LineItem } from '@commerce/types/cart'
import useSubmitFreeCheckout from '@framework/checkout/use-checkout'
import useCheckoutCustomerAssociate from '@framework/customer/useCheckoutCustomerAssociate'

const countItem = (count: number, item: LineItem) => count + item.quantity
const CartSidebarView: FC = () => {
  const { closeSidebar, setSidebarView } = useUI()
  const { data, isLoading, isEmpty } = useCart()

  const associate = useCheckoutCustomerAssociate()
  const checkout = useSubmitFreeCheckout()


  const [isCheckingOut, setIsCheckingOut] = useState(false)


  const { price: subTotal } = usePrice(
    data && {
      amount: Number(data.subtotalPrice),
      currencyCode: data.currency.code,
    }
  )
  const { price: total } = usePrice(
    data && {
      amount: Number(data.totalPrice),
      currencyCode: data.currency.code,
    }
  )
  const handleClose = () => closeSidebar()
  const createCheckout = async () => {

    setIsCheckingOut(true)

    await associate()
    await checkout()

    setIsCheckingOut(false)

    // On Successful checkout

    //TODO: Check that it was successful.

    setSidebarView('THANK_YOU_VIEW')

  }

  const itemsCount = data?.lineItems?.reduce(countItem, 0) ?? 0

  const error = null
  const success = null

  return (
    <SidebarLayout
      className={cn({
        [s.empty]: error || success || isLoading || isEmpty,
      })}
      handleClose={handleClose}
    >
      {isLoading || isEmpty ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-dashed border-primary rounded-full flex items-center justify-center w-16 h-16 p-12 bg-papaya text-secondary">
            <Bag className="absolute" />
          </span>
          <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
            Your Fleet is empty
          </h2>
          <p className="text-accent-3 px-10 text-center pt-2">
            Add a vehicle to your fleet quote to get started.
          </p>
        </div>
      ) : error ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
            <Cross width={24} height={24} />
          </span>
          <h2 className="pt-6 text-xl font-light text-center">
            We couldn???t process the purchase. Please check your card information
            and try again.
          </h2>
        </div>
      ) : success ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
            <Check />
          </span>
          <h2 className="pt-6 text-xl font-light text-center">
            Thank you for your order.
          </h2>
        </div>
      ) : (
        <>
          <div className="px-4 sm:px-6 flex-1">
            <Link href="/cart">
              <Text variant="sectionHeading" onClick={handleClose}>
                Quote Builder
              </Text>
            </Link>
            <ul className={s.lineItemsList}>
              {data!.lineItems.map((item: any) => (
                <CartItem
                  key={item.id}
                  item={item}
                  currencyCode={data!.currency.code}
                />
              ))}
            </ul>
          </div>

          <div className="flex-shrink-0 px-6 py-6 sm:px-6 sticky z-20 bottom-0 w-full right-0 left-0 bg-accent-0 border-t text-sm">
            {/* <ul className="pb-2">
              <li className="flex justify-between py-1">
                <span>Subtotal</span>
                <span>{subTotal}</span>
              </li>
              <li className="flex justify-between py-1">
                <span>Taxes</span>
                <span>Calculated at checkout</span>
              </li>
              <li className="flex justify-between py-1">
                <span>Shipping</span>
                <span className="font-bold tracking-wide">FREE</span>
              </li>
            </ul> */}
            <div className="flex justify-between border-accent-2 py-3 font-bold mb-2">
              <span>Fleet Size</span>
              <span>{itemsCount}</span>
            </div>
            <div>
              <p className='mb-5 text-slate-800'>After submitting a fleet sourcing specialist from Papaya will review your requirements and reach out to you.</p>
            </div>
            <div>
              {process.env.COMMERCE_CUSTOMCHECKOUT_ENABLED ? (
                <Button Component="a" loading={isCheckingOut} width="100%" onClick={createCheckout}>
                  Submit Quote Request
                </Button>
              ) : (
                <Button href="/checkout" Component="a" width="100%">
                  Submit Quote Request
                </Button>
              )}
            </div>
          </div>
        </>
      )}
    </SidebarLayout>
  )
}

export default CartSidebarView
