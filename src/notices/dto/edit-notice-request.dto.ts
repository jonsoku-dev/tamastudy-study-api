import { ApiProperty } from '@nestjs/swagger';

export class EditNoticeRequestDto {
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
}
