import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'admin-shell',
  standalone: true,
  imports: [SidebarComponent, DashboardComponent, RouterOutlet],
  templateUrl: './shell.component.html'
})
export class ShellComponent {

}
