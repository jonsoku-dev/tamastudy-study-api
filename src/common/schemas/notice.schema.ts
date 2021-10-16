import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';

@Schema({
  timestamps: true,
})
export class Notice extends Document {
  _id: mongoose.ObjectId;

  @Prop({
    type: String,
    required: true,
  })
  title: string;

  @Prop({
    type: String,
    required: true,
    index: true,
  })
  content: string;

  @Prop({
    type: Number,
    required: true,
    default: 0,
  })
  viewCount: number;

  @Prop({
    type: Boolean,
    required: true,
    default: false,
    index: true,
  })
  islive: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export type NoticeDocument = Notice & Document;

export const NoticeSchema = SchemaFactory.createForClass(Notice);
