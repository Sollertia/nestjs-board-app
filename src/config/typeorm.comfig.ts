import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '4351',
  database: 'board_db',
  entities: [__dirname + '/../**/*.entity.{js,ts}'], // table 매칭시키기 위한 경로 및 파일명
  synchronize: true, // true: 앱이 실행될 때 entities의 entity들에서 컬럼의 길이, 타입등의 변경을 위해 해당 테이블을 Drop하고 다시 생성해줌

  logging: ['query', 'error'], // Logging options
};
