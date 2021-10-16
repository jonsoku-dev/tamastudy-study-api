import { ApiProperty, OmitType } from '@nestjs/swagger';
import { User, UserRole } from '../../common/schemas/user.schema';
import * as mongoose from 'mongoose';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsString,
} from 'class-validator';

export class UserResponseDto extends OmitType(User, ['password']) {
  @ApiProperty({
    type: String,
    description: '유저 아이디',
    example: '61613976c18a6acadc5f0949',
    required: false,
  })
  @IsMongoId()
  _id: mongoose.ObjectId;

  @ApiProperty({
    type: String,
    description: '유저명',
    example: 'jonsoku',
    required: true,
  })
  @IsString()
  username: string;

  @ApiProperty({
    type: String,
    description: '유저 이메일',
    example: 'the2792@tamastudy.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: Boolean,
    description: '회원탈퇴여부',
    example: false,
    required: true,
  })
  @IsBoolean()
  islive: boolean;

  @ApiProperty({
    enum: [UserRole.User, UserRole.Admin],
    description: '회원 권한',
    example: UserRole.User,
    required: true,
  })
  @IsEnum(UserRole)
  role: UserRole;
}
