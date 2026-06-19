import { Component, OnInit } from '@angular/core';
import { CatApiResponse } from '../../models/catmodel';
import { CatService } from '../../services/catservice';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StateBlockComponent } from '../shared/stateblock.component';
import { FormsModule } from '@angular/forms';

type Status = 'loading' | 'success' | 'error';

@Component({
  selector: 'app-catdetailspage',
  standalone: true,
  imports: [CommonModule, StateBlockComponent, FormsModule],
  templateUrl: './catdetailspage.component.html',
  styleUrl: './catdetailspage.component.css'
})
export class CatdetailspageComponent implements OnInit {
  breed: CatApiResponse | undefined;
  status: Status = 'loading';
  errorMessage = '';
  private breedId = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private catApi: CatService,
  ) {}

  ngOnInit(): void {
    this.breedId = this.route.snapshot.paramMap.get('breedId') ?? '';
    this.load();
  }

  load(): void {
    this.status = 'loading';
    this.catApi.getBreedById(this.breedId).subscribe({
      next: (breed) => {
        if (!breed) {
          this.errorMessage = 'Breed not found.';
          this.status = 'error';
          return;
        }
        this.breed = breed;
        this.status = 'success';
      },
      error: (err) => {
        this.errorMessage = err?.message || 'Could not load this breed.';
        this.status = 'error';
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
