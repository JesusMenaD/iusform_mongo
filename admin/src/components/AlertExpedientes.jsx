/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Alert, Collapse, AlertTitle, Typography, IconButton, Paper, Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { Link } from 'react-router-dom'
const AlertExpedientes = ({ despacho }) => {
  const [open, setOpen] = useState(true)

  const { contadorExp } = despacho

  const { contador = 0, limite = 0, vigencia = '' } = contadorExp

  const totalExpedientes = contador

  const expedientesActivos = contador - limite

  const expedientesRestantes = limite - contador

  const fechaVigencia = new Date(vigencia)

  const fechaActual = new Date()

  const diasRestantes = Math.floor((fechaVigencia - fechaActual) / (1000 * 60 * 60 * 24))

  let diasRestantesColor = 'primary.main' // Color por defecto para el texto del tiempo restante

  // Asignar colores según la cantidad de días restantes
  if (diasRestantes > 7) {
    diasRestantesColor = 'green' // Verde para más de 7 días
  } else if (diasRestantes >= 3 && diasRestantes <= 7) {
    diasRestantesColor = 'orange' // Amarillo para entre 3 y 7 días
  } else if (diasRestantes < 3) {
    diasRestantesColor = 'red' // Rojo para menos de 3 días
  }

  return (
    <Paper sx={{
      bgcolor: 'white'
    }} elevation={0}>

      <Collapse in={open}>
        <Alert severity="warning" action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false)
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }>
          <AlertTitle>Resumen de expedientes</AlertTitle>
          <p>Expedientes restantes: {expedientesRestantes}
          </p>
          {diasRestantes < 10 && (

            diasRestantes > 1
              ? (<Typography variant="h6" color="primary.main" >
                {diasRestantes} días restantes
              </Typography>)
              : (<Typography variant="h6" color="error" >
                {
                  diasRestantes > 0
                    ? `${diasRestantes} días restantes`
                    : <>
                      <Button
                        variant='outlined'
                        title='Actualizar plan'
                        to='/shop'
                        component={Link}
                      >
                        Actualizar plan

                      </Button>
                    </>
                }
              </Typography>)
          )}
        </Alert>
      </Collapse>
    </Paper>
  )
}

export default AlertExpedientes
