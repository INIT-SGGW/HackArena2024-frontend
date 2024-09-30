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
import { GetTeamResponseBody } from "../../Types/responses";
import VerifiedIcon from "../../Assets/verified.svg";

interface Props { }

function AccountPage(props: Props) {
  const navigate = useNavigate();
  const windowWidth = useWindowWidth();
  const pageText: PageText = text.account;
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertErrorMessage, setAlertErrorMessage] = useState<string | null>(null);
  const [teamData, setTeamData] = useState<GetTeamResponseBody | null>(null);

  const [showErrors, setShowErrors] = useState<boolean>(false);
  const [inputsDisabled, setInputsDisabled] = useState<boolean>(true);
  const [showVerificationInfo, setShowVerificationInfo] = useState<boolean>(false);

  useEffect(() => {
    let teamName = localStorage.getItem("teamName");
    let email = localStorage.getItem("email");
    if (!email) {
      navigate("/login");
    } else {
      try {
        teamName = JSON.parse(teamName as string);
        email = JSON.parse(email as string);
      } catch (error) {
        localStorage.removeItem("user");
        localStorage.removeItem("teamName");
        navigate("/login");
      }
    }

    if (!teamName) {
      setAlertErrorMessage("Wystąpił błąd podczas pobierania danych z serwera");
    } else {
      AccountService.getTeam(teamName).then((response) => {
        if (response.status === 202) {
          response.json().then((data: GetTeamResponseBody) => {
            setTeamData(data);
            const unverifiedMembersCount = data.teamMembers.filter((member) => !member.verified).reduce((acc, curr) => acc + 1, 0);
            setShowVerificationInfo(unverifiedMembersCount > 0);
          });
        } else {
          setAlertErrorMessage("Wystąpił błąd podczas pobierania danych z serwera");
        }
      }).catch(() => {
        setAlertErrorMessage("Wystąpił błąd podczas pobierania danych z serwera");
      });
    }



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
        localStorage.removeItem("email");
        localStorage.removeItem("teamName");
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
        <h2 className="header__yellow">{teamData?.teamName}</h2>
        {
          showVerificationInfo &&
          <div className="account__verification-info" >
            <span>W celu zapisania {teamData?.teamName} na HackArena 2.0, wszyscy członkowie zespołu muszą zostać zweryfikowani. Aby to zrobić, należy skorzystać z linka podanego w mailu przesłanym na podane przy rejestracji maile. W razie napotkania problemów, proszę się z nami skontaktowć przez maila kontakt@hackarena.pl.</span>
          </div>
        }
        <ul className="account__table">
          {
            teamData?.teamMembers.map((member, index) => (
              <li key={index} >
                {
                  member.verified ?
                    <span>{member.firstName} {member.lastName}</span> :
                    <span>{member.email}</span>
                }
                <img
                  src={VerifiedIcon}
                  className={`${member.verified ? "verified" : ""}`}
                  alt="verified"
                  title={`${member.verified ? "Członek zespołu zweryfikowany" : "W celu weryfikacji konta, wejdź w link przesłany na maila. Zespół nie zostanie zapisany turniej do momentu weryfikacji wszystkich członków zespołu."}`} />
              </li>
            ))

          }
        </ul>
        <div className="section--row-1">

          <Button
            className="btn btn__primary"
            border={true}
            onClick={hangleLogOut}
          >
            {pageText.buttons.logout}
          </Button>
          <Button
            className="btn btn__primary"
            border={true}
            onClick={() => navigate("/password/change")}
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
