import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UrlRemoveCommand } from './UrlRemove.command';
import { UrlService } from '../../service/url.service';

@CommandHandler(UrlRemoveCommand)
export class UrlRemoveHandler implements ICommandHandler {
  constructor(private readonly urlService: UrlService) {}

  async execute(command: UrlRemoveCommand) {
    const { id } = command;
    return this.urlService.remove(id);
  }
}
