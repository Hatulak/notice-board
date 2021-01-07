import {Component, OnInit} from '@angular/core';
import {NoticeModel} from '../../models/notice/notice-model';
import {CategoryService} from '../../services/category/category.service';
import {NoticeService} from '../../services/notice/notice.service';
import {MessageService} from '../../services/message/message.service';
import {NoticeModelDto} from '../../models/notice/notice-model-dto';
import {CategoryModel} from '../../models/category/category-model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-notice',
  templateUrl: './create-notice.component.html',
  styleUrls: ['./create-notice.component.css']
})
export class CreateNoticeComponent implements OnInit {
  noticeModel: NoticeModelDto = new NoticeModelDto();
  categories: CategoryModel[];

  constructor(private categoryService: CategoryService,
              private noticeService: NoticeService,
              private messageService: MessageService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadCategories();
  }


  private loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      data => {
        this.categories = data;
      },
      error => {
        this.messageService.displayErrorMessage('Problem with loading categories!');
      });
  }

  createNotice(): void {
    this.noticeService.createNotice(this.noticeModel).subscribe(
      data => {
        this.messageService.displaySuccessMessage('Notice created!');
        this.router.navigate(['']);
      },
      error => {
        this.messageService.displayErrorMessage('Problem with creating notice!');
      }
    );
  }
}
