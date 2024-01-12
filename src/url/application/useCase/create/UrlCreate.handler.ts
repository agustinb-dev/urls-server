import { UrlService } from '../../service/url.service';
import { UrlCreateCommand } from './UrlCreate.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(UrlCreateCommand)
export class UrlCreateHandler implements ICommandHandler<UrlCreateCommand> {
  constructor(private readonly urlService: UrlService) {}

  async execute(command: UrlCreateCommand) {
    const { url, shortUrlKey } = command;
    return this.urlService.create({ url: url, shortUrlKey: shortUrlKey });
  }
}
