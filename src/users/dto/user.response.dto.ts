import { ApiProperty, OmitType } from '@nestjs/swagger';
import { User } from '../../common/schemas/user.schema';
import * as mongoose from 'mongoose';

export class UserResponseDto extends OmitType(User, ['password']) {
  @ApiProperty({
    type: String,
    description: '유저 아이디',
    example: '61613976c18a6acadc5f0949',
    required: false,
  })
  _id: mongoose.ObjectId;

  @ApiProperty({
    type: String,
    description: '유저명',
    example: 'jonsoku',
    required: true,
  })
  username: string;

  @ApiProperty({
    type: String,
    description: '유저 이메일',
    example: 'the2792@tamastudy.com',
    required: true,
  })
  email: string;

  @ApiProperty({
    type: Boolean,
    description: '회원탈퇴여부',
    example: false,
    required: true,
  })
  islive: boolean;
}
