/* eslint-disable react/prop-types */
import { Card, Grid, Typography } from '@mui/material'

export const Kanban = ({ response, title, heads }) => {
  console.log({ response })
  console.log({ heads })

  const styles = {
    card: {
      width: '100%',
      height: '140px',
      p: 2,
      boxSizing: 'border-box'
    }
  }

  return (
    <Grid container spacing={2} p={5}>
      {
        response.map((item, index) => (
          <Grid key={index} item xs={12} sm={4} md={4} lg={3} xl={3}>
            <Card sx={styles.card}>
              {
                heads.map((head, index) => (
                  <Typography key={index} variant="body2" color="text.secondary">
                    {head.accessorKey} : {item[head.accessorKey]}
                  </Typography>
                ))
              }
            </Card>
          </Grid>
        ))
      }
    </Grid>
  )
}
