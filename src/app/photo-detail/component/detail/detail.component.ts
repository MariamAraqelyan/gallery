import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoDetail } from 'src/app/photo-gallery/model/photo-detail.model';
import { DetailsService } from '../../service/details.service';
import { ApiService } from 'src/app/helper/service/api.service';
import { Observable, Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PhotoInfo } from 'src/app/helper/enum/photoInfo';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {
    getImageSub: any;
    downloadImgSub: any;
    error = false;

    currentPage = 1;
    public photoDetail;
    loading = true;
    imgLoading = true;

    info = PhotoInfo;
    isDownLoad: boolean = false;

    constructor(
      private detailService: DetailsService,
      private route: ActivatedRoute,
      private apiService: ApiService,
      private router: Router
    ) {}

    ngOnInit(): void {
      const routeParams = this.route.snapshot.paramMap;
      const imageID = Number(routeParams.get('id'));
      this.getImageDetail(imageID);
    }

    ngOnDestroy() {
      if (!(this.getImageSub === null || this.getImageSub === undefined)) {
        this.getImageSub.unsubscribe();
      }
      if (!(this.downloadImgSub === null || this.downloadImgSub === undefined)) {
        this.downloadImgSub.unsubscribe();
      }
    }

    onLoad(event) {
      if (event && event.target) {
        this.imgLoading = false;
      }
    }

    getImageDetail(id: number) {
      this.loading = true;
      this.getImageSub = this.detailService.getImageInfo(id).subscribe(
        (resp) => {
          this.photoDetail = resp;
          this.isDownLoad = this.info.MINSIZEFORDOWNLOAD <= this.photoDetail.width && this.info.MINSIZEFORDOWNLOAD <= this.photoDetail.height;
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

    downloadImage(img: PhotoDetail) {
      const imgUrl = img.download_url;
      this.downloadImgSub = this.apiService.getRestDownloadFile(imgUrl).subscribe((res: any) => {
        const file = new Blob([res], { type: res.type });
        const blob = window.URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = blob;
        link.download = 'quality-photo.jpg';

        link.dispatchEvent(
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window,
          })
        );
        setTimeout(() => {
          window.URL.revokeObjectURL(blob);
          link.remove();
        }, 100);
      });
    }

}
