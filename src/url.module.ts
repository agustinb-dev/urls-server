import { Module } from '@nestjs/common';
import { UrlService } from './url/application/service/url.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Url } from './url/domain/Url.entity';
import { UrlCreateCommand } from './url/application/useCase/create/UrlCreate.command';
import { UrlCreateHandler } from './url/application/useCase/create/UrlCreate.handler';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UrlFindAllHandler } from './url/application/useCase/findAll/UrlFindAll.handler';
import { UrlFindAllQuery } from './url/application/useCase/findAll/UrlFindAll.query';
import { UrlRemoveHandler } from './url/application/useCase/remove/UrlRemove.handler';
import { UrlRemoveCommand } from './url/application/useCase/remove/UrlRemove.command';
import { UrlFindOneHandler } from './url/application/useCase/findOne/UrlFindOne.handler';
import { UrlFindOneQuery } from './url/application/useCase/findOne/UrlFindOne.query';
import { ImplementationModule } from './shared/infrastructure/implementation.module';
import { Implementation } from './shared/infrastructure/enum';
import { UrlFindOneByUrlQuery } from './url/application/useCase/findOneByUrl/UrlFindOneByUrl.query';
import { UrlFindOneByUrlHandler } from './url/application/useCase/findOneByUrl/UrlFindOneByUrl.handler';

export const Handlers = [
  UrlCreateHandler,
  UrlFindAllHandler,
  UrlRemoveHandler,
  UrlFindOneHandler,
  UrlFindOneByUrlHandler,
];
export const Commands = [UrlCreateCommand, UrlRemoveCommand];

export const Queries = [UrlFindAllQuery, UrlFindOneQuery, UrlFindOneByUrlQuery];

@Module({
  imports: [
    TypeOrmModule.forFeature([Url]),
    ImplementationModule.register(Implementation.postgre),
  ],
  controllers: [],
  providers: [
    UrlService,
    ...Commands,
    ...Handlers,
    ...Queries,
    CommandBus,
    QueryBus,
  ],
})
export class UrlModule {}
