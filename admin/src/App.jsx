import './assets/css/App.css'
import Router from './routes'
import { ThemeProvider } from '@emotion/react'
import { theme } from './themes'
import { UsuarioContext } from './context/UsuarioContext'
import { useState } from 'react'
import { getUsuarioLS } from './api/auth'
import { NotificationContext } from './context/NotificationConext'

const App = () => {
  const data = getUsuarioLS()
  const [usuario, setUsuario] = useState(data)
  const [notification, setNotification] = useState([{
    id: 0,
    type: 'green',
    message: 'Bienvenido a 4CAP.',
    createdAt: new Date()
  },
  {
    id: 1,
    type: 'green',
    message: 'Datos cargados correctamente.',
    createdAt: new Date()
  }])
  return (
    <UsuarioContext.Provider value={[usuario, setUsuario]}>
      <NotificationContext.Provider value={[notification, setNotification]}>
        <ThemeProvider theme={theme}>
          <Router />
        </ThemeProvider>
      </NotificationContext.Provider>
    </UsuarioContext.Provider>
  )
}

export default App
