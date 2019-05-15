import { Component, OnInit } from '@angular/core';
import { PdfService } from '../pdf.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-zoom-menu',
  templateUrl: './zoom-menu.component.html',
  styleUrls: ['./zoom-menu.component.scss'],
})
export class ZoomMenuComponent implements OnInit {

  constructor(private pdfService: PdfService) { }

  zoomFactor = 1;

  ngOnInit() {
    this.pdfService.getZoomFactor().pipe(take(1)).toPromise()
      .then(zoomFactor => {
        this.zoomFactor = zoomFactor;
      });
  }

  onChangeZoom(event: any) {
    this.zoomFactor = event.detail.value;
    this.pdfService.setZoomFactor(this.zoomFactor);
  }

}
