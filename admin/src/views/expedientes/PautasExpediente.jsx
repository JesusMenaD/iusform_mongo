/* eslint-disable react/prop-types */
import { memo, useContext, useState } from 'react'
import { Grid, Box, Typography, Button } from '@mui/material'
import ButtonAction from '../../components/ButtonAction'
import { UsuarioContext } from '../../context/UsuarioContext'
// const altasLink = ''; // Consider adding altasLink if needed
import Editor from './Editor'
import './style.css'
import jsPDF from 'jspdf'
const title = 'Pautas'

const Clientes = () => {
  const generatePDF = () => {
    const doc = new jsPDF()
    doc.text('Pautas', 20, 20) // Agregar título
    doc.text(expediente, 20, 40) // Agregar contenido
    doc.save('pautas.pdf') // Descargar PDF
  }
  const [usuarioC] = useContext(UsuarioContext)
  const [expediente, setExpediente] = useState('')

  return (
    <>
      <Grid container width={'100%'}>
        <Grid item xs={12}>
          <ButtonAction actual={title} handleRefresh={() => { }} />
        </Grid>

        <Grid item xs={12}>
          <Box p={{ xs: 0, sm: 3 }}>
            <Editor
              handleValue={(e) => setExpediente(e)}
              placeholder={'Escriba las pautas para el expediente'}
            />

            {/* Render the HTML content using a Typography component */}

            <Typography
              width={'100%'}
              dangerouslySetInnerHTML={{ __html: expediente }} />
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default memo(Clientes)
