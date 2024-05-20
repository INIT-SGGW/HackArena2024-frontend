import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import HomePage from "../Pages/HomePage/HomePage";
import AccountPage from "../Pages/AccountPage/AccountPage";
import NotFound from "../Pages/NotFound/NotFound";
import ResetPasswordPage from "../Pages/ResetPasswordPage/ResetPasswordPage";
import MessagePage from "../Pages/MessagePage/MessagePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/reset",
        element: <ResetPasswordPage />,
      },
      // {
      //   path: "/rejestracja",
      //   element: <RegisterPage />,
      // },
      {
        path: "/rejestracja/sukces",
        element: <MessagePage title="Gratulajce!" message="Twój zespół został stworzony." />
      },
      {
        path: "/rejestracja",
        element: <MessagePage title="Rejestracja" message="Zapisy rozpoczną się już wkrótce." />
      },
      {
        path: "/konto/:zespolID",
        element: <AccountPage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
