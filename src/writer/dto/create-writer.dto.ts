import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateWriterDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
