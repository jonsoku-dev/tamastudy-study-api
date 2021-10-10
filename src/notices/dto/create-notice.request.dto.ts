import { ApiProperty } from '@nestjs/swagger';

export class CreateNoticeRequestDto {
  @ApiProperty({
    type: String,
    description: '공지사항 타이틀',
    example: '공지사항 타이틀입니다',
    required: true,
  })
  title: string;

  @ApiProperty({
    type: String,
    description: '공지사항 본문',
    example: '공지사항 본문입니다.',
    required: true,
  })
  content: string;
}
