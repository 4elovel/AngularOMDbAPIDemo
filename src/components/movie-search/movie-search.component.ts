import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movie-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div>
      <input [(ngModel)]="movieTitle" placeholder="Enter movie title" />
      <input
        [(ngModel)]="releaseYear"
        placeholder="Enter release year (optional)"
      />

      <div>
        <label>
          <input
            type="radio"
            name="plotLength"
            [(ngModel)]="plotLength"
            value="short"
          />
          Short Plot
        </label>
        <label>
          <input
            type="radio"
            name="plotLength"
            [(ngModel)]="plotLength"
            value="full"
          />
          Long Plot
        </label>
      </div>

      <button (click)="searchMovie()">Search</button>

      <div *ngIf="movieData()">
        <h2>{{ movieData().Title }}</h2>
        <p><strong>Year:</strong> {{ movieData().Year }}</p>
        <p><strong>Rating:</strong> {{ movieData().imdbRating }}</p>
        <p><strong>Duration:</strong> {{ movieData().Runtime }}</p>
        <p><strong>Director:</strong> {{ movieData().Director }}</p>
        <p><strong>Cast:</strong> {{ movieData().Actors }}</p>
        <p>
          <strong>Description:</strong>
          <span *ngIf="!showFullPlot"
            >{{ movieData().Plot.split(' ').slice(0, 50).join(' ') }}...</span
          >
          <span *ngIf="showFullPlot">{{ movieData().Plot }}</span>
        </p>
        <button (click)="showFullPlot = !showFullPlot">
          {{ showFullPlot ? 'Show less' : 'Show more' }}
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./movie-search.component.css'],
})
export default class MovieSearchComponent {
  movieTitle = '';
  releaseYear = '';
  plotLength = 'short';
  movieData = signal<any>(null);
  showFullPlot = false;
  apiKey = 'aefc8ba5';
  apiUrl = 'http://www.omdbapi.com/';

  constructor(private http: HttpClient) {}

  searchMovie() {
    let url = `${this.apiUrl}?t=${this.movieTitle}&apikey=${this.apiKey}&plot=${this.plotLength}`;
    if (this.releaseYear) {
      url += `&y=${this.releaseYear}`;
    }
    this.http.get(url).subscribe((response: any) => {
      this.movieData.set(response);
    });
  }
}
