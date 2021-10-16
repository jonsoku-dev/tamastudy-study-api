import { IsNumber, IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class GetNoticesQueryDto {
  @IsNumber()
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  readonly offset: number;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  readonly limit: number;
}
