import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

export class CursorPaginatedDto<TData> {
  @ApiProperty()
  pageInfo: {
    nextPageCursor: mongoose.ObjectId;
    hasNextPage: boolean;
  };

  data: TData[];
}
