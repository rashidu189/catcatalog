import { Injectable } from '@angular/core';
import { CatApiResponse } from '../models/catmodel';
import { map, Observable, of, shareReplay, switchMap } from 'rxjs';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CatService {

    private readonly baseUrl = 'https://api.thecatapi.com/v1';

      private breeds$: Observable<CatApiResponse[]> | null = null;

  constructor(private http: HttpClient) {}

  private get headers(): HttpHeaders {
    return environment.apiUrl
      ? new HttpHeaders({ 'x-api-key': environment.apiUrl })
      : new HttpHeaders();
  }

  getBreeds(forceRefresh = false): Observable<CatApiResponse[]> {
    if (!this.breeds$ || forceRefresh) {
      this.breeds$ = this.http
        .get<CatApiResponse[]>(`${this.baseUrl}/breeds?limit=20`, { headers: this.headers })
        .pipe(shareReplay({ bufferSize: 1, refCount: false }));
    }
    return this.breeds$;
  }

  getBreedById(breedId: string): Observable<CatApiResponse | undefined> {
    return this.getBreeds().pipe(
      map((breeds) => breeds.find((b) => b.id === breedId)),
      switchMap((breed) => {
        if (!breed) return of(undefined);
        if (breed.image?.url) return of(breed);
        if (!breed.reference_image_id) return of(breed);
                return this.http
          .get<{ url: string; width: number; height: number }>(
            `${this.baseUrl}/images/${breed.reference_image_id}`,
            { headers: this.headers },
          )
          .pipe(
            map((img) => ({ ...breed, image: { id: breed.reference_image_id!, url: img.url } })),
          );
      }),
    );
  }
}
