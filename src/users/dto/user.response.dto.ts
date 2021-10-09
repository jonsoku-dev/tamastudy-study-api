import { PickType } from '@nestjs/swagger';
import { User } from '../../common/schemas/user.schema';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserResponseDto extends PickType(User, ['email', 'username']) {}
