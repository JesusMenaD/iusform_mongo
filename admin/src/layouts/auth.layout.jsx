/* eslint-disable react/prop-types */
import Image from 'mui-image'
import { useContext, useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
// import { useQuery } from '@tanstack/react-query'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import logoIus from '../assets/images/logo/logo_iusform_300x74_original.png'
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom'
import {
  ShoppingCart,
  ChevronDown,
  ChevronUp,
  Menu as MenuIcon,
  X,
  Edit,
  LogOut,
  Box as BoxIcon,
  Search as SearchIcon,
  Paperclip as PaperclipIcon
  , Search
} from 'react-feather'
import {
  Box,
  Drawer,
  Toolbar,
  List,
  Divider,
  IconButton,
  ListItemButton,
  ListItemIcon,
  Collapse,
  Menu,
  Typography,
  Fade,
  ListItem,
  ListItemText,
  Paper,
  Tooltip,
  Card,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Grid
} from '@mui/material'
import MuiAppBar from '@mui/material/AppBar'
import { UsuarioContext } from '../context/UsuarioContext'
import { useToggle } from '../hooks/useToggle'
import { apiAuth } from '../api'
import { ModulosContext } from '../context/ModulosContext'
import TableIUS from '../components/TableIUS'

const drawerWidth = 260
// import { apiAuth } from '../api'
const styles = {
  listItemButton: {
    '&:hover': {
      transform: 'scale(1.04)',
      backgroundColor: 'grey.900'
    }

  },
  listItemText: {
    '& .MuiTypography-root': {
      fontSize: 14,
      color: 'grey.100',
      '&:hover': {
        // color: '#FF5100'
      }
    }
  },
  listSubheader: {
    color: '#fff',
    padding: '10px 20px',
    backgroundColor: 'primary.main',
    '& .MuiTypography-root': {
      fontSize: 11
      // fontFamily: 'Roboto'
    }
  },
  badge: {
    '& .MuiBadge-badge': {
      top: 0,
      right: 0,
      width: 16,
      height: 16,
      fontSize: 10,
      color: '#fff',
      backgroundColor: 'secondary.main'
    }
  },
  list: { display: 'flex', alignItems: 'center' },
  block: { display: 'block' },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      boxSizing: 'border-box',
      backgroundColor: 'primary.main'
    }
  },
  divider: {
    backgroundColor: 'grey.600'
  },
  name: {
    // fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontSize: '14px',
    fontWeight: 'bold',
    mt: 2,
    mb: 1
  },

  menuItem: {
    minWidth: 'auto',
    marginRight: '16px'
  },
  boxMenu: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    my: 2,
    p: 1,
    '& .MuiAvatar-root': {
      width: 80,
      height: 80
    },
    '& .MuiTypography-root': {
      textAlign: 'center'
    }
  }
}

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    backgroundColor: '#f2f2f2',
    boxSizing: 'border-box',
    flexGrow: 1,
    padding: theme.spacing(0), // Ajusta el padding para el contenido principal
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: `-${drawerWidth}px`, // Ajusta el margen izquierdo cuando el cajón está abierto
    width: '100%', // El contenido ocupa todo el ancho disponible
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0 // Ajusta el margen izquierdo cuando el cajón está cerrado
    }),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2) // Ajusta el padding para tamaños de pantalla pequeños
    }
  })
)

const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

const NavbarContent = ({
  setDialogLegislaciones
}) => {
  const navigate = useNavigate()
  const [userContext, setUsuarioContext] = useContext(UsuarioContext)
  const [, setCModulos] = useContext(ModulosContext)
  const logout = () => {
    setUsuarioContext(null)
    setCModulos([])
    localStorage.removeItem('usuario')
    navigate('/login')
  }
  const toEditProfile = `/${userContext.clave}/perfil/editar`

  const profileToggle = useToggle()
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""'
      }
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0
      }
    }
  }))

  return (
    <>
      <List sx={styles.list}>
        <ListItem disablePadding sx={{
          ...styles.block,
          borderRadius: 2,
          mr: 1,
          border: '1px solid #c89211'
        }}>
          <Tooltip title="Directorio">
            <ListItemButton
              onClick={() => { }}>
              <SearchIcon color='#c89211' size={20} />

            </ListItemButton>
          </Tooltip>
        </ListItem>

        <ListItem disablePadding sx={{
          ...styles.block,
          borderRadius: 2,
          mr: 1,
          border: '1px solid #c89211'
        }}>
          <Tooltip title="Legislaciones y reglamentos">
            <ListItemButton
              onClick={() => setDialogLegislaciones(true)}>
              <PaperclipIcon color='#c89211' size={20} />

            </ListItemButton>
          </Tooltip>
        </ListItem>
        <ListItem disablePadding sx={{
          ...styles.block,
          borderRadius: 2,
          mr: 1,
          border: '1px solid #c89211'
        }}>
          <Tooltip title="Tienda">
            <ListItemButton
              component={Link}
              to="/shop"
            >
              <ShoppingCart color='#c89211' size={20} />
            </ListItemButton>
          </Tooltip>
        </ListItem>
        <ListItem disablePadding sx={styles.block}>
          <ListItemButton id="fade-profile"
            aria-controls={profileToggle.open ? 'fade-profile' : undefined}
            aria-haspopup="true"
            aria-expanded={profileToggle.open ? 'true' : undefined}
            onClick={profileToggle.handleClick}>

            <Tooltip title="Perfil">
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                variant="dot"
              >
                <Avatar alt="profile image" src={userContext.foto} />
              </StyledBadge>
            </Tooltip>
          </ListItemButton>
        </ListItem>

      </List >
      <Menu
        id="fade-profile"
        MenuListProps={{ 'aria-labelledby': 'fade-profile' }}
        anchorEl={profileToggle.anchorEl}
        open={profileToggle.open}
        onClose={profileToggle.handleClose}
        TransitionComponent={Fade}
        elevation={1}
      >
        <Paper sx={{ width: 232 }} elevation={0}>
          <Box sx={styles.boxMenu}>
            <Avatar alt="profile image" src={userContext.foto} sx={{ width: 80, height: 80 }} />
            <Typography sx={styles.name}>{userContext.nombre} {userContext.apellidoPaterno} {userContext.apellidoMaterno} </Typography>
            <Typography sx={{
              fontSize: 13,
              color: 'grey.500'
            }}>
              {userContext.email}
            </Typography>
          </Box>
          <Divider />
          <List dense>
            <ListItem disablePadding >
              <ListItemButton component={Link} to={toEditProfile}>
                <ListItemIcon sx={styles.menuItem}>
                  <Edit size={16} />
                </ListItemIcon>
                <ListItemText primary='Editar Perfil' />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={logout}>
                <ListItemIcon sx={styles.menuItem}>
                  <LogOut size={16} />
                </ListItemIcon>
                <ListItemText primary='Cerrar sesión' />
              </ListItemButton>
            </ListItem>
          </List>
        </Paper>
      </Menu>

    </>
  )
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  // padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'space-around',
  backgroundColor: 'white'
}))

// eslint-disable-next-line react/prop-types
const ListItemLink = ({ name, to, Icon, chil = [], tipo = 'url' }) => (
  <ListItem disablePadding>
    <ListItemButton component={NavLink} to={to} sx={styles.listItemButton} LinkComponent={Link}>
      <ListItemIcon>

        {
          tipo === 'url' ? <Image src={Icon} alt={name} width={18} height={18} /> : <BoxIcon color='white' size={20} />
        }

        {/* < Image src={Icon} alt={name} width={18} height={18} /> */}
      </ListItemIcon>
      <ListItemText primary={name} sx={styles.listItemText} />
    </ListItemButton>
  </ListItem>
)

// eslint-disable-next-line react/prop-types
const ListItemCollapse = ({ name, Icon, tos = [], active = false }) => {
  const [open, setOpen] = useState(active)

  const handleClick = () => {
    setOpen(!open)
  }
  return (
    <>
      <ListItemButton onClick={handleClick} sx={styles.listItemButton}>
        <ListItemIcon>
          <Image src={Icon} alt={name} width={18} height={18} />
        </ListItemIcon>
        <ListItemText sx={styles.listItemText} primary={name} />
        {open ? <ChevronDown color='white' size={20} /> : <ChevronUp color='white' size={20} />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {
            tos.map((to, index) => {
              return (
                <ListItemButton key={index} sx={{ ...styles.listItemButton, pl: 4 }} component={NavLink} to={to.enlace}>
                  <ListItemIcon>
                    <Image src={to.imagen} alt={to.nombre} width={18} height={18} />
                  </ListItemIcon>
                  <ListItemText primary={to.nombre} sx={styles.listItemText} />
                </ListItemButton>
              )
            })
          }
        </List>
      </Collapse>
    </>
  )
}
const DrawerContent = () => {
  const [usuario] = useContext(UsuarioContext)
  // const { tipo } = usuario
  const { _id } = usuario
  // const despacho = usuario.despacho._id
  const [modulosC, setCModulos] = useContext(ModulosContext)

  const fetchModulos = async () => {
    const { data } = await apiAuth().get(`modulos/${_id}`)
    return data.data
  }

  useEffect(() => {
    // Solo realizar la llamada a la API si modulos está vacío
    if (modulosC.length === 0) {
      fetchModulos().then(data => setCModulos(data))
    }
  }, [])

  return (
    <nav>
      <List>
        <ListItemLink name='Panel' to="/" Icon={<BoxIcon />} tipo='ico' />

        {modulosC.map((modulo, index) => {
          if (modulo.child.length > 0) {
            return (
              <ListItemCollapse key={index} name={modulo.nombre} Icon={modulo.imagen} tos={modulo.child} />
            )
          }
          return (
            <ListItemLink key={index} name={modulo.nombre} to={modulo.enlace} Icon={modulo.imagen} />
          )
        })}
        <Card
          sx={{
            mx: 1,
            p: 2,
            mt: 3,
            color: 'grey.600',
            backgroundColor: 'grey.100',
            borderRadius: 2,
            boxShadow: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5
          }}
        >
          <Typography level="title-sm">Plan actual</Typography>
          <Typography level="body-xs">
            30 días de prueba
          </Typography>
          <Button size="sm" variant="outlined">
            Actualizar plan
          </Button>
        </Card>
      </List>
    </nav>

  )
}

const AuthLayout = ({ titleDespacho = '', logo = '' }) => {
  const [dialogLegislaciones, setDialogLegislaciones] = useState(false)

  const [open, setOpen] = useState(() => window.innerWidth > 960)
  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Box sx={{
        display: 'flex'
      }}>
        <AppBar position="fixed" open={open} color='white' elevation={1}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <IconButton
              edge="start"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              sx={{ marginRight: 5, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'start'
            }}>
              {logo &&
                <>
                  <Avatar alt="profile image" sx={{
                    bgcolor: 'primary.main'

                  }} src={logo} >{titleDespacho[0]}</Avatar>&nbsp;&nbsp;
                </>}
              <span>{titleDespacho}</span>
            </div>
            <NavbarContent setDialogLegislaciones={setDialogLegislaciones} />
          </Toolbar>
        </AppBar>
        <Drawer
          open={open}
          anchor="left"
          sx={styles.drawer}
          variant="persistent"
        >
          <DrawerHeader
          >
            <Image src={logoIus} alt='logo' style={{
              width: 150,
              height: 37
            }} duration={0} />
            <IconButton
              sx={{ color: 'grey' }}
              onClick={handleDrawerClose}>
              <X size={23} />
            </IconButton>
          </DrawerHeader>
          <DrawerContent />
        </Drawer>
        <Main open={open} sx={{
          width: '100%',
          transition: 'margin-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
          overflow: 'hidden'
        }}>
          <Box sx={{ height: 70 }} />
          <Outlet />
        </Main>
      </Box >
      <DialogLegislaciones open={dialogLegislaciones} handleClose={() => setDialogLegislaciones(false)} />
    </>
  )
}

export default AuthLayout

export const DialogLegislaciones = ({ open, handleClose }) => {
  const colums = [
    {
      id: 'nombre',
      label: 'Nombre'
    }
  ]

  const [rows, setRows] = useState([
    {
      nombre: 'Ley Que Crea La Universidad Tecnológica De Puebla '
    },
    {
      nombre: '— De Conformidad Con El Artículo Tercero Transitorio Del Decreto Número 85 Expedido Por La XV Legislatura Del Estado, Los Títulos Tercero Y Cuarto Quedarán Derogados Progresivamente Hasta La Conclusión Del Último Procedimiento Regido Por Lo Establecido En Las Disposiciones Contenidas En Dichos Títulos. '
    },
    {
      nombre: 'Código Penal'
    },
    {
      nombre: 'Ley de Amparo'
    },
    {
      nombre: 'Código Civil'
    },
    {
      nombre: 'Código Penal'
    },
    {
      nombre: 'Ley de Amparo'
    },
    {
      nombre: 'Código Civil'
    },
    {
      nombre: 'Código Penal'
    },
    {
      nombre: 'Ley de Amparo'
    },
    {
      nombre: 'Código Civil'
    },
    {
      nombre: 'Código Penal'
    },
    {
      nombre: 'Ley de Amparo'
    },
    {
      nombre: '— De Conformidad Con El Artículo Tercero Transitorio Del Decreto Número 85 Expedido Por La XV Legislatura Del Estado, Los Títulos Tercero Y Cuarto Quedarán Derogados Progresivamente Hasta La Conclusión Del Último Procedimiento Regido Por Lo Establecido En Las Disposiciones Contenidas En Dichos Títulos. '
    },
    {
      nombre: 'Código Penal'
    },
    {
      nombre: 'Ley de Amparo'
    },
    {
      nombre: 'Código Civil'
    },
    {
      nombre: 'Código Penal'
    },
    {
      nombre: 'Ley de Amparo'
    },
    {
      nombre: 'Código Civil'
    },
    {
      nombre: 'Código Penal'
    },
    {
      nombre: 'Ley de Amparo'
    },
    {
      nombre: 'Código Civil'
    },
    {
      nombre: 'Código Penal'
    },
    {
      nombre: 'Ley de Amparo'
    },
    {
      nombre: 'Código Civil'
    },
    {
      nombre: 'Código Penal'
    }
  ])

  const [search, setSearch] = useState('')
  const handleFilter = (e) => {
    e.preventDefault()
    console.log(search)
    setRows(rows.filter(row => row.nombre.toLowerCase().includes(search.toLowerCase())))
  }

  return (
    <Dialog
      fullWidth={true}
      maxWidth="md"
      open={open}
      onClose={handleClose}
    // no cerrar con esc o click fuera del dialog
    // disableEscapeKeyDown
    >
      <DialogTitle>
        Legislaciones y reglamentos
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500]
        }}
      >
        <X />
      </IconButton>
      <DialogContent sx={{
        backgroundColor: 'grey.100',
        // quiero que el pading solo zero cuando es mobile y cuando es desktop sea 8
        padding: 0,
        '@media (min-width: 600px)': {
          padding: 2
        }
      }}>
        {/* //Buscador */}
        <Paper elevation={0} sx={{ p: 3, py: 5, mb: 3 }}>
          <Typography variant='subtitle1' mb={2} component='h2'>
            Selecciona un criterio de búsqueda
          </Typography>
          <Box onSubmit={handleFilter} as='form' component='form'>
            <Grid container spacing={2} alignItems='center'>
              <Grid item xs={12} sm={6} md={9}>
                <TextField fullWidth label='Buscar' id='Buscar' value={search} onChange={(e) => setSearch(e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={6} md={2} display='flex' justifyContent='space-around'>
                <Button
                  variant='contained'
                  title='Buscar'
                  sx={{
                    backgroundColor: '#c89211',
                    color: 'white'
                  }}
                  type='submit'
                >
                  <Search />
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>

        <TableIUS
          columns={colums}
          rows={rows}
          height={400}
          isHandling={false}

        />
        <Box
          noValidate
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            m: 'auto',
            width: 'fit-content'
          }}
        >

        </Box>
      </DialogContent>
    </Dialog>

  )
}
