/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { Box, Typography, Paper } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import { apiAuth } from '../api'
import IMGCompletado from '../assets/images/estaticos/imagen_pago_exitoso_800x550.svg'

const PagoExitoso = ({ usuario }) => {
  const [searchParams] = useSearchParams()

  const orderId = searchParams.get('order_id') || null
  const paymentStatus = searchParams.get('payment_status') || null
  useEffect(() => {
    const getOrden = async () => {
      // const paymentStatus = searchParams.get('payment_status') || null

      if (orderId) {
        const url = `/pagos-conekta/find?order_id=${orderId}&payment_status=${paymentStatus}`
        console.log('url', url)
        const { data } = await apiAuth().get(url)
        console.log('data', data)
        return data
      }
    }

    getOrden()
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        m: 2
      }}
    >
      <Paper elevation={1} sx={{ p: 2, m: 0, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {paymentStatus === 'paid' && (
          <>
            <img src={IMGCompletado} alt="Pago Exitoso" width={400} />
            <Typography variant="h5" component="h3" sx={{ mt: 2 }}>
              Pago Exitoso
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              ¡Tu pago ha sido procesado correctamente!
            </Typography>
          </>
        )}

        {paymentStatus === 'pending_payment' && (
          <>
            <img src={IMGCompletado} alt="Pago Pendiente" width={400} />
            <Typography variant="h5" component="h3" sx={{ mt: 2 }}>
              Pago Pendiente
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Tu pago está pendiente de ser procesado.
            </Typography>
          </>
        )}

        {paymentStatus === 'error' && (
          <>
            <img src={IMGCompletado} alt="Pago Fallido" width={400} />
            <Typography variant="h5" component="h3" sx={{ mt: 2 }}>
              Pago Fallido
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Tu pago no pudo ser procesado.
            </Typography>
          </>
        )}

      </Paper>
    </Box>
  )
}

export default PagoExitoso
