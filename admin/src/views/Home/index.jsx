/* eslint-disable react/prop-types */
import { Avatar, Box, Card, CardContent, Grid, Typography, LinearProgress, Chip } from '@mui/material'
import { BarChart } from '@mui/x-charts/BarChart'
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart'
import TableIUS from '../../components/TableIUS'
import CountUp from 'react-countup'
import { useEffect, useState } from 'react'
import { apiAuth } from '../../api'
import { TrendingUp, TrendingDown, DollarSign, XCircle, Clock } from 'react-feather'
const Budget = ({ title = '', subTitle = '', icon, child }) => (
  <Card
    sx={{ height: '155px', borderRadius: '16px' }}
  // border radius
  >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            {title}
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
            mt={1.5}
            sx={{
              // fontWeight: 500,
              fontSize: '2rem'

            }}
          >
            $ {subTitle}
          </Typography>
        </Grid>
        <Grid item>
          {icon}
        </Grid>
      </Grid>
      <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {child}
      </Box>
    </CardContent>
  </Card >
)

export const DashboardLayout = ({ usuarioC }) => {
  return (
    <>
      <Grid

        container
        spacing={2}
        rowSpacing={5}
        p={{
          xs: 0,
          sm: 2
        }}
        justifyContent={'center'}
      >
        <Grid item lg={4} sm={9} xl={3} xs={12}>
          <Abono despacho={usuarioC?.despacho?._id} />
        </Grid>
        <Grid item lg={4} sm={9} xl={3} xs={12}>
          <Balance despacho={usuarioC?.despacho?._id} />
        </Grid>
        <Grid item lg={4} sm={9} xl={3} xs={12}>
          <Cargo despacho={usuarioC?.despacho?._id} />
        </Grid>

        <Grid item lg={4} sm={9} xl={3} xs={12}>
          <Cancelados despacho={usuarioC?.despacho?._id} />
        </Grid>

        <Grid item lg={4} sm={9} xl={3} xs={12}>
          <Pendientes despacho={usuarioC?.despacho?._id} />
        </Grid>

        <Grid item lg={12} md={12} xl={12} xs={12}>
          {/* <Grid item lg={8} md={9} xl={9} xs={12}> */}

          <Card
            sx={{ height: '100%', borderRadius: '16px' }}
          >

            {/* <BarChart
              title='Bar Chart'
              xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C', 'group D', 'group E', 'group F', 'group G', 'group H', 'group I  '] }]}
              series={[{
                data: [4, 3, 5, 4, 3, 5, 4, 3, 5],
                color: '#635bff'
              }]}
              height={400}
            /> */}
            <BarExpedientesAsignados despacho={usuarioC?.despacho?._id} />
          </Card>
        </Grid>

        {/* // aca va la grafica de pastel */}
        {/* <Grid item lg={4} md={3} xl={3} xs={12}>
          <Card
            sx={{ height: '100%', borderRadius: '16px' }}
          >
            <CardContent>
              <Typography
                align="center"
                color="text.secondary" gutterBottom
              >
                Total Profit
              </Typography>
            </CardContent>

            <PieChart
              title='Pie Chart'
              sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                  fill: 'white',
                  fontWeight: 'bold',
                  fontSize: '0.8em'
                }
              }}
              series={[
                {
                  data: [
                    { name: 'Group A', value: 400 },
                    { name: 'Group C', value: 300 },
                    { name: 'Group F', value: 189 },
                    { name: 'Group F', value: 189 }

                  ],
                  arcLabel: (item) => `${item.name} (${item.value})`,

                  arcLabelMinAngle: 45,
                  innerRadius: 50,
                  outerRadius: 135,
                  paddingAngle: 3,
                  cornerRadius: 5,
                  cx: 180
                }
              ]}
              height={350}
            />

          </Card>
        </Grid> */}

        <Grid item lg={12} md={12} xl={12} xs={12}>
          <Card
            sx={{
              height: '100%',
              borderRadius: '16px'
            }}
          >
            <CardContent>
              <Typography
                align="center"
                color="text.secondary" gutterBottom
              >
                Últimos movimientos de expedientes
              </Typography>
            </CardContent>

            <TableData despacho={usuarioC?.despacho?._id} />
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

const BarExpedientesAsignados = ({ despacho }) => {
  const [datos, setDatos] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const getUsuariosExpedientesAsignados = async () => {
      try {
        const { data } = await apiAuth().get(`/dashboard/usuarios-expedientes-asignados?despacho=${despacho}`)
        setDatos(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    getUsuariosExpedientesAsignados()
  }, [despacho])

  // Preparar datos para el gráfico
  const nombres = datos.length > 0 ? datos.map((usuario) => usuario.nombre) : ['No hay datos']
  const expedientesAsignados = datos.length > 0 ? datos.map((usuario) => usuario.expedientesAsignados) : [0]

  return (
    <>
      <CardContent>
        <Typography align="center" color="text.secondary" gutterBottom>
          Expedientes Asignados
        </Typography>
      </CardContent>
      {loading
        ? <LinearProgress />
        : <BarChart
          title="Expedientes Asignados"
          xAxis={[{
            scaleType: 'band',
            data: nombres
          }]}
          series={[{
            data: expedientesAsignados,
            color: '#635bff'
          }]}
          height={400}
        />
      }
    </>
  )
}

const TableData = ({ despacho }) => {
  const columns = [
    {
      label: 'Fecha',
      width: '200px',
      render: (row) => {
        const options = {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true // Usa true para el formato AM/PM
        }
        return <Typography variant='body2' color='textSecondary'
        >{new Date(row.fecha).toLocaleDateString('es', options)}</Typography>
      }
    },

    {
      label: 'Expediente',
      width: '220px',
      render: (row) => <a href={`/expedientes/${row._id}`}>{row?.expediente?.titulo}</a>
    },
    {
      label: 'Titulo',
      width: '220px',
      render: (row) => <Typography color='textSecondary' variant='body2'>{row.titulo}</Typography>
    },
    {
      label: 'Descripción',
      render: (row) => <Typography color='textSecondary' variant='body2'>{row.descripcion}</Typography>
    },
    {
      id: 'estatus',
      label: 'Estatus',
      render: (row) => {
        if (row?.expediente?.estatus === 'Activo') {
          return <Chip label={row?.expediente?.estatus} color='primary' />
        }
        if (row?.expediente?.estatus === 'Inactivo') {
          return <Chip label={row?.expediente?.estatus} color='secondary' />
        }
        if (row?.expediente?.estatus === 'Concluido') {
          return <Chip label={row?.expediente?.estatus} color='success' />
        }
        return <Chip label={row?.expediente?.estatus} color='warning' />
      }
    }
    // {
    //   label: 'Responsable',
    //   render: (row) => `${row.creadoPor.nombre} ${row.creadoPor.apellidoPaterno} ${row.creadoPor.apellidoMaterno}`
    // }
  ]

  const [currentPage, setCurrentPage] = useState(1)
  const [totalDocs, setTotalDocs] = useState(0)
  const [limit, setLimit] = useState(10)
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getMovimientos = async () => {
      try {
        setLoading(true)
        const url = `/dashboard/movimientos?page=${currentPage}&despacho=${despacho}`
        const { data } = await apiAuth().get(url)
        setRows(data.docs)
        setTotalDocs(data.totalDocs)
        setLimit(data.limit)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    getMovimientos()
  }, [currentPage])

  return (
    <>
      {loading && <LinearProgress />}
      <TableIUS
        columns={columns}
        rows={rows}
        onPageChange={(page) => setCurrentPage(page)}
        currentPage={currentPage}
        totalRows={totalDocs}
        limit={limit}
      />
    </>
  )
}

const Abono = ({ despacho }) => {
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const getAbono = async () => {
      try {
        const { data } = await apiAuth().get(`/dashboard/abono?despacho=${despacho}`)
        setTotal(data.totalImporte)
      } catch (error) {
        console.error(error)
      }
    }

    getAbono()
  }, [despacho])

  return (
    <Budget

      title='Abono' subTitle={<CountUp end={total} decimals={2} duration={1} />}
      icon={<>

        <Avatar
          sx={{
            backgroundColor: 'info.main',
            height: 56,
            width: 56
          }}
        >
          <TrendingUp />
        </Avatar>
      </>
      }

    />
  )
}

const Cargo = ({ despacho }) => {
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const getAbono = async () => {
      try {
        const { data } = await apiAuth().get(`/dashboard/cargo?despacho=${despacho}`)
        setTotal(data.totalImporte)
      } catch (error) {
        console.error(error)
      }
    }

    getAbono()
  }, [despacho])

  return (
    <Budget
      title='Cargo' subTitle={<CountUp end={total} decimals={2} duration={1} />}

      icon={<>

        <Avatar
          sx={{
            backgroundColor: 'warning.main',
            height: 56,
            width: 56
          }}
        >
          <TrendingDown />
        </Avatar>
      </>
      }

    />
  )
}

const Balance = ({ despacho }) => {
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const getAbono = async () => {
      try {
        const { data } = await apiAuth().get(`/dashboard/balance?despacho=${despacho}`)
        setTotal(data.balance)
      } catch (error) {
        console.error(error)
      }
    }

    getAbono()
  }, [despacho])

  return (
    <Budget

      title='Balance' subTitle={<CountUp end={total} decimals={2} duration={1} />}
      icon={<>

        <Avatar
          sx={{
            backgroundColor: 'primary.main',
            height: 56,
            width: 56
          }}
        >
          <DollarSign />
        </Avatar>
      </>
      }

    />
  )
}

const Cancelados = ({ despacho }) => {
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const getAbono = async () => {
      try {
        const { data } = await apiAuth().get(`/dashboard/cancelados?despacho=${despacho}`)
        setTotal(data.totalImporte)
      } catch (error) {
        console.error(error)
      }
    }

    getAbono()
  }, [despacho])

  return (
    <Budget

      title='Cancelados' subTitle={<CountUp end={total} decimals={2} duration={1} />}
      icon={<>

        <Avatar
          sx={{
            backgroundColor: 'error.main',
            height: 56,
            width: 56
          }}
        >
          <XCircle />
        </Avatar>
      </>
      }

    />
  )
}

const Pendientes = ({ despacho }) => {
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const getAbono = async () => {
      try {
        const { data } = await apiAuth().get(`/dashboard/pendientes?despacho=${despacho}`)
        setTotal(data.totalImporte)
      } catch (error) {
        console.error(error)
      }
    }

    getAbono()
  }, [despacho])

  return (
    <Budget

      title='Pendientes' subTitle={<CountUp end={total} decimals={2} duration={1} />}
      icon={<>

        <Avatar
          sx={{
            backgroundColor: 'info.main',
            height: 56,
            width: 56
          }}
        >
          <Clock />
        </Avatar>
      </>
      }

    />
  )
}

export default DashboardLayout
