import "./FileUploader.css";
import { FileUploader as FU } from "react-drag-drop-files";
import { useState } from "react";
import { eventEndDate, eventStartDate } from "../../Constants/Constants"
import isEventLive from "../../Utils/isEventLive"
import text from "../../Assets/text.json";

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
  const fileText = text.fileUploader;

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
