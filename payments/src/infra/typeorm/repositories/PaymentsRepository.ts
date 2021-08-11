import { getMongoRepository, MongoRepository } from "typeorm";
import { ICreatePaymentDTO } from "../../../dtos/ICreatePaymentDTO";
import { IPaymentsRepository } from "../../../repositories/models/IPaymentsRepository";
import { Payments } from "../entities/Payments";

class PaymentsRepository implements IPaymentsRepository {
  private repository: MongoRepository<Payments>;

  constructor() {
    this.repository = getMongoRepository(Payments)
  }

  public async createPayment(data: ICreatePaymentDTO): Promise<Payments> {
    const payment = this.repository.create(data);
    await this.repository.save(payment);
    return payment;
  }
}

export { PaymentsRepository };