import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Post('/signup')
  signup(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialDto,
  ): Promise<void> {
    return this.authService.signup(authCredentialDto);
  }

  @Post('/signIn')
  signIn(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialDto);
  }

  @Get('/auth_test')
  @UseGuards(AuthGuard())
  authTest(@GetUser() user: User) {
    // 커스텀 데코레이터 사용
    console.log('user: ', user);
  }

  @Get('/config_test')
  configTest() {
    console.log(this.configService.get<string>('jwt.secret'));
    console.log(this.configService.get<string>('jwt.expiresIn'));
    console.log(this.configService.get<string>('synchronize'));
    console.log(this.configService.get<string>('port'));
  }
}
