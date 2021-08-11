import { CustomErrorHandler, IError } from "@sam20fonsa1098tickets/common";

export class InvalidTicketOperation extends CustomErrorHandler{
  constructor(
    public readonly reason='Invalid Ticket Operation',
    public readonly statusCode=400
    ) {
    super(reason);
    Object.setPrototypeOf(this, InvalidTicketOperation.prototype);
  };

  public serializeErrors = (): Array<IError> => {
    return [{ message: this.reason }]
  }
}