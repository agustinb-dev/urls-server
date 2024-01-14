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
    return await this.urlRepository.findOne({ where: { shortUrlKey } });
  }

  async findOneByUrl(url: string) {
    return await this.urlRepository.findOne({ where: { url } });
  }

  async findOneById(id: string) {
    return await this.urlRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    const url = await this.findOneById(id);
    if (!url) {
      throw new NotFoundException('Url not found');
    }
    return await this.urlRepository.remove(url);
  }

  // update(id: number, updateUrlDto: UpdateUrlDto) {
  //   return `This action updates a #${id} url`;
  // }
}
