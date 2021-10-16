import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class EditNoticeRequestDto {
  @ApiProperty({
    type: String,
    description: '공지사항 타이틀',
    example: '공지사항 타이틀입니다',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  title: string;

  @ApiProperty({
    type: String,
    description: '공지사항 본문',
    example: '공지사항 본문입니다.',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  content: string;
}
