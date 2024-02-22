import Image from 'mui-image'
import { useContext, useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
// import { useQuery } from '@tanstack/react-query'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import logoIus from '../assets/images/logo/logo_iusform_300x74_original.png'
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom'
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
  Tooltip
} from '@mui/material'
import MuiAppBar from '@mui/material/AppBar'
import {
  ChevronDown,
  ChevronUp,
  Menu as MenuIcon,
  X,
  Edit,
  LogOut
} from 'react-feather'
import { UsuarioContext } from '../context/UsuarioContext'
import { useToggle } from '../hooks/useToggle'
import { apiAuth } from '../api'
const drawerWidth = 250
// import { apiAuth } from '../api'
const styles = {
  listItemButton: {
    '&:hover': {
      // color: '#FF5100',
      transform: 'scale(1.01)',
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
      fontSize: 11,
      fontFamily: 'Roboto'
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
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontSize: '16px',
    fontWeight: 'bold',
    mt: 2
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
    padding: window.innerWidth < 600 ? '16px' : theme.spacing(0),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    })
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

const NavbarContent = () => {
  const navigate = useNavigate()
  const [userContext, setUsuarioContext] = useContext(UsuarioContext)
  const logout = () => {
    setUsuarioContext(null)
    localStorage.removeItem('usuario')
    navigate('/login')
  }

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
      </List>
      <Menu
        id="fade-profile"
        MenuListProps={{ 'aria-labelledby': 'fade-profile' }}
        anchorEl={profileToggle.anchorEl}
        open={profileToggle.open}
        onClose={profileToggle.handleClose}
        TransitionComponent={Fade}
        elevation={1}
      >
        <Paper sx={{ width: 232 }} elevation={0}
        >
          <Box sx={styles.boxMenu}>
            <Avatar alt="profile image" src={userContext.foto} sx={{ width: 80, height: 80 }} />
            <Typography sx={styles.name}>{userContext.nombre} {userContext.apellidoPaterno} {userContext.apellidoMaterno} </Typography>
            <Typography sx={styles.email}>
              {userContext.email}
            </Typography>
          </Box>
          <Divider />
          <List dense>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate(`/${userContext.clave}/perfil/editar`)}>
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
const ListItemLink = ({ name, to, Icon, chil = [] }) => (
  <ListItem disablePadding>
    <ListItemButton component={NavLink} to={to} sx={styles.listItemButton} LinkComponent={Link}>
      <ListItemIcon>
        <Image src={Icon} alt={name} width={18} height={18} />
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
        {open ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {
            tos.map((to, index) => (
              <ListItemButton key={index} sx={{ ...styles.listItemButton, pl: 3 }} component={NavLink} to={to.to}>
                <ListItemIcon>
                  <Image src={to.imagen} alt={to.nombre} width={18} height={18} />
                </ListItemIcon>
                <ListItemText primary={to.nombre} sx={styles.listItemText} />
              </ListItemButton>
            ))
          }
        </List>
      </Collapse>
    </>
  )
}
const DrawerContent = () => {
  const [usuario] = useContext(UsuarioContext)
  const { tipo } = usuario
  const { _id } = usuario
  const [modulos, setModulos] = useState([])

  const fetchModulos = async () => {
    const { data } = await apiAuth().get(`modulos/${_id}?tipo=${tipo}`)
    return data.data
  }

  useEffect(() => {
    // Solo realizar la llamada a la API si modulos está vacío
    if (modulos.length === 0) {
      fetchModulos().then(data => setModulos(data))
    }
  }, []) // Solo se dispara una vez, al montar el componente

  return (
    <nav>
      <List>
        {modulos.map((modulo, index) => {
          if (modulo.child.length > 0) {
            return (
              <ListItemCollapse key={index} name={modulo.nombre} Icon={modulo.imagen} tos={modulo.child} />
            )
          }
          return (
            <ListItemLink key={index} name={modulo.nombre} to={modulo.enlace} Icon={modulo.imagen} />
          )
        })}
      </List>
    </nav>
  )
}

const AuthLayout = () => {
  const [open, setOpen] = useState(() => window.innerWidth > 960)
  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <Box sx={{
      display: 'flex'
    }}>
      <AppBar position="fixed" open={open} color='white' elevation={1}>
        <Toolbar>
          <IconButton
            edge="start"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            sx={{ marginRight: 5, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>

          <div style={{ flexGrow: 1 }} />
          <NavbarContent />
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
        transition: 'margin-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms'
      }}>
        <Box sx={{ height: 70 }} />
        <Outlet />
      </Main>
    </Box>
  )
}

export default AuthLayout
