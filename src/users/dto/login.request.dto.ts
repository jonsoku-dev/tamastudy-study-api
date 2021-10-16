import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({
    type: String,
    description: '유저 이메일',
    example: 'the2792@gmail.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: '유저 패스워드',
    example: '1234',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
