import { IsNumber, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePostDto {
  // @IsNumber()
  // @IsNotEmpty()
  userId: number;

  // @IsString()
  // @IsNotEmpty()
  // title: string;

  @IsOptional() // Rendez le champ optionnel si nécessaire
  @IsString()
  text?: string;
}
