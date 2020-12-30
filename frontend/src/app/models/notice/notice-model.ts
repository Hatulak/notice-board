import {CategoryModel} from '../category/category-model';

export interface NoticeModel {
  id?: number;
  tittle?: string;
  description?: string;
  category?: CategoryModel;

}
