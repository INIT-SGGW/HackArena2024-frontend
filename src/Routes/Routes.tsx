import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import HomePage from "../Pages/HomePage/HomePage";
import AccountPage from "../Pages/AccountPage/AccountPage";
import NotFound from "../Pages/NotFound/NotFound";
import ResetPasswordPage from "../Pages/ResetPasswordPage/ResetPasswordPage";
import MessagePage from "../Pages/MessagePage/MessagePage";
import DownloadPage from "../Pages/DownloadPage/DownloadPage";

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
      {
        path: "/reset/sukces",
        element: <MessagePage
          title="Gratulacje!"
          message="Hasło zostało zmienione."
          buttonOneText="Konto"
          buttonOneLink="/login"
          buttonTwoText="Strona główna"
          buttonTwoLink="/"
        />
      },
      {
        path: "/rejestracja",
        element: <RegisterPage />,
      },
      {
        path: "/rejestracja/sukces",
        element: <MessagePage
          title="Gratulajce!"
          message="Twój zespół został stworzony."
          buttonOneText="Zaloguj się"
          buttonOneLink="/login"
          buttonTwoText="Strona główna"
        />
      },
      {
        path: "/konto/:zespolID",
        element: <AccountPage />,
      },
      {
        path: "/download/:teamID",
        element: <DownloadPage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
