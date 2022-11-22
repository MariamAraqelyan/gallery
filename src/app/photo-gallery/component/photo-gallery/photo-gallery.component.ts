import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { PhotoDetail } from '../../model/photo-detail.model';
import { PhotoGalleryService } from '../../service/photo-gallery.service';

import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

// RxJS
import { of } from 'rxjs';
import { catchError, filter, finalize, map, pairwise, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.css'],
   host: {
      '(window:resize)': 'onResize($event)'
    }
})
export class PhotoGalleryComponent implements OnInit, AfterViewInit, OnDestroy {

  private subscription: any;
  error = false;

  currentPage = 1;
  images = new Array<PhotoDetail>();
  loading = true;
  isMobile = true;

    errorMsg = '';
    isLoading = false;


  @ViewChild('scroller') scroller!: CdkVirtualScrollViewport;
  public pageNumber1: number = 1;

  constructor(private photoService: PhotoGalleryService, private router: Router, private ngZone: NgZone,) {}

  ngOnInit(): void {
//       this.images = [];
this.isMobile = window.innerWidth <= 576;
this.loadMore();
  }

    ngAfterViewInit() {
      // Whenever the virtual scroller scrolls
      this.scroller.elementScrolled().pipe(
        // Get the scroll offset from the bottom
        map(() => this.scroller.measureScrollOffset('bottom')),
        // Get emitted values in pairs: [previousValue, currentValue]
        pairwise(),
        // Continue emission if movement is a downward scroll and list is near the bottom
        filter(([y1, y2]) => (!this.isLoading && y2 < y1 && (this.isMobile ? y2 < 272 : y2 < 368))),
        // Lets a value pass, but ignore next values for the next 200ms
        throttleTime(200)
      ).subscribe(() => {
        // Virtual scroller runs outside Angular zone, let API call reenter Angular zone
        this.ngZone.run(() => {
          this.loadMore();
        });
      });
    }

  ngOnDestroy() {
    if (!(this.subscription === null || this.subscription === undefined)) {
      this.subscription.unsubscribe();
    }
  }

    onResize(event: any) {
      this.isMobile = event.target.innerWidth <= 576;
    }

    private loadMore() {
//       this.isLoading = true;
      this.photoService.getPhotos(this.pageNumber1, 10).subscribe((photos1: any) => {
          if (photos1.length > 0) {
            this.images = this.images.concat(photos1);
            this.pageNumber1++;
//             this.errorMsg = '';
          }
        });
    }

  imgDetails(image: any) {
  console.log(typeof image, 'image type')
    sessionStorage.setItem('id', image.id);
    this.router.navigate(['/detail/' + image.id]);
  }

}
