import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateUrlDto } from '../../dto/url/create-url.dto';
import { UrlCreateCommand } from '../../../src/url/application/useCase/create/UrlCreate.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { UrlFindAllQuery } from '../../../src/url/application/useCase/findAll/UrlFindAll.query';
import { UrlRemoveCommand } from '../../../src/url/application/useCase/remove/UrlRemove.command';
import { UrlFindOneQuery } from '../../../src/url/application/useCase/findOne/UrlFindOne.query';
import { UrlFindOneByUrlQuery } from '../../../src/url/application/useCase/findOneByUrl/UrlFindOneByUrl.query';

@Controller('url')
@ApiTags('url-shortener')
export class UrlController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Post('')
  @ApiResponse({
    status: 201,
    description: 'stores url into database if it does not exist and gives it a short url key',
    type: [CreateUrlDto],
  })
  async create(@Body() createUrlDto: CreateUrlDto) {
    const findOneByUrlQuery = new UrlFindOneByUrlQuery(createUrlDto.url);
    const urlInDatabase = await this.queryBus.execute(findOneByUrlQuery);

    if (!urlInDatabase) {
      const shortUrlKey = uuidv4().split('-')[0];
      const command = new UrlCreateCommand(createUrlDto.url, shortUrlKey);
      await this.commandBus.execute(command);
      return
    }
    else {
      throw new Error('Url already exists in database');
    }
  }

  @Get()
  async findAll() {
    const query = new UrlFindAllQuery();
    return await this.queryBus.execute(query);
  }

  @Get(':shortUrlKey')
  findOne(@Param('shortUrlKey') shortUrlKey: string) {
    const query = new UrlFindOneQuery(shortUrlKey);
    return this.queryBus.execute(query);
  }

  @Get('/find-by-url/:url')
 async findOneByUrl(@Param('url') url: string) {
    const query = new UrlFindOneByUrlQuery(url);
    const shortUrl = await this.queryBus.execute(query);
    if (!shortUrl) {
      throw new Error('Url not found');
    }
    return shortUrl
  }

  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUrlDto: UpdateUrlDto) {
  //   return this.urlService.update(+id, updateUrlDto);
  // }
  //
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const command = new UrlRemoveCommand(id);
    await this.commandBus.execute(command);
  }
}
