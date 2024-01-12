import { Module } from '@nestjs/common';
import { UrlModule } from '../src/url.module';
import { CqrsModule } from '@nestjs/cqrs';
import { UrlController } from './controller/url/url.controller';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'tetosteron4',
    //   database: 'urlShortener',
    //   entities: [Url],
    //   synchronize: true,
    //   logging: true,
    // }),
    UrlModule,
    CqrsModule,
    ConfigModule.forRoot(),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'postgres',
    //     host: configService.get('DB_HOST'),
    //     port: configService.get('DB_PORT'),
    //     username: configService.get('DB_USERNAME'),
    //     password: configService.get('DB_PASSWORD'),
    //     database: configService.get('DB_DATABASE'),
    //     entities: [Url],
    //     synchronize: true,
    //     logging: true,
    //   }),
    // }),
  ],
  controllers: [UrlController],
  providers: [],
})
export class AppModule {}
