import {Component, OnInit, ViewChild} from '@angular/core';
import {CategoryModel} from '../../models/category/category-model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {CategoryService} from '../../services/category/category.service';
import {MessageService} from '../../services/message/message.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource: MatTableDataSource<CategoryModel> = new MatTableDataSource();
  private categories: CategoryModel[];
  catModel: CategoryModel = new CategoryModel();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private categoryService: CategoryService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  private loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      data => {
        this.categories = data;
        this.fillTable(this.categories);
      },
      error => {
        this.messageService.displayErrorMessage('Problem with loading categories!');
      });
  }

  private fillTable(categories: CategoryModel[]): void {
    this.dataSource = new MatTableDataSource(categories);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  saveCategory(): void {
    console.log(this.catModel);
    if (this.catModel.id === null) {
      this.createCategory();
    } else {
      this.updateCategory();
    }
  }

  private createCategory(): void {
    this.categoryService.createCategory(this.catModel).subscribe(
      data => {
        this.messageService.displaySuccessMessage('Successfully created category!');
        this.categories.push(data);
        this.fillTable(this.categories);
        this.catModel = new CategoryModel();
      },
      error => {
        this.messageService.displayErrorMessage('Problem with creating category!');

      }
    );
  }

  private updateCategory(): void {
    this.categoryService.updateCategory(this.catModel).subscribe(
      data => {
        this.messageService.displaySuccessMessage('Successfully update category!');
        this.loadCategories();
        this.fillTable(this.categories);
        this.catModel = new CategoryModel();
      },
      error => {
        this.messageService.displayErrorMessage('Problem with updating category!');

      }
    );
  }

  deleteCategory(cat: CategoryModel): void {
    this.categoryService.deleteCategory(cat).subscribe(
      data => {
        this.messageService.displaySuccessMessage('Successfully delete category!');
        this.categories = this.categories.filter(p => p.id !== cat.id);
        this.fillTable(this.categories);
      },
      error => {
        this.messageService.displayErrorMessage('Problem with deleting category!');
        console.log(error);
      }
    );
  }

  editCategory(cat: CategoryModel): void {
    this.catModel = cat;
  }


}
