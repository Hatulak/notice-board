import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CategoryModel} from '../../models/category/category-model';
import {CategoryService} from '../../services/category/category.service';
import {MessageService} from '../../services/message/message.service';
import {NoticeService} from '../../services/notice/notice.service';
import {NoticeModel} from '../../models/notice/notice-model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-main-paige',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, AfterViewInit {
  categories: CategoryModel[];
  selectedCat: number[];
  displayedColumns: string[] = ['id', 'title', 'description', 'price', 'category', 'owner'];
  dataSource: MatTableDataSource<NoticeModel> = new MatTableDataSource();
  expandedElement: NoticeModel | null;
  private notice: NoticeModel[];
  private noticeOriginal: NoticeModel[];

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

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
    this.noticeService.getAllNotice().subscribe(
      data => {
        this.notice = data;
        this.noticeOriginal = data;
        this.fillTable(this.notice);
      },
      error => {
        this.messageService.displayErrorMessage('Problem with loading notice!');
      });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSelectChange(): void {
    console.log(this.selectedCat);
    console.log(this.notice);
    if (Array.isArray(this.selectedCat) && this.selectedCat.length) {
      this.notice = this.noticeOriginal.filter(p => this.selectedCat.includes(p.category.id));
      this.fillTable(this.notice);
    } else {
      this.notice = this.noticeOriginal;
      this.fillTable(this.notice);
    }
  }

  private fillTable(notice: NoticeModel[]): void {
    this.dataSource = new MatTableDataSource(notice);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'category':
          return item.category.name;
        case 'owner':
          return item.owner.username;
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
}
