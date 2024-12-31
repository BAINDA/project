import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { PaginationModel } from "../../core/models/pagination.model";
import { MoviesService } from "./services/movies.service";
import { take } from "rxjs/operators";
import { Router } from "@angular/router";
import { OnTVService } from "./services/onTV.service";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MovieCardComponent } from "../../shared/components/poster-card-view/poster-card.component";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { TitleCasePipe } from "@angular/common";

@Component({
  selector: "app-movies",
  templateUrl: "./content.component.html",
  styleUrls: ["./content.component.scss"],
  imports: [
    MatPaginatorModule,
    MovieCardComponent,
    MatButtonModule,
    MatCardModule,
    TitleCasePipe,
  ],
  standalone: true,
})
export class ContentComponent implements OnInit {
  contentType = "";
  nowPlaying: Array<PaginationModel> = [];
  totalResults: any;
  currentPage: number = 1;
  totalPages: number = 0;
  pageNumbers: number[] = [];

  constructor(
    private moviesService: MoviesService,
    private tvShowsService: OnTVService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.contentType = this.router.url.split("/")[1];
  }

  ngOnInit() {
    if (this.contentType === "movies") {
      this.getNowPlayingMovies(this.currentPage);
    } else {
      this.getNowPlayingTVShows(this.currentPage);
    }
  }

  // Get now playing movies
  getNowPlayingMovies(page: number) {
    this.moviesService
      .getNowPlaying(page)
      .pipe(take(1))
      .subscribe(
        (res) => {
          this.totalResults = res.total_results;
          this.nowPlaying = res.results;
          this.totalPages = Math.ceil(this.totalResults / 20); // Assuming page size of 20
          this.updatePageNumbers();
          this.cdr.detectChanges();
        },
        () => {}
      );
  }

  // Get now playing TV shows
  getNowPlayingTVShows(page: number) {
    this.tvShowsService
      .getTvOnTheAir(page)
      .pipe(take(1))
      .subscribe(
        (res) => {
          this.totalResults = res.total_results;
          this.nowPlaying = res.results;
          this.totalPages = Math.ceil(this.totalResults / 20); // Assuming page size of 20
          this.updatePageNumbers();
          this.cdr.detectChanges();
        },
        () => {}
      );
  }

  // Change page based on user selection
  changePage(page: number) {
    if (this.contentType === "movies") {
      this.getNowPlayingMovies(page);
    } else {
      this.getNowPlayingTVShows(page);
    }
    this.currentPage = page;
  }

  // Handle previous page click
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.changePage(this.currentPage);
    }
  }

  // Handle next page click
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.changePage(this.currentPage);
    }
  }

  // Update page numbers to display
  updatePageNumbers() {
    this.pageNumbers = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pageNumbers.push(i);
    }
  }
}
