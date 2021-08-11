import { Message, Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";

interface Event {
  subject: Subjects;
  queueGroupName: string;
  data: any;
}

abstract class Listener<T extends Event> {
  private client: Stan;
  private ACK_WAIT_IN_MILI_SECONDS = 5000;
  
  abstract subject: T['subject'];
  abstract queueGroupName: T['queueGroupName'];
  abstract onMessage(data: T['data'], message: Message): void;

  constructor(client: Stan) {
    this.client = client
  };

  public listen() {
    const subscription = this.getSubscription();
    subscription.on('message', (message: Message) => {
      this.showLogs();
      const parsedData = this.parseMessage(message);
      this.onMessage(parsedData, message);
    });
  };

  private getSubscription() {
    const subscription = this.client.subscribe(
      this.subject, 
      this.queueGroupName,
      this.subscriptionOption()
    );
    return subscription;
  }

  private subscriptionOption() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ACK_WAIT_IN_MILI_SECONDS)
      .setDurableName(this.queueGroupName);
  };

  private showLogs() {
    console.log(
      `Message received: ${this.subject} / ${this.queueGroupName}`
    );
  }

  private parseMessage(message: Message) {
    const data = message.getData();
    return JSON.parse(typeof data === 'string' ? data : data.toString('utf-8'));
  }

}

export { Listener };