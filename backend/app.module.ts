import { Module } from '@nestjs/common';
import { UrlModule } from '../src/url.module';
import { CqrsModule } from '@nestjs/cqrs';
import { UrlController } from './controller/url/url.controller';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    UrlModule,
    CqrsModule,
    ConfigModule.forRoot(),
  ],
  controllers: [UrlController],
  providers: [],
})
export class AppModule {}
