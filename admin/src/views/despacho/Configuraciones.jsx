/* eslint-disable react/prop-types */
import {
  Button, TextField, Paper,
  FormControl, InputLabel, Select, MenuItem,
  LinearProgress
} from '@mui/material'
import { Box } from '@mui/system'
import { memo, useContext, useEffect, useState } from 'react'
import { UsuarioContext } from '../../context/UsuarioContext'
import ButtonAction from '../../components/ButtonAction'
import { apiAuth } from '../../api'
import Image from 'mui-image'
import { useLocalStorage } from '../../hooks/useLocalStorage'
// import { useLocalStorage } from '../../hooks/useLocalStorage'
import Swal from 'sweetalert2'

const ConfiguracionesDespacho = () => {
  const [usuarioContext, setUsuarioContext] = useContext(UsuarioContext)
  const [, setUsuarioLS] = useLocalStorage('usuario', null)

  const [logo, setLogo] = useState(null)
  const [logoActual, setLogoActual] = useState('')

  const [nombre, seNombre] = useState('')
  const [direccion, setDireccion] = useState('')
  const [correo, setCorreo] = useState('')
  const [telefono, setTelefono] = useState('')
  const [razonSocial, setRazonSocial] = useState('')
  const [rfc, setRfc] = useState('')
  const [cRegimenFiscal, setCRegimenFiscal] = useState('')
  const [lugarExpedicion, setLugarExpedicion] = useState('')
  const [serie, setSerie] = useState('')
  const [numeroCertificado, setNumeroCertificado] = useState('')
  const [regimenFiscales, setRegimenFiscales] = useState([])
  const [clavePrivada, setClavePrivada] = useState('')
  const [loader, setLoader] = useState(false)

  // const actualizarUsuarioMutation = useMutation({

  //   onSuccess: (data) => {
  //     const { message } = data
  //     queryClient.invalidateQueries('usuario')

  //     Swal.fire({
  //       icon: 'success',
  //       title: '¡Bien!',
  //       text: message,
  //       showConfirmButton: true,
  //       timer: 1500
  //     })
  //   },
  //   onError: (error) => {
  //     console.log(error)
  //     const { message } = error?.response?.data

  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Oops...',
  //       showConfirmButton: true,
  //       timer: 1500,
  //       text: message
  //     })
  //   }
  // })

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const formData = new FormData()
      formData.append('nombre', nombre)
      formData.append('direccion', direccion)
      formData.append('correo', correo)
      formData.append('telefono', telefono)
      formData.append('razonSocial', razonSocial)
      formData.append('rfc', rfc)
      formData.append('cRegimenFiscal', cRegimenFiscal)
      formData.append('lugarExpedicion', lugarExpedicion)
      formData.append('serie', serie)
      formData.append('numeroCertificado', numeroCertificado)
      formData.append('clavePrivada', clavePrivada)
      formData.append('logo', logo)
      formData.append('estado', estado)

      const { data } = await apiAuth({ 'Content-Type': 'multipart/form-data' }).put(`/despacho/${usuarioContext?.despacho?._id}`, formData)

      const despachoNew = data.despacho

      setUsuarioContext({
        ...usuarioContext,
        despacho: despachoNew
      })

      setUsuarioLS({
        ...usuarioContext,
        despacho: despachoNew
      })

      const { message } = data

      Swal.fire({
        icon: 'success',
        title: '¡Bien!',
        text: message,
        showConfirmButton: true,
        timer: 1500
      })
      setLogo(null)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const getDespacho = async () => {
      try {
        setLoader(true)
        const { data } = await apiAuth().get(`/despacho/${usuarioContext?.despacho?._id}`)
        const { despacho } = data
        setLogoActual(despacho.logo)
        seNombre(despacho.nombre)
        setDireccion(despacho.direccion)
        setCorreo(despacho.correo)
        setTelefono(despacho.telefono)
        setRazonSocial(despacho.razonSocial)
        setRfc(despacho.rfc)
        setCRegimenFiscal(despacho.c_regimenfiscal)
        setLugarExpedicion(despacho.lugarExpedicion)
        setSerie(despacho.serie)
        setNumeroCertificado(despacho.numeroCertificado)
        setClavePrivada(despacho.clavePrivada)
        setLoader(false)
        setEstado(despacho.estado)
        console.log(despacho)
      } catch (error) {
        console.log(error)
      } finally {
        setLoader(false)
      }
    }
    getDespacho()

    const getRegimenFiscal = async () => {
      const url = '/regimen-fiscal'
      const { data } = await apiAuth().get(url)
      setRegimenFiscales(data)
    }

    getRegimenFiscal()

    const getEstados = async () => {
      const url = '/estados'
      const { data } = await apiAuth().get(url)
      setEstados(data)
    }
    getEstados()
  }, [usuarioContext])

  const [estados, setEstados] = useState([])
  const [estado, setEstado] = useState('')

  const sx = { mb: 4 }
  return (
    <>
      <ButtonAction actual='Configuraciones' back='/' />

      <Paper
        sx={{
          p: 4,
          m: 2,
          mt: 5,
          borderRadius: 2,
          boxShadow: 2,
          bgcolor: 'white'
        }}
      >
        <Box
          component='form'
          autoComplete='off'
          onSubmit={handleSubmit}
          encType='multipart/form-data'
        >
          {loader && <LinearProgress />}

          <Image src={logoActual} alt={'Logo'} width={66} />

          Logo del despacho
          <TextField
            sx={sx}
            fullWidth
            type='file'
            name='foto'
            // label='Logo'
            onChange={(r) => {
              setLogo(r.target.files[0])
            }}
          />
          {/* <input type='file' name='foto' onChange={(r) => {
            setFoto(r.target.files[0])
          }} /> */}
          <TextField
            sx={sx}
            label='Nombre'
            fullWidth
            name='nombre'
            required
            value={nombre}
            onChange={(e) => seNombre(e.target.value)}
          />
          <TextField
            sx={sx}
            label='Correo'
            fullWidth
            type='email'
            name='correo'
            required
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />

          <TextField
            sx={sx}
            label='Dirección'
            fullWidth
            name='direccion'
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />

          <TextField
            sx={sx}
            label='Teléfono'
            fullWidth
            type='tel'
            required
            name='telefono'
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />

          <TextField
            sx={sx}
            label='Razón social'
            fullWidth
            value={razonSocial}
            onChange={(e) => setRazonSocial(e.target.value)}
          />

          <TextField
            sx={sx}
            label='RFC'
            fullWidth
            value={rfc}
            onChange={(e) => setRfc(e.target.value)}
          />

          <FormControl fullWidth sx={sx}>
            <InputLabel id="estados">Estados</InputLabel>
            <Select
              labelId="estados"
              value={estado}
              label="Estados"
              onChange={(e) => setEstado(e.target.value)}
            >
              {/* <MenuItem value=''>Selecciona un Estado</MenuItem> */}
              {estados.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={sx}>
            <InputLabel id="regimen-fiscal">Regimen Fiscal</InputLabel>
            <Select
              labelId="regimen-fiscal"
              value={cRegimenFiscal}
              label="Regimen Fiscal"
              onChange={(e) => setCRegimenFiscal(e.target.value)}
            >
              <MenuItem value=''>Selecciona un regimen fiscal</MenuItem>
              {regimenFiscales.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            sx={sx}
            label='Lugar de expedición'
            fullWidth
            value={lugarExpedicion}
            onChange={(e) => setLugarExpedicion(e.target.value)}
          />

          <TextField
            sx={sx}
            label='Serie'
            fullWidth
            value={serie}
            onChange={(e) => setSerie(e.target.value)}
          />

          <TextField
            sx={sx}
            label='Número de certificado'
            fullWidth
            value={numeroCertificado}
            onChange={(e) => setNumeroCertificado(e.target.value)}
          />

          <TextField
            sx={sx}
            label='Clave privada'
            fullWidth
            type='password'
            value={clavePrivada}
            onChange={(e) => setClavePrivada(e.target.value)}
          />

          <Button variant='contained' type='submit'>
            Actualizar
          </Button>
        </Box>
      </Paper >

    </>
  )
}

export default memo(ConfiguracionesDespacho)
