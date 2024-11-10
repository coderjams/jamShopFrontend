import { Component, inject, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CategoriesService, Category } from '@angular-monorepo/products';
import { CategoriesFormComponent } from '../categories-form/categories-form.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

const PRIMENG_MODULES = [CardModule, ToolbarModule, ButtonModule,
  TableModule, ToastModule, ConfirmDialogModule]

@Component({
  selector: 'admin-categories-list',
  standalone: true,
  imports: [PRIMENG_MODULES, CategoriesFormComponent, RouterLink, RouterOutlet],
  providers: [ConfirmationService, MessageService],
  templateUrl: './categories-list.component.html',
  styles: ``
})
export class CategoriesListComponent implements OnInit {
  categories: Category[];

  private categoriesService = inject(CategoriesService)
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  private router = inject(Router);

  ngOnInit() {
    this._getCategories();
  }

  deleteCategory(categoryId: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to delete this category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.categoriesService.deleteCategory(categoryId).subscribe(
          {
            next: () => this.messageService.add({
              severity: 'success', summary: 'Success', detail: 'Category is deleted',
            }),
            complete: () => {
              this._getCategories();
            },
            error: () => this.messageService.add({
              severity: 'error', summary: 'Error', detail: 'Category was not deleted'
            })
          });
      },
      reject: () => { '' }
    });
  };

  updateCategory(categoryid: string) {
    this.router.navigateByUrl(`category/form/${categoryid}`)
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  };
};
