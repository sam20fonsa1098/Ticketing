export interface IPayload {
  currency: string;
  amount: number;
  source: string
}

export interface IPaymentsProvider {
  charge(data: IPayload): Promise<{id: string}>;
}