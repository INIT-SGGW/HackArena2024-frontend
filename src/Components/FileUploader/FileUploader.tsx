import "./FileUploader.css";
import { FileUploader as FU } from "react-drag-drop-files";
import { useState } from "react";
import { eventEndDate, eventStartDate } from "../../Constants/Constants"
import isEventLive from "../../Utils/isEventLive"
import text from "../../Assets/text.json";
import AccountService from "../../Services/AccountService";

interface Props { }

enum FileStatus {
  UNSELECTED,
  SELECTED,
  SENDING,
  SUCCESS,
  ERROR
}

function FileUploader(props: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<FileStatus>(FileStatus.UNSELECTED);
  const fileTypes = ["zip"];
  const fileText = text.fileUploader;

  const handleChange = (file: File) => {
    setMessage(file.name);
    setStatus(FileStatus.SELECTED);
    setFile(file);
  };

  const handleSendFile = () => {
    setMessage("Wysyłanie pliku...")
    setStatus(FileStatus.SENDING);

    const teamName = localStorage.getItem("teamID") || "";
    AccountService.uploadSolution(teamName, file as File).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        setMessage("Plik został wysłany pomyślnie")
        setStatus(FileStatus.SUCCESS);
      } else {
        throw new Error("Wystąpił błąd podczas wysyłania pliku")
      }
    }).catch((error) => {
      setMessage("Wystąpił błąd podczas wysyłania pliku")
      setStatus(FileStatus.ERROR);
      setFile(null);
    });
  }

  const handleCancel = () => {
    console.log("Canceling file upload");
    setMessage("");
    setStatus(FileStatus.UNSELECTED);
    setFile(null);
    const span = document.querySelector(".kFhUBM") as HTMLSpanElement;
    span.innerHTML = fileText.showing.label;
  }

  if (!isEventLive()) {
    return (
      <p>{fileText.hidden.description}</p>
    )
  }

  return (
    <div className="file">
      <h3>{fileText.showing.title}</h3>
      <div className="file--wrapper">
        <FU
          classes="file--input"
          label={fileText.showing.label}
          handleChange={handleChange}
          types={fileTypes}
        />
        {
          status !== FileStatus.UNSELECTED && <div className="file--sending">
            <span>{message}</span>
            {status !== FileStatus.SENDING &&
              <div>
                <button
                  onClick={handleCancel}
                  className={`file--button account--button account--button__secondary${status !== FileStatus.SUCCESS ? " file--button__halfborder" : ""}`}>
                  {fileText.showing.buttons.cancel}
                </button>
                {
                  status !== FileStatus.SUCCESS &&
                  <button
                    onClick={handleSendFile}
                    className="file--button account--button account--button__secondary file--button__halfborder">
                    {fileText.showing.buttons.send}
                  </button>
                }
              </div>
            }
          </div>
        }

      </div>
    </div >
  );
}

export default FileUploader;
