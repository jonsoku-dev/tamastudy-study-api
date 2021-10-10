import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { NoticesService } from './notices.service';
import { UserResponseDto } from '../users/dto/user.response.dto';
import { NoticeResponseDto } from './dto/notice.response.dto';
import { User } from '../common/decorators/user.decorator';
import { CreateNoticeRequestDto } from './dto/create-notice.request.dto';
import { LoggedInGuard } from '../auth/logged-in.guard';
import { GetNoticesQueryDto } from './dto/get-notices.query.dto';
import { ParseObjectIdPipe } from '../common/pipes/parse-object-id.pipe';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import { EditNoticeRequestDto } from './dto/edit-notice-request.dto';

@ApiTags('notices')
@Controller('api/notices')
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}
  // C
  @ApiCookieAuth('connect.sid')
  @ApiOperation({ summary: '공지사항 생성' })
  @ApiBody({ type: CreateNoticeRequestDto })
  @ApiResponse({
    status: 201,
    description: '공지사항 생성 완료',
    type: NoticeResponseDto,
  })
  @ApiResponse({ status: 403, description: '권한 에러' })
  @ApiResponse({ status: 500, description: '서버에러' })
  @ApiResponse({ status: 400, description: '클라이언트에러' })
  @UseGuards(LoggedInGuard)
  @Post('')
  createNotice(
    @User() user: UserResponseDto,
    @Body() dto: CreateNoticeRequestDto,
  ) {
    return this.noticesService.create(user._id, dto);
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
  getNotices(@Query() query: GetNoticesQueryDto) {
    return this.noticesService.getAll(query);
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
  getNotice(@Param('noticeId', ParseObjectIdPipe) noticeId: mongoose.ObjectId) {
    return this.noticesService.getOne(noticeId);
  }

  // U
  @ApiCookieAuth('connect.sid')
  @ApiOperation({ summary: '공지사항 수정' })
  @ApiResponse({
    status: 200,
    description: '공지사항 수정하기',
    type: NoticeResponseDto,
  })
  @ApiResponse({ status: 403, description: '권한 에러' })
  @ApiResponse({ status: 500, description: '서버에러' })
  @ApiResponse({ status: 400, description: '클라이언트에러' })
  @UseGuards(LoggedInGuard)
  @Put(':noticeId')
  editNotice(
    @User() user: UserResponseDto,
    @Param('noticeId', ParseObjectIdPipe) noticeId: mongoose.ObjectId,
    @Body() dto: EditNoticeRequestDto,
  ) {
    const userId = user._id;
    return this.noticesService.edit(userId, noticeId, dto);
  }

  // D
  @ApiCookieAuth('connect.sid')
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
  deleteNotice(
    @User() user: UserResponseDto,
    @Param('noticeId', ParseObjectIdPipe) noticeId: mongoose.ObjectId,
  ) {
    const userId = user._id;
    return this.noticesService.delete(userId, noticeId);
  }
}
