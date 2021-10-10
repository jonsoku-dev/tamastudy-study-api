import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

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
  })
  islive: boolean;
}

export type NoticeDocument = Notice & Document;

export const NoticeSchema = SchemaFactory.createForClass(Notice);
