/* eslint-disable react/prop-types */
import { memo, useContext, useEffect, useState } from 'react'
import { Grid, Box, Typography, Button } from '@mui/material'
import ButtonAction from '../../components/ButtonAction'
import { UsuarioContext } from '../../context/UsuarioContext'
// const altasLink = ''; // Consider adding altasLink if needed
import Editor from './Editor'
import './style.css'
import { apiAuth } from '../../api'
const title = 'Pautas'

const Clientes = () => {
  const [documento, setDocumento] = useState('')

  return (
    <Grid container width={'100%'}>
      <Grid item xs={12}>
        <ButtonAction actual={title} handleRefresh={() => { }} />
      </Grid>
      <Grid item xs={12}>
        <Box p={{ xs: 0, sm: 3 }}>
          <Box display='flex' justifyContent='end' alignItems='center' mb={2}>
            <Button
              variant='contained'
              color='primary'
              onClick={() => {
                editPauta('65e27efc7054b49e32a1fa78', documento)
              }}
            >
              Guardar
            </Button>
          </Box>

          <Editor
            handleValue={setDocumento}
            placeholder={'Escriba las pautas para el expediente'}
          />
          <Typography
            width={'100%'}
            dangerouslySetInnerHTML={{ __html: documento }} />
        </Box>
      </Grid>
    </Grid >
  )
}

export default memo(Clientes)

const editPauta = async (id, documento) => {
  try {
    const url = `/expedientes-pautas/${id}`
    const data = { documento }
    console.log('data', data)
    const response = await apiAuth().put(url, data)
    return response
  } catch (error) {
    return error
  }
}
