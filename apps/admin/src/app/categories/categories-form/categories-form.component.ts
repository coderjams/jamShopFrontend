import { Component, inject, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { CategoriesService, Category } from '@angular-monorepo/products';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { timer, lastValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

const PRIMENG_MODULES = [CardModule, ToolbarModule, ButtonModule, InputTextModule, ToastModule]

@Component({
  selector: 'admin-categories-form',
  standalone: true,
  imports: [PRIMENG_MODULES, FormsModule, ReactiveFormsModule],
  providers: [MessageService],
  templateUrl: './categories-form.component.html',
  styles: ``
})
export class CategoriesFormComponent implements OnInit {
  form: FormGroup
  isSubmitted = signal(false);
  editMode = signal<boolean>(false);
  currentCategoryId = signal<string>(null);

  private formBuilder = inject(FormBuilder);
  private categoryService = inject(CategoriesService);
  private messageService = inject(MessageService);
  private location = inject(Location);
  private route = inject(ActivatedRoute);
  private formControlsSignal: () => { [key: string]: AbstractControl };

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required]
    })
    this.formControlsSignal = signal(this.form.controls)

    this._checkEditMode();
  }


  onSubmit() {
    this.isSubmitted.set(true)
    if (this.form.invalid) { return }
    const category: Category = {
      id: this.currentCategoryId(),
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value
    }
    if (this.editMode()) {
      this._updateCategory(category);
    } else {
      this._addCategory(category);
    }
  }

  private _addCategory(category: Category) {
    this.categoryService.createCategory(category).subscribe({
      next: () => this.messageService.add({
        severity: 'success', summary: 'Success', detail: 'Category is created',
      }),
      complete: () => {
        lastValueFrom(timer(2000)).then(() => {
          this.location.back();
        })
      },
      error: () => this.messageService.add({
        severity: 'error', summary: 'Error', detail: 'Category was not created'
      })
    });
  }

  private _updateCategory(category: Category) {
    this.categoryService.updateCategory(category).subscribe({
      next: () => this.messageService.add({
        severity: 'success', summary: 'Success', detail: 'Category is updated',
      }),
      complete: () => {
        lastValueFrom(timer(2000)).then(() => {
          this.location.back();
        })
      },
      error: () => this.messageService.add({
        severity: 'error', summary: 'Error', detail: 'Category was not updated'
      })
    });
  }

  private _checkEditMode() {
    this.route.params.subscribe({
      next: params => {
        if (params.id) {
          this.editMode.set(true);
          this.currentCategoryId.set(params.id);
          this.categoryService.getCategory(params.id).subscribe({
            next: (category) => {
              this.categoryForm.name.setValue(category.name)
              this.categoryForm.icon.setValue(category.icon)
            }
          })
        }
      }
    })
  }

  get categoryForm() {
    return this.formControlsSignal();
  }
}
