import { OmitType } from '@nestjs/swagger';
import { User } from '../../common/schemas/user.schema';

export class UserResponseDto extends OmitType(User, ['password']) {}
