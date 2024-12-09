import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Login from "./components/Login/Login";
import Menu from "./components/Menu/MenuList";
import CadastroUsuarios from "./components/User/UserForm";
import CadastroItens from "./components/Item/ItemList";
import Buscar from "./components/User/UserList";
import Emprestimos from "./components/Loan/LoanActions";
import Cadastro from "./components/Login/Login-Cadastro";

import ErrorPage from "./components/Others/Error-Page";


const router = createBrowserRouter([

  
  { path: "/menu", element: <Menu /> },
  { path: "/cadastro-usuarios", element: <CadastroUsuarios /> },
  { path: "/cadastro-itens", element: <CadastroItens /> },
  { path: "/buscar", element: <Buscar /> },
  { path: "/emprestimos", element: <Emprestimos /> },
  { path: "*", element: <ErrorPage /> }, // Rota para página de erro
  { path: "/", element: <Login /> },
  { path: "/register", element: <Cadastro /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
