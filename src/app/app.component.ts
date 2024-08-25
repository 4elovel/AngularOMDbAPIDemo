import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import MovieSearchComponent from '../components/movie-search/movie-search.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MovieSearchComponent],
  template: ` <app-movie-search></app-movie-search>`,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'movie-search-app';
}
