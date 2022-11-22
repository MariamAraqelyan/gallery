import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RouteGuard } from './helper/guard/route.guard';

const routes: Routes = [
  { path: '', redirectTo: 'gallery', pathMatch: 'full' },
  {
      path: 'gallery',
      loadChildren: () => import('../app/photo-gallery/photo-gallery.module').then(m => m.PhotoGalleryModule),
  },
  { path: 'detail', redirectTo: 'gallery' },
  {
      path: 'detail/:id',
      canActivate: [RouteGuard],
      loadChildren: () =>
      import('../app/photo-detail/photo-detail.module').then((m) => m.PhotoDetailModule),
  },
  {path: 'unknown', component: PageNotFoundComponent},
  {path: '**', component: PageNotFoundComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
