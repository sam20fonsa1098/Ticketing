import { injectable, inject } from "tsyringe";
import { IUserDTO } from "../../dtos/IUserDTO";
import { BadRequestError } from "@sam20fonsa1098tickets/common";
import { IHashProvider } from "../../providers/HashProvider/models/IHashProvider";
import { IUsersRepository } from "../../repositories/models/IUsersRepository";

@injectable()
class CreatUserService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('HashProvider') private hashProvider: IHashProvider,
  ) {}

  public execute = async (data: IUserDTO): Promise<void> => {
    const findUser = await this.usersRepository.findUserByEmail(data.email);
    if (findUser) {
      throw new BadRequestError('E-mail already used');
    }
    const hashedPassword = await this.hashProvider.generateHash(data.password);
    Object.assign(data, { password: hashedPassword });
    await this.usersRepository.createUser(data);
  } 
}

export { CreatUserService };