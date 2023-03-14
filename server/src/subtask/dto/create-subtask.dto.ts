import {
  IsBoolean,
  isNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsNumberString,
  isBoolean,
} from 'class-validator';

export class CreateSubTaskDto {
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  @IsBoolean()
  isCompleted: boolean

  @IsNotEmpty()
  @IsNumberString()
  todoId: number;
}
