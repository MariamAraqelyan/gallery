import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PhotoDetail } from '../../model/photo-detail.model';
import { PhotoGalleryService } from '../../service/photo-gallery.service';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.css']
})
export class PhotoGalleryComponent implements OnInit, OnDestroy {

  private subscription: any;
  error = false;

  currentPage = 1;
  images = new Array<PhotoDetail>();
  loading = true;

  constructor(private photoService: PhotoGalleryService, private router: Router) {}

  ngOnInit(): void {
    this.retrieveImage(1);
  }

  ngOnDestroy() {
    if (!(this.subscription === null || this.subscription === undefined)) {
      this.subscription.unsubscribe();
    }
  }

  retrieveImage(pageNumber: number) {
    this.loading = true;
    this.currentPage = pageNumber;
    this.subscription = this.photoService.getImages(pageNumber).subscribe(
      (resp) => {
        this.images = resp;
        console.log(this.images, 'resp')
      },
      (err) => {
        this.error = true;
        this.loading = false;
      },
      () => {
        this.error = false;
        this.loading = false;
      }
    );
  }

  imgDetails(image: any) {
  console.log(typeof image, 'image type')
    sessionStorage.setItem('id', image.id);
    this.router.navigate(['/detail/' + image.id]);
  }

}
