import { OrderStatus } from '@sam20fonsa1098tickets/common';
import { 
  Entity,
  ObjectIdColumn,
  ObjectID,
  Column,
  VersionColumn
} from 'typeorm';

@Entity('orders')
class Orders {
  @ObjectIdColumn()
  id!: ObjectID;

  @Column()
  price!: number;

  @VersionColumn()
  version!: number;

  @Column()
  status!: OrderStatus;

  @Column()
  user_id!: string;
}; 

export { Orders };