import "./FileUploader.css";
import { FileUploader as FU } from "react-drag-drop-files";
import { eventEndDate, eventStartDate } from "../../Constants/Constants";
import { useState } from "react";
import isEventLive from "../../Utils/isEventLive";

interface Props {}

function FileUploader(props: Props) {
  //   if (!isEventLive(eventStartDate, eventEndDate)) {
  //     return (
  //       <p>
  //         To jest strona twojego zespołu. W trakcie trwania HackAreny tutaj
  //         prześlesz swoje rozwiązanie.
  //       </p>
  //     );
  //   }

  const [file, setFile] = useState<string | null>(null);
  const handleChange = (file: string) => {
    setFile(file);
    console.log(file);
  };

  return (
    <div className="file">
      <FU
        className="file--uploader"
        handleChange={handleChange}
        multiple={false}
      />
      <div className="file--sending"></div>
    </div>
  );
}

export default FileUploader;
