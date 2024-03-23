/* eslint-disable react/prop-types */
import { memo, useContext, useEffect, useState } from 'react'
import {
  TextField, Button,
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

const title = 'Declaraciones Fiscales'
const altasLink = 'crear'
const columns = [
  {
    id: 'nombre',
    label: 'Nombre',
    render: (row) => (<Link
      to={{
        pathname: `${row._id}/editar`
      }}
    >{row.nombre}</Link>)
  },
  {
    id: 'tipo',
    label: 'Tipo',
    render: (row) => <Chip label={row.tipo} color='primary' />
  },
  {
    id: 'creadoPor.nombre',
    label: 'Responsable',
    render: (row) => {
      return row?.creadoPor?.nombre
    }
  },
  {

    id: 'adjunto.nombre',
    label: 'Adjunto',
    render: (row) => {
      if (row.adjunto.archivo) {
        return <a href={`${row.adjunto.archivo}`} target='_blank' rel='noreferrer'>{row.adjunto.nombre}</a>
      }
      return 'Sin archivo'
    }

  },
  {
    id: 'fecha',
    label: 'Fecha',
    render: (row) => new Date(row.fecha).toLocaleDateString()

  },
  {
    id: 'estatus',
    label: 'Estatus',
    render: (row) => {
      // enum: ['Pendiente', 'Aceptado', 'Rechazado'],

      if (row.estatus === 'Aceptado') {
        return <Chip label={row.estatus} color='success' />
      }
      if (row.estatus === 'Pendiente') {
        return <Chip label={row.estatus} color='warning' />
      }

      return <Chip label={row.estatus} color='error' />
    }
  }

]

const DeclaracionesFiscales = () => {
  const [usuarioC] = useContext(UsuarioContext)
  const despacho = usuarioC?.despacho?._id
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [declaraciones, setDeclaraciones] = useState([])
  const [totalDocs, setTotalDocs] = useState(1)
  const [limit, setTotal] = useState(10)
  const [searchTimeout, setSearchTimeout] = useState(null)
  const location = useLocation()
  const [modulosC] = useContext(ModulosContext)
  const [permisos, setPermisos] = useState(null)
  const locationPath = location.pathname

  const deleteRow = async (row) => {
    try {
      await apiAuth().delete(`/declaraciones-fiscales/${row?._id}`)
      fetchData()
    } catch (error) {
      console.error('Error deleting row:', error)
    }
  }

  useEffect(() => {
    modulosC.forEach(modulo => {
      if (modulo.enlace === locationPath) {
        setPermisos(modulo.permisos)
      }

      modulo.child.forEach(submodulo => {
        if (submodulo.enlace === locationPath) {
          setPermisos(submodulo.permisos)
        }
      })
    })
  }, [modulosC])

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  const handleFilter = (e) => {
    e.preventDefault()
    setCurrentPage(0)
    // Cancela el timeout anterior para evitar múltiples búsquedas rápidas
    clearTimeout(searchTimeout)
    // Configura un nuevo timeout para realizar la búsqueda después de 500ms
    setSearchTimeout(setTimeout(fetchData, 500))
  }

  useEffect(() => {
    fetchData()
  }, [currentPage])

  useEffect(() => {
    // Limpia el timeout cuando el componente se desmonta o cuando search/status cambian
    return () => {
      clearTimeout(searchTimeout)
    }
  }, [search, status])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const result = await getDataFunction(despacho, search, status, currentPage)
      setDeclaraciones(result.docs)
      setTotalDocs(result.totalDocs)
      setTotal(result.limit)
      setIsLoading(false)
      console.log('result', result)
    } catch (error) {
      console.error('Error fetching data:', error)
      setIsLoading(false)
    }
  }

  return (
    <>

      <Grid container width={'100%'}>
        <Grid item xs={12}>
          <ButtonAction actual={title} create={altasLink} handleRefresh={() => fetchData()} permisos={permisos} />
        </Grid>
        {
          permisos?.read === false
            ? <Grid item xs={12}>
              <Alert severity='error'>No tienes permisos para ver esta sección</Alert>
            </Grid>
            : <>
              <Grid item xs={12}>
                <Box px={2}>
                  <Paper elevation={0} sx={{ p: 3, py: 5 }}>
                    <Typography variant='subtitle1' mb={2} component='h2'>
                      Selecciona un criterio de búsqueda
                    </Typography>
                    <Box onSubmit={handleFilter} as='form' component='form'>
                      <Grid container spacing={2} alignItems='center'>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextField fullWidth label='Buscar' id='Buscar' value={search} onChange={(e) => setSearch(e.target.value)} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <FormControl fullWidth>
                            <InputLabel id='estatus_input'>Estatus</InputLabel>
                            <Select
                              labelId='estatus_input'
                              id='estatus'
                              value={status}
                              label='Estatus'
                              onChange={(e) => setStatus(e.target.value)}
                            >
                              {/* // enum: ['Pendiente', 'Aceptado', 'Rechazado'], */}
                              <MenuItem value=''>Estatus</MenuItem>
                              <MenuItem value='Pendiente'>Pendiente</MenuItem>
                              <MenuItem value='Aceptado'>Aceptado</MenuItem>
                              <MenuItem value='Rechazado'>Rechazado</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} display='flex' justifyContent='space-around'>
                          <Button
                            variant='contained'
                            title='Buscar'
                            sx={{
                              backgroundColor: '#c89211',
                              color: 'white'
                            }}
                            type='submit'
                          >
                            <Search />
                          </Button>
                          <CreateExcel
                            columns={columns}
                            rows={declaraciones}
                            type='excel'
                            title='Declaraciones Fiscales'
                            icon='fa-regular fa-file-excel'
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </Paper>
                </Box>
              </Grid >
              <Grid item xs={12}>
                <Box p={{
                  xs: 0,
                  sm: 2
                }}>
                  {isLoading
                    ? <LinearProgress />
                    : <TableIUS
                      columns={columns}
                      rows={declaraciones}
                      onPageChange={handlePageChange}
                      currentPage={currentPage}
                      totalRows={totalDocs}
                      limit={limit}
                      permisos={permisos}
                      handleDelete={deleteRow}
                    />
                  }
                </Box>
              </Grid>
            </>
        }

      </Grid >
    </>
  )
}

const getDataFunction = async (despacho, search, status, page) => {
  page = page + 1
  const url = `/declaraciones-fiscales/${despacho}?estatus=${status}&page=${page}&search=${search}`
  const { data } = await apiAuth().get(url)
  return data.declaraciones
}

export default memo(DeclaracionesFiscales)
