import "./FileUploader.css";
import { FileUploader as FU } from "react-drag-drop-files";
import { useState } from "react";
import { eventEndDate, eventStartDate } from "../../Constants/Constants"
import isEventLive from "../../Utils/isEventLive"

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
  const fileTypes = ["zip", "7z"];

  const handleChange = (file: File) => {
    setMessage(file.name);
    setStatus(FileStatus.SELECTED);
    setFile(file);
  };

  const handleSendFile = () => {
    setMessage("Wysyłanie pliku...")
    setStatus(FileStatus.SENDING);

    setTimeout(() => {
      setMessage("Wystąpił błąd podczas wysyłania pliku")
      setStatus(FileStatus.ERROR);
      setFile(null)
    }, 2000)
    console.log("Sending file", file?.name)
  }

  const handleCancel = () => {
    setMessage("");
    setStatus(FileStatus.UNSELECTED);
    setFile(null);
  }

  if (!isEventLive(eventStartDate, eventEndDate)) {
    return (
      <p>Tutaj oddasz swoje rozwiązanie w trakcie trwanie HackAreny </p>
    )
  }

  return (
    <div className="file">
      <p>Dodaj swoje rozwiązanie poniżej</p>
      <div className="file--wrapper">
        <FU
          classes="file--input"
          label="Przeciągnij plik lub kliknij, aby wybrać"
          handleChange={handleChange}
          types={fileTypes}
        />
        {
          status !== FileStatus.UNSELECTED && <div className="file--sending">
            <span>{message}</span>
            {status !== FileStatus.SENDING &&
              <div>
                <button onClick={handleCancel} className={`file--button account--button account--button__secondary${status !== FileStatus.SUCCESS ? " file--button__halfborder" : ""}`}>Cofnij</button>
                {status !== FileStatus.SUCCESS && <button onClick={handleSendFile} className="file--button account--button account--button__secondary file--button__halfborder">Wyślij</button>}
              </div>
            }
          </div>
        }

      </div>
    </div >
  );
}

export default FileUploader;
