import { IResponse } from "../types/IResponse";

export const response = ({
  message: incomingMessage,
  success,
  data,
}: IResponse): IResponse => {
  const message = incomingMessage || "Operation successfull";

  return {
    message,
    success,
    data: success === true ? data : null,
  };
};
