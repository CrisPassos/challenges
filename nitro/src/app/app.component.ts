import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./layouts/header/header.component";
import { MainComponent } from "./layouts/main/main.component";
import { FooterComponent } from "./layouts/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, MainComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'nitro';
}
