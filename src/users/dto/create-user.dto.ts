import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty() @IsNotEmpty() name: string;
  @ApiProperty() @IsEmail() email: string;
  @ApiProperty({ minLength: 3 }) @MinLength(3) password: string;
}


