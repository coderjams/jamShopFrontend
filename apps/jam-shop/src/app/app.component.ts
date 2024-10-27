import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { BannerComponent } from '@angular-monorepo/ui'

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, HomePageComponent, ProductListComponent, FooterComponent, HeaderComponent, BannerComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'jam-shop';
}
