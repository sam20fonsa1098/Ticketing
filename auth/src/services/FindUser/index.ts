import { injectable, inject } from "tsyringe";
import { IUsersRepository } from "../../repositories/models/IUsersRepository";

@injectable()
class FindUserService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}

  public findByEmail = async (email: string) => {
    const user = await this.usersRepository.findUserByEmail(email);
    return user;
  } 

  public findById = async (id: string) => {
    const user = await this.usersRepository.findUserById(id);
    return user;
  } 
}

export { FindUserService };