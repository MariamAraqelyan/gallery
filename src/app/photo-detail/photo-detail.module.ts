import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoDetailRoutingModule } from './photo-detail-routing.module';
import { DetailComponent } from './component/detail/detail.component'
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    DetailComponent
  ],
  imports: [
    CommonModule,
    PhotoDetailRoutingModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
})
export class PhotoDetailModule { }
