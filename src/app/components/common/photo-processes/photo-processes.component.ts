import { Component, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/helper/service/api.service';
import { PhotoDetail } from 'src/app/photo-gallery/model/photo-detail.model';

@Component({
  selector: 'app-photo-processes',
  templateUrl: './photo-processes.component.html',
  styleUrls: ['./photo-processes.component.css']
})
export class PhotoProcessesComponent implements OnDestroy {
    getImageSub: any;
    downloadImgSub: any;

  constructor(public apiService: ApiService) { }


   ngOnDestroy() {
      if (!(this.getImageSub === null || this.getImageSub === undefined)) {
        this.getImageSub.unsubscribe();
      }
      if (!(this.downloadImgSub === null || this.downloadImgSub === undefined)) {
        this.downloadImgSub.unsubscribe();
      }
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
