/* eslint-disable react/prop-types */
import { memo, useContext, useEffect, useState } from 'react'
import {
  TextField, Button,
  Avatar,
  FormControl, InputLabel, Select, MenuItem, Grid, Box, Paper, Typography, LinearProgress, Chip, Alert
} from '@mui/material'
import { Search } from '@mui/icons-material'
import ButtonAction from '../../components/ButtonAction'
import TableIUS from '../../components/TableIUS'
import { apiAuth } from '../../api'
import { Link, useLocation } from 'react-router-dom'
import { ModulosContext } from '../../context/ModulosContext'
import { UsuarioContext } from '../../context/UsuarioContext'
import CreateExcel from '../../components/CreateExcel'

const title = 'Pautas'
// const altasLink = ''
const columns = [
  {
    id: 'foto',
    label: 'Foto',
    render: (row) => (
      <Avatar
        alt={row.nombre}
        src={row.foto}
      />
    )

  },
  {
    id: 'nombre',
    label: 'Nombre',
    render: (row) => (<Link
      to={{
        pathname: `${row._id}/editar`
      }}
    >{row.nombre} {row.apellidoPaterno} {row.apellidoMaterno}</Link>)
  },
  {
    id: 'telefono', label: 'Teléfono', render: (row) => (<a href={`tel:${row.telefono}`}>{row.telefono}</a>)
  },
  {
    id: 'email', label: 'Correo', render: (row) => (<a href={`mailto:${row.email}`}>{row.email}</a>)
  },
  { id: 'direccion', label: 'Dirección', render: (row) => (<a href={`https://www.google.com/maps/search/?api=1&query=${row.direccion}`} target='_blank' rel='noreferrer'>{row.direccion}</a>) },
  { id: 'estado.nombre', label: 'Estado', render: (row) => row?.estado?.nombre },
  { id: 'tipoUsuario?.nombre', label: 'Tipo Usuario', render: (row) => row?.tipoUsuario?.nombre },
  {
    id: 'estatus',
    label: 'Estatus',
    render: (row) => {
      if (row.estatus === 'Activo') {
        return <Chip label={row.estatus} color='primary' />
      }
      if (row.estatus === 'Inactivo') {
        return <Chip label={row.estatus} color='secondary' />
      }

      return <Chip label={row.estatus} color='warning' />
    }
  }

]

const Clientes = () => {
  const [usuarioC] = useContext(UsuarioContext)

  return (
    <>

      <Grid container width={'100%'}>
        <Grid item xs={12}>
          <ButtonAction actual={title} handleRefresh={() => { }} />
        </Grid>

        <Grid item xs={12}>
          <Box p={{
            xs: 0,
            sm: 3
          }}>

          </Box>
        </Grid>
      </Grid >
    </>
  )
}

export default memo(Clientes)
