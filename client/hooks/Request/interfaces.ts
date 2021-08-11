export interface RequestProps {
  doRequest(data: IUseRequestProps): Promise<any>;
  apiErrors: Array<IApiError>;
}

export interface IUseRequestProps {
  url: string;
  method: 'post' | 'get' | 'put' | 'delete';
  body: any;
  onSucess?(data: any): void
}

export interface IApiError {
  message: string;
  field?: string;
}