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
import EventPage from "../Pages/EventPage/EventPage";
import EventListPage from "../Pages/EventListPage/EventListPage";
import MemberRegisterPage from "../Pages/MemberRegisterPage/MemberRegisterPage";
import ForgotPassword from "../Pages/ForgotPasswordPage/ForgotPassword";
import ChangePasswordPage from "../Pages/ChangePasswordPage/ChangePasswordPage";

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
        path: "/password/reset",
        element: <ResetPasswordPage />,
      },
      {
        path: "/password/forgot",
        element: <ForgotPassword />,
      },
      {
        path: "/password/change",
        element: <ChangePasswordPage />,
      },
      {
        path: "/sukces/reset",
        element: <MessagePage
          title="Gratulacje!"
          message="Twoje hasło zostało zmienione."
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
        path: "/rejestracja/:teamName",
        element: <MemberRegisterPage />,
      },
      {
        path: "/sukces/rejestracja",
        element: <MessagePage
          title="Gratulajce!"
          message="Twój zespół został stworzony. Sprawdź swoją skrzynkę mailową, aby dokończyć rejestrację."
          buttonOneText="Strona główna"
          buttonOneLink="/"
        />
      },
      {
        path: "/sukces/rejestracja/uczestnika",
        element: <MessagePage
          title="Gratulajce!"
          message="Zakończyłeś proces rejestracji. Teraz możesz zalogować się na swoje konto."
          buttonOneText="Konto"
          buttonOneLink="/login"
          buttonTwoText="Strona główna"
          buttonTwoLink="/"
        />
      },
      {
        path: "/konto",
        element: <AccountPage />,
      },
      {
        path: "/download/:teamName",
        element: <DownloadPage />,
      },
      {
        path: "/wydarzenia",
        element: <EventListPage />,
      },
      {
        path: "/wydarzenia/:eventName",
        element: <EventPage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
