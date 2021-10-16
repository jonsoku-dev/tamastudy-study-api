import mongoose from 'mongoose';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class GetNoticesByCursorQueryDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  readonly limit: number;
  @IsOptional()
  readonly cursor: mongoose.ObjectId;
}
