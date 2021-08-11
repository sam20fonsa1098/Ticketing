import { connect, Stan } from 'node-nats-streaming';

class NatsWrapper {
  private _client?: Stan;

  get client() {
    if (!this._client) {
      throw new Error('Cannot access NATS client before connecting');
    }
    return this._client;
  }

  public async connect(cluster_id: string, client_id: string, url: string): Promise<void> {
    this._client = connect(cluster_id, client_id, { url });

    return new Promise((resolve, reject) => {
      this.client.on('connect', () => {
        console.log('Connected to NATS');
        resolve();
      });
      this.client.on('error', (err) => {
        console.log('Error to connect on NATS');
        reject(err);
      });
    })
  }
}

export const natsWrapper = new NatsWrapper();

