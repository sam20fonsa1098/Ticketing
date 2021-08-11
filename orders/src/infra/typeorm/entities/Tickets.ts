import { 
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  VersionColumn
} from 'typeorm';
import {ObjectID as generateObjectId} from 'mongodb';

@Entity('tickets') 
class Tickets {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({default: undefined})
  order_id: string | undefined;

  @Column()
  title: string;

  @Column()
  price: number;

  @VersionColumn()
  version: number;

  constructor(id: string, title: string, price: number, version: number, order_id?: string) {
    this.id = new generateObjectId(id) as ObjectID;
    this.title = title;
    this.price = price;
    this.version = version;
    this.order_id = order_id;
  }
};

export { Tickets };

