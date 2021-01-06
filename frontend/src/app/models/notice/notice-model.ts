import {CategoryModel} from '../category/category-model';
import {UserModel} from '../user/user-model';

export interface NoticeModel {
  id?: number;
  title?: string;
  description?: string;
  category?: CategoryModel;
  owner?: UserModel;

}
