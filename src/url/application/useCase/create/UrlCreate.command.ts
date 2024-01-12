export class UrlCreateCommand {
  constructor(
    public readonly url: string,
    public readonly shortUrlKey: string,
  ) {}
}
