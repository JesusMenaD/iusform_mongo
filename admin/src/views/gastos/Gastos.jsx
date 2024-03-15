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
// import CreateExcel from '../../components/CreateExcel'

const title = 'Gastos'
const altasLink = 'crear'
const columns = [
  {
    id: 'fecha', label: 'Fecha', render: (row) => new Date(row.fecha).toLocaleDateString()
  },
  {
    id: 'referencia',
    label: 'Concepto general',
    render: (row) => (<Link
      to={{
        pathname: `${row._id}/editar`
      }}
    >{row.referencia}</Link>)
  },
  // {
  //   id: 'concepto.concepto',
  //   label: 'Detalles',
  //   render: (row) => (
  //     row.conceptos.map((concepto, index) => (
  //       <>
  //         <Grid container key={index} display='flex' justifyContent='space-between' alignItems='center' sx={{ mb: 1.5 }} alignContent='center'>
  //           <Grid item xs={9} >
  //             <Typography variant='body2' component='p'>
  //               {index + 1}.   {concepto.concepto}
  //             </Typography>
  //           </Grid>
  //           <Grid item xs='auto'>
  //             <Typography variant='body2' component='p'>
  //               {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(concepto.importe)}
  //             </Typography>
  //           </Grid>

  //         </Grid>
  //         <Divider />
  //       </>

  //     ))
  //   )
  // },
  {
    id: 'total', label: 'Total', render: (row) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(row.total)
  },
  {
    id: 'comentario', label: 'Observaciones', render: (row) => row.comentario
  },
  {
    id: 'estatus',
    label: 'Estatus',
    render: (row) => {
      if (row.estatus === 'Vigente') {
        return <Chip label={row.estatus} color='primary' />
      }

      return <Chip label={row.estatus} color='secondary' />
    }
  }
]

const Gastos = () => {
  const [usuarioC] = useContext(UsuarioContext)
  const despacho = usuarioC?.despacho?._id
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [expedientes, setExpedientes] = useState([])
  const [totalDocs, setTotalDocs] = useState(1)
  const [limit, setTotal] = useState(10)
  const [searchTimeout, setSearchTimeout] = useState(null)
  const location = useLocation()
  const [modulosC] = useContext(ModulosContext)
  const [permisos, setPermisos] = useState(null)
  const locationPath = location.pathname

  useEffect(() => {
    modulosC.forEach(modulo => {
      if (modulo.enlace === locationPath) {
        console.log()
        setPermisos(modulo.permisos)
      }

      modulo.child.forEach(submodulo => {
        console.log('submodulo', submodulo.enlace, locationPath)
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
    setIsLoading(true)
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
      setExpedientes(result.docs)
      setTotalDocs(result.totalDocs)
      setTotal(result.limit)
      setIsLoading(false)
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
                              <MenuItem value=''>Estatus</MenuItem>
                              <MenuItem value='Vigente'>Vigente</MenuItem>
                              <MenuItem value='Cancelado'>Cancelado</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item >
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
                        </Grid>
                        <Grid item >
                          <CreateExcel
                            columns={columns}
                            rows={expedientes}
                            type='excel'
                            title='Gastos'
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
                      rows={expedientes}
                      onPageChange={handlePageChange}
                      currentPage={currentPage}
                      totalRows={totalDocs}
                      limit={limit}
                      permisos={permisos}
                      handleDelete={async (row) => {
                        const url = `/gastos/${row._id}`
                        await apiAuth().delete(url)
                        fetchData()
                      }}
                      deletePosition={1}
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
  const url = `/gastos/${despacho}?estatus=${status}&page=${page}&search=${search}`
  console.log('url', url)
  const { data } = await apiAuth().get(url)
  return data.gastos
}

export default memo(Gastos)
