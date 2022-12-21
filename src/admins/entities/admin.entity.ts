import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'admins' })
export class Admin extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: object;

  @Column('varchar')
  firstName: string;

  @Column('varchar')
  lastName: string;

  @Column({
    generatedType: 'STORED',
    asExpression: `"firstName" || ' ' || "lastName"`,
  })
  fullName: string;

  @Column('jsonb', {
    nullable: false,
  })
  details: object;

  @Column({
    name: 'inviterId',
    type: 'uuid',
    nullable: true,
    generatedType: 'STORED',
    asExpression: `UUID(details->>'inviterId')`,
  })
  inviterId: object | null;

  @ManyToOne(() => Admin, (admin) => admin.id)
  @JoinColumn({
    name: 'inviterId',
  })
  inviter?: Admin;
}
