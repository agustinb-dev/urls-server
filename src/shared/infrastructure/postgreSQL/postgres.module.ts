import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Url } from '../../../url/domain/Url.entity';
import { DynamicModule, Module } from '@nestjs/common';

const postgresConnectionModule = async () => {
  return TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_DATABASE'),
      entities: [Url],
      synchronize: true,
      logging: true,
      url: configService.get('DATABASE_URL'),
    }),
  });
};

@Module({})
export class PostgresModule {
  static register(): DynamicModule {
    return {
      module: PostgresModule,
      imports: [postgresConnectionModule()],
      providers: [],
      exports: [],
    };
  }
}
