import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  twitterLink: string;

  @Column({ nullable: true })
  linkedInLink: string;

  @Column({ nullable: true })
  interests: string;

  @Column({ nullable: true })
  uploadedDocs: string;
}
