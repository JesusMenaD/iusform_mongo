
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import { UsuarioContext } from '../context/UsuarioContext'
import { useContext } from 'react'

// * Auth
import { Login } from '../views/auth'
import { _404 } from '../views/Error'
import { ProtectedRoute } from '../components/ProtectedRoute'
import { AuthLayout } from '../layouts'

// * Recovery password
import { RecoveryPassword } from '../views/recovery_pass'

// * Perfil
import { EditarPerfil } from '../views/perfil'

// * Expedientes
import { Expedientes, CreateExpedientes, EditarExpediente, PautasExpediente } from '../views/expedientes'

// * Clientes
import { Clientes, CreateClientes, EditarClientes } from '../views/clientes'

// * Agenda
import { Agenda, CreateAgenda } from '../views/agenda'

import { Usuarios, CreateUsuario, EditarUsuario } from '../views/usuarios'
import Home from '../views/Home'

// * Configuraciones

import EvoPayments from '../components/Evo'

// * Folios
import { Folios, CreateFolio } from '../views/folios'

// * Tipo de usuarios
import { TipoUsuarios, EditarPermisos } from '../views/tipo_usuarios'

const Router = () => {
  const [usuario] = useContext(UsuarioContext)
  const despachoNombre = usuario?.despacho?.nombre ?? ''
  const logo = usuario?.despacho?.logo ?? ''

  // Verifica si el usuario está autenticado y tiene un ID único
  const clave = usuario && usuario.clave ? usuario.clave : null

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/recovery' element={<RecoveryPassword />} />
        <Route element={<ProtectedRoute />}>

          {clave !== null && (
            <Route element={<AuthLayout titleDespacho={despachoNombre} logo={logo} />}>
              <Route path={'/shop'} element={<h1>Shop</h1>} />
              <Route path={`/${clave}`} element={<Home />} />
              <Route path={`/${clave}/dashboard`} element={<Home />} />
              <Route path={`/${clave}/perfil/editar`} element={<EditarPerfil />} />
              <Route path={`/${clave}/expedientes`} element={<Expedientes />} />
              <Route path={`/${clave}/expedientes/crear`} element={<CreateExpedientes usuarioC={usuario} />} />
              <Route path={`/${clave}/expedientes/:_id/editar`} element={<EditarExpediente usuarioC={usuario} />} />
              <Route path={`/${clave}/pautas/:_id`} element={<PautasExpediente usuarioC={usuario} />} />

              {/* PautasExpediente */}

              <Route path={`/${clave}/clientes`} element={<Clientes />} />
              <Route path={`/${clave}/clientes/crear`} element={<CreateClientes usuarioC={usuario} />} />
              <Route path={`/${clave}/clientes/:_id/editar`} element={<EditarClientes usuarioC={usuario} />} />

              <Route path={`/${clave}/usuarios`} element={<Usuarios />} />
              <Route path={`/${clave}/usuarios/crear`} element={<CreateUsuario usuarioC={usuario} />} />
              <Route path={`/${clave}/usuarios/:_id/editar`} element={<EditarUsuario usuarioC={usuario} />} />

              <Route path={`/${clave}/agenda`} element={<Agenda despacho={usuario?.despacho?._id} usuario={usuario?._id} />} />
              <Route path={`/${clave}/agenda/crear`} element={<CreateAgenda usuarioC={usuario} />} />

              <Route path={`/${clave}/directorios`} element={<EvoPayments />} />

              <Route path={`/${clave}/folios`} element={<Folios />} />
              <Route path={`/${clave}/folios/crear`} element={<CreateFolio usuarioC={usuario} />} />

              <Route path={`/${clave}/tipo-usuarios`} element={<TipoUsuarios />} />
              <Route path={`/${clave}/tipo-usuarios/:_id/editar`} element={<EditarPermisos usuarioC={usuario} />} />

              <Route path='*' element={<_404 />} />
            </Route>

          )}
        </Route>
        <Route path='*' element={<_404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
