import { registrationEndDate } from "../Constants/Constants";

const isRegistrationOpen = () => {
  const currentDate = new Date();
  const registrationEnd = new Date(registrationEndDate);

  return currentDate < registrationEnd;
};

export default isRegistrationOpen;
