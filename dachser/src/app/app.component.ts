import { Component } from '@angular/core';
import { MainComponent } from "./layouts/main/main.component";
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FooterComponent } from "./layouts/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [MainComponent, HeaderComponent, SidebarComponent, FooterComponent, MatSidenavModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dachser';
}
