import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
} from 'typeorm';

@Entity('payments')
class Payments {
  @ObjectIdColumn()
  id!: ObjectID;

  @Column()
  stripe_id!: string;

  @Column()
  order_id!: string;
};

export { Payments };