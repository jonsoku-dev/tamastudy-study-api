import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { UserResponseDto } from '../../users/dto/user.response.dto';
import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class NoticeResponseDto {
  @ApiProperty({
    type: String,
    description: '공지사항 아이디',
    example: '61613976c18a6acadc5f0949',
    required: false,
  })
  @IsMongoId()
  @IsNotEmpty()
  _id: mongoose.ObjectId;

  @ApiProperty({
    type: String,
    description: '공지사항 타이틀',
    example: '공지사항 타이틀입니다',
    required: false,
  })
  @IsString()
  title: string;

  @ApiProperty({
    type: String,
    description: '공지사항 본문',
    example: '공지사항 본문입니다.',
    required: false,
  })
  @IsString()
  content: string;

  @ApiProperty({
    type: Number,
    description: '공지사항 조회수입니다.',
    example: 0,
    required: false,
  })
  @IsNumber()
  @IsPositive()
  viewCount: number;

  @ApiProperty({
    type: Boolean,
    description: '공지 삭제 여부',
    example: false,
    required: false,
  })
  @IsBoolean()
  islive: boolean;

  @ApiProperty({
    type: UserResponseDto,
    description: '유저 정보',
    example: '???',
    required: false,
  })
  user: UserResponseDto;
}
