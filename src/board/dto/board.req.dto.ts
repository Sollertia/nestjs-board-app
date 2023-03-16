import { IsNotEmpty } from 'class-validator';

export class BoardReqDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
