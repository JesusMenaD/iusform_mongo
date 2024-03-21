/* eslint-disable react/prop-types */
import './shop.css'
import { Container, LinearProgress } from '@mui/material'
import Description from './Components/Description'
import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { apiAuth } from '../../api'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
const Producto = ({ usuario }) => {
  const { _id } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [producto, setProducto] = useState({})
  const [productos, setProductos] = useState([])

  // const [productos, setProductos] = useState([])

  useEffect(() => {
    const fetProducto = async () => {
      setIsLoading(true)
      try {
        if (!_id) {
          console.log('No se encontró el producto')
          return
        }
        const url = `/productos/${_id}/`
        const { data } = await apiAuth().get(url)
        if (data.producto) {
          setProducto(data.producto)
        } else {
          console.log('No se encontró el producto')
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    const getProducts = async () => {
      setIsLoading(true)
      try {
        const url = '/productos/sin-paginar'
        const { data } = await apiAuth().get(url)
        if (data.productos) {
          setProductos(data.productos)
        } else {
          console.log('No se encontraron los productos')
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetProducto()

    getProducts()
  }, [])

  return (
    <>
      <div className="App">

        {_id
          ? isLoading
            ? <LinearProgress sx={{
              marginTop: '8px'
            }} />
            : <Container component="section" maxWidth={'lg'}>
              <section className="core">
                <section className="gallery-holder hide-in-mobile">
                  <section className="gallery">
                    <div className="image">
                      <img src={producto?.imagen} alt="img del producto" />
                    </div>
                  </section>
                </section>
                <section className="mobile-gallery hide-in-desktop">
                  <img src={producto?.imagen} alt="img del producto" />
                </section>
                <Description
                  usuario={usuario?._id}
                  title={producto?.nombre}
                  precio={producto?.precio?.toFixed(2)}
                  tipo={producto?.tipo_producto}
                  descripcion={producto?.descripcion}
                  tiempo={producto?.tiempo}
                  pruebaGratis={producto?.pruebaGratis || false}
                  id={producto?._id}
                />
              </section>
            </Container>
          : null}

      </div>
      <Typography variant="h5" align="center" sx={{ mt: 2 }} >
        Tienda de productos
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', mt: 1 }}>
        {productos.map((producto, index) => (
          <Card sx={{
            width: 270,
            // height: 370,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }} key={index}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              height="150"
              sx={{ objectFit: 'contain' }}
              image={producto?.imagen}
            />
            <CardContent>
              <Description
                title={producto?.nombre}
                precio={producto?.precio?.toFixed(2)}
                tipo={producto?.tipo_producto}
                descripcion={producto?.descripcion}
                tiempo={producto?.tiempo}
                pruebaGratis={producto?.pruebaGratis || false
                }
                iscard={true}
              />
            </CardContent>
            <CardActions>
              <Button variant="outlined" fullWidth component={Link} to={`/shop/${producto._id}`} onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
                return setProducto(producto)
              }} >
                {producto?.tipo_producto === 'Paquete' ? 'Ver Paquete de expediente' : producto?.tipo_producto === 'Timbres' ? 'Ver paquete de timbres' : 'Ver plantilla'}
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box >
    </>

  )
}

export default Producto
