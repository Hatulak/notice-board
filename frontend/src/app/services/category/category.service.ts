import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MessageService} from '../message/message.service';
import {Observable} from 'rxjs';
import {CategoryModel} from '../../models/category/category-model';
import {environment} from '../../../environments/environment';
import {NoticeModel} from '../../models/notice/notice-model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient, private messageService: MessageService) {
  }


  getAllCategories(): Observable<CategoryModel[]> {
    return this.httpClient.get<CategoryModel[]>(environment.baseUrl + 'category');
  }

  createCategory(category: CategoryModel): Observable<CategoryModel> {
    return this.httpClient.post<CategoryModel>(environment.baseUrl + 'category', category);
  }

  updateCategory(category: CategoryModel): Observable<CategoryModel> {
    return this.httpClient.put<CategoryModel>(environment.baseUrl + 'category', category);
  }

  deleteCategory(cat: CategoryModel): Observable<any> {
    return this.httpClient.delete<any>(environment.baseUrl + 'category/' + cat.id);
  }
}
