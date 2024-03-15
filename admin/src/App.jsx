import './assets/css/App.css'
import Router from './routes'
import { ThemeProvider } from '@emotion/react'
import { theme } from './themes'
import { UsuarioContext } from './context/UsuarioContext'
import { useState } from 'react'
import { getUsuarioLS } from './api/auth'
import { NotificationContext } from './context/NotificationConext'
import { ModulosContext } from './context/ModulosContext'
import moment from 'moment-timezone'
// Establece la zona horaria predeterminada para todo el proyecto
moment.tz.setDefault('America/Mexico_City')

const App = () => {
  const data = getUsuarioLS()
  const [usuario, setUsuario] = useState(data)
  const [notification, setNotification] = useState([])
  const [modulos, setModulos] = useState([])

  return (
    <UsuarioContext.Provider value={[usuario, setUsuario]}>
      <ModulosContext.Provider value={[modulos, setModulos]}>
        <NotificationContext.Provider value={[notification, setNotification]}>
          <ThemeProvider theme={theme}>
            <Router key={usuario?.id} />
          </ThemeProvider>
        </NotificationContext.Provider>
      </ModulosContext.Provider>
    </UsuarioContext.Provider>
  )
}

export default App
