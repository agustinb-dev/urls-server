import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UrlFindOneByUrlQuery } from './UrlFindOneByUrl.query';
import { UrlService } from '../../service/url.service';

@QueryHandler(UrlFindOneByUrlQuery)
export class UrlFindOneByUrlHandler
  implements IQueryHandler<UrlFindOneByUrlQuery>
{
  constructor(private readonly urlService: UrlService) {}
  async execute(query: UrlFindOneByUrlQuery) {
    const { url } = query;
    return this.urlService.findOneByUrl(url);
  }
}
