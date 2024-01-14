import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUrlDto } from '../../../../backend/dto/url/create-url.dto';
import { Url } from '../../domain/Url.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UrlRepository } from '../../domain/Url.repository';

@Injectable()
export class UrlService implements UrlRepository {
  // constructor(
  //   @Inject('UrlRepository') private readonly urlRepository: UrlRepository,
  // ) {}
  constructor(
    @InjectRepository(Url) private readonly urlRepository: Repository<Url>,
  ) {}
  async create(createUrlDto: CreateUrlDto) {
    const url = this.urlRepository.create(createUrlDto);
    return await this.urlRepository.save(url);
  }

  async findAll() {
    return await this.urlRepository.find();
  }

  async findOne(shortUrlKey: string) {
    const url = await this.urlRepository.findOne({ where: { shortUrlKey } });
    if (!url) {
      throw new NotFoundException('Url not found');
    }
    return url;
  }

  async findOneByUrl(url: string) {
    const shortUrl = await this.urlRepository.findOne({ where: { url } });
    if (!shortUrl) {
      throw new NotFoundException(`Url ${url} not found`);
    }
    return shortUrl;
  }

  async findOneById(id: string) {
    const url = await this.urlRepository.findOne({ where: { id } });
    if (!url) {
      throw new NotFoundException(`Url with ${id} not found`);
    }
    return url;
  }

  async remove(id: string) {
    const url = await this.findOneById(id);
    return await this.urlRepository.remove(url);
  }

  // update(id: number, updateUrlDto: UpdateUrlDto) {
  //   return `This action updates a #${id} url`;
  // }
}
