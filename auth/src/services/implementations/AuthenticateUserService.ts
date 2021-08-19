import { injectable, inject } from 'tsyringe';

import { ICreateUserDTO } from '@dtos/ICreateUserDTO';
import { IHashProvider } from '@providers/HashProvider/models/IHashProvider';
import { IUsersRepository } from '@repositories/models/IUsersRepository';
import { IService } from '@services/models/IService';
import { IValidator } from '@validators/models/IValidator';

@injectable()
class AuthenticateUserService implements IService {
  private validators: Array<IValidator> = [];
  private observers: Array<IService> = [];

  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('HashProvider') private hashProvider: IHashProvider,
  ) {}

  public setValidators(validators: Array<IValidator>): void {
    this.validators = validators;
  }

  public setObservers(observers: Array<IService>): void {
    this.observers = observers;
  }

  public async execute(data: ICreateUserDTO): Promise<any> {
    const user = await this.usersRepository.findUserByEmail(data.email);
    this.validators.forEach(validator => validator.validate(user));
    await this.hashProvider.compareHash(data.password, user.password);
    const response = { user };
    this.observers.forEach(observer => {
      Object.assign(response, { ...observer.execute(user) });
    });
    return response;
  }
}

export { AuthenticateUserService };
