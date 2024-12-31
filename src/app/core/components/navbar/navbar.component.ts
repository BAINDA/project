import { Component, EventEmitter, Output } from "@angular/core";
import { MatMenuModule } from "@angular/material/menu";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
  imports: [MatMenuModule, RouterLinkActive, RouterLink, MatIconModule],
  standalone: true,
})
export class NavbarComponent {
  @Output() changeColorTheme: EventEmitter<string> = new EventEmitter();

  constructor() {}
}
