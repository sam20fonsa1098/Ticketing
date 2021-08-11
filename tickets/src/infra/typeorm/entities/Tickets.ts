import { 
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tickets') 
class Tickets {
  @ObjectIdColumn()
  id!: ObjectID;

  @Column({default: undefined})
  order_id!: string | undefined;

  @Column()
  title!: string;

  @Column()
  price!: number;

  @Column()
  user_id!: string;

  @Column()
  version!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
};

export { Tickets };

