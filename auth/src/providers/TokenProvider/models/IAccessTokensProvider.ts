import { IUserTokenDTO } from "../../../dtos/IUserTokenDTO";

export interface IAccessTokenProvider {
  generateAccessToken(data: IUserTokenDTO): Promise<string>;
  validateAccessToken(token: string): IUserTokenDTO;
  getAccessToken(cookie: string): string;
}