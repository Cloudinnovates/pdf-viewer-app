import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { PdfService } from '../pdf.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {
    @ViewChild('pdf_viewer') pdf_viewer;
    pageSubscription: Subscription;

    title = 'loading...';
    currentPage = null;
    pdfViewerHeight = 0;

    constructor(private pdfService: PdfService) { }

    ngOnInit() {
        this.title = this.pdfService.pdfName;
        this.pageSubscription = this.pdfService.getCurrentPage().subscribe(page => {
            if (!!page) {
                this.currentPage = page;
                console.log('currentPage:', this.currentPage);
            }
        });
    }

    ngOnDestroy() {
        if (this.pageSubscription) {
            this.pageSubscription.unsubscribe();
        }
    }

    onSwipeRight() {
        this.pdfService.beforePage(this.currentPage);
    }

    onSwipeLeft() {
        this.pdfService.nextPage(this.currentPage);
    }

    pageRendered() {
        this.pdfViewerHeight = this.pdf_viewer.element.nativeElement.scrollHeight;
    }
}
