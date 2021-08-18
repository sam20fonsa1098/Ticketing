abstract class IService {
  abstract execute(data: any): Promise<any>;
}

export { IService };
