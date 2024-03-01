/* eslint-disable react/prop-types */
import { Button, TextField, Paper } from '@mui/material'
import { Box } from '@mui/system'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { memo, useContext, useState } from 'react'
import { useField } from '../../hooks/useField'
import { UsuarioContext } from '../../context/UsuarioContext'
import ButtonAction from '../../components/ButtonAction'
import { apiAuth } from '../../api'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import Swal from 'sweetalert2'

const EditarPerfil = () => {
  const queryClient = useQueryClient()
  const [usuarioContext, setUsuarioContext] = useContext(UsuarioContext)

  const [foto, setFoto] = useState(null)

  const nombre = useField({ type: 'text', state: usuarioContext?.nombre })
  const apellidoPaterno = useField({ type: 'text', state: usuarioContext?.apellidoPaterno })
  const apellidoMaterno = useField({ type: 'text', state: usuarioContext?.apellidoMaterno })
  const email = useField({ type: 'email', state: usuarioContext?.email })
  const telefono = useField({ type: 'text', state: usuarioContext?.telefono })
  const password = useField({ type: 'password', state: usuarioContext?.password })
  const [, setUsuarioLS] = useLocalStorage('usuario', null)

  const actualizarUsuarioMutation = useMutation({
    mutationFn: async (payload) => {
      const { data } = await apiAuth({ 'Content-Type': 'multipart/form-data' }).put(`/usuario/${usuarioContext._id}`, payload)
      return data
    },
    onSuccess: (data) => {
      const { message } = data
      queryClient.invalidateQueries('usuario')
      setUsuarioLS(data.data)
      setUsuarioContext(data.data)

      Swal.fire({
        icon: 'success',
        title: '¡Bien!',
        text: message,
        showConfirmButton: true,
        timer: 1500
      })
    },
    onError: (error) => {
      console.log(error)
      const { message } = error?.response?.data

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        showConfirmButton: true,
        timer: 1500,
        text: message
      })
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('nombre', nombre.value)
    formData.append('apellidoPaterno', apellidoPaterno.value)
    formData.append('apellidoMaterno', apellidoMaterno.value)
    formData.append('telefono', telefono.value)
    formData.append('email', email.value)
    formData.append('password', password.value)
    formData.append('foto', foto)

    actualizarUsuarioMutation.mutate(formData)
  }

  const sx = { mb: 4 }
  return (
    <>
      <ButtonAction actual='Mis datos' back='/' />

      <Paper
        sx={{
          p: 4,
          m: 2,
          mt: 5,
          borderRadius: 2,
          boxShadow: 2,
          bgcolor: 'white'
          // minHeight: '80vh'
        }}
      >
        {/* <AlertaCollapse active={active} severity={severity} title={title} /> */}

        <Box
          component='form'
          autoComplete='off'
          onSubmit={handleSubmit}
          encType='multipart/form-data'
        >

          Foto de perfil
          <TextField
            sx={sx}
            fullWidth
            type='file'
            name='foto'
            onChange={(r) => {
              console.log(r.target.files[0])
              setFoto(r.target.files[0])
            }}
          />
          {/* <input type='file' name='foto' onChange={(r) => {
            setFoto(r.target.files[0])
          }} /> */}
          <TextField
            sx={sx}
            label='Nombre'
            fullWidth
            required
            {...nombre}
          />
          <TextField
            sx={sx}
            label='Apellido paterno'
            fullWidth
            {...apellidoPaterno}
          />
          <TextField
            label="Apellido materno"
            fullWidth
            sx={sx}
            autoComplete="current-password"
            {...apellidoMaterno}
          />

          <TextField
            label="Teléfono"
            fullWidth
            sx={sx}
            autoComplete="current-password"
            {...telefono}
          />
          <TextField
            label="Correo electrónico"
            fullWidth
            sx={sx}
            autoComplete="current-password"
            {...email}
          />

          <TextField
            label="Contraseña"
            fullWidth
            sx={sx}
            autoComplete="current-password"
            required
            {...password}
          />

          <Button variant='contained' type='submit'>
            Actualizar perfil
          </Button>
        </Box>
      </Paper >

    </>
  )
}

export default memo(EditarPerfil)
