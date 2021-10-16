import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNoticeRequestDto {
  @ApiProperty({
    type: String,
    description: '공지사항 타이틀',
    example: '공지사항 타이틀입니다',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: String,
    description: '공지사항 본문',
    example: '공지사항 본문입니다.',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
