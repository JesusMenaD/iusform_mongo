/* eslint-disable react/prop-types */
import { memo, useContext, useEffect, useState } from 'react'
import { Grid, Box, Paper, Typography, LinearProgress, Chip, Alert } from '@mui/material'
import { UsuarioContext } from '../../context/UsuarioContext'

const Expedientes = () => {
  const [usuarioC] = useContext(UsuarioContext)

  return (
    <>

      <Grid container width={'100%'}>
        <Grid item xs={12}>
          <Paper elevation={0} sx={{
            mb: 3
          }} >
            <Box p={{
              xs: 0,
              sm: 3

            }}>

            </Box>
          </Paper>
        </Grid>
      </Grid >
    </>
  )
}

export default memo(Expedientes)
