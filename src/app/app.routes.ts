import { Routes } from '@angular/router';
import { CatshomepageComponent } from './components/catshomepage/catshomepage.component';
import { CatdetailspageComponent } from './components/catdetailspage/catdetailspage.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'catcatalog',
    pathMatch: 'full'
  },
  {
    path: 'catcatalog',
    component: CatshomepageComponent
  },
  {
    path: 'breed/:breedId', 
    component: CatdetailspageComponent
  }
];