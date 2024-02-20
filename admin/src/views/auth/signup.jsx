import { Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import { memo, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './auth.css'
import Swal from 'sweetalert2'

const Signup = () => {
  const navigate = useNavigate()
  const styles = {
    title: {
      fontFamily: 'Rubik, sans-serif',
      mb: '1.1em'
    },
    textFields: { mb: 3 },
    card: {
      maxWidth: '600px',
      height: 'auto'
    },
    button: {
      backgroundColor: '#3A424E',
      color: 'white',
      mt: '1em',
      mb: '1em',
      '&:hover': {
        backgroundColor: '#3A424E'
      }

    },
    grid: {
      height: '100vh'
    },
    box: {
      display: 'flex',
      justifyContent: 'center'
    }
  }
  const [usuario, setUsuario] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    puesto: '',
    usuario: '',
    telefono: '',
    tipo: '',
    departamento: ''
  })
  const [puestos, setPuestos] = useState([])
  const [departamentos, setDepartamentos] = useState([])
  const uri = 'http://127.0.0.1:8000/api'

  useEffect(() => {
    const getData = async () => {
      try {
        Promise.all([
          axios.get(`${uri}/puestos`),
          axios.get(`${uri}/departamentos`)
        ]).then(([_puestos, _departamento]) => {
          setPuestos(_puestos.data)
          setDepartamentos(_departamento.data)
        })
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

  const handleChange = ({ target }) => {
    setUsuario({
      ...usuario,
      [target.name]: target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newUser = {
        tipo_usuario: usuario.tipo,
        nombre: `${usuario.nombre} ${usuario.apellido}`,
        usuario: usuario.usuario,
        id_puesto: usuario.puesto,
        id_departamento: usuario.departamento,
        email: usuario.correo,
        telefono: usuario.telefono,
        estatus: 'activo'
      }
      const { data } = await axios.post(`${uri}/usuarios/signup`, newUser)
      console.log(data)
      if (data.token !== null) {
        await Swal.fire({
          icon: 'success',
          title: 'Usuario creado',
          text: 'El usuario ha sido creado con éxito',
          showConfirmButton: false,
          timer: 3000
        })
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='image-background' />
      <Grid container
        justifyContent="center"
        alignItems="center"
        sx={styles.grid}>
        <Paper elevation={1}>
          <Card sx={styles.card}>
            <CardContent>
              <Box sx={styles.box}>
                <img src="https://www.posibilidades.com.mx/4cap2023/images/logo/logo_4cap_300x100_positivo.svg" alt="logo" width='167' />
              </Box>
              <Typography variant="h6" sx={styles.title} component="h1" color='grey.800' align='center'>
                Crea tu cuenta
              </Typography>
              <Box component='form' autoComplete='off' noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      sx={styles.textFields}
                      label='Nombre'
                      fullWidth
                      name='nombre'
                      required
                      value={usuario.nombre}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      sx={styles.textFields}
                      label='Apellido'
                      fullWidth
                      required
                      name='apellido'
                      value={usuario.apellido}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      sx={styles.textFields}
                      label='Usuario'
                      name='usuario'
                      required
                      fullWidth
                      value={usuario.usuario}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      sx={styles.textFields}
                      label='Teléfono'
                      fullWidth
                      name='telefono'
                      type={'tel'}
                      required
                      value={usuario.telefono}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <TextField
                  sx={styles.textFields}
                  label='Correo'
                  fullWidth
                  value={usuario.correo}
                  type='email'
                  required
                  name='correo'
                  onChange={handleChange}
                />
                <FormControl fullWidth required >
                  <InputLabel id='puesto'>Puestos</InputLabel>
                  <Select
                    value={usuario.puesto}
                    sx={styles.textFields}
                    labelId='puesto'
                    id='puesto'
                    name='puesto'
                    label='puestos'
                    onChange={handleChange}
                  >
                    {
                      // eslint-disable-next-line camelcase
                      puestos && puestos.map(({ id_puesto, puesto }, index) => (
                        // eslint-disable-next-line camelcase
                        <MenuItem key={`puesto-${index}`} value={id_puesto}>{puesto}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControl fullWidth required>
                      <InputLabel id='tipo'>Tipo de usuario</InputLabel>
                      <Select
                        value={usuario.tipo}
                        sx={styles.textFields}
                        labelId='tipo'
                        id='tipo'
                        name='tipo'
                        label='Tipo de usuario'
                        onChange={handleChange}
                      >
                        <MenuItem value='Administrador'>Administrador</MenuItem>
                        <MenuItem value='Vendedor'>Vendedor</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth required >
                      <InputLabel id='departamento'>Departamentos</InputLabel>
                      <Select
                        value={usuario.departamento}
                        sx={styles.textFields}
                        labelId='departamento'
                        id='departamento'
                        name='departamento'
                        label='Departamentos'
                        onChange={handleChange}
                      >
                        {
                          // eslint-disable-next-line camelcase
                          departamentos && departamentos.map(({ id_departamento, departamento }, index) => (
                            // eslint-disable-next-line camelcase
                            <MenuItem key={`departamento-${index}`} value={id_departamento}>{departamento}</MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Button variant='contained' size='large' fullWidth sx={styles.button} type='submit'>
                  Crear cuenta
                </Button>
                <Typography variant='body2' component='p' align='center'>
                  ¿Ya tienes una cuenta? <Link to='/login'>Inicia sesión</Link>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Paper>
      </Grid>
    </>
  )
}
export default memo(Signup)
