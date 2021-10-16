import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { User, UserRole } from '../../common/schemas/user.schema';

export class JoinRequestDto {
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

  @ApiProperty({
    type: String,
    description: '유저명',
    example: '존소쿠',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  username: string;
}
