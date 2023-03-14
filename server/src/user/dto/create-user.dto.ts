import { IsNotEmpty, IsAlpha } from 'class-validator';

export class CreateUserDto {
  @IsAlpha()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
