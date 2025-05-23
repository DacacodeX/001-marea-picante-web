import { lazy } from "react";
import { Navigate } from "react-router-dom";

import AuthGuard from "./auth/AuthGuard";
import { authRoles } from "./auth/authRoles";

import Loadable from "./components/Loadable";
import MatxLayout from "./components/MatxLayout/MatxLayout";

import materialRoutes from "./views/material-kit/MaterialRoutes";
import CategoryManager from "app/pages/inventario/CategoryManager";
import ProductManager from "app/pages/inventario/ProductManager";
import TableManager from "./pages/ventas/TableManager";
import UserManager from "./pages/administracion/UserManager";

// SESSION PAGES
const NotFound = Loadable(lazy(() => import("./views/sessions/NotFound")));
const JwtLogin = Loadable(lazy(() => import("./views/sessions/JwtLogin")));
const JwtRegister = Loadable(lazy(() => import("./views/sessions/JwtRegister")));
const ForgotPassword = Loadable(lazy(() => import("./views/sessions/ForgotPassword")));
// E-CHART PAGE
const AppEchart = Loadable(lazy(() => import("./views/charts/echarts/AppEchart")));
// DASHBOARD PAGE
const Analytics = Loadable(lazy(() => import("./views/dashboard/Analytics")));

// Importaciones nuevas

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...materialRoutes,
      // dashboard route
      { path: "/dashboard/default", element: <Analytics />, auth: authRoles.admin },
      // e-chart route
      { path: "/charts/echarts", element: <AppEchart />, auth: authRoles.editor },
      // Rutas nuevas
      { path: "/ventas/mesas", element: <TableManager />, auth: authRoles.admin },

      { path: "/inventario/categorias", element: <CategoryManager />, auth: authRoles.admin },
      { path: "/inventario/productos", element: <ProductManager />, auth: authRoles.admin },

      { path: "/administracion/usuarios", element: <UserManager />, auth: authRoles.admin },
    ]
  },

  // session pages route
  { path: "/session/404", element: <NotFound /> },
  { path: "/session/signin", element: <JwtLogin /> },
  { path: "/session/signup", element: <JwtRegister /> },
  { path: "/session/forgot-password", element: <ForgotPassword /> },

  { path: "/", element: <Navigate to="dashboard/default" /> },
  { path: "*", element: <NotFound /> }
];

export default routes;
