import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MessageService} from '../message/message.service';
import {Observable} from 'rxjs';
import {NoticeModel} from '../../models/notice/notice-model';
import {environment} from '../../../environments/environment';
import {NoticeModelDto} from '../../models/notice/notice-model-dto';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  constructor(private httpClient: HttpClient, private messageService: MessageService) {
  }

  getAllNotice(): Observable<NoticeModel[]> {
    return this.httpClient.get<NoticeModel[]>(environment.baseUrl + 'notice');
  }

  createNotice(notice: NoticeModelDto): Observable<NoticeModel> {
    return this.httpClient.post<NoticeModel>(environment.baseUrl + 'notice', notice);
  }

  updateNotice(notice: NoticeModelDto): Observable<NoticeModel> {
    return this.httpClient.put<NoticeModel>(environment.baseUrl + 'notice', notice);

  }

  deleteNotice(notice: NoticeModel): Observable<any> {
    return this.httpClient.delete<any>(environment.baseUrl + 'notice/' + notice.id);
  }
}
