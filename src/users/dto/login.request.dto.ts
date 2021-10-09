import { PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { User } from '../../common/schemas/user.schema';

export class LoginRequestDto extends PickType(User, ['email', 'password']) {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
