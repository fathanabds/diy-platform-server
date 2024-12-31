import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  @MinLength(2, { message: 'Full name must have at least 2 characters.' })
  @IsNotEmpty({ message: 'Full name is required' })
  @IsDefined({ message: 'Full name is required' })
  fullName: string;

  @IsString()
  @IsEnum(['f', 'm'], { message: 'Gender must be f or m' })
  @IsDefined({ message: 'Gender is required' })
  gender: string;
}
