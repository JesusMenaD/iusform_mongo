
/* eslint-disable react/prop-types */
import { Button, Grid, Typography } from '@mui/material'

import BackImnage from '../assets/images/icons/gold/icon_abc_60x60_01.svg'
import Image from 'mui-image'
import { Link, useNavigate } from 'react-router-dom'
import { memo } from 'react'

const ButtonAction = (
  {
    child = [],
    actual = '',
    create = '',
    back = ''
  }
) => {
  const navigate = useNavigate()

  return (
    <Grid container sx={{
      px: {
        xs: 2,
        sm: 5,
        md: 5,
        lg: 5,
        xl: 5
      },
      // mr: 5
      // pr: 5,
      mt: 2,
      mb: 2
    }} alignItems="center" spacing={2} justifyContent="space-between">
      <Grid item >
        <Typography variant='h5'>
          {actual}
        </Typography>
        <p className="text-muted mb-0">
          <i className="fa-solid fa-house"></i> &nbsp;
          <Link to="/" title="Panel principal">
            {/* <img alt="Panel principal" width="16"  /> */}
          </Link>
          &nbsp;|&nbsp;
          {child.map((item, index) => (
            <span key={index}>
              <Link to={item.to} title={item.title}>
                {item.title}
              </Link>
              &nbsp;|&nbsp;
            </span>
          ))}
          {actual}
        </p>
      </Grid>

      <Grid item>
        {create && (
          <>
            <Button
              onClick={() => navigate(create)}
              variant='contained'
              title='Alta'
              sx={{
                backgroundColor: '#c89211',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#c89211'
                }
              }}
            >
              {/* <Image src={BackImnage} alt='back' width={20} /> */}
              <i className="fa-solid fa-plus" style={{
                fontSize: '20px',
                color: 'white'
              }}></i>
            </Button>
            &nbsp;&nbsp;
          </>
        )}

        {back && (
          <Button
            onClick={() => navigate(back)}
            variant='contained'
            title='Atrás'
            sx={{
              backgroundColor: '#c89211',
              color: 'white',
              '&:hover': {
                backgroundColor: '#c89211'
              }
            }}
          >
            <Image src={BackImnage} alt='back' width={20} />
          </Button>
        )}
      </Grid>
    </Grid>
  )
}

export default memo(ButtonAction)
