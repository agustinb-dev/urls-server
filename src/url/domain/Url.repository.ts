import { CreateUrlDto } from '../../../backend/dto/url/create-url.dto';
import { Url } from './Url.entity';

export interface UrlRepository {
  create(createUrlDto: CreateUrlDto): Promise<Url>;
  findAll(): Promise<Url[]>;
  findOne(shortUrlKey: string): Promise<Url | null>;
  findOneByUrl(url: string): Promise<Url | null>;
  // update(id: number, updateUrlDto: UpdateUrlDto): void;
  remove(id: string): Promise<Url>;
}
