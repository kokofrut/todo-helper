import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  readonly text: string;

  @IsBoolean()
  readonly isCompleted?: boolean;

  @IsNumber()
  readonly userId: number;

  @IsNumber()
  readonly groupId: number;

  @IsArray ()
  readonly subTasks: Array<JSON>
}
