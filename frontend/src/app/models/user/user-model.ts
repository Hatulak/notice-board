import {RoleModel} from './role-model';
import {NoticeModel} from '../notice/notice-model';

export interface UserModel {
  id?: number;
  username?: string;
  email?: string;
  roles?: RoleModel[];
  noticeList?: NoticeModel[];
}
