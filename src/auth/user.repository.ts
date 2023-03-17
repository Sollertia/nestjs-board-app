import { CustomRepository } from '../orm/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { username, password } = authCredentialDto;
    const user = this.create({ username, password });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        // code: '23505'
        throw new ConflictException(
          `${username} 는(은) 존재합니다. 다른 username을 입력하세요!`,
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
