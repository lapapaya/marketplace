import { FC, useState } from 'react'
import { useUI } from '@components/ui/context'
import SidebarLayout from '@components/common/SidebarLayout'
import useCart from '@framework/cart/use-cart'
import usePrice from '@framework/product/use-price'
import s from './CheckoutCompleteSidebarView.module.css'
import { useCheckoutContext } from '../context'
import thankYou from '../../../public/thank-you.png'
import Img from 'next/image'


// Here be custom logic to submit an empty basket
const CheckoutCompleteSidebarView: FC = () => {
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const { setSidebarView, closeSidebar } = useUI()
  const { data: cartData, mutate: refreshCart } = useCart()
  const { clearCheckoutFields } = useCheckoutContext()

  async function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    try {
      setLoadingSubmit(true)
      event.preventDefault()

      clearCheckoutFields()
      setLoadingSubmit(false)
      refreshCart()
      closeSidebar()
    } catch {
      // TODO - handle error UI here.
      setLoadingSubmit(false)
    }
  }

  const { price: subTotal } = usePrice(
    cartData && {
      amount: Number(cartData.subtotalPrice),
      currencyCode: cartData.currency.code,
    }
  )
  const { price: total } = usePrice(
    cartData && {
      amount: Number(cartData.totalPrice),
      currencyCode: cartData.currency.code,
    }
  )

  return (
    <SidebarLayout
      className={s.root}
      handleBack={() => setSidebarView('CART_VIEW')}
    >
        <div className="flex-1 flex flex-col justify-center items-center">
          <Img src={thankYou} width={400} alt="Thank You" />
          <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
            We've received<br />your Quote Request!
          </h2>
          <p className="text-accent-3 px-10 text-center pt-2">
            One of our Fleet Specialists will be in touch shortly to discuss your requirements.
          </p>
        </div>
    </SidebarLayout>
  )
}

export default CheckoutCompleteSidebarView
