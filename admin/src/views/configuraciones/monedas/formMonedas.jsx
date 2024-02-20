import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { memo, useContext, useState } from 'react'
import { PostMoneda } from '../../../api/configuraciones'
import { AlertaCollapse } from '../../../components/AlertaCollapse'
import { useField } from '../../../hooks/useField'
import { UsuarioContext } from '../../../context/UsuarioContext'
import { NotificationContext } from '../../../context/NotificationConext'

// eslint-disable-next-line react/prop-types
const FormMonedas = ({ close }) => {
  const queryClient = useQueryClient()
  const [usuarioContext] = useContext(UsuarioContext)
  const token = usuarioContext.token
  const moneda = useField({ type: 'text' })
  const tipoCambio = useField({ type: 'number' })
  const abreviatura = useField({ type: 'text' })
  const singular = useField({ type: 'text' })
  const plural = useField({ type: 'text' })
  const [, setNotification] = useContext(NotificationContext)

  const addMonedaMutation = useMutation({
    mutationFn: PostMoneda,
    onSuccess: (s) => {
      console.log(s)
      queryClient.invalidateQueries('monedas')
      close()
      setNotification((prev) => [...prev, {
        id: prev.length + 1,
        type: 'green',
        message: 'Moneda creado correctamente.',
        createdAt: new Date()
      }])
    },
    onError: (error) => {
      console.log(error)
      setNotification((prev) => [...prev, {
        id: prev.length + 1,
        type: 'red',
        message: 'Error al crear moneda.',
        createdAt: new Date()
      }])
    }
  })

  // alerta
  const [active, setActive] = useState(false)
  const [severity, setSeverity] = useState('info')
  const [title, setTitle] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (moneda.value === '' || tipoCambio.value === '' || abreviatura.value === '' || singular.value === '' || plural.value === '') {
      setActive(true)
      setSeverity('info')
      setTitle('Todos los campos son obligatorios')
      return
    }
    if (tipoCambio.value < 1) {
      setActive(true)
      setSeverity('error')
      setTitle('El tipo de cambio debe ser mayor a 0')
      return
    }

    const payload = {
      moneda: moneda.value,
      tipo_cambio: tipoCambio.value,
      abreviatura: abreviatura.value,
      singular: singular.value,
      plural: plural.value
    }
    addMonedaMutation.mutate({ payload, token })
  }

  const sx = { mb: 3 }
  const sxButton = { display: 'flex', justifyContent: 'flex-end' }

  return (
    <>
      <AlertaCollapse active={active} severity={severity} title={title} />
      <Box sx={{ maxWidth: '30rem' }}>
        <Box
          component='form'
          autoComplete='off'
          onSubmit={handleSubmit}
        >
          <TextField
            sx={sx}
            label='Moneda'
            fullWidth
            inputProps={{ maxLength: 60 }}
            required
            {...moneda}
          />
          <TextField
            sx={sx}
            label='Tipo de cambio'
            fullWidth
            required
            {...tipoCambio}
          />
          <TextField
            sx={sx}
            label='Abreviatura'
            fullWidth
            inputProps={{ maxLength: 20 }}
            required
            {...abreviatura}
          />
          <TextField
            sx={sx}
            label='Singular'
            fullWidth
            inputProps={{ maxLength: 100 }}
            required
            {...singular}
          />
          <TextField
            sx={sx}
            label='Plural'
            fullWidth
            inputProps={{ maxLength: 100 }}
            required
            {...plural}
          />
          <Box sx={sxButton} >
            <Button sx={sx} variant='contained' color='primary' type='submit'>
              Guardar
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default memo(FormMonedas)
