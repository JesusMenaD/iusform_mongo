/* eslint-disable react/prop-types */
import { ShoppingCart } from 'react-feather'
import { Alert, CircularProgress } from '@mui/material'
import { apiAuth } from '../../../api'
import { useState } from 'react'
import Swal from 'sweetalert2'

const Description = ({ usuario, id, title = 'fall limited edition sneakers', precio = '125.00', tipo = 'sneaker company', descripcion = 'These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer', tiempo = 0, pruebaGratis = false, iscard = false }) => {
  const [isLoading, setIsLoading] = useState(false)

  const comprarProducto = async () => {
    try {
      setIsLoading(true)
      const url = '/pagos-conekta'
      const { data } = await apiAuth().post(url, {
        idProducto: id,
        usuario
      })
      const orden = data.orden || null

      if (orden) {
        const url = orden?.checkout?.url
        window.location.href = url
      }
    } catch (error) {
      console.log(error)
      const message = error.response?.data?.message || 'No se pudo realizar la compra'
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="description" >
      {!iscard && <p className="pre">{tipo}</p>}

      {iscard ? <h4 style={{ margin: 'auto' }}>{title}</h4> : <h1>{title}</h1>
      }

      <p className="desc">
        {iscard
          ? descripcion && descripcion.length > 100 ? descripcion.substring(0, 100) + '...' : descripcion
          : descripcion}
      </p>
      <div className="price">
        <div className="main-tag">
          {
            pruebaGratis
              ? <p>Prueba Gratis</p>
              : <p>${precio}</p>
          }
          {
            pruebaGratis &&
            <p>
              100%
            </p>
          }
        </div>
        {
          pruebaGratis
            ? <s>${precio}</s>
            : null
        }
      </div>
      {tipo === 'Paquete' || tipo === 'Timbres'
        ? <div style={{ color: 'grey' }}>
          {tiempo === 0
            ? ''
            : `Vigencia de ${tiempo} días`
          }
        </div>
        : null
      }
      {
        tipo === 'Plantilla' && !iscard && <Alert severity="info">
          A la hora de comprar una plantilla, se le enviará un correo con un link de descarga.
        </Alert>
      }
      {
        !iscard && <div className="buttons">
          <button
            className="add-to-cart"
            disabled={isLoading}
            onClick={() => comprarProducto()}
          >
            <ShoppingCart />
            {isLoading ? <CircularProgress color='white' size={20} /> : 'Comprar'}
          </button>
        </div>
      }
    </section >
  )
}

export default Description
