import {
  IsBoolean,
  isNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsNumberString,
} from 'class-validator';

export class CreateGroupDto {
  @IsNotEmpty()
  name: string;

  @IsNumberString()
  userId: number;
}
