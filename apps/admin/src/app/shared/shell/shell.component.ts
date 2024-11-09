import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { CategoriesFormComponent } from '../../categories/categories-form/categories-form.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'admin-shell',
  standalone: true,
  imports: [SidebarComponent, DashboardComponent, RouterLink, RouterOutlet, CategoriesFormComponent],
  templateUrl: './shell.component.html'
})
export class ShellComponent {

}
