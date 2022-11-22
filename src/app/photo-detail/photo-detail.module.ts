import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoDetailRoutingModule } from './photo-detail-routing.module';
import { DetailComponent } from './component/detail/detail.component'



@NgModule({
  declarations: [
    DetailComponent
  ],
  imports: [
    CommonModule,
    PhotoDetailRoutingModule
  ]
})
export class PhotoDetailModule { }
