import { Component, OnInit, ViewChild } from '@angular/core';
import { PdfService } from '../pdf.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
    @ViewChild('pdf_viewer') pdf_viewer;

    title = 'loading...';
    currentPage = 1;
    pdfViewerHeight = 0;

    constructor(private pdfService: PdfService) { }

    ngOnInit() {
        this.title = this.pdfService.pdfName;
    }

    onSwipeRight(event) {
        this.currentPage = this.pdfService.getBeforePage(this.currentPage);
    }

    onSwipeLeft(event) {
        this.currentPage = this.pdfService.getNextPage(this.currentPage);
    }

    pageRendered() {
        this.pdfViewerHeight = this.pdf_viewer.element.nativeElement.scrollHeight;
        console.log(this.pdfViewerHeight);

    }
}
