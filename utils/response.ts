import { IResponse } from "../types/IResponse";

/**
 * Generic response function
 * @param {Request} req - request object
 * @param {Response} res - response
 * @returns {Object}
 */
export const response = ({
  message: incomingMessage,
  success,
  data,
}: IResponse): IResponse => {
  // default message
  const message = incomingMessage || "Operation successfull";

  return {
    message,
    success,
    data: success === true ? data : null,
  };
};
