import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({
  timestamps: true,
})
export class User {
  @ApiProperty({
    type: String,
    description: '유저명',
    example: 'jonsoku',
    required: true,
  })
  @Prop({
    type: String,
    required: true,
  })
  username: string;

  @ApiProperty({
    type: String,
    description: '유저 이메일',
    example: 'the2792@tamastudy.com',
    required: true,
  })
  @Prop({
    type: String,
    required: true,
    index: true,
  })
  email: string;

  @ApiProperty({
    type: String,
    description: '유저 비밀번호',
    example: '123456789',
    required: true,
  })
  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @ApiProperty({
    type: Boolean,
    description: '회원탈퇴여부',
    example: false,
    required: true,
  })
  @Prop({
    type: Boolean,
    required: true,
    default: false,
  })
  islive: boolean;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
