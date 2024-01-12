import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UrlFindAllQuery } from './UrlFindAll.query';
import { UrlService } from '../../service/url.service';
import { Url } from '../../../domain/Url.entity';

@QueryHandler(UrlFindAllQuery)
export class UrlFindAllHandler implements IQueryHandler<UrlFindAllQuery> {
  constructor(private readonly urlService: UrlService) {}

  execute(): Promise<Url[]> {
    return this.urlService.findAll();
  }
}
