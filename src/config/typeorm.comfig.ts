import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

// process.env : AWS: RDS 같은 서비스 이용시 등록한 환경변수 사용!
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: process.env.RDS_PORT || dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'], // table 매칭시키기 위한 경로 및 파일명
  synchronize: process.env.SYNCHRONIZE || dbConfig.synchronize, // true: 앱이 실행될 때 entities의 entity들에서 컬럼의 길이, 타입등의 변경을 위해 해당 테이블을 Drop하고 다시 생성해줌

  logging: ['query', 'error'], // Logging options
};
