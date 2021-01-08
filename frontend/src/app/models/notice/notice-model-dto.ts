export class NoticeModelDto {
  constructor(public title?: string,
              public description?: string,
              public categoryId?: number,
              public price?: number) {
  }
}
