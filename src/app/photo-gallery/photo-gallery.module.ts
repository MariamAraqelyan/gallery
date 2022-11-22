import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoGalleryComponent } from './component/photo-gallery/photo-gallery.component';
import { PhotoGalleryRoutingModule } from './photo-gallery-routing.module';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    PhotoGalleryComponent
  ],
  imports: [
    CommonModule,
    PhotoGalleryRoutingModule,
    MatGridListModule,
    MatCardModule
  ],
  exports: [PhotoGalleryComponent],
})
export class PhotoGalleryModule { }
