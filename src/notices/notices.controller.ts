import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NoticesService } from './notices.service';
import { JoinRequestDto } from '../users/dto/join.request.dto';
import { UserResponseDto } from '../users/dto/user.response.dto';
import { NoticeResponseDto } from './dto/notice.response.dto';

@ApiTags('notices')
@Controller('api/notices')
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}
  // C
  @ApiOperation({ summary: '공지사항 생성' })
  @ApiBody({ type: JoinRequestDto })
  @ApiResponse({
    status: 201,
    description: '공지사항 생성 완료',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 403, description: '권한 에러' })
  @ApiResponse({ status: 500, description: '서버에러' })
  @ApiResponse({ status: 400, description: '클라이언트에러' })
  @Post('')
  createNotice() {
    return {
      notice: 'getNotices!',
    };
  }

  // R
  @ApiOperation({ summary: '공지사항 리스트' })
  @ApiResponse({
    status: 200,
    description: '공지사항 리스트 불러오기',
    type: [NoticeResponseDto],
  })
  @ApiResponse({ status: 403, description: '권한 에러' })
  @ApiResponse({ status: 500, description: '서버에러' })
  @ApiResponse({ status: 400, description: '클라이언트에러' })
  @Get('')
  getNotices() {
    return {
      notice: 'notice!',
    };
  }

  // R
  @ApiOperation({ summary: '공지사항 디테일' })
  @ApiResponse({
    status: 200,
    description: '공지사항 디테일 불러오기',
    type: NoticeResponseDto,
  })
  @ApiResponse({ status: 403, description: '권한 에러' })
  @ApiResponse({ status: 500, description: '서버에러' })
  @ApiResponse({ status: 400, description: '클라이언트에러' })
  @Get(':noticeId')
  getNotice(@Param() noticeId: string) {
    return {
      notice: `${noticeId} : getNotice`,
    };
  }

  // R
  @ApiOperation({ summary: '공지사항 수정' })
  @ApiResponse({
    status: 200,
    description: '공지사항 수정하기',
    type: NoticeResponseDto,
  })
  @ApiResponse({ status: 403, description: '권한 에러' })
  @ApiResponse({ status: 500, description: '서버에러' })
  @ApiResponse({ status: 400, description: '클라이언트에러' })
  @Put(':noticeId')
  editNotice(@Param() noticeId: string) {
    return {
      notice: `${noticeId} : editNotice`,
    };
  }

  // R
  @ApiOperation({ summary: '공지사항 수정' })
  @ApiResponse({
    status: 200,
    description: '공지사항 삭제하기',
    type: NoticeResponseDto,
  })
  @ApiResponse({ status: 403, description: '권한 에러' })
  @ApiResponse({ status: 500, description: '서버에러' })
  @ApiResponse({ status: 400, description: '클라이언트에러' })
  @Delete(':noticeId')
  deleteNotice(@Param() noticeId: string) {
    return {
      notice: `${noticeId} : deleteNotice`,
    };
  }
}
