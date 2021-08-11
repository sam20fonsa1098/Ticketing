import { 
  Entity, 
  Column,
  ObjectID,
  ObjectIdColumn 
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('users')
class User {
  @ObjectIdColumn()
  id!: ObjectID;

  @Column('text', { nullable:false })
  email!: string;

  @Column('text', { nullable:false })
  @Exclude()
  password!: string;
}

export { User };