import "./AccountPage.css";
import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import text from "../../Assets/text.json";
import FileUploader from "../../Components/FileUploader/FileUploader";
import useWindowWidth from "../../Hooks/useWindowWidth";
import Alert from "../../Components/Alert/Alert";
import AccountService from "../../Services/AccountService";
import AuthenticationService from "../../Services/AuthenticationService";
import Button from "../../Components/Button/Button";
import Page from "../../Components/Page/Page";
import { PageText } from "./types";
import getEventStatus, { EventStatus } from "../../Utils/getEventStatus";

interface Props { }

function AccountPage(props: Props) {
  const { zespolID } = useParams<{ zespolID: string }>();
  const navigate = useNavigate();
  const windowWidth = useWindowWidth();
  const pageText: PageText = text.account;
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertErrorMessage, setAlertErrorMessage] = useState<string | null>(null);

  const [showErrors, setShowErrors] = useState<boolean>(false);
  const [inputsDisabled, setInputsDisabled] = useState<boolean>(true);

  useEffect(() => {
    // TODO: get data from server
  }, [])

  const handleTrySubmit = () => {
    setShowErrors(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

  };

  const handleAddTeamMember = () => {

  };

  const hangleLogOut = () => {
    //TODO: check if it's correct
    AuthenticationService.logout().then((response) => {
      if (response.status === 200) {
        localStorage.removeItem("teamID");
        navigate("/");
      } else {
        setAlertErrorMessage("Wystąpił błąd podczas wylogowywania")
      }
    }).catch(() => {
      setAlertErrorMessage("Wystąpił błąd podczas wylogowywania")
    });
  }

  const handleDeleteTeamMember = (index: number) => {

  };

  const handleEditForm = () => {

  };

  const handleUpdateTeam = () => {
    handleTrySubmit();

  }

  const handleDeleteTeam = () => {
    //TODO: delete team
    localStorage.removeItem("teamID");
    navigate("/");
  }

  return (
    <Page pageTitle={pageText.meta.title} description={pageText.meta.description} noIndex>
      <div className="account pagewidth">
        {
          alertErrorMessage &&
          <Alert
            title="Błąd"
            message={alertErrorMessage}
            buttonOneText="Zamknij"
            buttonOneAction={() => setAlertErrorMessage(null)}
          />
        }
        <div className="section-column-1">
          <h2 className="header__yellow">{pageText.title}</h2>
        </div>
        <form className="register--form" onSubmit={handleSubmit}>

        </form>
        <div className="account--bottom">

          <Button
            className="btn btn__primary"
            onClick={hangleLogOut}
          >
            {pageText.buttons.logout}
          </Button>
          <Button
            className="btn btn__primary"
            onClick={() => navigate("/change")}
          >
            {pageText.buttons.resetPassword}
          </Button>
          {/* <Button
          type="button"
          className="btn btn__primary"
          onClick={() => setShowAlert(true)}
        >
          {pageText.buttons.deleteTeam}
        </Button> */}
          {
            showAlert &&
            <Alert
              title={pageText.alert.title}
              message={pageText.alert.message}
              buttonOneText={pageText.alert.buttons.delete}
              buttonOneAction={handleDeleteTeam}
              buttonTwoText={pageText.alert.buttons.cancel}
              buttonTwoAction={() => setShowAlert(false)}
            />
          }
        </div>
      </div>
    </Page>
  );
}

export default AccountPage;
