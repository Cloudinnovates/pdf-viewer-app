import { Component, OnInit } from '@angular/core';
import { PdfService } from '../pdf.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
    title = 'loading...';
    constructor(private pdfService: PdfService) { }

    ngOnInit() {
        this.title = this.pdfService.pdfName;
    }

    onSwipeRight(event) {
        console.log('swipe right');
    }

    onSwipeLeft(event) {
        console.log('swipe left');
    }
}
