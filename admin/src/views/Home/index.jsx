import { memo } from 'react'
// import logo from '../../assets/images/logo_4cap.svg'
import { Container, Unstable_Grid2 as Grid } from '@mui/material'
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material'

const sx = {

}
const Home = () => {
  return (

    <Grid
      container
      spacing={3}
    >
      <Grid
        xs={12}
        sm={6}
        lg={3}
      >
        <Card sx={sx}>
          <CardContent>
            <Stack
              alignItems="flex-start"
              direction="row"
              justifyContent="space-between"
              spacing={3}
            >
              <Stack spacing={1}>
                <Typography
                  color="text.secondary"
                  variant="overline"
                >
                  Budget
                </Typography>
                <Typography variant="h4">
                  value
                </Typography>
              </Stack>
              <Avatar
                sx={{
                  backgroundColor: 'error.main',
                  height: 56,
                  width: 56
                }}
              >
                ico
              </Avatar>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid
        xs={12}
        sm={6}
        lg={3}
      >
        {/* <OverviewTotalCustomers
          difference={16}
          positive={false}
          sx={{ height: '100%' }}
          value="1.6k"
        /> */}
      </Grid>
      <Grid
        xs={12}
        sm={6}
        lg={3}
      >
        {/* <OverviewTasksProgress
          sx={{ height: '100%' }}
          value={75.5}
        /> */}
      </Grid>
      <Grid
        xs={12}
        sm={6}
        lg={3}
      >
        {/* <OverviewTotalProfit
          sx={{ height: '100%' }}
          value="$15k"
        /> */}
      </Grid>
      <Grid
        xs={12}
        lg={8}
      >
        {/* <OverviewSales
          chartSeries={[
            {
              name: 'This year',
              data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20]
            },
            {
              name: 'Last year',
              data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13]
            }
          ]}
          sx={{ height: '100%' }}
        /> */}
      </Grid>
      <Grid
        xs={12}
        md={6}
        lg={4}
      >
        {/* <OverviewTraffic
          chartSeries={[63, 15, 22]}
          labels={['Desktop', 'Tablet', 'Phone']}
          sx={{ height: '100%' }}
        /> */}
      </Grid>
    </Grid>

  )
}
export default memo(Home)
