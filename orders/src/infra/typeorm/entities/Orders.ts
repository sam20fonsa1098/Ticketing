import { OrderStatus } from '@sam20fonsa1098tickets/common';
import { 
  Entity,
  ObjectIdColumn,
  Column,
  VersionColumn,
  ObjectID
} from 'typeorm';

@Entity('orders') 
class Orders {
  @ObjectIdColumn()
  id!: ObjectID;

  @Column()
  ticket_id!: string;

  @Column()
  user_id!: string;

  @Column()
  expires_at!: Date;

  @Column()
  status!: OrderStatus;

  @VersionColumn()
  version!: number;
};

export { Orders };

