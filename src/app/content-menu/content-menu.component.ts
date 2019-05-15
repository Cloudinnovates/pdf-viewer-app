import { Component, OnInit } from '@angular/core';
import { PdfService, IPdfPage } from '../pdf.service';

@Component({
  selector: 'app-content-menu',
  templateUrl: './content-menu.component.html',
  styleUrls: ['./content-menu.component.scss'],
})
export class ContentMenuComponent implements OnInit {

  pages: IPdfPage[] = [];
  constructor(private pdfService: PdfService) { }

  ngOnInit() {
    this.pages = this.pdfService.getPages();

  }

}
