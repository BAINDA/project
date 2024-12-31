import { Component } from "@angular/core";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
  imports: [],
  standalone: true,
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  constructor() {}
}
