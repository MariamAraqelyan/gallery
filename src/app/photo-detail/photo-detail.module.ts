import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoDetailRoutingModule } from './photo-detail-routing.module';
import { DetailComponent } from './component/detail/detail.component'
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    DetailComponent
  ],
  imports: [
    CommonModule,
    PhotoDetailRoutingModule,
    MatCardModule
  ],
})
export class PhotoDetailModule { }
