import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUrlDto {
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  @ApiProperty()
  url: string;

  shortUrlKey: string;
}
