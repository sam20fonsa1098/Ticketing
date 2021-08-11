import { ICreatePaymentDTO } from "../../dtos/ICreatePaymentDTO";
import { Payments } from "../../infra/typeorm/entities/Payments";

export interface IPaymentsRepository {
  createPayment(data: ICreatePaymentDTO): Promise<Payments>;
};