import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialDto {
  @IsString()
  @MinLength(4)
  @MaxLength(14)
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(14)
  @Matches(/^[a-zA-Z0-9]*$/) // 영문, 숫자 가능
  password: string;
}
