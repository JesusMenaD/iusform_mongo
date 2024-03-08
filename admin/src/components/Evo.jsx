import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

function PaymentComponent() {
  const [isCheckoutLoaded, setIsCheckoutLoaded] = useState(false)

  // Manejo de errores y cancelación (como antes)

  // Carga del script externo
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://evopaymentsmexico.gateway.mastercard.com/static/checkout/checkout.min.js'
    script.async = true
    script.onload = () => setIsCheckoutLoaded(true)
    script.onerror = (error) => {
      console.error('Error al cargar el script Checkout:', error)
    }
    script.oncancel = () => {
      console.log('Checkout cancelado')
    }
    script.onerror = () => {
      console.log('Checkout error')
    }
    script.oncomplete = () => {
      console.log('Checkout completado')
    }

    document.head.appendChild(script)
  }, [])

  // Configuración de Checkout (si el script se ha cargado)
  useEffect(() => {
    if (isCheckoutLoaded) {
      Checkout.configure({
        session: {
          id: '<your_initiate_checkout_session_ID>'
        }
      })
    }
  }, [isCheckoutLoaded])

  return (
    <div>
      <Helmet>
        {isCheckoutLoaded
          ? (
            <script
              src="https://evopaymentsmexico.gateway.mastercard.com/static/checkout/checkout.min.js"
            />
          )
          : null}
      </Helmet>
      <div id="embed-target"></div>
      {isCheckoutLoaded && (
        <>
          <button onClick={() => Checkout.showEmbeddedPage('#embed-target')}>
            Pagar con página incrustada
          </button>
          <button onClick={Checkout.showPaymentPage}>Pagar con página de pago</button>
        </>
      )}
    </div>
  )
}

export default PaymentComponent
