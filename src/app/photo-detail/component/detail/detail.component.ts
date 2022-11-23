import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailsService } from '../../service/details.service';
import { Observable, Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PhotoInfo } from 'src/app/helper/enum/photoInfo';
import { PhotoProcessesComponent } from 'src/app/components/common/photo-processes/photo-processes.component';
import { ApiService } from 'src/app/helper/service/api.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends PhotoProcessesComponent implements OnInit {
    error = false;

    public photoDetail;
    loading = true;
    imgLoading = true;

    info = PhotoInfo;
    isDownLoad: boolean = false;

    constructor(
      private detailService: DetailsService,
      private route: ActivatedRoute,
      private router: Router,
      public apiService: ApiService,
    ) {
      super(apiService);
    }

    ngOnInit(): void {
      const routeParams = this.route.snapshot.paramMap;
      const imageID = Number(routeParams.get('id'));
      this.getImageDetail(imageID);
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

}
