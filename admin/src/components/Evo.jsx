import React, { useEffect } from 'react'

const PaymentForm = () => {
  useEffect(() => {
    // Cargar dinámicamente el script de sesión de Mastercard
    const script = document.createElement('script')
    script.src = 'https://evopaymentsmexico.gateway.mastercard.com/form/version/62/merchant/1097643/session.js'
    script.async = true
    document.body.appendChild(script)

    script.onload = () => {
      // Configuración de la sesión de pago tras la carga del script
      if (window.PaymentSession) {
        window.PaymentSession.configure({
          fields: {
            card: {
              number: '#card-number',
              securityCode: '#security-code',
              expiryMonth: '#expiry-month',
              expiryYear: '#expiry-year',
              nameOnCard: '#cardholder-name'
            }
          },
          frameEmbeddingMitigation: ['javascript'],
          callbacks: {
            initialized: function (response) {
              console.log('Payment Session Initialized', response)
            },
            formSessionUpdate: function (response) {
              console.log('Form Session Update', response)
            }
          },
          interaction: {
            displayControl: {
              formatCard: 'EMBOSSED',
              invalidFieldCharacters: 'REJECT'
            }
          }
        })
      }
    }

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const pay = () => {
    // Función para actualizar la sesión con datos del formulario
    if (window.PaymentSession) {
      window.PaymentSession.updateSessionFromForm('card')
    }
  }

  return (
    <div>
      <div>Please enter your payment details:</div>
      <h3>Credit Card</h3>
      <div>Card Number: <input type="text" id="card-number" className="input-field" title="card number" aria-label="enter your card number" value="5424180279791732" readOnly /></div>
      <div>Expiry Month:<input type="text" id="expiry-month" className="input-field" title="expiry month" aria-label="two digit expiry month" value="01" readOnly /></div>
      <div>Expiry Year:<input type="text" id="expiry-year" className="input-field" title="expiry year" aria-label="two digit expiry year" value="30" readOnly /></div>
      <div>Security Code:<input type="text" id="security-code" className="input-field" title="security code" aria-label="three digit CCV security code" value="123" readOnly /></div>
      <div>Cardholder Name:<input type="text" id="cardholder-name" className="input-field" title="cardholder name" aria-label="enter name on card" value="prueba" readOnly /></div>
      <div><button id="payButton" onClick={pay}>Pay Now</button></div>
    </div>
  )
}

export default PaymentForm

// import React, { useEffect } from 'react'

// const PaymentButtons = () => {
//   useEffect(() => {
//     Carga dinámica del script de Checkout de Mastercard
//     const script = document.createElement('script')
//     script.src = 'https://evopaymentsmexico.gateway.mastercard.com/static/checkout/checkout.min.js'
//     script.async = true

//     Configura callbacks para error y cancelación
//     script.setAttribute('data-error', 'errorCallback')
//     script.setAttribute('data-cancel', 'cancelCallback')

//     document.body.appendChild(script)

//     script.onload = () => {
//       Configura la sesión de Checkout después de cargar el script
//       if (window.Checkout) {
//         window.Checkout.configure({
//           session: {
//             id: 'SESSION0002290174585L61073610I7'
//           }
//         })
//       }
//     }

//     Funciones de callback
//     window.errorCallback = function (error) {
//       console.log(JSON.stringify(error))
//     }

//     window.cancelCallback = function () {
//       console.log('Payment cancelled')
//     }

//     return () => {
//       document.body.removeChild(script)
//     }
//   }, [])

//   const showEmbeddedPage = () => {
//     if (window.Checkout) {
//       window.Checkout.showEmbeddedPage('#embed-target')
//     }
//   }

//   const showPaymentPage = () => {
//     if (window.Checkout) {
//       window.Checkout.showPaymentPage()
//     }
//   }

//   return (
//     <div>
//       <div id="embed-target"></div>
//       <input type="button" value="Pay with Embedded Page" onClick={showEmbeddedPage} />
//       <input type="button" value="Pay with Payment Page" onClick={showPaymentPage} />
//     </div>
//   )
// }

// export default PaymentButtons
