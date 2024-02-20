/* eslint-disable react/prop-types */
import { Alert, Button, FormLabel, LinearProgress, Paper, TextField, Typography } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { memo, useContext, useState } from 'react'
import { GetMonedaById, PutMoneda } from '../../../api/configuraciones'
import { AlertaCollapse } from '../../../components/AlertaCollapse'
import { useNavigate, useParams } from 'react-router-dom'
import { Box } from '@mui/system'
import { useField } from '../../../hooks/useField'
import { UsuarioContext } from '../../../context/UsuarioContext'
import { NotificationContext } from '../../../context/NotificationConext'

const styles = {
  formLabel: {
    fontSize: '14px',
    color: '#000000'
  },
  formControl: {
    mb: 2
  },
  box: { display: 'flex', justifyContent: 'center' },
  end: { display: 'flex', justifyContent: 'flex-end' },
  paper: {
    backgroundColor: 'white',
    borderRadius: 1,
    p: '24px',
    maxWidth: '560px'
  },
  title: { mb: 2, fontWeight: 'bold', color: 'primary.main' }
}

const Moneda = ({ watch = false }) => {
  const navigate = useNavigate()
  const [usuarioContext] = useContext(UsuarioContext)
  const [, setNotification] = useContext(NotificationContext)
  const token = usuarioContext.token
  const { id } = useParams()
  const moneda = useField({ type: 'text' })
  const tipoCambio = useField({ type: 'number' })
  const abreviatura = useField({ type: 'text' })
  const singular = useField({ type: 'text' })
  const plural = useField({ type: 'text' })

  const { data, isLoading, isError } = useQuery({
    queryKey: ['moneda'],
    queryFn: () => GetMonedaById({ id, token }),
    onSuccess: (s) => {
      console.log(s)
      moneda.onChange({ target: { value: s.moneda } })
      tipoCambio.onChange({ target: { value: s.tipo_cambio } })
      abreviatura.onChange({ target: { value: s.abreviatura } })
      singular.onChange({ target: { value: s.singular } })
      plural.onChange({ target: { value: s.plural } })
    }

  })

  const editMonedaMutation = useMutation({
    mutationFn: PutMoneda,
    onSuccess: (s) => {
      console.log(s)
      setNotification((prev) => [...prev, {
        id: prev.length + 1,
        type: 'green',
        message: 'Moneda editada con éxito.',
        createdAt: new Date()
      }])
      navigate('/configuraciones/monedas')
    },
    onError: (error) => {
      console.log(error)
      setNotification((prev) => [...prev, {
        id: prev.length + 1,
        type: 'red',
        message: 'Error al editar la moneda.',
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

    if (data.moneda === moneda.value && data.tipo_cambio === tipoCambio.value && data.abreviatura === abreviatura.value && data.singular === singular.value && data.plural === plural.value) {
      setActive(true)
      setSeverity('info')
      setTitle('No se han realizado cambios')
      return
    }

    const payload = {
      moneda: moneda.value,
      tipo_cambio: tipoCambio.value,
      abreviatura: abreviatura.value,
      singular: singular.value,
      plural: plural.value,
      id_moneda: id
    }
    editMonedaMutation.mutate({ payload, token })
  }

  return (
    <>
      {
        isLoading && <LinearProgress />
      }
      {
        isError && <Alert severity='error'>Error al cargar los datos</Alert>
      }
      <Box sx={styles.box}>
        {
          data && (
            <>
              <Paper sx={styles.paper}>
                <Typography variant='h5' sx={styles.title}>
                  {watch ? 'Ver monedas' : 'Editar monedas'}
                </Typography>
                <AlertaCollapse active={active} severity={severity} title={title} />
                <Box
                  component='form'
                  autoComplete='off'
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <>
                    <FormLabel htmlFor='id' component='label' sx={styles.formLabel}>
                      ID
                    </FormLabel>
                    <TextField
                      id='id'
                      placeholder='ID'
                      fullWidth
                      name='id'
                      value={id}
                      sx={styles.formControl}
                      color='info'
                      margin='dense'
                      size='small'
                      disabled
                    />
                  </>
                  <>
                    <FormLabel htmlFor='moneda' required component='label' sx={styles.formLabel}>
                      Moneda
                    </FormLabel>
                    <TextField
                      id='moneda'
                      placeholder='moneda'
                      inputProps={{ maxLength: 60 }}
                      {...moneda}
                      fullWidth
                      disabled={watch}
                      sx={styles.formControl}
                      color='info'
                      margin='dense'
                      size='small'
                    />
                  </>
                  <>
                    <FormLabel htmlFor='tipo_cambio' required component='label' sx={styles.formLabel}>
                      Tipo de cambio
                    </FormLabel>
                    <TextField
                      id='tipo_cambio'
                      placeholder='Tipo de cambio'
                      {...tipoCambio}
                      fullWidth
                      disabled={watch}
                      sx={styles.formControl}
                      color='info'
                      margin='dense'
                      size='small'
                    />
                  </>
                  <>
                    <FormLabel htmlFor='abreviatura' required component='label' sx={styles.formLabel}>
                      Abreviatura
                    </FormLabel>
                    <TextField
                      id='abreviatura'
                      placeholder='Abreviatura'
                      fullWidth
                      inputProps={{ maxLength: 20 }}
                      {...abreviatura}
                      disabled={watch}
                      sx={styles.formControl}
                      color='info'
                      margin='dense'
                      size='small'
                    />
                  </>
                  <>
                    <FormLabel htmlFor='singular' required component='label' sx={styles.formLabel}>
                      Singular
                    </FormLabel>
                    <TextField
                      id='singular'
                      placeholder='Singular'
                      inputProps={{ maxLength: 100 }}
                      {...singular}
                      fullWidth
                      disabled={watch}
                      sx={styles.formControl}
                      color='info'
                      margin='dense'
                      size='small'
                    />
                  </>
                  <>
                    <FormLabel htmlFor='plural' required component='label' sx={styles.formLabel}>
                      Plural
                    </FormLabel>
                    <TextField
                      id='plural'
                      placeholder='Plural'
                      {...plural}
                      inputProps={{ maxLength: 100 }}
                      fullWidth
                      disabled={watch}
                      sx={styles.formControl}
                      color='info'
                      margin='dense'
                      size='small'
                    />
                  </>
                  <Box sx={styles.end}>
                    <Button sx={{ ...styles.formControl, mr: 2 }} variant='outlined' color='info' onClick={() => navigate('/configuraciones/monedas')}>
                      {watch ? 'Regresar' : 'Cancelar'}
                    </Button>
                    {
                      !watch && (
                        <Button sx={styles.formControl} variant='contained' color='primary' type='submit'>
                          Guardar cambios
                        </Button>
                      )
                    }
                  </Box>
                </Box>
              </Paper>
            </>
          )
        }
      </Box>
    </>
  )
}

export default memo(Moneda)
