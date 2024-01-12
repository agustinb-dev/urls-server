import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UrlFindOneQuery } from './UrlFindOne.query';
import { UrlService } from '../../service/url.service';

@QueryHandler(UrlFindOneQuery)
export class UrlFindOneHandler implements IQueryHandler<UrlFindOneQuery> {

  constructor(private readonly urlService: UrlService) {
  }
  async execute(query: UrlFindOneQuery) {
    const { shortUrlKey } = query;
    return this.urlService.findOne(shortUrlKey);
  }
}
