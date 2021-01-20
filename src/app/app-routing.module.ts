import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ItemDetailsComponent } from './pages/item-details/item-details.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'item-details/:id',
    component: ItemDetailsComponent
  },

  // TODO: redirect everything else to home for now. Maybe create a not found page.
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
