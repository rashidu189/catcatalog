import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CatApiResponse } from '../../models/catmodel';
import { CatService } from '../../services/catservice';
import { StateBlockComponent } from '../shared/stateblock.component';

type Status = 'loading' | 'success' | 'error';

@Component({
  selector: 'app-catshomepage',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    StateBlockComponent
  ],
  templateUrl: './catshomepage.component.html',
  styleUrl: './catshomepage.component.css'
})
export class CatshomepageComponent implements OnInit {

  breeds: CatApiResponse[] = [];
  filteredBreeds: CatApiResponse[] = [];

  query: string = '';
  status: Status = 'loading';
  errorMessage: string = '';

  constructor(
    private catApi: CatService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.status = 'loading';

    this.catApi.getBreeds(true).subscribe({
      next: (breeds) => {
        this.breeds = breeds;
        this.applyFilter();
        this.status = 'success';
      },
      error: (err) => {
        this.errorMessage =
          err?.message || 'Something went wrong while loading breeds.';
        this.status = 'error';
      }
    });
  }

  onQueryChange(value: string): void {
    this.query = value;
    this.applyFilter();
  }

  private applyFilter(): void {
    const term = this.query.trim().toLowerCase();

    this.filteredBreeds = term
      ? this.breeds.filter(b =>
          b.name.toLowerCase().includes(term)
        )
      : this.breeds;
  }

  openBreed(breedId: string): void {
    this.router.navigate(['/breed', breedId]);
  }
}