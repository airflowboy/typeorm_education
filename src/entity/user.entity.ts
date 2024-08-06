import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn
} from 'typeorm';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export default class UserModel {
  // 그냥 PK => 모든 테이블에서 기본적으로 존재해야 한다.
  // @PrimaryColumn()
  // 자동으로 ID 생성
  // 순서대로 1 -> 2 -> 3
  // UUID : xxxxxxxx-xxxx-xxxx-xxxxxxxx
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    // 데이터베이스에서 인지하는 컬럼타입
    // 자동으로 유추됨
    type: 'varchar',
    // 데이터베이스 칼럼 이름
    // 프로퍼티 이름으로 자동 유추
    name: 'title',
    length: 300,
    nullable: true,
    // false 이면 처음 저장할때만 값 지정 가능
    // 이후에는 값 변경 불가능
    update: false,
    // find() 실행시 기본으로 값을 불러올지
    // 기본값이 true
    select: true,
    default: 'default value',
    // 컬럼중에서 유일무이한 값이 되어야 하는지
    // 기본값을 false
    unique: false,
  })
  title: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  // 데이터가 생성되는 날짜와 시간이 자동으로 입력된다.
  @CreateDateColumn()
  createdAt: Date;

  // 업데이트 되는 날짜와 시간이 자동으로 입력된다.
  @UpdateDateColumn()
  updatedAt: Date;

  // 데이터가 업데이트 될때마다 1씩 올라감.
  // save() 함수가 몇번 불렸는지 기억함.
  @VersionColumn()
  version: number;

  @Column()
  @Generated('uuid') // increment: 숫자 하나씩 증가, uuid: 문자열 랜덤
  additionalId: string;
}
