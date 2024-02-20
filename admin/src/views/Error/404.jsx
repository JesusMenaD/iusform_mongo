import { Box, Button, Grid, Typography } from '@mui/material'
import { memo } from 'react'
import Image from 'mui-image'
import I404 from '../../assets/images/others/404.svg'
import { NavLink } from 'react-router-dom'
const styles = {
  firstBox: {
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'center',
    maxWidth: '100%',
    height: '100%',
    boxSizing: 'border-box',
    padding: '25px'
  },
  h1: {
    fontSize: '76px',
    color: '#7987a1',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: '10px 0 20px',
    fontFamily: 'Roboto, Helvetica, sans-serif'
  },
  h4: {
    fontSize: '18px',
    fontFamily: 'Roboto, Helvetica, sans-serif',
    color: '#000',
    textAlign: 'center',
    margin: '0 0 8px',
    fontWeight: 'bold'
  },
  h6: {
    fontSize: '14px',
    fontFamily: 'Roboto, Helvetica, sans-serif',
    color: '##7987a1',
    textAlign: 'center',
    margin: '0 0 20px'
  },
  box: {
    display: 'flex',
    justifyContent: 'center'
  }
}
const _404 = ({ to = '/' }) => {
  return (
    <Box sx={styles.firstBox}>
      <Grid
        container
        justifyContent="center"
        alignItems="center">
        <Grid item md={8} xl={6}>
          <Image src={I404} alt='logo' width="100%" height="100%" duration={0} />
          <Typography variant='h1' sx={styles.h1} component='h1'>404</Typography>
          <Typography variant='h4' sx={styles.h4} component='h4'>Página no encontrada</Typography>
          <Typography variant='h6' sx={styles.h6} component='h6'>Ups!! La página que estabas buscando no existe. De vuelta a casa.</Typography>
          <Box sx={styles.box}>
            <Button variant='contained' color='primary' component={NavLink} to={to}>
              Volver al inicio
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default memo(_404)
