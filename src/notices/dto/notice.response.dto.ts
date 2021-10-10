import { Notice } from '../../common/schemas/notice.schema';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

export class NoticeResponseDto extends Notice {
  @ApiProperty({
    type: String,
    description: '공지사항 아이디',
    example: '61613976c18a6acadc5f0949',
    required: false,
  })
  _id: mongoose.ObjectId;

  @ApiProperty({
    type: String,
    description: '공지사항 타이틀',
    example: '공지사항 타이틀입니다',
    required: false,
  })
  title: string;

  @ApiProperty({
    type: String,
    description: '공지사항 본문',
    example: '공지사항 본문입니다.',
    required: false,
  })
  content: string;

  @ApiProperty({
    type: Number,
    description: '공지사항 조회수입니다.',
    example: 0,
    required: false,
  })
  viewCount: number;

  @ApiProperty({
    type: Boolean,
    description: '공지 삭제 여부',
    example: false,
    required: false,
  })
  islive: boolean;
}
