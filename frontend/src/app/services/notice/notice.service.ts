import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MessageService} from '../message/message.service';
import {Observable} from 'rxjs';
import {NoticeModel} from '../../models/notice/notice-model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  constructor(private httpClient: HttpClient, private messageService: MessageService) {
  }

  getAllNotice(): Observable<NoticeModel[]> {
    return this.httpClient.get<NoticeModel[]>(environment.baseUrl + 'notice');

  }
}
