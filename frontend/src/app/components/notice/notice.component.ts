import {Component, OnInit, ViewChild} from '@angular/core';
import {CategoryService} from '../../services/category/category.service';
import {NoticeService} from '../../services/notice/notice.service';
import {MessageService} from '../../services/message/message.service';
import {NoticeModelDto} from '../../models/notice/notice-model-dto';
import {CategoryModel} from '../../models/category/category-model';
import {NoticeModel} from '../../models/notice/notice-model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {not} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css']
})
export class NoticeComponent implements OnInit {
  noticeModel: NoticeModelDto = new NoticeModelDto();
  categories: CategoryModel[];
  displayedColumns: string[] = ['id', 'title', 'description', 'price', 'category', 'actions'];
  dataSource: MatTableDataSource<NoticeModel> = new MatTableDataSource();
  private notice: NoticeModel[];
  isVisible: Boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private categoryService: CategoryService,
              private noticeService: NoticeService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadNotice();
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

  private loadNotice(): void {
    this.noticeService.getUserNotice().subscribe(
      data => {
        this.notice = data;
        this.fillTable(this.notice);
      },
      error => {
        this.messageService.displayErrorMessage('Problem with loading notice!');
      });
  }

  private fillTable(notice: NoticeModel[]): void {
    this.dataSource = new MatTableDataSource(notice);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'category':
          return item.category.name;
        default:
          return item[property];
      }
    };
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data: any, filter) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) !== -1;
    };
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private createNotice(): void {
    this.noticeService.createNotice(this.noticeModel).subscribe(
      data => {
        this.messageService.displaySuccessMessage('Successfully created notice!');
        this.notice.push(data);
        this.fillTable(this.notice);
        this.noticeModel = new NoticeModelDto();
        this.isVisible = false;
      },
      error => {
        this.messageService.displayErrorMessage('Problem with creating notice!');
      }
    );
  }

  private updateNotice(): void {
    this.noticeService.updateNotice(this.noticeModel).subscribe(
      data => {
        this.messageService.displaySuccessMessage('Successfully update notice!');
        this.loadNotice();
        this.fillTable(this.notice);
        this.noticeModel = new NoticeModelDto();
        this.isVisible = false;
      },
      error => {
        this.messageService.displayErrorMessage('Problem with updating notice!');
      }
    );
  }

  saveNotice(): void {
    console.log(this.noticeModel);
    if (this.noticeModel.id === null) {
      this.createNotice();
    } else {
      this.updateNotice();
    }
  }

  editNotice(notice: NoticeModel): void {
    this.noticeModel = new NoticeModelDto(notice.id, notice.title, notice.description, notice.category.id, notice.price);
  }

  deleteNotice(notice: NoticeModel): void {
    this.noticeService.deleteNotice(notice).subscribe(
      data => {
        this.messageService.displaySuccessMessage('Successfully delete notice!');
        this.notice = this.notice.filter(p => p.id !== notice.id);
        this.fillTable(this.notice);
      },
      error => {
        this.messageService.displayErrorMessage('Problem with deleting notice!');
      }
    );
  }

  showForm(): void {
    this.isVisible = !this.isVisible;
  }
}
