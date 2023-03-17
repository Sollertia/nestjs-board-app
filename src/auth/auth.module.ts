import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { TypeOrmExModule } from '../orm/typeorm.ex.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'robbie',
      signOptions: {
        expiresIn: 24 * 60 * 60, // 하루: 24시간(60 * 60초)
      },
    }),
    TypeOrmExModule.forCustomRepository([UserRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // JwtStrategy 등록
  exports: [JwtStrategy, PassportModule], // 다른 모듈에서도 사용할 수 있게 export
})
export class AuthModule {}
