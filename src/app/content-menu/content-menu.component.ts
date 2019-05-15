import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PdfService, IPdfPage } from '../pdf.service';

@Component({
  selector: 'app-content-menu',
  templateUrl: './content-menu.component.html',
  styleUrls: ['./content-menu.component.scss'],
})
export class ContentMenuComponent implements OnInit {

  @Output() pageClick = new EventEmitter<IPdfPage>();

  pages: IPdfPage[] = [];
  constructor(private pdfService: PdfService) { }

  ngOnInit() {
    this.pages = this.pdfService.getContentPages();
  }

  onPageClick(page: IPdfPage) {
    this.pageClick.emit(page);
  }

}
