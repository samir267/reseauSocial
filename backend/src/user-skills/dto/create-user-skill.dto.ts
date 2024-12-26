import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserSkillDto {
  @IsNotEmpty({ message: 'The userId field is required.' })
  @IsNumber({}, { message: 'The userId must be a number.' })
  userId: number;

  @IsNotEmpty({ message: 'The skillId field is required.' })
  @IsNumber({}, { message: 'The skillId must be a number.' })
  skillId: number;


}
