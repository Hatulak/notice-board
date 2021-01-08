export class NoticeModelDto {
  constructor(public id?: number,
              public title?: string,
              public description?: string,
              public categoryId?: number,
              public price?: number) {
  }
}
