import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
//   { path: 'home', component: HomeComponent },
//   { path: 'detail', redirectTo: 'home' },
//   {
//     path: 'detail/:id',
//     canActivate: [RouteGuard],
//     loadChildren: () =>
//       import('../app/details-module/details-module.module').then((m) => m.DetailsModuleModule),
//   },
//   {path: 'page/:page', component: GalleryComponent},
//   {path: '', redirectTo:'page/1', pathMatch: 'full'},
//   {path: 'image/:id', component: ImageInfoComponent},
  {path: 'unknown', component: PageNotFoundComponent},
  {path: '**', component: PageNotFoundComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
