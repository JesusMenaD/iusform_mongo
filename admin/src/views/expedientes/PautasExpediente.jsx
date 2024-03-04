/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { memo, useContext, useEffect, useRef, useState, forwardRef } from 'react'
import { Grid, Box, Typography, Button, LinearProgress, Snackbar } from '@mui/material'
import ButtonAction from '../../components/ButtonAction'
import { UsuarioContext } from '../../context/UsuarioContext'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ImageResize from 'quill-image-resize-module-react'
import Swal from 'sweetalert2'
import { ReactToPrint } from 'react-to-print'
// const altasLink = ''; // Consider adding altasLink if needed
import { useParams, useNavigate } from 'react-router-dom'
import './style.css'
import { apiAuth } from '../../api'
const title = 'Pautas'
Quill.register('modules/imageResize', ImageResize)

const Pautas = () => {
  const navigate = useNavigate()
  const [documento, setDocumento] = useState('')
  const [usuario] = useContext(UsuarioContext)
  const [isloading, setIsLoading] = useState(false)
  const { _id } = useParams()
  const [open, setOpen] = useState(false)
  const atras = `../../${usuario.clave}/expedientes/${_id}/editar`
  const componentRef = useRef()
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await getPauta(_id)
        if (response.documento === undefined) {
          const message = response?.response?.data.message || 'No se encontró la oauta.'
          throw new Error(message)
        }
        setDocumento(response.documento)
        setIsLoading(false)
      } catch (error) {
        const message = error.message
        navigate(`/${usuario.clave}/expedientes`)
        Swal.fire({
          title: 'Error',
          text: message,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }
    }
    fetchData()
  }, [_id])

  // guardar cada 60 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      if (documento !== '') {
        editPauta(`${_id}`, documento)
        setOpen(true)
      }
    }, 60000)
    return () => clearInterval(interval)
  }, [documento, _id])

  return (
    <>

      <Grid container width={'100%'}>
        <Grid item xs={12}>
          <ButtonAction actual={title} handleRefresh={() => {
            const fetchData = async () => {
              setIsLoading(true)
              const response = await getPauta(_id)
              setDocumento(response.documento)
              setIsLoading(false)
            }
            fetchData()
          }}
            child={[
              { title: 'Expedientes', url: '/expedientes' }
            ]}
            back={atras}
          />
        </Grid>
        <Grid item xs={12}>
          <Box p={{ xs: 0, sm: 3 }}>
            {isloading
              ? <LinearProgress />
              : <>
                <Box display='flex' justifyContent='end' alignItems='center' mb={2}>
                  <Button
                    variant='outlined'
                    color='primary'
                    onClick={() => {
                      editPauta(`${_id}`, documento)
                      setOpen(true)
                    }}
                  >
                    Guardar
                  </Button>
                  <ReactToPrint
                    trigger={() => (
                      <Button
                        variant='outlined'
                        color='primary'
                        sx={{ ml: 2 }}
                      >
                        Imprimir
                      </Button>
                    )}
                    content={() => componentRef.current}
                  />
                </Box>

                <ReactQuill
                  theme={'snow'}
                  onChange={(value) => setDocumento(value)}
                  value={documento}
                  modules={Pautas.modules}
                  formats={Pautas.formats}
                  bounds={'#root'}
                  placeholder={'Escribe aquí...'}

                />
                <PautaImprimir documento={documento} ref={componentRef} />
              </>
            }
          </Box>
        </Grid>
      </Grid >
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message="Pauta actualizada"
        color='##c89211'
        action={
          <Button color="primary" size="small" onClick={() => setOpen(false)}>
            Cerrar
          </Button>
        }
      />
    </>
  )
}

const PautaImprimir = forwardRef(({ documento }, ref) => {
  const handleVideoClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
    const iframe = event.target.closest('iframe')
    if (iframe) {
      const src = iframe.getAttribute('src')
      window
        .open(src, '_blank')
        .focus()
    }
  }

  const renderContent = () => {
    // eslint-disable-next-line array-callback-return
    return documento.split('\n').map((item, index) => {
      if (item.includes('<iframe')) {
        return (
          <div key={index} dangerouslySetInnerHTML={{ __html: item }} onClick={handleVideoClick} />
        )
      }
      return (
        <Typography key={index} variant='body1' component='p' dangerouslySetInnerHTML={{ __html: item }} />
      )
    })
  }

  return (
    <Box ref={ref} sx={{
      display: 'none',
      '@media print': {
        display: 'block'
      },
      '& .ql-container': {
        border: 'none'
      },
      '& .ql-editor': {
        margin: '0',
        padding: '0',
        minHeight: '100%',
        fontSize: '16px',
        fontFamily: 'Arial, sans-serif'
      },
      '& .ql-video': {
        width: '100%',
        height: '100%',
        margin: '0',
        '& iframe': {
          width: '100%',
          height: '100%',
          margin: '0',
          onClick: 'handleVideoClick'
        }
      },
      p: 7
    }}>
      {renderContent()}
    </Box>
  )
})

export default memo(Pautas)

const editPauta = async (id, documento) => {
  try {
    const url = `/expedientes-pautas/${id}`
    const data = { documento }
    const response = await apiAuth().put(url, data)
    return response
  } catch (error) {
    return error
  }
}

const getPauta = async (id) => {
  try {
    const url = `/expedientes-pautas/${id}`
    const response = await apiAuth().get(url)
    if (response.status === 200) { return response.data }
  } catch (error) {
    return error
  }
}

Pautas.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' }
    ],
    ['video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  },
  imageResize: {
    parchment: Quill.import('parchment'),
    modules: ['Resize', 'DisplaySize']
  }
}

/*
 * Quill Pautas formats
 * See https://quilljs.com/docs/formats/
 */
Pautas.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video'
]
