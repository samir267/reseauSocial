import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSkillDto {
  @IsNotEmpty({ message: 'The name field is required.' })
  @IsString({ message: 'The name field must be a string.' })
  name: string;
}
