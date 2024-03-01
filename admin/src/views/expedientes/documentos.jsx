/* eslint-disable react/prop-types */
import { Dropzone, FileMosaic } from '@files-ui/react'
import { apiAuth } from '../../api'
import Image from 'mui-image'
import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  IconButton,
  DialogActions, Chip, Button, Box, LinearProgress
} from '@mui/material'
import TableIUS from '../../components/TableIUS'
import Swal from 'sweetalert2'
import { Plus, File } from 'react-feather'
import DeleteIcon from '@mui/icons-material/Delete'
const getDocumentos = async (despacho, expediente, page) => {
  page = page + 1
  const url = `/expedientes-documentos/${despacho}/${expediente}?page=${page}`
  console.log('url:', url)
  const { data } = await apiAuth().get(url)
  return data.documentos
}

const DocumetosList = ({ expediente, despacho, usuario, permisos }) => {
  const [documentos, setdocumentos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalDocs, setTotalDocs] = useState(0)
  const [limit, setLimit] = useState(10)
  const [open, setOpen] = useState(false)
  const [cargas, setCargas] = useState(0)

  useEffect(() => {
    setIsLoading(true)
    getDocumentos(despacho, expediente, currentPage).then(data => {
      setdocumentos(data.docs)
      const { totalDocs, limit } = data
      setTotalDocs(totalDocs)
      setLimit(limit)
      setIsLoading(false)
    })
  }, [currentPage, cargas])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const columns = [
    {
      id: 'archivo',
      label: 'Archivo',
      render: (row) => {
        if (row.archivo.includes('.jpg') || row.archivo.includes('.png') || row.archivo.includes('.jpeg') || row.archivo.includes('.gif') || row.archivo.includes('.svg')) {
          return <Box
            display={'flex'}
            justifyContent={'center'}
          >
            <Image
              src={row.archivo}
              alt='imagen'
              width='75px'
              height='75px'
            />

          </Box>
        } else {
          return <Box
            display={'flex'}
            justifyContent={'center'}

          >
            <Avatar
              sx={{
                backgroundColor: '#fff'
              }}

            >
              <File style={{
                color: '#6571ff'
              }} />
            </Avatar>
          </Box>
        }
      }

    },
    {
      id: 'nombre',
      label: 'Nombre',
      render: (row) => {
        return <>
          <a href={row.archivo} download={row.nombre} title={row.title}>
            {row.nombre}
          </a>

        </>
      }
    },
    {
      id: 'fecha',
      label: 'Fecha de creación',
      render: (row) => {
        const fechaCompleta = new Date(row.fecha)
        const opcionesFecha = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true // Esta opción establece el formato de 12 horas
        }
        return fechaCompleta.toLocaleDateString(undefined, opcionesFecha)
      }
    },
    {
      id: 'creadoPor',
      label: 'Responsable',
      render: (row) => {
        if (row.creadoPor._id === usuario) { return <Chip label={'Tú'} color='primary' /> }
        return `${row.creadoPor?.nombre} ${row.creadoPor?.apellidoPaterno} ${row.creadoPor?.apellidoMaterno}`
      }
    },
    {
      id: 'acciones',
      label: 'Acciones',
      render: (row) => {
        if (permisos?.rol === 'Lector') return null

        return <>

          <IconButton IconButton onClick={() => {
            Swal.fire({
              title: '¿Estás seguro?',
              text: 'No podrás revertir esta acción',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Sí, eliminar',
              cancelButtonText: 'Cancelar'
            }).then(async (result) => {
              if (result.isConfirmed) {
                try {
                  await apiAuth().delete(`/expedientes-documentos/${row._id}`)
                  setCargas(cargas + 1)
                } catch (error) {
                  console.error('Error fetching data:', error)
                  Swal.fire({
                    icon: 'error',
                    title: 'Error al eliminar el documento',
                    text: error.response.message
                  })
                }
              }
            })
          }}>
            <DeleteIcon color='error' />
          </IconButton >
        </>
      }
    }
  ]

  return (
    <>
      <DialogDocumentos open={open} handleClose={() => setOpen(false)} despacho={despacho} expediente={expediente} handleDocumentos={() => {
        setCargas(cargas + 1)
      }} usuario={usuario} />

      {permisos?.rol === 'Creador' || permisos?.rol === 'Editor'
        ? <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
          <Button
            variant='contained'
            title='Agregar usuario al expediente'
            sx={{
              backgroundColor: '#c89211',
              color: 'white',
              mb: 2
            }}

            onClick={() => setOpen(true)}
          >
            &nbsp;
            <Plus />
          </Button>
        </Box >
        : null
      }
      {isLoading
        ? <LinearProgress />
        : <TableIUS
          columns={columns}
          rows={documentos}
          onPageChange={handlePageChange}
          totalRows={totalDocs}
          limit={limit}
          currentPage={currentPage}
          isHandling={false}
        />
      }
    </>
  )
}

export default DocumetosList

const DialogDocumentos = ({ open, handleClose, despacho, expediente, handleDocumentos, usuario }) => {
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState([])

  const updateFiles = (incomingFiles) => {
    setFiles(incomingFiles)
  }

  const handleCreate = async (e) => {
    e.preventDefault()

    setLoading(true)

    const formData = new FormData()

    if (files.length === 0) {
      setLoading(false)
      handleClose()
      Swal.fire({
        icon: 'error',
        title: 'Error al subir documentos',
        text: 'Selecciona al menos un archivo'
      })
      return
    }

    files.forEach((file) => {
      console.log('file', file.file)
      formData.append('documentos', file.file)
    })

    try {
      await apiAuth({ 'Content-Type': 'multipart/form-data' }).post(`/expedientes-documentos/${despacho}/${usuario}/${expediente}`, formData)
      handleDocumentos(files)
      setFiles([])
      handleClose()
    } catch (error) {
      console.error('Error fetching data:', error)
      setLoading(false)
      handleClose()
      Swal.fire({
        icon: 'error',
        title: 'Error al subir documentos',
        text: error.response.message
      })
    } finally {
      setLoading(false)
    }
  }

  return <>
    <Dialog open={open} onClose={handleClose} fullWidth >
      <DialogTitle>
        Agregar Documentos
      </DialogTitle>
      <Box sx={{ py: 2 }} component='form'
        autoComplete='off' onSubmit={handleCreate}>
        <DialogContent>
          {loading && <LinearProgress />}
          <Dropzone onChange={updateFiles} value={files} label="Arrastra y suelta tus archivos aquí" multiple
            title='Arrastra y suelta tus archivos aquí'
            subtitle='O selecciona tus archivos desde tu computadora'
            accept='image/*, .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .txt, .zip'
            color='#c89211'
            localization={'ES-es'}
            max={5}
            min={1}
          >
            {files.map((file, index) => (
              <FileMosaic key={index} {...file} preview />
            ))}
          </Dropzone>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='outlined'>
            Cancelar
          </Button>
          <Button onClick={handleCreate}
            variant="contained"
          >
            Subir Documentos
          </Button>
        </DialogActions>
      </Box>
    </Dialog>

  </>
}
