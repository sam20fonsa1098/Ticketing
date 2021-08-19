import { injectable, inject } from 'tsyringe';

import { ICreateUserDTO } from '@dtos/ICreateUserDTO';
import { IHashProvider } from '@providers/HashProvider/models/IHashProvider';
import { IUsersRepository } from '@repositories/models/IUsersRepository';
import { IService } from '@services/models/IService';
import { IValidator } from '@validators/models/IValidator';

@injectable()
class CreatUserService implements IService {
  private validators: Array<IValidator>;

  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('HashProvider') private hashProvider: IHashProvider,
  ) {}

  public setValidators(validators: Array<IValidator>): void {
    this.validators = validators;
  }

  public execute = async (data: ICreateUserDTO): Promise<void> => {
    const findUser = await this.usersRepository.findUserByEmail(data.email);
    this.validators.forEach(validator => validator.validate(findUser));
    const hashedPassword = await this.hashProvider.generateHash(data.password);
    Object.assign(data, { password: hashedPassword });
    await this.usersRepository.createUser(data);
  };
}

export { CreatUserService };
