
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

// * Declaraciones Fiscales
import { DeclaracionesFiscales, CreateDeclaraciones, EditarDeclaraciones } from '../views/declaraciones-fiscales'

// * Configuraciones de despacho
import { ConfiguracionDespacho } from '../views/despacho'

// * Gastos en trámites
import { GastosTramites } from '../views/gastos-tramites'

// * Cuentas bancarias
import { CuentasBancarias, CreateCuentasBancarias, EditCuentasBancarias } from '../views/cuentas-bancarias'

// * historial bancos
import { HistorialBancos, CreateHustorial, EditarHustorial } from '../views/historial-bancos'

// * Gastos
import { Gastos, CreateGastos, EditGastos } from '../views/gastos'

// * Ingresos
import { Ingresos, CreateIngresos } from '../views/ingresos_p/index.js'

// * shop
import { Producto } from '../views/shop'

// * Pago exitoso
import PagoExitoso from '../components/PagoExitoso'

const Router = () => {
  const [usuario] = useContext(UsuarioContext)

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
            <Route element={<AuthLayout titleDespacho={usuario?.despacho?.nombre} logo={usuario?.despacho?.logo} />}>
              <Route path='/pago-exitoso' element={<PagoExitoso usuario={usuario} />} />
              <Route path={'/shop'} element={<Producto usuario={usuario} />} />
              <Route path={'/shop/:_id'} element={<Producto usuario={usuario} />} />
              <Route path={`/${clave}`} element={<Home usuarioC={usuario} />} />
              <Route path={`/${clave}/dashboard`} element={<Home usuarioC={usuario} />} />
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

              <Route path={`/${clave}/declaraciones-fiscales`} element={<DeclaracionesFiscales />} />
              <Route path={`/${clave}/declaraciones-fiscales/crear`} element={<CreateDeclaraciones usuarioC={usuario} />} />
              <Route path={`/${clave}/declaraciones-fiscales/:_id/editar`} element={<EditarDeclaraciones usuarioC={usuario} />} />

              <Route path={`/${clave}/datos-fiscales`} element={<ConfiguracionDespacho />} />

              <Route path={`/${clave}/gastos-tramites`} element={<GastosTramites />} />

              <Route path={`/${clave}/cuentas-bancarias`} element={<CuentasBancarias />} />
              <Route path={`/${clave}/cuentas-bancarias/crear`} element={<CreateCuentasBancarias usuarioC={usuario} />} />
              <Route path={`/${clave}/cuentas-bancarias/:_id/editar`} element={<EditCuentasBancarias usuarioC={usuario} />} />

              <Route path={`/${clave}/historial-bancos`} element={<HistorialBancos />} />
              <Route path={`/${clave}/historial-bancos/crear`} element={<CreateHustorial usuarioC={usuario} />} />
              <Route path={`/${clave}/historial-bancos/:_id/editar`} element={<EditarHustorial usuarioC={usuario} />} />

              <Route path={`/${clave}/gastos`} element={<Gastos />} />
              <Route path={`/${clave}/gastos/crear`} element={<CreateGastos usuarioC={usuario} />} />
              <Route path={`/${clave}/gastos/:_id/editar`} element={<EditGastos usuarioC={usuario} />} />

              <Route path={`/${clave}/ingresos`} element={<Ingresos />} />
              <Route path={`/${clave}/ingresos/crear`} element={<CreateIngresos usuarioC={usuario} />} />

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
