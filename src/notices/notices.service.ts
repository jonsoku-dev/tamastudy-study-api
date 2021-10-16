import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notice, NoticeDocument } from '../common/schemas/notice.schema';
import mongoose from 'mongoose';
import { Model } from 'mongoose';
import { CreateNoticeRequestDto } from './dto/create-notice.request.dto';
import { GetNoticesQueryDto } from './dto/get-notices.query.dto';
import { EditNoticeRequestDto } from './dto/edit-notice-request.dto';
import { GetNoticesByCursorQueryDto } from './dto/get-notices-by-cursor.query.dto';
import { User } from '../common/schemas/user.schema';
import { CursorPaginatedDto } from '../common/dtos/cursor-paginated.dto';
import { NoticeResponseDto } from './dto/notice.response.dto';

@Injectable()
export class NoticesService {
  constructor(
    @InjectModel(Notice.name) private noticeModel: Model<NoticeDocument>,
  ) {}

  async create(userId: mongoose.ObjectId, dto: CreateNoticeRequestDto) {
    const newNotice = new this.noticeModel({
      title: dto.title,
      content: dto.content,
      user: userId,
      islive: true,
    });
    await newNotice.save();
    return newNotice;
  }

  async getAll({ limit = 20, offset = 0 }: GetNoticesQueryDto) {
    const notices = await this.noticeModel
      .find({ islive: true })
      .populate('user')
      .skip(offset)
      .sort({ _id: -1 })
      .limit(limit);
    return notices;
  }

  async getAllByCursor({
    limit = 20,
    cursor,
  }: GetNoticesByCursorQueryDto): Promise<
    CursorPaginatedDto<NoticeResponseDto>
  > {
    console.log(typeof limit);
    const query = {
      islive: true,
    };
    if (cursor) {
      query['_id'] = {
        $lt: cursor,
      };
    }
    let notices = await this.noticeModel
      .find(query)
      .populate('user')
      .sort({ _id: -1 })
      .limit(limit + 1);

    const hasNextPage = notices.length > limit;

    notices = hasNextPage ? notices.slice(0, -1) : notices;

    return {
      data: notices,
      pageInfo: {
        hasNextPage,
        nextPageCursor: hasNextPage ? notices[notices.length - 1]._id : null,
      },
    };
  }

  async getOne(noticeId: mongoose.ObjectId) {
    const notice = await this.noticeModel.findById(noticeId).populate('user');
    return notice;
  }

  async edit(
    userId: mongoose.ObjectId,
    noticeId: mongoose.ObjectId,
    dto: EditNoticeRequestDto,
  ) {
    const notice = await this.noticeModel
      .findByIdAndUpdate(
        noticeId,
        {
          title: dto.title,
          content: dto.content,
        },
        {
          new: true,
        },
      )
      .populate('user');
    return notice;
  }

  async delete(userId: mongoose.ObjectId, noticeId: mongoose.ObjectId) {
    const notice = await this.noticeModel
      .findByIdAndUpdate(
        noticeId,
        {
          islive: false,
        },
        {
          new: true,
        },
      )
      .populate('user');
    return notice;
  }
}
