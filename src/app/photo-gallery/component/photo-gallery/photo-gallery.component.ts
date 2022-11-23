import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { PhotoDetail } from '../../model/photo-detail.model';
import { PhotoGalleryService } from '../../service/photo-gallery.service';

import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { of } from 'rxjs';
import { catchError, filter, finalize, map, pairwise, throttleTime } from 'rxjs/operators';

import { PhotoInfo } from 'src/app/helper/enum/photoInfo';
import { ApiService } from 'src/app/helper/service/api.service';
import { PhotoProcessesComponent } from 'src/app/components/common/photo-processes/photo-processes.component';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.css'],
   host: {
      '(window:resize)': 'onResize($event)'
    }
})
export class PhotoGalleryComponent extends PhotoProcessesComponent implements OnInit, AfterViewInit, OnDestroy {

  private subscription: any;
  images = new Array<PhotoDetail>();
  isMobile = true; //Mobile design will continue to decide a little later
  errorMsg = '';
  isLoading = false;


  @ViewChild('scroller') scroller!: CdkVirtualScrollViewport;
  public pageNumber: number = PhotoInfo.LOADINGPAGENUMBER;

  constructor(private photoService: PhotoGalleryService, private router: Router, private ngZone: NgZone, public apiService: ApiService) {
      super(apiService);
  }

  ngOnInit(): void {
    this.isMobile = window.innerWidth <= 576;
    this.loadMore();
  }

    ngAfterViewInit() {
      this.scroller.elementScrolled().pipe(
        map(() => this.scroller.measureScrollOffset('bottom')),
        pairwise(),
        filter(([y1, y2]) => (!this.isLoading && y2 < y1 && (this.isMobile ? y2 < 272 : y2 < 368))),
        throttleTime(200)
      ).subscribe(() => {
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
      this.isLoading = true;
      this.photoService.getPhotos(this.pageNumber, PhotoInfo.LOADINGLIMITNUMBER)
      .pipe(
            catchError(errorMsg => {
              this.errorMsg = errorMsg;
              return of([]);
            }),
            finalize(() => this.isLoading = false)
          )
      .subscribe((photoItem: any) => {
          if (photoItem.length > 0) {
            this.images = this.images.concat(photoItem);
            this.pageNumber++;
            this.errorMsg = '';
          }
        });
    }

  imgDetails(image: any) {
    sessionStorage.setItem('id', image.id);
    this.router.navigate(['/detail/' + image.id]);
  }

}
